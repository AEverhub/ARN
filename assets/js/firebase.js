import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
    import { getDatabase, ref, set, get, child, runTransaction } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

    const firebaseConfig = {
        authDomain: "rms-quiz-system-dbserver.firebaseapp.com",
        databaseURL: "https://rms-quiz-system-dbserver-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "rms-quiz-system-dbserver",
        storageBucket: "rms-quiz-system-dbserver.firebasestorage.app",
        messagingSenderId: "769519554299",
        appId: "1:769519554299:web:fcb6e641fb77dacffc2a5e",
        measurementId: "G-939JE1X57X"
    };

    const app = initializeApp(firebaseConfig);
    let analytics = null;
    try { analytics = getAnalytics(app); } catch (analyticsError) { console.warn('Analytics 初始化略過：', analyticsError); }
    const db = getDatabase(app);
    // 不在 HTML 保存任何 AI Secret；全域 Key 應放在 Cloud Functions Secret Manager。
    window.EMBEDDED_GEMINI_API_KEY = '';
    window.EMBEDDED_GEMINI_MODEL = 'gemini-2.5-flash';
    const AI_PROXY_URL = 'https://asia-southeast1-rms-quiz-system-dbserver.cloudfunctions.net/aiProxy';

    async function callGemini(prompt, imageData) {
        const cfg = getEffectiveApiConfig();
        if (!cfg.enabled || !cfg.apiKey) {
            throw new Error('尚未設定可用的 API。請先設定本地 API，或由管理員啟用全域 API。');
        }
        let url, body, headers = { 'Content-Type': 'application/json' };
        if (cfg.provider === 'gemini') {
            const parts = [{ text: prompt }];
            if (imageData) parts.push({ inline_data: { mime_type: 'image/png', data: imageData.split(',')[1] } });
            url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(cfg.model || 'gemini-flash-latest')}:generateContent`;
            headers['X-goog-api-key'] = cfg.apiKey;
            body = { contents: [{ parts }], generationConfig: { responseMimeType: 'application/json', temperature: 0.1 } };
        } else {
            url = cfg.endpoint || 'https://api.openai.com/v1/chat/completions';
            headers.Authorization = `Bearer ${cfg.apiKey}`;
            const content = [{ type: 'text', text: prompt }];
            if (imageData) content.push({ type: 'image_url', image_url: { url: imageData } });
            body = { model: cfg.model || 'gpt-4o-mini', messages: [{ role: 'user', content }], temperature: 0.1, response_format: { type: 'json_object' } };
        }
        const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
        const responseBody = await response.json();
        if (!response.ok) throw new Error(responseBody?.error?.message || `AI API 錯誤（HTTP ${response.status}）`);
        const text = (cfg.provider === 'gemini' ? responseBody?.candidates?.[0]?.content?.parts?.[0]?.text : responseBody?.choices?.[0]?.message?.content)?.replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim();
        if (!text) throw new Error('AI 沒有回傳有效內容');
        return JSON.parse(text);
    }

    window.testLocalApiConfig = async function(cfg) {
        if (!cfg || !cfg.apiKey) throw new Error('API Key 不得為空');
        const testPrompt = '只回傳 JSON：{"ok":true,"message":"API connection test passed"}';
        let url, headers = { 'Content-Type': 'application/json' }, body;
        if (cfg.provider === 'gemini') {
            url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(cfg.model || 'gemini-flash-latest')}:generateContent`;
            headers['X-goog-api-key'] = cfg.apiKey;
            body = { contents: [{ parts: [{ text: testPrompt }] }], generationConfig: { responseMimeType: 'application/json', temperature: 0 } };
        } else {
            url = cfg.endpoint || 'https://api.openai.com/v1/chat/completions';
            headers.Authorization = `Bearer ${cfg.apiKey}`;
            body = { model: cfg.model || 'gpt-4o-mini', messages: [{ role: 'user', content: testPrompt }], temperature: 0, response_format: { type: 'json_object' } };
        }
        const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
        const responseBody = await response.json();
        if (!response.ok) throw new Error(responseBody?.error?.message || `API 回應錯誤（HTTP ${response.status}）`);
        const content = cfg.provider === 'gemini' ? responseBody?.candidates?.[0]?.content?.parts?.[0]?.text : responseBody?.choices?.[0]?.message?.content;
        if (!content) throw new Error('API 沒有回傳有效內容');
        JSON.parse(String(content).replace(/^```json\s*/i, '').replace(/\s*```$/i, '').trim());
        return true;
    };

    window.gradeHandwritingWithFirebaseAI = async function(payload) {
        const prompt = `你是嚴謹的數學老師，請批改學生的手寫計算題。
題目：${payload.question}
標準答案：${payload.standardAnswer || '未提供'}
配分：${payload.maxScore}
評分規則：${payload.rubric}
請辨識手寫計算過程與最後答案，依正確性及步驟給分。只回傳 JSON，不要 Markdown，格式：{"recognizedAnswer":"","isCorrect":false,"score":0,"maxScore":${payload.maxScore},"feedback":""}`;
        const parsed = await callGemini(prompt, payload.imageData);
        parsed.maxScore = Number(payload.maxScore) || parsed.maxScore || 10;
        parsed.score = Math.max(0, Math.min(parsed.maxScore, Number(parsed.score) || 0));
        const email = localStorage.getItem('rms_device_registered') || 'anonymous';
        const key = `${Date.now()}_${email.replace(/[^a-zA-Z0-9]/g, '_')}`;
        if (window.fbSetData) {
            window.fbSetData(`handwritingGrades/${key}`, { ...parsed, question: payload.question, quizCode: document.getElementById('quiz-code').value.trim(), timestamp: new Date().toISOString() });
        }
        return parsed;
    };

    window.gradeShortAnswerWithGemini = async function(payload) {
        const prompt = `你是嚴謹的老師，請批改簡答題。題目：${payload.question}\n學生答案：${payload.studentAnswer}\n參考答案：${payload.standardAnswer || '未提供'}\n評分規則：${payload.rubric || '依內容正確性與關鍵概念給分'}\n配分：${payload.maxScore}\n只回傳 JSON：{"recognizedAnswer":"","isCorrect":false,"score":0,"maxScore":${payload.maxScore},"feedback":""}`;
        const parsed = await callGemini(prompt);
        parsed.maxScore = Number(payload.maxScore) || parsed.maxScore || 10;
        parsed.score = Math.max(0, Math.min(parsed.maxScore, Number(parsed.score) || 0));
        return parsed;
    };

    window.fbSetData = function(path, value) {
        set(ref(db, 'system_data/' + path), value).catch(err => {
            console.error("Firebase 寫入失敗: ", err);
        });
    };

    function toFirebaseChildKey(value) {
        return encodeURIComponent(String(value || '').trim().toLowerCase()).replace(/\./g, '%2E');
    }
    window.fbClaimQuizReview = async function(email, quizCode, date) {
        const userKey = toFirebaseChildKey(email);
        const normalizedQuizCode = String(quizCode || '').trim();
        if (!userKey || !normalizedQuizCode || !date) throw new Error('缺少帳號、題庫或日期資料。');
        // 每位使用者每日只有一筆交易，確保跨裝置檢視不同題庫也共用同一額度。
        const reviewRef = ref(db, `system_data/quizReviewUsage/${userKey}`);
        const result = await runTransaction(reviewRef, current => {
            if (current && current.date === date) return;
            return { date, quizCode: normalizedQuizCode, viewedAt: new Date().toISOString() };
        }, { applyLocally: false });
        return { allowed: result.committed, usage: result.snapshot.val() || null };
    };

    const dbRef = ref(db);
    get(child(dbRef, 'system_data')).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            window.initFirebaseData(data);
            if (window.__rmsFeatureData) window.__rmsFeatureData(data || {});
        } else {
            const initialData = {
                users: [],
                verifyCode: '981103970120',
                deviceLogoutCode: '000000',
                publicQuizzes: {},
                quizLimits: {},
                quizCodes: {},
                userQuizLimits: {},
                quizUsage: {},
                quizReviewUsage: {},
                handwritingGrades: {},
                globalApiConfig: { enabled: false, provider: 'gemini', apiKey: '', model: 'gemini-flash-latest', endpoint: '' },
                testHistory: [],
                feedback: [],
                messageBoard: [],
                rmsMail: [],
                contests: [],
                timeGate: { enabled:false, start:'', end:'', message:'' },
                titlesCatalog: [],
                boardSettings: { enabled: true, maxLength: 1000, notice: '', bannedWords: ['髒話', '幹你娘', '操你媽', '廢物'] },
                externalLinks: [],
                adminAudit: []
            };
            set(ref(db, 'system_data'), initialData);
            window.initFirebaseData(initialData);
            if (window.__rmsFeatureData) window.__rmsFeatureData(initialData || {});
        }
    }).catch((error) => {
        console.error("Firebase 讀取失敗，降級使用空資料: ", error);
        window.initFirebaseData(null);
        if (window.__rmsFeatureData) window.__rmsFeatureData({});
    });
