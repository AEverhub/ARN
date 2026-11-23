import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
    import { getDatabase, ref, set, get, child, remove, runTransaction } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

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
    window.fbSaveQuizReviewSession = async function(email, session) {
        const userKey = toFirebaseChildKey(email);
        if (!userKey || !session || !session.code) throw new Error('複習進度資料不完整。');
        await set(ref(db, `system_data/quizReviewSessions/${userKey}`), session);
        return true;
    };
    window.fbClearQuizReviewSession = async function(email) {
        const userKey = toFirebaseChildKey(email);
        if (!userKey) throw new Error('缺少使用者帳號，無法清除複習進度。');
        await remove(ref(db, `system_data/quizReviewSessions/${userKey}`));
        return true;
    };

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

    const POINTS_BANK_DEFAULT = { version: 1, treasuryEmail: '', wallets: {}, purchaseCounts: { accounts: {}, devices: {} }, loanLimits: {}, loans: {}, ledger: {} };
    const pointsBankKey = email => toFirebaseChildKey(email) || '_unknown';
    const roundPoints = value => Math.round((Number(value) + Number.EPSILON) * 100) / 100;
    const cleanPointsBank = current => ({
        ...POINTS_BANK_DEFAULT,
        ...(current && typeof current === 'object' ? current : {}),
        wallets: current?.wallets || {},
        purchaseCounts: { accounts: current?.purchaseCounts?.accounts || {}, devices: current?.purchaseCounts?.devices || {} },
        loanLimits: current?.loanLimits || {},
        loans: current?.loans || {},
        ledger: current?.ledger || {}
    });
    const bankDateKey = () => {
        const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
        const values = {}; parts.forEach(part => { if (part.type !== 'literal') values[part.type] = part.value; });
        return `${values.year}-${values.month}-${values.day}`;
    };
    const newBankId = () => `${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    const newWallet = () => ({ permanent: 0, timedLots: [] });
    const bankWallet = (bank, email) => {
        const key = pointsBankKey(email);
        if (!bank.wallets[key]) bank.wallets[key] = newWallet();
        if (!Array.isArray(bank.wallets[key].timedLots)) bank.wallets[key].timedLots = [];
        bank.wallets[key].permanent = roundPoints(Math.max(0, Number(bank.wallets[key].permanent) || 0));
        return bank.wallets[key];
    };
    const cleanWalletLots = (wallet, now) => {
        wallet.timedLots = wallet.timedLots.filter(lot => Number(lot.amount) > 0.0001 && (!Number(lot.expiresAt) || Number(lot.expiresAt) > now));
        wallet.timedLots.sort((a, b) => (Number(a.expiresAt) || Number.MAX_SAFE_INTEGER) - (Number(b.expiresAt) || Number.MAX_SAFE_INTEGER));
    };
    const walletBalances = (wallet, now) => {
        cleanWalletLots(wallet, now);
        return {
            permanent: roundPoints(wallet.permanent),
            timed: roundPoints(wallet.timedLots.reduce((sum, lot) => sum + Number(lot.amount || 0), 0))
        };
    };
    const walletTotal = (wallet, now) => {
        const balances = walletBalances(wallet, now);
        return roundPoints(balances.permanent + balances.timed);
    };
    const addLedger = (bank, record, now) => {
        const id = newBankId();
        bank.ledger[id] = { id, at: now, ...record };
        return id;
    };
    const creditPermanent = (wallet, amount) => { wallet.permanent = roundPoints(wallet.permanent + Number(amount || 0)); };
    const creditTimed = (wallet, amount, expiresAt, source, now) => {
        const value = roundPoints(Number(amount) || 0);
        if (value <= 0) return null;
        const lot = { id: newBankId(), amount: value, expiresAt: Number(expiresAt) || null, createdAt: now, source: String(source || '') };
        wallet.timedLots.push(lot);
        wallet.timedLots.sort((a, b) => (Number(a.expiresAt) || Number.MAX_SAFE_INTEGER) - (Number(b.expiresAt) || Number.MAX_SAFE_INTEGER));
        return lot;
    };
    const deductTimed = (wallet, amount, now) => {
        cleanWalletLots(wallet, now);
        let remaining = roundPoints(amount);
        const used = [];
        for (const lot of wallet.timedLots) {
            if (remaining <= 0.0001) break;
            const take = roundPoints(Math.min(Number(lot.amount), remaining));
            if (take <= 0) continue;
            lot.amount = roundPoints(Number(lot.amount) - take);
            remaining = roundPoints(remaining - take);
            used.push({ type: 'timed', amount: take, expiresAt: Number(lot.expiresAt) || null });
        }
        cleanWalletLots(wallet, now);
        return { paid: roundPoints(amount - Math.max(0, remaining)), remaining, used };
    };
    const deductWallet = (wallet, amount, now, policy = 'timed-first') => {
        const requested = roundPoints(amount);
        const balances = walletBalances(wallet, now);
        if (roundPoints(balances.permanent + balances.timed) + 0.0001 < requested) return { ok: false, balance: roundPoints(balances.permanent + balances.timed), used: [] };
        let remaining = requested;
        const used = [];
        if (policy !== 'permanent-only') {
            const timed = deductTimed(wallet, remaining, now);
            used.push(...timed.used);
            remaining = timed.remaining;
        }
        if (remaining > 0.0001 && policy !== 'timed-only') {
            const take = roundPoints(Math.min(wallet.permanent, remaining));
            wallet.permanent = roundPoints(wallet.permanent - take);
            remaining = roundPoints(remaining - take);
            if (take > 0) used.push({ type: 'permanent', amount: take, expiresAt: null });
        }
        return { ok: remaining <= 0.0001, balance: roundPoints(balances.permanent + balances.timed), used };
    };
    const outstandingLoans = (bank, email) => Object.values(bank.loans).filter(loan => pointsBankKey(loan.userEmail) === pointsBankKey(email) && Number(loan.remainingPrincipal || 0) + Number(loan.remainingFee || 0) > 0.0001 && loan.status !== 'paid');
    const loanDebt = loan => roundPoints(Number(loan.remainingPrincipal || 0) + Number(loan.remainingFee || 0));
    const applyLoanRepayment = (bank, email, amount, now, reason, timedOnly = false) => {
        const wallet = bankWallet(bank, email);
        let available = roundPoints(amount);
        let paidTotal = 0;
        const loans = outstandingLoans(bank, email).sort((a, b) => Number(a.dueAt) - Number(b.dueAt));
        for (const loan of loans) {
            if (available <= 0.0001) break;
            const due = loanDebt(loan);
            const payment = roundPoints(Math.min(due, available));
            let actual = 0;
            let usedParts = [];
            if (timedOnly) {
                const timedDebit = deductTimed(wallet, payment, now);
                actual = timedDebit.paid;
                usedParts = timedDebit.used;
            } else {
                const timedDebit = deductTimed(wallet, payment, now);
                usedParts = timedDebit.used.slice();
                let remaining = timedDebit.remaining;
                const permanentDebit = roundPoints(Math.min(wallet.permanent, remaining));
                wallet.permanent = roundPoints(wallet.permanent - permanentDebit);
                remaining = roundPoints(remaining - permanentDebit);
                actual = roundPoints(payment - remaining);
                if (permanentDebit > 0) usedParts.push({ type: 'permanent', amount: permanentDebit, expiresAt: null });
            }
            if (actual <= 0) break;
            let left = roundPoints(actual);
            const principalPaid = roundPoints(Math.min(Number(loan.remainingPrincipal || 0), left));
            loan.remainingPrincipal = roundPoints(Number(loan.remainingPrincipal || 0) - principalPaid);
            left = roundPoints(left - principalPaid);
            loan.remainingFee = roundPoints(Math.max(0, Number(loan.remainingFee || 0) - left));
            available = roundPoints(available - actual);
            paidTotal = roundPoints(paidTotal + actual);
            loan.updatedAt = now;
            if (loanDebt(loan) <= 0.0001) { loan.remainingPrincipal = 0; loan.remainingFee = 0; loan.status = 'paid'; loan.paidAt = now; }
            else if (Number(loan.dueAt) <= now) loan.status = 'overdue';
            creditPermanent(bankWallet(bank, bank.treasuryEmail), actual);
            addLedger(bank, { type: 'loan_repayment', userEmail: email, loanId: loan.id, amount: actual, parts: usedParts, reason: reason || '積分自動還款' }, now);
        }
        return roundPoints(paidTotal);
    };
    const autoRepayFromTimed = (bank, email, amount, now, reason) => applyLoanRepayment(bank, email, amount, now, reason, true);
    const settleDueLoans = (bank, email, now) => {
        bankWallet(bank, email);
        const dueLoans = outstandingLoans(bank, email).filter(loan => Number(loan.dueAt) <= now).sort((a, b) => Number(a.dueAt) - Number(b.dueAt));
        for (const loan of dueLoans) {
            const due = loanDebt(loan);
            if (due <= 0.0001) continue;
            applyLoanRepayment(bank, email, due, now, '到期自動扣款');
            if (loanDebt(loan) > 0.0001) loan.status = 'overdue';
        }
    };
    const createBankLoan = (bank, email, amount, now, loanReason = '用於題庫或複習的急難救助積分') => {
        const principal = roundPoints(Number(amount) || 0);
        if (principal <= 0) return { ok: false, reason: 'invalid_amount' };
        settleDueLoans(bank, email, now);
        const loans = outstandingLoans(bank, email);
        if (loans.some(loan => loan.status === 'overdue' || Number(loan.dueAt) <= now)) return { ok: false, reason: 'overdue' };
        const limit = roundPoints(Number(bank.loanLimits[pointsBankKey(email)]) || 0);
        const principalOutstanding = roundPoints(loans.reduce((sum, loan) => sum + Number(loan.remainingPrincipal || 0), 0));
        if (limit <= 0 || principal + principalOutstanding > limit + 0.0001) return { ok: false, reason: 'limit', limit, principalOutstanding };
        const fee = roundPoints(principal * 0.05);
        const id = newBankId();
        bank.loans[id] = {
            id, userEmail: email, principal, fee, remainingPrincipal: principal, remainingFee: fee,
            createdAt: now, dueAt: now + 30 * 24 * 60 * 60 * 1000, status: 'active', reason: loanReason
        };
        creditPermanent(bankWallet(bank, email), principal);
        addLedger(bank, { type: 'loan_issued', userEmail: email, loanId: id, amount: principal, fee, dueAt: bank.loans[id].dueAt, reason: loanReason }, now);
        return { ok: true, loan: bank.loans[id] };
    };
    const purchaseStats = (bank, email, deviceId, key, today) => {
        const account = bank.purchaseCounts.accounts[pointsBankKey(email)]?.[key] || {};
        const device = bank.purchaseCounts.devices[String(deviceId || '_no_device')]?.[key] || {};
        return {
            accountDaily: account.dailyDate === today ? Number(account.dailyCount || 0) : 0,
            deviceDaily: device.dailyDate === today ? Number(device.dailyCount || 0) : 0,
            accountGlobal: Number(account.globalCount || 0),
            deviceGlobal: Number(device.globalCount || 0)
        };
    };
    const setPurchaseStats = (bank, email, deviceId, key, today, stats) => {
        const accountKey = pointsBankKey(email);
        const deviceKey = String(deviceId || '_no_device');
        bank.purchaseCounts.accounts[accountKey] ||= {};
        bank.purchaseCounts.devices[deviceKey] ||= {};
        bank.purchaseCounts.accounts[accountKey][key] = { dailyDate: today, dailyCount: stats.accountDaily + 1, globalCount: stats.accountGlobal + 1 };
        bank.purchaseCounts.devices[deviceKey][key] = { dailyDate: today, dailyCount: stats.deviceDaily + 1, globalCount: stats.deviceGlobal + 1 };
    };
    const doPointsAction = (bank, action, payload, now) => {
        const email = String(payload.email || '').trim();
        if (action === 'setTreasury') {
            const adminEmail = String(payload.actorEmail || '').trim();
            if (payload.actorRole !== 'admin' || !adminEmail) return { ok: false, reason: 'not_admin' };
            bank.treasuryEmail = adminEmail;
            bankWallet(bank, bank.treasuryEmail);
            return { ok: true, changed: true };
        }
        if (!bank.treasuryEmail) return { ok: false, reason: 'treasury_not_configured' };
        if (email) settleDueLoans(bank, email, now);
        if (action === 'refresh') return { ok: true, changed: true };
        if (action === 'buy') {
            if (!email) return { ok: false, reason: 'missing_user' };
            if (payload.actorRole === 'admin') return { ok: true, changed: false, cost: 0, adminBypass: true };
            const code = String(payload.code || '').trim();
            const kind = payload.kind === 'review' ? 'review' : 'quiz';
            const key = kind === 'review' ? '__daily_review__' : code;
            if (!key || key === 'undefined') return { ok: false, reason: 'missing_code' };
            const mode = kind === 'review' ? 'time' : (payload.limit?.mode || 'time');
            const max = Math.max(1, parseInt(kind === 'review' ? 1 : payload.limit?.count, 10) || (kind === 'review' ? 1 : 10));
            const base = roundPoints(Math.max(0.01, Number(payload.basePrice) || 10) * (kind === 'review' ? 2 : 1));
            const today = bankDateKey();
            const stats = purchaseStats(bank, email, payload.deviceId, key, today);
            let cost = base;
            const capType = mode === 'global' ? 'global' : 'daily';
            if (mode === 'global' && (stats.accountGlobal >= max || stats.deviceGlobal >= max)) {
                return { ok: false, changed: false, reason: stats.accountGlobal >= max ? 'account_global_limit' : 'device_global_limit', stats, max };
            }
            if (mode === 'time' && Math.max(stats.accountDaily, stats.deviceDaily) >= max) {
                const over = Math.max(1, Math.max(stats.accountDaily, stats.deviceDaily) - max + 1);
                const multiplier = Math.pow(10, Math.min(over, 15));
                cost = roundPoints(Math.min(Number.MAX_SAFE_INTEGER, base * multiplier));
            }
            if (payload.expectedCost !== undefined && Math.abs(roundPoints(Number(payload.expectedCost)) - cost) > 0.001) {
                return { ok: false, changed: false, reason: 'price_changed', cost, stats, max };
            }
            const wallet = bankWallet(bank, email);
            const balance = walletTotal(wallet, now);
            let borrowed = 0;
            if (balance + 0.0001 < cost && payload.acceptLoan === true) {
                borrowed = roundPoints(cost - balance);
                if (payload.approvedLoanAmount !== undefined && borrowed > roundPoints(Number(payload.approvedLoanAmount)) + 0.0001) {
                    return { ok: false, changed: false, reason: 'loan_amount_changed', cost, balance, shortfall: borrowed, stats, max };
                }
                const loan = createBankLoan(bank, email, borrowed, now, `購買${kind === 'review' ? '題庫複習' : '題庫作答'} ${code}`);
                if (!loan.ok) return { ok: false, changed: false, reason: loan.reason === 'limit' ? 'loan_limit' : loan.reason, cost, balance, shortfall: borrowed, loanLimit: loan.limit || 0, principalOutstanding: loan.principalOutstanding || 0 };
            }
            const balanceAfterLoan = walletTotal(wallet, now);
            if (balanceAfterLoan + 0.0001 < cost) return { ok: false, changed: false, reason: 'insufficient', cost, balance: balanceAfterLoan, shortfall: roundPoints(cost - balanceAfterLoan), stats, max };
            const debit = deductWallet(wallet, cost, now);
            if (!debit.ok) return { ok: false, changed: false, reason: 'insufficient', cost, balance: debit.balance, shortfall: roundPoints(cost - debit.balance), stats, max };
            const treasury = bankWallet(bank, bank.treasuryEmail);
            debit.used.forEach(part => {
                if (part.type === 'timed') creditTimed(treasury, part.amount, part.expiresAt, 'quiz_purchase', now);
                else creditPermanent(treasury, part.amount);
            });
            setPurchaseStats(bank, email, payload.deviceId, key, today, stats);
            addLedger(bank, { type: 'purchase', userEmail: email, quizCode: code, purchaseKind: kind, amount: cost, parts: debit.used, basePrice: base, overLimit: cost > base, deviceId: String(payload.deviceId || ''), loanAmount: borrowed }, now);
            return { ok: true, changed: true, cost, balance: walletTotal(wallet, now), borrowed, stats, max, capType };
        }
        if (action === 'transfer') {
            const toEmail = String(payload.toEmail || '').trim();
            const amount = roundPoints(Number(payload.amount) || 0);
            if (!email || !toEmail || pointsBankKey(email) === pointsBankKey(toEmail)) return { ok: false, reason: 'invalid_recipient' };
            if (amount <= 0) return { ok: false, reason: 'invalid_amount' };
            settleDueLoans(bank, toEmail, now);
            const sender = bankWallet(bank, email);
            const receiver = bankWallet(bank, toEmail);
            const debit = deductWallet(sender, amount, now);
            if (!debit.ok) return { ok: false, reason: 'insufficient', balance: debit.balance, shortfall: roundPoints(amount - debit.balance) };
            debit.used.forEach(part => {
                if (part.type === 'timed') creditTimed(receiver, part.amount, part.expiresAt, `transfer:${email}`, now);
                else creditPermanent(receiver, part.amount);
            });
            const timedTransferred = roundPoints(debit.used.filter(part => part.type === 'timed').reduce((sum, part) => sum + part.amount, 0));
            if (timedTransferred > 0) autoRepayFromTimed(bank, toEmail, timedTransferred, now, '收到轉帳限時積分後自動還款');
            settleDueLoans(bank, toEmail, now);
            addLedger(bank, { type: 'transfer', fromEmail: email, toEmail, amount, parts: debit.used }, now);
            return { ok: true, changed: true, amount, balance: walletTotal(sender, now) };
        }
        if (action === 'loan') {
            if (payload.actorRole === 'admin') return { ok: false, reason: 'admin_loan_not_needed' };
            const result = createBankLoan(bank, email, payload.amount, now, '使用者申請積分銀行急難救助');
            if (!result.ok) return { ok: false, reason: result.reason, loanLimit: result.limit || 0, principalOutstanding: result.principalOutstanding || 0 };
            return { ok: true, changed: true, loan: result.loan, balance: walletTotal(bankWallet(bank, email), now) };
        }
        if (action === 'adminGrant') {
            if (payload.actorRole !== 'admin') return { ok: false, reason: 'not_admin' };
            const recipients = Array.from(new Set((payload.recipients || []).map(value => String(value || '').trim()).filter(Boolean)));
            const amount = roundPoints(Number(payload.amount) || 0);
            const type = payload.pointType === 'timed' ? 'timed' : 'permanent';
            const expiry = Number(payload.expiresAt) || null;
            if (!recipients.length || amount <= 0 || (type === 'timed' && (!expiry || expiry <= now))) return { ok: false, reason: 'invalid_grant' };
            recipients.forEach(recipient => {
                settleDueLoans(bank, recipient, now);
                const wallet = bankWallet(bank, recipient);
                if (type === 'timed') {
                    creditTimed(wallet, amount, expiry, `admin_grant:${payload.actorEmail}`, now);
                    autoRepayFromTimed(bank, recipient, amount, now, '收到管理員限時積分後自動還款');
                } else creditPermanent(wallet, amount);
                settleDueLoans(bank, recipient, now);
                addLedger(bank, { type: 'grant', actorEmail: String(payload.actorEmail || ''), userEmail: recipient, pointType: type, amount, expiresAt: expiry, reason: String(payload.reason || '').trim() }, now);
            });
            return { ok: true, changed: true, recipients: recipients.length };
        }
        if (action === 'adminDeduct') {
            if (payload.actorRole !== 'admin') return { ok: false, reason: 'not_admin' };
            const targetEmail = String(payload.targetEmail || '').trim();
            const amount = roundPoints(Number(payload.amount) || 0);
            const wallet = bankWallet(bank, targetEmail);
            if (!targetEmail || amount <= 0) return { ok: false, reason: 'invalid_amount' };
            const policy = payload.pointType === 'permanent' ? 'permanent-only' : payload.pointType === 'timed' ? 'timed-only' : 'timed-first';
            const debit = deductWallet(wallet, amount, now, policy);
            if (!debit.ok) return { ok: false, reason: 'insufficient', balance: debit.balance };
            addLedger(bank, { type: 'admin_deduct', actorEmail: String(payload.actorEmail || ''), userEmail: targetEmail, amount, parts: debit.used, reason: String(payload.reason || '').trim() }, now);
            return { ok: true, changed: true, balance: walletTotal(wallet, now) };
        }
        if (action === 'setLoanLimit') {
            if (payload.actorRole !== 'admin') return { ok: false, reason: 'not_admin' };
            const targetEmail = String(payload.targetEmail || '').trim();
            const limit = roundPoints(Math.max(0, Number(payload.limit) || 0));
            if (!targetEmail) return { ok: false, reason: 'missing_user' };
            bank.loanLimits[pointsBankKey(targetEmail)] = limit;
            addLedger(bank, { type: 'loan_limit', actorEmail: String(payload.actorEmail || ''), userEmail: targetEmail, amount: limit, reason: String(payload.reason || '').trim() }, now);
            return { ok: true, changed: true, limit };
        }
        return { ok: false, reason: 'unknown_action' };
    };

    window.fbPointsBankAction = async function(action, payload = {}) {
        const bankRef = ref(db, 'system_data/pointsBank');
        let outcome = { ok: false, reason: 'transaction_not_committed' };
        const now = Date.now();
        const result = await runTransaction(bankRef, current => {
            const bank = cleanPointsBank(current);
            const beforeAction = JSON.stringify(bank);
            outcome = doPointsAction(bank, action, payload, now);
            const stateChanged = JSON.stringify(bank) !== beforeAction;
            if (!outcome.ok && !stateChanged) return;
            if (!outcome.changed && action !== 'refresh' && !stateChanged) return;
            return bank;
        }, { applyLocally: false });
        const state = cleanPointsBank(result.snapshot.val());
        return { ...outcome, committed: result.committed, state };
    };

    const dbRef = ref(db);
    get(child(dbRef, 'system_data')).then(async (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const adminAccount = Array.isArray(data.users) ? data.users.find(user => user && user.role === 'admin' && user.email) : null;
            if (adminAccount && !data.pointsBank?.treasuryEmail) {
                try {
                    const treasuryResult = await window.fbPointsBankAction('setTreasury', { actorRole: 'admin', actorEmail: adminAccount.email });
                    if (treasuryResult?.state) data.pointsBank = treasuryResult.state;
                } catch (error) { console.warn('積分銀行管理員帳戶自動同步略過：', error); }
            }
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
                pointsBank: POINTS_BANK_DEFAULT,
                quizReviewUsage: {},
                quizReviewSessions: {},
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
