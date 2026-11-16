function updateTaipeiClock() {
        const now = new Date();
        const options = { timeZone: 'Asia/Taipei', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 };
        const formatter = new Intl.DateTimeFormat('zh-TW', options);
        const parts = formatter.formatToParts(now);
        let year='', month='', day='', hour='', minute='', second='', millisecond='000';
        parts.forEach(p => {
            if (p.type === 'year') year = p.value;
            if (p.type === 'month') month = p.value;
            if (p.type === 'day') day = p.value;
            if (p.type === 'hour') hour = p.value;
            if (p.type === 'minute') minute = p.value;
            if (p.type === 'second') second = p.value;
            if (p.type === 'fractionalSecond') millisecond = p.value;
        });
        const mobileClock = window.matchMedia && window.matchMedia('(max-width: 600px)').matches;
        const clockText = mobileClock
            ? `台北時間: ${hour}:${minute}:${second}`
            : `台北時間: ${year}/${month}/${day} ${hour}:${minute}:${second}.${millisecond} (GMT+8)`;
        document.getElementById('taipei-clock').innerHTML = `<span>${clockText}</span>`;
    }
    setInterval(updateTaipeiClock, 47);
    updateTaipeiClock();

    let currentUser = null;
    let globalUsersDB = [];
    let systemVerifyCode = '981103970120';
    let deviceLogoutCode = '000000';
    let authMode = 'login';
    let pendingQuizCode = '';
    let pendingQuizFromPublic = false;
    // 目前載入中的題庫腳本完整網址；題目 image 路徑以此腳本所在資料夾為基準。
    let currentQuizScriptUrl = '';
    let quizEntryCountdownTimer = null;
    let publicQuizzesMap = {};
    let quizLimitsMap = {};
    let quizCodesMap = {};
    let userQuizLimitsMap = {};
    let quizUsageMap = {};
    let quizAttemptCounted = false;
    let testHistoryRecords = [];
    let feedbackDB = [];
    let globalApiConfig = {};
    let quizMetadataCache = {};
    let quizMetadataLoadPromises = {};

    function defaultApiConfig() {
        return { enabled: false, provider: 'gemini', apiKey: '', model: 'gemini-flash-latest', endpoint: '' };
    }

    function readLocalApiConfig() {
        try { return { ...defaultApiConfig(), ...(JSON.parse(localStorage.getItem('rms_local_api_config') || '{}')) }; }
        catch (e) { return defaultApiConfig(); }
    }

    function getEffectiveApiConfig() {
        const local = readLocalApiConfig();
        const global = { ...defaultApiConfig(), ...(globalApiConfig || {}) };
        if (local.enabled && local.apiKey) return { ...local, source: 'local' };
        if (global.enabled && global.apiKey) return { ...global, source: 'global' };
        return { ...local, source: 'none' };
    }

    function updateApiProviderFields(scope) {
        const provider = document.getElementById(`${scope}-api-provider`).value;
        const model = document.getElementById(`${scope}-api-model`);
        const endpoint = document.getElementById(`${scope}-api-endpoint`);
        if (provider === 'gemini') {
            model.placeholder = '模型，例如 gemini-flash-latest';
            endpoint.placeholder = 'Gemini 不需要填端點';
        } else {
            model.placeholder = '模型，例如 gpt-4o-mini';
            endpoint.placeholder = 'https://api.openai.com/v1/chat/completions';
        }
    }

    function openLocalApiModal() {
        const cfg = readLocalApiConfig();
        document.getElementById('local-api-provider').value = cfg.provider;
        document.getElementById('local-api-key').value = cfg.apiKey;
        document.getElementById('local-api-model').value = cfg.model;
        document.getElementById('local-api-endpoint').value = cfg.endpoint;
        document.getElementById('local-api-enabled').checked = !!cfg.enabled;
        const status = document.getElementById('local-api-status');
        status.innerText = cfg.lastTestOk === false ? `API 無法使用：${cfg.lastTestError || '請重新測試或更新 API'}` : (cfg.lastTestOk ? 'API 測試成功，可使用。' : '尚未測試 API。');
        status.style.color = cfg.lastTestOk === false ? '#dc2626' : '#16a34a';
        updateApiProviderFields('local');
        document.getElementById('local-api-modal').classList.remove('hidden');
    }

    function closeLocalApiModal() { document.getElementById('local-api-modal').classList.add('hidden'); }

    function collectApiConfig(scope) {
        return {
            enabled: document.getElementById(`${scope}-api-enabled`).checked,
            provider: document.getElementById(`${scope}-api-provider`).value,
            apiKey: document.getElementById(`${scope}-api-key`).value.trim(),
            model: document.getElementById(`${scope}-api-model`).value.trim(),
            endpoint: document.getElementById(`${scope}-api-endpoint`).value.trim()
        };
    }

    async function saveLocalApiConfig() {
        const cfg = collectApiConfig('local');
        if (cfg.enabled && !cfg.apiKey) return alert('啟用本地 API 時必須輸入 API Key。');
        cfg.lastTestOk = false;
        cfg.lastTestError = '正在測試 API...';
        localStorage.setItem('rms_local_api_config', JSON.stringify(cfg));
        const status = document.getElementById('local-api-status');
        status.innerText = '正在測試 API...'; status.style.color = '#d97706';
        if (!cfg.enabled) {
            closeLocalApiModal();
            return alert('本地 API 已停用；選擇題仍可正常使用。');
        }
        try {
            if (window.testLocalApiConfig) await window.testLocalApiConfig(cfg);
            cfg.lastTestOk = true;
            cfg.lastTestError = '';
        } catch (error) {
            cfg.lastTestOk = false;
            cfg.lastTestError = error.message || 'API 無法使用';
        }
        localStorage.setItem('rms_local_api_config', JSON.stringify(cfg));
        if (cfg.lastTestOk) {
            closeLocalApiModal();
            alert('本地 API 測試成功，之後 AI 批改會使用此 API。');
        } else {
            status.innerText = `API 無法使用：${cfg.lastTestError}`;
            status.style.color = '#dc2626';
        }
    }

    function clearLocalApiConfig() {
        localStorage.removeItem('rms_local_api_config');
        closeLocalApiModal();
        alert('本地 API 設定已清除；選擇題仍可正常使用，主觀題需重新設定 API。');
    }

    window.initFirebaseData = function(data) {
        let cachedPublicQuizzes = {};
        try { cachedPublicQuizzes = JSON.parse(localStorage.getItem('rms_public_quizzes_cache') || '{}'); } catch (e) {}
        if (data) {
            globalUsersDB = data.users || [];
            systemVerifyCode = data.verifyCode || '981103970120';
            deviceLogoutCode = data.deviceLogoutCode || '000000';
            publicQuizzesMap = data.publicQuizzes || {};
            quizLimitsMap = data.quizLimits || {};
            quizCodesMap = data.quizCodes || {};
            userQuizLimitsMap = data.userQuizLimits || {};
            quizUsageMap = data.quizUsage || {};
            testHistoryRecords = data.testHistory || [];
            feedbackDB = data.feedback || [];
            globalApiConfig = { ...defaultApiConfig(), ...(data.globalApiConfig || {}) };
        } else {
            publicQuizzesMap = cachedPublicQuizzes;
        }
        try { localStorage.setItem('rms_public_quizzes_cache', JSON.stringify(publicQuizzesMap)); } catch (e) {}
        refreshQuizCodeOptions();
        checkAutoLogin();
        if (currentUser && !currentUser.disabled) renderPublicQuizzesList();
    };

    function refreshQuizCodeOptions() {
        const list = document.getElementById('quiz-code-options');
        if (!list) return;
        const codes = new Set([
            ...Object.keys(quizCodesMap || {}),
            ...Object.keys(publicQuizzesMap || {}),
            ...Object.keys(quizLimitsMap || {})
        ]);
        list.innerHTML = '';
        Array.from(codes).filter(Boolean).sort().forEach(code => {
            const option = document.createElement('option');
            option.value = code;
            list.appendChild(option);
        });
    }

    function rememberQuizCode(code) {
        code = String(code || '').trim();
        if (!code) return;
        if (!quizCodesMap[code]) {
            quizCodesMap[code] = true;
            saveToFirebase('quizCodes', quizCodesMap);
        }
        refreshQuizCodeOptions();
    }

    function saveToFirebase(path, value) {
        if (window.fbSetData) {
            window.fbSetData(path, value);
        }
    }

    function checkAutoLogin() {
        const registeredEmail = localStorage.getItem('rms_device_registered');
        if (registeredEmail) {
            const foundUser = globalUsersDB.find(u => u.email === registeredEmail);
            if (foundUser) {
                currentUser = foundUser;
                postLoginSetup();
            }
        }
    }

    function toggleMenu() {
        const menu = document.getElementById('dropdown-menu');
        menu.classList.toggle('show');
    }
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.menu-container')) {
            document.getElementById('dropdown-menu').classList.remove('show');
        }
    });

    function setAuthMode(mode) {
        authMode = mode === 'register' ? 'register' : 'login';
        const isRegister = authMode === 'register';
        document.getElementById('auth-login-tab').classList.toggle('active', !isRegister);
        document.getElementById('auth-register-tab').classList.toggle('active', isRegister);
        document.getElementById('auth-login-tab').setAttribute('aria-selected', String(!isRegister));
        document.getElementById('auth-register-tab').setAttribute('aria-selected', String(isRegister));
        document.getElementById('auth-title').innerText = isRegister ? '建立帳號' : '歡迎回來';
        document.getElementById('auth-subtitle').textContent = isRegister ? '建立帳號後即可選擇題庫並開始測驗' : '登入後即可選擇題庫並開始測驗';
        document.getElementById('auth-submit-btn').textContent = isRegister ? '建立帳號並登入' : '登入';
        document.getElementById('auth-email').placeholder = '輸入站內 UID 或電子郵件';
        document.getElementById('auth-pass').autocomplete = isRegister ? 'new-password' : 'current-password';
        document.getElementById('register-extra-fields').classList.toggle('hidden', !isRegister);
        const needsCode = isRegister && !!localStorage.getItem('rms_device_registered');
        document.getElementById('verification-code-area').classList.toggle('hidden', !needsCode);
        checkAuthUnlock();
    }

    const authEmailInput = document.getElementById('auth-email');
    authEmailInput.addEventListener('input', () => {
        if (authMode === 'register') {
            const needsCode = !!localStorage.getItem('rms_device_registered');
            document.getElementById('verification-code-area').classList.toggle('hidden', !needsCode);
        }
        checkAuthUnlock();
    });

    document.getElementById('agree-terms').addEventListener('change', checkAuthUnlock);
    document.getElementById('auth-pass').addEventListener('input', checkAuthUnlock);
    document.getElementById('auth-pass-toggle')?.addEventListener('click', () => {
        const input = document.getElementById('auth-pass');
        const reveal = input.type === 'password';
        input.type = reveal ? 'text' : 'password';
        document.getElementById('auth-pass-toggle').textContent = reveal ? '隱藏' : '顯示';
        document.getElementById('auth-pass-toggle').setAttribute('aria-pressed', String(reveal));
        document.getElementById('auth-pass-toggle').setAttribute('aria-label', reveal ? '隱藏密碼' : '顯示密碼');
    });
    document.getElementById('auth-form')?.addEventListener('submit', event => {
        event.preventDefault();
        if (!document.getElementById('auth-submit-btn').disabled) handleAuthSubmit();
    });
    setAuthMode('login');

    function checkAuthUnlock() {
        const agreed = document.getElementById('agree-terms').checked;
        const email = document.getElementById('auth-email').value.trim();
        const pass = document.getElementById('auth-pass').value.trim();
        const name = document.getElementById('auth-name')?.value.trim() || '';
        const needsCode = authMode === 'register' && !!localStorage.getItem('rms_device_registered');
        const verifyCode = document.getElementById('auth-verify-code')?.value.trim() || '';
        const btn = document.getElementById('auth-submit-btn');
        if(agreed && email && pass && (authMode !== 'register' || (name && (!needsCode || verifyCode)))) {
            btn.disabled = false;
            btn.style.background = "var(--accent)";
            btn.style.color = "#ffffff";
        } else {
            btn.disabled = true;
            btn.style.background = "#cbd5e1";
            btn.style.color = "#64748b";
        }
    }

    function handleAuthSubmit() {
        const email = document.getElementById('auth-email').value.trim();
        const pass = document.getElementById('auth-pass').value.trim();
        const nameInput = document.getElementById('auth-name').value.trim();
        const verifyInput = document.getElementById('auth-verify-code').value.trim();
        if (!email || !pass) return alert('請填寫完整信箱與密碼！');
        const existing = globalUsersDB.find(u => u.email === email);
        if (authMode === 'register') {
            if (localStorage.getItem('rms_device_registered') && verifyInput !== systemVerifyCode) return alert('此設備已有註冊紀錄，請輸入管理員設定的重複註冊許可碼！');
            if (existing) return alert('此信箱已經註冊，請切換至登入。');
            if (!nameInput) return alert('註冊時請填寫考生姓名！');
            const user = { email, pass, name: nameInput, role:'user', disabled:false, banReason:'', isNameLocked:false };
            globalUsersDB.push(user);
            saveToFirebase('users', globalUsersDB);
            currentUser = user;
        } else {
            if (!existing) return alert('查無此帳號，請先切換至註冊。');
            if (existing.pass !== pass) return alert('密碼錯誤！');
            currentUser = existing;
        }
        localStorage.setItem('rms_device_registered', email);
        if (currentUser.disabled && currentUser.role !== 'admin') {
            alert('注意：您的帳號目前處於遭到停用狀態！');
            switchView('chat');
        } else {
            postLoginSetup();
        }
    }

    function postLoginSetup() {
        document.getElementById('login-screen').classList.add('hidden');
        if (currentUser && currentUser.disabled && currentUser.role !== 'admin') {
            switchView('chat');
            return;
        }
        document.getElementById('quiz-entry-area').classList.remove('hidden');

        const menuAdminItem = document.getElementById('menu-admin-item');
        if (currentUser && currentUser.role === 'admin') {
            menuAdminItem.style.display = 'block';
        } else {
            menuAdminItem.style.display = 'none';
        }

        renderPublicQuizzesList();
    }

    function openLogoutModal() {
        document.getElementById('dropdown-menu').classList.remove('show');
        if (!currentUser) return alert("目前尚未登入！");
        document.getElementById('logout-modal-email').innerText = currentUser.email;
        document.getElementById('logout-password-input').value = '';
        document.getElementById('logout-modal').classList.remove('hidden');
    }

    function closeLogoutModal() {
        document.getElementById('logout-modal').classList.add('hidden');
    }

    function confirmLogout() {
        const pass = document.getElementById('logout-password-input').value.trim();
        if (!pass) return alert("請輸入密碼！");
        if (pass !== deviceLogoutCode) return alert('設備登出許可碼錯誤，無法登出！');

        currentUser = null;
        localStorage.removeItem('rms_device_registered');
        closeLogoutModal();

        document.getElementById('quiz-entry-area').classList.add('hidden');
        document.getElementById('quiz-ui').classList.add('hidden');
        document.getElementById('result-screen').classList.add('hidden');
        document.getElementById('account-screen').classList.add('hidden');
        document.getElementById('chat-screen').classList.add('hidden');
        document.getElementById('mail-screen')?.classList.add('hidden');
        document.getElementById('contest-screen')?.classList.add('hidden');
        document.getElementById('admin-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('auth-email').value = '';
        document.getElementById('auth-pass').value = '';
        document.getElementById('agree-terms').checked = false;
        checkAuthUnlock();

        alert("已成功安全登出！");
    }

    function switchView(viewName) {
        document.getElementById('dropdown-menu').classList.remove('show');

        if (quizActive && viewName !== 'quiz') {
            if (!confirm("測驗進行中，切換畫面將中斷當前作答或視為放棄，是否繼續？")) return;
            quizActive = false;
            clearInterval(timerInterval);
            exitFullScreen();
            setMenuDisabledState(false);
        }

        if (currentUser && currentUser.disabled && viewName !== 'chat' && currentUser.role !== 'admin') {
            alert("您的帳戶遭到停用，目前僅開放問題反饋與帳號申訴系統！");
            viewName = 'chat';
        }

        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('quiz-entry-area').classList.add('hidden');
        document.getElementById('quiz-ui').classList.add('hidden');
        document.getElementById('result-screen').classList.add('hidden');
        document.getElementById('account-screen').classList.add('hidden');
        document.getElementById('chat-screen').classList.add('hidden');
        document.getElementById('admin-screen').classList.add('hidden');

        if (viewName === 'login') {
            if (currentUser) {
                if (currentUser.disabled && currentUser.role !== 'admin') {
                    switchView('chat');
                } else {
                    document.getElementById('quiz-entry-area').classList.remove('hidden');
                }
            } else {
                document.getElementById('login-screen').classList.remove('hidden');
            }
        } else if (viewName === 'account') {
            document.getElementById('account-screen').classList.remove('hidden');
            document.getElementById('acc-email-display').innerText = currentUser ? currentUser.email : '未登入';
            document.getElementById('acc-name-display').innerText = currentUser ? currentUser.name : '尚未設定';
            document.getElementById('acc-total-tests').innerText = localStorage.getItem('total_tests_run') || '0';

            const nameInput = document.getElementById('acc-name-input');
            const nameBtn = document.getElementById('update-name-btn');
            const lockHint = document.getElementById('name-lock-hint');
            nameInput.value = currentUser ? currentUser.name : '';

            if (currentUser && currentUser.isNameLocked) {
                nameInput.disabled = true;
                nameBtn.disabled = true;
                nameBtn.style.opacity = "0.5";
                lockHint.style.display = "block";
            } else {
                nameInput.disabled = false;
                nameBtn.disabled = false;
                nameBtn.style.opacity = "1";
                lockHint.style.display = "none";
            }

        } else if (viewName === 'chat') {
            document.getElementById('chat-screen').classList.remove('hidden');
            setupFeedbackSystemView();
        } else if (viewName === 'admin') {
            if (!currentUser || currentUser.role !== 'admin') {
                alert("您無權訪問管理面板！");
                switchView('login');
                return;
            }
            document.getElementById('admin-screen').classList.remove('hidden');
            setupAdminConsole();
            updateAdminStats();
        }
    }

    function updateUserName() {
        if (!currentUser) return;
        if (currentUser.isNameLocked) {
            return alert("您的名字已被管理員鎖定，無法修改！");
        }
        const newName = document.getElementById('acc-name-input').value.trim();
        if (!newName) return alert("姓名不得為空！");

        currentUser.name = newName;
        const dbUser = globalUsersDB.find(u => u.email === currentUser.email);
        if (dbUser) {
            dbUser.name = newName;
            saveToFirebase('users', globalUsersDB);
        }
        document.getElementById('acc-name-display').innerText = newName;
        alert("個人姓名更新成功！");
    }

    function setupFeedbackSystemView() {
        const normalView = document.getElementById('normal-feedback-view');
        const bannedView = document.getElementById('banned-appeal-view');
        const adminChatView = document.getElementById('admin-chat-view');

        if (currentUser && currentUser.role === 'admin') {
            normalView.classList.add('hidden');
            bannedView.classList.add('hidden');
            adminChatView.classList.remove('hidden');
            renderAdminChatFeedbackList();
        } else if (currentUser && currentUser.disabled) {
            normalView.classList.add('hidden');
            adminChatView.classList.add('hidden');
            bannedView.classList.remove('hidden');

            // 顯示管理員設定的停用原因
            document.getElementById('display-ban-reason').innerText = currentUser.banReason || "管理員未特別填寫原因";

            renderBannedAppealList();
        } else {
            bannedView.classList.add('hidden');
            adminChatView.classList.add('hidden');
            normalView.classList.remove('hidden');
            renderNormalFeedbackList();
        }
    }

    function getTodayDateString() {
        const d = new Date();
        return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
    }

    function submitNormalFeedback() {
        const text = document.getElementById('feedback-input').value.trim();
        if (!text) return alert("請填寫問題內容！");

        const today = getTodayDateString();
        const userEmail = currentUser.email;

        const todaySubmissions = feedbackDB.filter(item => item.email === userEmail && item.type === 'feedback' && item.date === today);
        if (todaySubmissions.length >= 3) {
            return alert("您今天已達到問題反饋上限（一天最多 3 次），請明天再來或靜候回覆！");
        }

        const newFeedback = {
            id: 'FB-' + Date.now(),
            email: userEmail,
            name: currentUser.name,
            type: 'feedback',
            content: text,
            date: today,
            timestamp: new Date().toLocaleString(),
            isRead: false,
            isProcessed: false,
            adminReply: '',
            appealResult: null
        };

        feedbackDB.push(newFeedback);
        saveToFirebase('feedback', feedbackDB);
        document.getElementById('feedback-input').value = '';
        alert("問題回報提交成功！管理員將盡快審閱。");
        renderNormalFeedbackList();
    }

    function renderNormalFeedbackList() {
        const container = document.getElementById('normal-feedback-list');
        const userEmail = currentUser.email;
        const userItems = feedbackDB.filter(item => item.email === userEmail && item.type === 'feedback');

        if (userItems.length === 0) {
            container.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:15px;">目前尚無反饋紀錄</div>`;
            return;
        }

        let html = '';
        [...userItems].reverse().forEach(item => {
            const readStatus = item.isRead ? '<span style="color:#22c55e;">已讀</span>' : '<span style="color:#eab308;">未讀</span>';
            const processStatus = item.isProcessed ? '<span style="color:#22c55e;">[已處理]</span>' : '<span style="color:#f97316;">[未處理]</span>';
            html += `
                <div class="feedback-card">
                    <div class="feedback-header">
                        <span>提交時間：${item.timestamp} | 狀態：${readStatus} ${processStatus}</span>
                    </div>
                    <div style="font-size:0.95em; color:#f8fafc; margin-bottom:8px; white-space: pre-wrap;">${escapeHtml(item.content)}</div>
                    ${item.adminReply ? `<div class="admin-reply-box"><b>管理員回覆：</b><br>${escapeHtml(item.adminReply)}</div>` : '<div style="font-size:0.85em; color:#64748b; font-style:italic;">等待管理員回覆中...</div>'}
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function submitBannedAppeal() {
        const text = document.getElementById('appeal-input').value.trim();
        if (!text) return alert("請填寫申訴原因！");

        const today = getTodayDateString();
        const userEmail = currentUser.email;

        const todaySubmissions = feedbackDB.filter(item => item.email === userEmail && item.type === 'appeal' && item.date === today);
        if (todaySubmissions.length >= 2) {
            return alert("您今天已達到申訴申請上限（一天最多 2 次），請等待審核！");
        }

        const newAppeal = {
            id: 'AP-' + Date.now(),
            email: userEmail,
            name: currentUser.name,
            type: 'appeal',
            content: text,
            date: today,
            timestamp: new Date().toLocaleString(),
            isRead: false,
            isProcessed: false,
            adminReply: '',
            appealResult: null
        };

        feedbackDB.push(newAppeal);
        saveToFirebase('feedback', feedbackDB);
        document.getElementById('appeal-input').value = '';
        alert("帳號申訴申請已成功送出！請靜候管理員審核與回覆。");
        renderBannedAppealList();
    }

    function renderBannedAppealList() {
        const container = document.getElementById('banned-appeal-list');
        const userEmail = currentUser.email;
        const userItems = feedbackDB.filter(item => item.email === userEmail && item.type === 'appeal');

        if (userItems.length === 0) {
            container.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:15px;">目前尚無申訴紀錄</div>`;
            return;
        }

        let html = '';
        [...userItems].reverse().forEach(item => {
            const readStatus = item.isRead ? '<span style="color:#22c55e;">已讀</span>' : '<span style="color:#eab308;">未讀</span>';
            let resultHtml = '';
            if (item.appealResult === 'rejected') {
                resultHtml = '<div style="color:#ef4444; font-weight:bold; margin-top:8px; font-size:1.05em;">審核結果：此案不允受理</div>';
            } else if (item.appealResult === 'approved') {
                resultHtml = '<div style="color:#22c55e; font-weight:bold; margin-top:8px; font-size:1.05em;">審核結果：已核准恢復帳戶，請重新登入或重新整理頁面</div>';
            }

            html += `
                <div class="feedback-card" style="border-color:#c0392b;">
                    <div class="feedback-header">
                        <span>申訴時間：${item.timestamp} | 狀態：${readStatus}</span>
                    </div>
                    <div style="font-size:0.95em; color:#f8fafc; margin-bottom:8px; white-space: pre-wrap;">${escapeHtml(item.content)}</div>
                    ${resultHtml}
                    ${item.adminReply ? `<div class="admin-reply-box" style="border-left-color:#ef4444;"><b>管理員審核回覆：</b><br>${escapeHtml(item.adminReply)}</div>` : '<div style="font-size:0.85em; color:#64748b; font-style:italic;">等待管理員審核中...</div>'}
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function renderAdminChatFeedbackList() {
        const container = document.getElementById('admin-chat-feedback-list');
        if (feedbackDB.length === 0) {
            container.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:15px;">目前尚無任何反饋或申訴</div>`;
            return;
        }

        let html = '';
        const sorted = [...feedbackDB].reverse();
        sorted.forEach((item, index) => {
            const realIndex = feedbackDB.length - 1 - index;
            const typeLabel = item.type === 'feedback' ? '<span style="color:#38bdf8;">[問題反饋]</span>' : '<span style="color:#ef4444;">[帳號申訴]</span>';
            const readStatus = item.isRead ? '<span style="color:#22c55e;">已讀</span>' : '<span style="color:#eab308; font-weight:bold;">未讀</span>';
            const processStatusText = item.isProcessed ? '<span style="color:#22c55e; font-weight:bold;">已處理</span>' : '<span style="color:#f97316; font-weight:bold;">未處理</span>';

            let appealActionHtml = '';
            if (item.type === 'appeal') {
                let statusBadge = '';
                if (item.appealResult === 'approved') statusBadge = '<span style="color:#22c55e; font-weight:bold;">[已恢復帳戶]</span>';
                else if (item.appealResult === 'rejected') statusBadge = '<span style="color:#ef4444; font-weight:bold;">[已判定: 此案不允受理]</span>';
                else statusBadge = '<span style="color:#eab308;">[尚未審核帳戶恢復]</span>';

                appealActionHtml = `
                    <div style="margin-top:10px; background:#0f172a; padding:10px; border-radius:4px; border:1px solid #334155;">
                        <div style="margin-bottom:6px; font-size:0.9em;">帳戶恢復審核狀態：${statusBadge}</div>
                        <div style="display:flex; gap:8px; align-items:center;">
                            <span style="font-size:0.9em; font-weight:bold;">是否恢復帳戶：</span>
                            <button class="btn-sm btn-success" onclick="adminRecoverAccountStep1(${realIndex})">是 (恢復)</button>
                            <button class="btn-sm btn-danger" onclick="adminRejectAppeal(${realIndex})">否 (此案不允受理)</button>
                        </div>
                    </div>
                `;
            }

            html += `
                <div class="feedback-card" style="margin-bottom:12px;">
                    <div class="feedback-header">
                        <span>${typeLabel} 提交者：<b>${escapeHtml(item.name)}</b> (${item.email}) | 時間：${item.timestamp}</span>
                        <span>狀態：${readStatus} | 處理狀態：${processStatusText}</span>
                    </div>
                    <div style="font-size:0.95em; color:#f8fafc; margin-bottom:10px; white-space: pre-wrap;">${escapeHtml(item.content)}</div>
                    ${appealActionHtml}
                    <div style="display:flex; gap:8px; align-items:center; margin-top:10px;">
                        <input type="text" id="admin-chat-reply-input-${realIndex}" class="code-input" style="margin-bottom:0; flex:1; font-size:0.9em;" placeholder="輸入管理員回覆 / 原因..." value="${escapeHtml(item.adminReply || '')}">
                        <button class="btn-sm btn-accent" style="padding:8px 12px;" onclick="adminSaveChatReply(${realIndex})">送出回覆</button>
                        <button class="btn-sm ${item.isProcessed ? 'btn-secondary' : 'btn-success'}" style="padding:8px 12px;" onclick="adminToggleProcessed(${realIndex})">${item.isProcessed ? '標記未處理' : '標記已處理'}</button>
                        <button class="btn-sm btn-danger" style="padding:8px 12px;" onclick="adminDeleteFeedback(${realIndex})">刪除</button>
                    </div>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function adminSaveChatReply(index) {
        const replyText = document.getElementById(`admin-chat-reply-input-${index}`).value.trim();
        feedbackDB[index].adminReply = replyText;
        feedbackDB[index].isRead = true;
        saveToFirebase('feedback', feedbackDB);
        alert("管理員回覆已成功送出！");
        renderAdminChatFeedbackList();
    }

    function adminToggleProcessed(index) {
        feedbackDB[index].isProcessed = !feedbackDB[index].isProcessed;
        saveToFirebase('feedback', feedbackDB);
        renderAdminChatFeedbackList();
    }

    function adminDeleteFeedback(index) {
        if (!confirm("確定要刪除這筆訊息紀錄嗎？")) return;
        feedbackDB.splice(index, 1);
        saveToFirebase('feedback', feedbackDB);
        alert("已成功刪除訊息！");
        renderAdminChatFeedbackList();
    }

    function adminRecoverAccountStep1(index) {
        const item = feedbackDB[index];
        if (!confirm("第一步確認：您確定要恢復用戶 " + item.email + " 的帳戶嗎？")) return;
        if (!confirm("第二步確認：執行後該用戶將立刻解除停用並可正常登入系統，是否確定？")) return;

        const targetUser = globalUsersDB.find(u => u.email === item.email);
        if (targetUser) {
            targetUser.disabled = false;
            targetUser.banReason = "";
            saveToFirebase('users', globalUsersDB);
        }
        feedbackDB[index].appealResult = 'approved';
        feedbackDB[index].isProcessed = true;
        feedbackDB[index].adminReply = (feedbackDB[index].adminReply || "") + "\n[系統公告：您的帳戶已審核通過並恢復]";
        saveToFirebase('feedback', feedbackDB);
        alert("已成功恢復該用戶帳戶！");
        renderAdminChatFeedbackList();
    }

    function adminRejectAppeal(index) {
        feedbackDB[index].appealResult = 'rejected';
        feedbackDB[index].isProcessed = true;
        saveToFirebase('feedback', feedbackDB);
        alert("已設定為此案不允受理。您可以在下方輸入框填寫原因並送出回覆給用戶。");
        renderAdminChatFeedbackList();
    }

    function escapeHtml(text) {
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    /* ---------------- 管理面板詳細功能更新 ---------------- */
    function setupAdminConsole() {
        const userSelect = document.getElementById('admin-user-select');
        userSelect.innerHTML = '';
        globalUsersDB.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.email;
            opt.innerText = `${u.name} (${u.email}) ${u.disabled ? '[已停用]' : ''}`;
            userSelect.appendChild(opt);
        });
        onAdminUserSelectChange();

        const historyUserSelect = document.getElementById('admin-history-user-select');
        historyUserSelect.innerHTML = '';
        globalUsersDB.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.name;
            opt.innerText = `${u.name} (${u.email})`;
            historyUserSelect.appendChild(opt);
        });

        const renameUserSelect = document.getElementById('admin-rename-user-select');
        renameUserSelect.innerHTML = '';
        globalUsersDB.forEach(u => {
            const opt = document.createElement('option');
            opt.value = u.email;
            opt.innerText = `${u.name} (${u.email}) ${u.isNameLocked ? '[已鎖定]' : ''}`;
            renameUserSelect.appendChild(opt);
        });

        document.getElementById('adminQuizCodeInput').value = '';
        document.getElementById('adminQuizStatusContainer').style.display = 'none';
        document.getElementById('admin-logout-code-input').value = deviceLogoutCode || '';
        const globalCfg = { ...defaultApiConfig(), ...(globalApiConfig || {}) };
        document.getElementById('global-api-provider').value = globalCfg.provider;
        document.getElementById('global-api-key').value = globalCfg.apiKey || '';
        document.getElementById('global-api-model').value = globalCfg.model || '';
        document.getElementById('global-api-endpoint').value = globalCfg.endpoint || '';
        document.getElementById('global-api-enabled').checked = !!globalCfg.enabled;
        updateApiProviderFields('global');
        updateAdminStats();
        const limitUser = document.getElementById('admin-limit-user-select');
        limitUser.innerHTML = '<option value="">選擇用戶...</option>';
        globalUsersDB.filter(u => u.role !== 'admin').forEach(u => {
            const opt = document.createElement('option'); opt.value = u.email; opt.innerText = `${u.name} (${u.email})`; limitUser.appendChild(opt);
        });
    }

    function updateAdminStats() {
        const attempts = Object.values(quizUsageMap || {}).reduce((sum, quizzes) => sum + Object.values(quizzes || {}).reduce((n, u) => n + Number(u.globalCount || 0), 0), 0);
        const set = (id, value) => { const el = document.getElementById(id); if (el) el.innerText = value; };
        set('admin-stat-users', globalUsersDB.length);
        set('admin-stat-active-users', globalUsersDB.filter(u => !u.disabled).length);
        set('admin-stat-public-quizzes', Object.values(publicQuizzesMap || {}).filter(Boolean).length);
        set('admin-stat-tests', testHistoryRecords.length);
        set('admin-stat-attempts', attempts);
    }

    function adminUpdateLogoutCode() {
        if (!currentUser || currentUser.role !== 'admin') return alert('您無權執行此操作！');
        const code = document.getElementById('admin-logout-code-input').value.trim();
        if (!code) return alert('登出許可碼不得為空！');
        deviceLogoutCode = code;
        saveToFirebase('deviceLogoutCode', deviceLogoutCode);
        alert('設備登出許可碼已更新並記錄於 Firebase。');
    }

    async function saveGlobalApiConfig() {
        if (!currentUser || currentUser.role !== 'admin') return alert('您無權執行此操作！');
        const cfg = collectApiConfig('global');
        if (cfg.enabled && !cfg.apiKey) return alert('啟用全域 API 時必須輸入 API Key。');
        if (cfg.enabled && !cfg.model) cfg.model = 'gemini-2.5-flash';
        if (cfg.enabled) {
            try {
                await window.testLocalApiConfig(cfg);
                cfg.lastTestOk = true;
                cfg.lastTestAt = new Date().toISOString();
                cfg.lastTestError = '';
            } catch (error) {
                cfg.lastTestOk = false;
                cfg.lastTestError = error?.message || 'API 驗證失敗';
                return alert(`全域 API 驗證失敗，未寫入 Firebase：${cfg.lastTestError}`);
            }
        }
        globalApiConfig = cfg;
        saveToFirebase('globalApiConfig', globalApiConfig);
        alert(cfg.enabled ? '全域 API 驗證成功，設定已儲存至 Firebase。' : '全域 API 已停用，設定已儲存至 Firebase。');
    }

    // 當停用區塊的下拉選單變更時，自動切換按鈕文字與樣式
    function onAdminUserSelectChange() {
        const targetEmail = document.getElementById('admin-user-select').value;
        const target = globalUsersDB.find(u => u.email === targetEmail);
        const actionBtn = document.getElementById('admin-ban-action-btn');
        const reasonInput = document.getElementById('admin-ban-reason');

        if (target && target.disabled) {
            actionBtn.innerText = "解除停用 (啟用)";
            actionBtn.className = "main-btn btn-success";
            reasonInput.value = target.banReason || "";
            reasonInput.disabled = true;
        } else {
            actionBtn.innerText = "停用帳戶";
            actionBtn.className = "main-btn btn-danger";
            reasonInput.value = "";
            reasonInput.disabled = false;
        }
    }

    function adminToggleUserStatus() {
        const targetEmail = document.getElementById('admin-user-select').value;
        if (!targetEmail) return alert("請選擇目標用戶！");

        const target = globalUsersDB.find(u => u.email === targetEmail);
        if (!target) return;

        if (target.role === 'admin') return alert("無法對管理員帳戶進行此操作！");

        if (target.disabled) {
            // 執行啟用
            if (!confirm(`確定要解除停用並啟用帳戶：${targetEmail} 嗎？`)) return;
            target.disabled = false;
            target.banReason = "";
            saveToFirebase('users', globalUsersDB);
            alert("已成功啟用帳戶：" + targetEmail);
        } else {
            // 執行停用
            const reason = document.getElementById('admin-ban-reason').value.trim() || '違反使用規範';
            if (!confirm(`確定要停用帳戶：${targetEmail} 嗎？`)) return;
            target.disabled = true;
            target.banReason = reason;
            saveToFirebase('users', globalUsersDB);
            alert("已成功停用帳戶：" + targetEmail + "，原因：" + reason);
        }
        setupAdminConsole();
    }

    // 查詢特定考生的歷史成績
    function adminViewUserHistory() {
        const targetName = document.getElementById('admin-history-user-select').value;
        if (!targetName) return alert("請選擇要查詢的考生！");

        const modal = document.getElementById('admin-history-modal');
        const contentDiv = document.getElementById('admin-history-modal-content');
        document.getElementById('admin-history-modal-title').innerText = `考生 [${targetName}] 的歷史成績紀錄`;

        const userRecords = testHistoryRecords.filter(r => r.userName === targetName);
        if (userRecords.length === 0) {
            contentDiv.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:15px;">此考生尚無任何測驗歷史成績紀錄</div>`;
            modal.classList.remove('hidden');
            return;
        }

        let html = '<table style="width:100%; border-collapse: collapse;">';
        html += '<tr style="border-bottom:1px solid #334155; color:#94a3b8; font-size:0.85em;"><th style="padding:8px; text-align:center;">題庫代碼</th><th style="padding:8px; text-align:center;">得分</th><th style="padding:8px; text-align:center;">總耗時</th><th style="padding:8px; text-align:center;">測驗結束時間</th></tr>';

        userRecords.forEach(rec => {
            html += `
                <tr style="border-bottom:1px solid #1e293b; font-size:0.9em;">
                    <td style="padding:8px; text-align:center; color:#38bdf8;">${escapeHtml(rec.quizCode)}</td>
                    <td style="padding:8px; text-align:center; color:#22c55e; font-weight:bold;">${rec.score} 分</td>
                    <td style="padding:8px; text-align:center; color:#e2e8f0;">${escapeHtml(rec.duration)}</td>
                    <td style="padding:8px; text-align:center; color:#94a3b8;">${escapeHtml(rec.endTime)}</td>
                </tr>
            `;
        });
        html += '</table>';

        contentDiv.innerHTML = html;
        modal.classList.remove('hidden');
    }

    function closeAdminHistoryModal() {
        document.getElementById('admin-history-modal').classList.add('hidden');
    }

    function getQuestionBankScriptUrl(code) {
        const normalized = String(code || '').trim();
        if (!/^[a-zA-Z0-9_-]+$/.test(normalized)) {
            throw new Error('題庫代碼只能使用英文字母、數字、底線或短橫線。');
        }
        return new URL(`QuestionBank/${encodeURIComponent(normalized)}.js`, document.baseURI);
    }

    function checkAdminQuizStatus() {
        const code = document.getElementById('adminQuizCodeInput').value.trim();
        rememberQuizCode(code);
        const container = document.getElementById('adminQuizStatusContainer');
        const statusText = document.getElementById('adminStatusText');
        const displayCode = document.getElementById('adminDisplayCode');
        const quizDetails = document.getElementById('adminQuizDetails');
        const publicCheckbox = document.getElementById('adminPublicCheckbox');

        if (!code) {
            alert('請先輸入題庫代碼！');
            return;
        }

        displayCode.textContent = code;
        container.style.display = 'block';
        statusText.textContent = '檢查中...';
        statusText.style.color = '#f97316';
        quizDetails.textContent = '';
        publicCheckbox.checked = !!publicQuizzesMap[code];
        const savedLimit = quizLimitsMap[code] || { mode: 'time', count: 10 };
        document.getElementById('adminQuizLimitMode').value = savedLimit.mode || 'time';
        document.getElementById('adminQuizLimitCount').value = savedLimit.count || 10;
        document.getElementById('adminQuizLimitCount').disabled = (savedLimit.mode === 'none');

        const oldScript = document.getElementById('temp-admin-check-script');
        if (oldScript) oldScript.remove();

        window.currentQuiz = null;
        const script = document.createElement('script');
        script.id = 'temp-admin-check-script';
        try {
            const scriptUrl = getQuestionBankScriptUrl(code);
            scriptUrl.searchParams.set('t', String(Date.now()));
            script.src = scriptUrl.href;
        } catch (error) {
            statusText.textContent = error.message;
            statusText.style.color = '#ef4444';
            return;
        }

        script.onload = () => {
            if (window.currentQuiz && window.currentQuiz.name) {
                statusText.textContent = '題庫檔案正常';
                statusText.style.color = '#22c55e';
                quizDetails.innerHTML = `題庫名稱 (JS name)：<b>${window.currentQuiz.name}</b><br>題目數量：<b>${window.currentQuiz.data ? window.currentQuiz.data.length : 0}</b> 題`;
            } else {
                statusText.textContent = '檔案格式不符（缺少 currentQuiz 物件或 name 屬性）';
                statusText.style.color = '#ef4444';
                quizDetails.textContent = '';
            }
        };

        script.onerror = () => {
            statusText.textContent = '找不到題庫檔案，請確認 QuestionBank/ 中有同代碼的 .js 檔案。';
            statusText.style.color = '#ef4444';
            quizDetails.textContent = '';
        };

        document.head.appendChild(script);
    }

    function saveAdminQuizLimit() {
        const code = document.getElementById('adminQuizCodeInput').value.trim();
        if (!code) return alert('請先輸入並檢查題庫代碼！');
        const mode = document.getElementById('adminQuizLimitMode').value;
        const count = Math.max(1, parseInt(document.getElementById('adminQuizLimitCount').value, 10) || 10);
        quizLimitsMap[code] = { mode, count };
        rememberQuizCode(code);
        saveToFirebase('quizLimits', quizLimitsMap);
        document.getElementById('adminQuizLimitCount').disabled = mode === 'none';
        renderPublicQuizzesList();
        alert(`題庫 [${code}] 的答題限制已儲存。`);
    }

    function saveAdminUserQuizLimit() {
        const email = document.getElementById('admin-limit-user-select').value;
        const code = document.getElementById('admin-limit-quiz-code').value.trim();
        const mode = document.getElementById('admin-limit-mode').value;
        const count = Math.max(1, parseInt(document.getElementById('admin-limit-count').value, 10) || 10);
        if (!email || !code) return alert('請選擇用戶並輸入題庫代碼！');
        if (!userQuizLimitsMap[email]) userQuizLimitsMap[email] = {};
        userQuizLimitsMap[email][code] = { mode, count };
        saveToFirebase('userQuizLimits', userQuizLimitsMap);
        renderPublicQuizzesList();
        alert(`已為 ${email} 設定題庫 [${code}] 的個別答題限制。`);
    }

    function getTaipeiDateKey() {
        const parts = new Intl.DateTimeFormat('en-CA', { timeZone:'Asia/Taipei', year:'numeric', month:'2-digit', day:'2-digit' }).formatToParts(new Date());
        const v = {}; parts.forEach(p => { if (p.type !== 'literal') v[p.type] = p.value; });
        return `${v.year}-${v.month}-${v.day}`;
    }

    function getQuizLimitForUser(code) {
        const personal = currentUser && userQuizLimitsMap[currentUser.email] && userQuizLimitsMap[currentUser.email][code];
        return personal || quizLimitsMap[code] || { mode:'time', count:10 };
    }

    function getQuizUsage(email, code) {
        if (!quizUsageMap[email]) quizUsageMap[email] = {};
        if (!quizUsageMap[email][code]) quizUsageMap[email][code] = { globalCount:0, dailyCount:0, date:getTaipeiDateKey() };
        const u = quizUsageMap[email][code];
        if (u.date !== getTaipeiDateKey()) { u.dailyCount = 0; u.date = getTaipeiDateKey(); }
        return u;
    }

    function getQuizLimitState(code, user = currentUser) {
        if (!user) return { allowed:true, locked:false, message:'' };
        // 管理員可不受公開題庫的每日／全域答題次數限制影響。
        if (user.role === 'admin') return { allowed:true, locked:false, message:'' };
        const limit = getQuizLimitForUser(code);
        if (!limit || limit.mode === 'none') return { allowed:true, locked:false, message:'' };
        const usage = getQuizUsage(user.email, code);
        const used = limit.mode === 'global' ? (usage.globalCount || 0) : (usage.dailyCount || 0);
        const max = Math.max(1, parseInt(limit.count, 10) || 10);
        if (used >= max) {
            return { allowed:false, locked:true, message: limit.mode === 'time' ? '本題庫您當日答題次數已用完，請等待至明日 00:00（台北時間）後再試。' : '該題庫您的答題次數已用盡。' };
        }
        return { allowed:true, locked:false, message:'' };
    }

    function consumeQuizAttempt(code) {
        if (!currentUser) return true;
        // 管理員進入題庫不消耗任何使用次數，也不寫入 quizUsage。
        if (currentUser.role === 'admin') return true;
        const state = getQuizLimitState(code);
        if (!state.allowed) { alert(state.message); renderPublicQuizzesList(); return false; }
        const limit = getQuizLimitForUser(code);
        if (limit.mode !== 'none') {
            const usage = getQuizUsage(currentUser.email, code);
            usage.globalCount = (usage.globalCount || 0) + 1;
            if (limit.mode === 'time') usage.dailyCount = (usage.dailyCount || 0) + 1;
            saveToFirebase('quizUsage', quizUsageMap);
        }
        renderPublicQuizzesList();
        return true;
    }

    function recordCompletedQuizAttempt(code) {
        if (!currentUser || currentUser.role === 'admin') return;
        const limit = getQuizLimitForUser(code);
        if (!limit || limit.mode === 'none') return;
        const usage = getQuizUsage(currentUser.email, code);
        usage.globalCount = (usage.globalCount || 0) + 1;
        if (limit.mode === 'time') usage.dailyCount = (usage.dailyCount || 0) + 1;
        saveToFirebase('quizUsage', quizUsageMap);
        renderPublicQuizzesList();
    }

    function toggleAdminQuizPublic(checkbox) {
        const code = document.getElementById('adminQuizCodeInput').value.trim();
        if (!code) return;

        publicQuizzesMap[code] = checkbox.checked;
        if (checkbox.checked && !quizLimitsMap[code]) {
            quizLimitsMap[code] = { mode:'time', count:10 };
            saveToFirebase('quizLimits', quizLimitsMap);
        }
        saveToFirebase('publicQuizzes', publicQuizzesMap);
        refreshQuizCodeOptions();
        try { localStorage.setItem('rms_public_quizzes_cache', JSON.stringify(publicQuizzesMap)); } catch (e) {}
        renderPublicQuizzesList();
        alert(`題庫 [${code}] 公開狀態已更新為：${checkbox.checked ? '已公開' : '未公開'}`);
    }

    function adminForceRenameUser() {
        const targetEmail = document.getElementById('admin-rename-user-select').value;
        const newName = document.getElementById('admin-new-name-input').value.trim();
        if (!targetEmail) return alert("請選擇目標用戶！");
        if (!newName) return alert("請輸入要強制修改的新名字！");

        const target = globalUsersDB.find(u => u.email === targetEmail);
        if (target) {
            target.name = newName;
            target.isNameLocked = true;
            saveToFirebase('users', globalUsersDB);

            if (currentUser && currentUser.email === targetEmail) {
                currentUser.name = newName;
                currentUser.isNameLocked = true;
            }

            alert("已成功將用戶 " + targetEmail + " 強制改名為「" + newName + "」並封鎖其後續自行修改權限！");
            document.getElementById('admin-new-name-input').value = '';
            setupAdminConsole();
        }
    }

    function adminUpdateVerifyCode() {
        const newCode = document.getElementById('admin-verify-code-input').value.trim();
        if (!newCode) return alert("驗證碼不得為空！");
        systemVerifyCode = newCode;
        saveToFirebase('verifyCode', systemVerifyCode);
        updateAdminStats();
        alert("重複註冊驗證碼更新成功！");
    }

    function loadQuizMetadata(code) {
        if (quizMetadataCache[code]) return Promise.resolve(quizMetadataCache[code]);
        if (quizMetadataLoadPromises[code]) return quizMetadataLoadPromises[code];
        quizMetadataLoadPromises[code] = new Promise(resolve => {
            const scriptId = `preload-quiz-${code.replace(/[^a-zA-Z0-9_-]/g, '_')}`;
            const old = document.getElementById(scriptId);
            if (old) old.remove();
            // 題庫檔案仍維持原格式；這裡只在載入後讀取其全域物件並快取名稱。
            window.currentQuiz = null;
            const legacyKeysBefore = new Set(Object.keys(window).filter(key => /^bankData_/.test(key)));
            const script = document.createElement('script');
            script.id = scriptId;
            try { script.src = getQuestionBankScriptUrl(code).href; }
            catch (error) { quizMetadataCache[code] = { name: `題庫代碼無效 (${code})` }; resolve(quizMetadataCache[code]); return; }
            script.onload = () => {
                let quiz = window.currentQuiz;
                // 支援 Math.js 這類既有 bankData_* 格式，不改動題庫檔案本身。
                if (!quiz) {
                    const legacyKey = Object.keys(window).find(key => !legacyKeysBefore.has(key) && /^bankData_/.test(key) && window[key] && Array.isArray(window[key].questions));
                    const legacy = legacyKey ? window[legacyKey] : null;
                    if (legacy) quiz = { name: legacy.title, data: legacy.questions };
                }
                quizMetadataCache[code] = quiz && quiz.name ? { name: quiz.name } : { name: `題庫 ${code}` };
                resolve(quizMetadataCache[code]);
            };
            script.onerror = () => {
                quizMetadataCache[code] = { name: `無法載入 (${code})` };
                resolve(quizMetadataCache[code]);
            };
            document.head.appendChild(script);
        });
        return quizMetadataLoadPromises[code];
    }

    function renderPublicQuizzesList() {
        const listContainer = document.getElementById('public-quizzes-list');
        listContainer.innerHTML = '';

        const publicCodes = Object.keys(publicQuizzesMap).filter(code => publicQuizzesMap[code]);
        if (publicCodes.length === 0) {
            listContainer.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:10px;">目前尚無公開題庫</div>`;
            return;
        }

        publicCodes.forEach(code => {
            const displayName = quizMetadataCache[code]?.name || `載入中 (${code})...`;

            const item = document.createElement('div');
            item.className = 'public-quiz-item';
            const limitState = getQuizLimitState(code);
            const lockMark = limitState.locked ? '🔒 ' : '';
            const lockTitle = limitState.locked ? '（點擊查看限制提示）' : '';
            item.innerHTML = `<span><b>${lockMark}${displayName}</b>${lockTitle}</span><div class="quiz-action-btns"></div>`;
            const buttons = item.querySelector('.quiz-action-btns');
            const rankButton = document.createElement('button');
            rankButton.className = 'btn-sm btn-rank';
            rankButton.innerText = '排行榜';
            rankButton.onclick = () => openRankModalForQuiz(code);
            const startButton = document.createElement('button');
            startButton.className = 'btn-sm btn-start-quiz';
            startButton.innerText = '進入考試';
            startButton.onclick = () => quickStartQuiz(code);
            buttons.append(rankButton, startButton);
            listContainer.appendChild(item);
        });
        const missingMetadataCodes = publicCodes.filter(code => !quizMetadataCache[code]);
        if (missingMetadataCodes.length === 0) return;
        missingMetadataCodes.reduce(
            (chain, code) => chain.then(() => loadQuizMetadata(code)),
            Promise.resolve()
        ).then(() => {
            renderPublicQuizzesList();
        });
    }

    let currentRankRecords = [];

    function openRankModalForQuiz(quizCode) {
        const modal = document.getElementById('rank-modal');
        const contentDiv = document.getElementById('rank-modal-content');
        document.getElementById('rank-modal-title').innerText = `題庫排行榜 (1-30名)`;

        const validRecords = testHistoryRecords.filter(r => r.quizCode === quizCode && !r.isCheated);
        if (validRecords.length === 0) {
            contentDiv.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:15px;">尚無此題庫的有效測驗成績紀錄</div>`;
            modal.classList.remove('hidden');
            return;
        }

        validRecords.sort((a, b) => b.score - a.score);
        currentRankRecords = validRecords.slice(0, 30);

        let html = '<table style="width:100%; border-collapse: collapse;">';
        html += '<tr style="border-bottom:1px solid #334155; color:#94a3b8; font-size:0.85em;"><th style="padding:6px; text-align:center; width:15%;">名次</th><th style="padding:6px; text-align:left; width:45%;">考生姓名</th><th style="padding:6px; text-align:center; width:20%;">得分</th><th style="padding:6px; text-align:center; width:20%;">詳細</th></tr>';

        currentRankRecords.forEach((rec, idx) => {
            const rankNum = idx + 1;
            let rankColor = "#f8fafc";
            if(rankNum === 1) rankColor = "#facc15";
            if(rankNum === 2) rankColor = "#e2e8f0";
            if(rankNum === 3) rankColor = "#fb923c";

            html += `
                <tr style="border-bottom:1px solid #1e293b;">
                    <td style="padding:8px; text-align:center; font-weight:bold; color:${rankColor};">#${rankNum}</td>
                    <td style="padding:8px; text-align:left; color:#f8fafc; font-weight:600;">${escapeHtml(rec.userName)} <span class="inline-title-badges">${typeof window.titleHtmlFor === 'function' ? window.titleHtmlFor(rec.userEmail, rec.userName) : ''}</span></td>
                    <td style="padding:8px; text-align:center; color:#22c55e; font-weight:bold;">${rec.score} 分</td>
                    <td style="padding:8px; text-align:center;">
                        <button class="btn-sm btn-accent" style="padding:3px 8px; font-size:0.8em;" onclick="openRankDetailModal(${idx})">詳細資訊</button>
                    </td>
                </tr>
            `;
        });
        html += '</table>';

        contentDiv.innerHTML = html;
        modal.classList.remove('hidden');
    }

    function closeRankModal() {
        document.getElementById('rank-modal').classList.add('hidden');
    }

    function openRankDetailModal(index) {
        const rec = currentRankRecords[index];
        if (!rec) return;
        const detailContent = document.getElementById('rank-detail-content');
        detailContent.innerHTML = `
            <p><b>考生姓名：</b> <span style="color:#38bdf8;">${escapeHtml(rec.userName)}</span></p>
            <p><b>獲得分數：</b> <span style="color:#22c55e; font-weight:bold;">${rec.score} 分</span></p>
            <p><b>開始時間：</b> ${rec.startTime}</p>
            <p><b>結束時間：</b> ${rec.endTime}</p>
            <p><b>作答總耗時：</b> ${rec.duration}</p>
            <p><b>平均答題速度：</b> 每題約 ${rec.avgSpeed} 秒</p>
        `;
        document.getElementById('rank-detail-modal').classList.remove('hidden');
    }

    function closeRankDetailModal() {
        document.getElementById('rank-detail-modal').classList.add('hidden');
    }

    function quickStartQuiz(quizCode) {
        openQuizEntryFlow(quizCode, true);
    }
    window.quickStartQuiz = quickStartQuiz;

    function openQuizEntryFlow(quizCode, fromPublic) {
        quizCode = String(quizCode || '').trim();
        if (!quizCode) return alert('缺少題庫代碼！');
        pendingQuizCode = quizCode;
        pendingQuizFromPublic = !!fromPublic;
        document.getElementById('quiz-code').value = quizCode;
        loadQuizScript(quizCode, () => {
            const state = getQuizLimitState(quizCode);
            if (!state.allowed) return alert(state.message);
            if (window.currentQuiz && window.currentQuiz.password) {
                document.getElementById('quiz-password-summary').innerHTML = `<strong>題庫名稱：</strong>${escapeHtml(window.currentQuiz.name || '')}<br><strong>題庫代碼：</strong>${escapeHtml(quizCode)}`;
                document.getElementById('quiz-password-modal-input').value = '';
                document.getElementById('quiz-password-modal').classList.remove('hidden');
                setTimeout(() => document.getElementById('quiz-password-modal-input').focus(), 50);
            } else {
                openQuizConfirmModal();
            }
        });
    }

    function openQuizConfirmModal() {
        const quiz = window.currentQuiz || {};
        document.getElementById('quiz-entry-summary').innerHTML = `<strong>題庫名稱：</strong>${escapeHtml(quiz.name || '')}<br><strong>題庫代碼：</strong>${escapeHtml(pendingQuizCode)}`;
        document.getElementById('quiz-entry-confirm-modal').classList.remove('hidden');
        let remain = 10;
        const note = document.getElementById('quiz-entry-countdown');
        note.innerText = `未操作將自動進入（${remain}）`;
        clearInterval(quizEntryCountdownTimer);
        quizEntryCountdownTimer = setInterval(() => {
            remain -= 1;
            note.innerText = `未操作將自動進入（${remain}）`;
            if (remain <= 0) confirmQuizEntry();
        }, 1000);
    }

    function submitQuizPassword() {
        const value = document.getElementById('quiz-password-modal-input').value;
        if (!window.currentQuiz || value !== window.currentQuiz.password) return alert('題庫密碼錯誤！');
        document.getElementById('quiz-password-modal').classList.add('hidden');
        openQuizConfirmModal();
    }

    function normalizeQuizDataset(quiz) {
        const source = quiz && (quiz.data ?? quiz.questions ?? quiz.items ?? quiz.questionBank);
        let list;
        if (Array.isArray(source)) list = source;
        else if (source && typeof source === 'object') list = Object.values(source);
        else list = [];
        return list.filter(Boolean).map((item) => {
            if (typeof item === 'string') return { q: item, o: [], a: '' };
            const q = { ...item };
            if (!q.q && q.question) q.q = q.question;
            if (!q.o && Array.isArray(q.options)) q.o = q.options;
            if (q.a === undefined && q.ans !== undefined) q.a = q.ans;
            if (q.a === undefined && q.answer !== undefined && getQuestionType(q) !== 'short' && getQuestionType(q) !== 'handwriting') q.a = q.answer;
            // 單選題常用 0-based 數字答案；統一轉成 A/B/C... 供判分器使用。
            if (typeof q.a === 'number' && Array.isArray(q.o)) q.a = String.fromCharCode(65 + q.a);
            if (Array.isArray(q.a) && Array.isArray(q.o)) q.a = q.a.map(value => typeof value === 'number' ? String.fromCharCode(65 + value) : value);
            if (!q.type && Array.isArray(q.o)) q.type = 'single';
            return q;
        }).filter(q => q.q !== undefined && q.q !== null);
    }

    function quizNeedsAI(questions) {
        return questions.some(q => ['short', 'handwriting'].includes(getQuestionType(q)));
    }

    function ensureLocalApiForQuestions(questions) {
        if (!quizNeedsAI(questions)) return true;
        const effective = getEffectiveApiConfig();
        if (effective.enabled && effective.apiKey && effective.source === 'local' && effective.lastTestOk !== false) return true;
        if (effective.enabled && effective.apiKey && effective.source === 'global') return true;
        alert('此題庫包含需要 AI 辨識／批改的簡答題或手寫題；目前沒有可用 API，請設定本地 API，或請管理員啟用全域 API。');
        openLocalApiModal();
        return false;
    }

    function cancelQuizEntry() {
        clearInterval(quizEntryCountdownTimer);
        document.getElementById('quiz-entry-confirm-modal').classList.add('hidden');
        document.getElementById('quiz-password-modal').classList.add('hidden');
        pendingQuizCode = '';
    }

    // 依題庫 currentQuiz.mode 整理題目與選項順序。
    // mode 1：維持原順序；mode 2：只洗牌選項；mode 3：只洗牌題目；mode 4：題目與選項都洗牌。
    function normalizeQuizMode(quiz) {
        const mode = Number(quiz && quiz.mode);
        return [1, 2, 3, 4].includes(mode) ? mode : 1;
    }

    function shuffleArray(items) {
        const result = items.slice();
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    function getOptionContentAndLabel(raw, index) {
        const text = String(raw ?? '').trim();
        const match = text.match(/^\s*\(?([A-Za-z])\)?(?:[\.、：:，,\s]+|$)/);
        return {
            label: (match ? match[1] : String.fromCharCode(65 + index)).toUpperCase(),
            content: match ? text.slice(match[0].length).trim() : text
        };
    }

    function remapAnswerAfterOptionShuffle(answer, labelMap) {
        if (Array.isArray(answer)) {
            return answer.map(value => {
                const key = optionLetter(value).toUpperCase();
                return labelMap[key] || key;
            });
        }
        const key = optionLetter(answer).toUpperCase();
        return labelMap[key] || answer;
    }

    function shuffleQuestionOptions(question) {
        const cloned = { ...question };
        if (!Array.isArray(cloned.o) || cloned.o.length === 0) return cloned;

        const parsed = cloned.o.map((raw, index) => getOptionContentAndLabel(raw, index));
        const shuffled = shuffleArray(parsed);
        const labelMap = {};
        parsed.forEach((item) => {
            // 新字母由洗牌後的位置決定，供 a／answer／answers 對應到新位置。
            const newIndex = shuffled.indexOf(item);
            labelMap[item.label] = String.fromCharCode(65 + newIndex);
        });

        cloned.o = shuffled.map((item, index) => `(${String.fromCharCode(65 + index)}) ${item.content}`);
        if (cloned.a !== undefined) cloned.a = remapAnswerAfterOptionShuffle(cloned.a, labelMap);
        if (cloned.ans !== undefined) cloned.ans = remapAnswerAfterOptionShuffle(cloned.ans, labelMap);
        if (cloned.answer !== undefined && getQuestionType(cloned) !== 'short' && getQuestionType(cloned) !== 'handwriting') {
            cloned.answer = remapAnswerAfterOptionShuffle(cloned.answer, labelMap);
        }
        return cloned;
    }

    function applyQuizMode(dataset, quiz = window.currentQuiz) {
        const mode = normalizeQuizMode(quiz);
        let result = cloneQuizData(Array.isArray(dataset) ? dataset : []);
        const shuffleOptions = mode === 2 || mode === 4;
        const shuffleQuestions = mode === 3 || mode === 4;

        if (shuffleOptions) result = result.map(shuffleQuestionOptions);
        if (shuffleQuestions && !(window.__rmsContestContext && window.__rmsContestContext.questionOrder === 'original')) {
            result = shuffleArray(result);
        }
        return result;
    }

    function cloneQuizData(value, seen = new WeakMap()) {
        if (value === null || typeof value !== 'object') return value;
        if (typeof Node !== 'undefined' && value instanceof Node) return value.cloneNode(true);
        if (seen.has(value)) return seen.get(value);
        if (Array.isArray(value)) {
            const copy = [];
            seen.set(value, copy);
            value.forEach(item => copy.push(cloneQuizData(item, seen)));
            return copy;
        }
        const copy = Object.create(Object.getPrototypeOf(value) === null ? null : Object.prototype);
        seen.set(value, copy);
        Object.keys(value).forEach(key => { copy[key] = cloneQuizData(value[key], seen); });
        return copy;
    }

    function confirmQuizEntry() {
        clearInterval(quizEntryCountdownTimer);
        document.getElementById('quiz-entry-confirm-modal').classList.add('hidden');
        const state = getQuizLimitState(pendingQuizCode);
        if (!state.allowed) return alert(state.message);
        const entryDataset = normalizeQuizDataset(window.currentQuiz);
        if (!ensureLocalApiForQuestions(entryDataset)) return;

        requestFullScreen();
        setMenuDisabledState(true);
        isWrongQuestionsMode = false;
        const dataset = entryDataset;
        if (!dataset.length) return alert('題庫沒有可用的題目，請確認 data／questions 是否為題目陣列。');
        const orderedDataset = applyQuizMode(dataset, window.currentQuiz);
        beginQuiz(orderedDataset);
    }

    function loadQuizScript(code, callback) {
        const old = document.getElementById('q-script'); if(old) old.remove();
        window.currentQuiz = null;
        const legacyKeysBefore = new Set(Object.keys(window).filter(key => /^bankData_/.test(key)));
        const s = document.createElement('script');
        s.id = 'q-script';
        // 題庫腳本集中於 QuestionBank/；圖片路徑則相對於題庫腳本所在資料夾解析。
        let quizScriptUrl;
        try { quizScriptUrl = getQuestionBankScriptUrl(code); }
        catch (error) { document.getElementById('status-msg').innerText = error.message; return; }
        // 題庫腳本可能在使用者輸入代碼前就已被瀏覽器快取；每次載入加入版本參數以取得最新檔案。
        quizScriptUrl.searchParams.set('_rms_v', String(Date.now()));
        currentQuizScriptUrl = quizScriptUrl.href;
        s.src = currentQuizScriptUrl;
        s.onload = () => {
            if (!window.currentQuiz) {
                const legacyKey = Object.keys(window).find(key => !legacyKeysBefore.has(key) && /^bankData_/.test(key) && window[key] && Array.isArray(window[key].questions));
                const legacy = legacyKey ? window[legacyKey] : null;
                if (legacy) {
                    window.currentQuiz = {
                        name: legacy.title || code,
                        time: legacy.time || 20,
                        data: legacy.questions.map(item => ({
                            ...item,
                            q: item.q || item.question,
                            o: item.o || item.options || [],
                            a: (item.a !== undefined ? item.a : item.ans) !== undefined
                                ? (Array.isArray(item.a !== undefined ? item.a : item.ans)
                                    ? (item.a !== undefined ? item.a : item.ans).map(value => String.fromCharCode(65 + Number(value)))
                                    : (typeof (item.a !== undefined ? item.a : item.ans) === 'number'
                                        ? String.fromCharCode(65 + (item.a !== undefined ? item.a : item.ans))
                                        : (item.a !== undefined ? item.a : item.ans)))
                                : '',
                            type: item.type || 'single',
                            image: item.image || '',
                            svg: item.svg,
                            svgAlt: item.svgAlt
                        }))
                    };
                }
            }
            if(window.currentQuiz) {
                document.getElementById('status-msg').innerText = `已成功讀取題庫：${window.currentQuiz.name}`;
                document.getElementById('password-area').classList.add('hidden');
                checkUnlockStatus();
                if(callback) callback();
            }
        };
        s.onerror = () => {
            document.getElementById('status-msg').innerText = `找不到題庫檔案：QuestionBank/${code}.js`;
        };
        document.head.appendChild(s);
    }

    document.getElementById('quiz-code').addEventListener('input', (e) => {
        const code = e.target.value.trim();
        if(code) {
            loadQuizScript(code);
        }
    });

    function checkUnlockStatus() {
        const loaded = !!window.currentQuiz;
        const btn = document.getElementById('start-btn');
        if(loaded) {
            btn.disabled = false;
            btn.style.background = "var(--accent)";
            btn.style.color = "#ffffff";
        } else {
            btn.disabled = true;
            btn.style.background = "#cbd5e1";
            btn.style.color = "#64748b";
        }
    }

    let quizActive = false;
    let currentQuestions = [], userAnswers = {}, timerInterval, totalSeconds = 0;
    let currentActiveIndex = 0;
    let isWrongQuestionsMode = false;
    let originalWrongQuestions = [];
    let warningCount = 0;
    let calculatedScore = 0;
    let selectedPdfIncludeWrong = false;
    let startTimeObj, endTimeObj;
    let userIP = "未知IP";
    let handwritingResults = {};
    let handwritingGradingInProgress = false;

    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => { userIP = data.ip; })
        .catch(() => { userIP = "127.0.0.1"; });

    function getPlatform() {
        const ua = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle)/i.test(ua) ||
                         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (isTablet) return "平板";
        if (isMobile) return "手機";
        return "電腦";
    }

    function setMenuDisabledState(disabled) {
        const menuBtn = document.getElementById('top-menu-btn');
        if (disabled) {
            menuBtn.classList.add('disabled-menu');
            document.getElementById('dropdown-menu').classList.remove('show');
        } else {
            menuBtn.classList.remove('disabled-menu');
        }
    }

    function requestFullScreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => {});
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen().catch(() => {});
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen().catch(() => {});
        }
    }

    function exitFullScreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen().catch(() => {});
        }
    }

    function checkAndStart() {
        if (!window.currentQuiz) return alert('請先載入有效題庫！');
        openQuizEntryFlow(document.getElementById('quiz-code').value.trim(), false);
    }

    function beginQuiz(questionsDataset) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('quiz-entry-area').classList.add('hidden');
        document.getElementById('result-screen').classList.add('hidden');
        document.getElementById('quiz-ui').classList.remove('hidden');
        document.getElementById('account-screen').classList.add('hidden');
        document.getElementById('chat-screen').classList.add('hidden');
        document.getElementById('admin-screen').classList.add('hidden');

        const quiz = window.currentQuiz;
        document.getElementById('quiz-header').innerText = isWrongQuestionsMode ? `${quiz.name} (錯題重測)` : quiz.name;

        currentQuestions = questionsDataset;
        userAnswers = {};
        currentActiveIndex = 0;
        warningCount = 0;
        startTimeObj = new Date();

        totalSeconds = (quiz.time || 20) * 60;
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            totalSeconds--;
            const mins = Math.floor(totalSeconds / 60), secs = totalSeconds % 60;
            document.getElementById('time-left').innerText = `${mins}:${secs.toString().padStart(2,'0')}`;
            if (totalSeconds <= 0) evalQuiz();
        }, 1000);

        quizActive = true;
        renderQuiz();
    }

    function handleViolation() {
        if (!quizActive) return;
        warningCount++;
    }

    document.addEventListener("visibilitychange", () => {
        if (document.hidden && quizActive) handleViolation();
    });
    window.addEventListener("blur", () => {
        if (quizActive) handleViolation();
    });
    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement && quizActive) handleViolation();
    });

    function getQuestionType(q) {
        const raw = String((q && q.type) || '').toLowerCase().trim();
        if (raw === 'handwriting' || raw === 'written' || raw === 'calculation' || raw === 'essay-writing') return 'handwriting';
        if (raw === 'multiple' || raw === 'multi' || raw === 'multiple-choice' || raw === 'multi-select' || raw === 'checkbox' || raw === '複選題') return 'multiple';
        if (raw === 'short' || raw === 'short-answer' || raw === 'text' || raw === 'essay' || raw === '簡答題') return 'short';
        return 'single';
    }

    function isHandwritingQuestion(q) { return getQuestionType(q) === 'handwriting'; }

    function optionLetter(value) {
        const match = String(value ?? '').match(/^\s*\(?([A-Za-z])\)?(?:[\.、\s]|$)/);
        return match ? match[1].toUpperCase() : String(value ?? '').trim();
    }

    function answerArray(q) {
        const raw = q && (q.a ?? q.answer ?? q.answers);
        if (Array.isArray(raw)) return raw.map(optionLetter).filter(Boolean).sort();
        return String(raw ?? '').split(/[,，、\s]+/).map(optionLetter).filter(Boolean).sort();
    }

    function isAnswered(q, answer) {
        const type = getQuestionType(q);
        if (type === 'handwriting') return !!(answer && answer.answered);
        if (type === 'multiple') return Array.isArray(answer) && answer.length > 0;
        if (type === 'short') return !!(answer && String(answer.value ?? answer).trim());
        return !!(typeof answer === 'object' ? answer.value : answer);
    }

    function getAnswerValue(answer) {
        return answer && typeof answer === 'object' && 'value' in answer ? answer.value : answer;
    }

    function normalizeText(value) {
        return String(value ?? '').trim().toLowerCase().replace(/[\s\u3000]/g, '');
    }

    function gradeShortAnswer(q, answer) {
        const value = normalizeText(getAnswerValue(answer));
        if (!value) return false;
        const accepted = q.acceptedAnswers || q.answers || q.answer;
        const candidates = Array.isArray(accepted) ? accepted : [accepted];
        if (candidates.some(item => normalizeText(item) === value)) return true;
        const keywords = Array.isArray(q.keywords) ? q.keywords : [];
        return keywords.length > 0 && keywords.every(word => value.includes(normalizeText(word)));
    }

    function isAnswerCorrect(q, answer) {
        const type = getQuestionType(q);
        if (type === 'single') return optionLetter(getAnswerValue(answer)) === optionLetter(q.a);
        if (type === 'multiple') {
            const actual = (Array.isArray(answer) ? answer : []).map(optionLetter).sort();
            const expected = answerArray(q);
            return actual.length === expected.length && actual.every((item, index) => item === expected[index]);
        }
        if (type === 'short') return gradeShortAnswer(q, answer);
        return false;
    }

    function optionEntries(q) {
        const options = Array.isArray(q && q.o) ? q.o : [];
        return options.map((raw, index) => {
            const original = String(raw ?? '').trim();
            const letterMatch = original.match(/^\s*\(?([A-Za-z])\)?(?:[\.、：:、\s]+|$)/);
            const label = (letterMatch ? letterMatch[1] : String.fromCharCode(65 + index)).toLowerCase();
            const content = letterMatch ? original.slice(letterMatch[0].length).trim() : original;
            return { label, content, original };
        });
    }
    function isMathAnswer(q, value) {
        const raw = String(value ?? '');
        const meta = [q && q.type, q && q.category, q && q.subject, q && q.topic, q && q.tags].join(' ').toLowerCase();
        return !!(q && (q.math === true || q.isMath === true || q.latex === true))
            || /math|數學|計算|代數|幾何|方程|公式/.test(meta)
            || /\\(?:frac|sqrt|cdot|times|pm|leq|geq)|\$\$?|\\\\\(|\\\\\[/.test(raw)
            || (/\d/.test(raw) && /[+\-*/=^<>÷×√]/.test(raw));
    }
    function formatAnswerText(q, value) {
        const raw = String(value ?? '').trim() || '未設定';
        const safe = escapeHtml(raw);
        if (isMathAnswer(q, raw) && !/[\\$]|\\\\\(|\\\\\[/.test(raw)) return `\\(${safe}\\)`;
        return safe;
    }
    function resolveCorrectOption(q, value) {
        const key = optionLetter(value).toLowerCase();
        const entries = optionEntries(q);
        const direct = entries.find(item => item.label === key);
        if (direct) return direct;
        const numeric = Number(value);
        if (Number.isInteger(numeric) && numeric >= 0 && numeric < entries.length) return entries[numeric];
        return null;
    }
    function answerParts(q, answer, isCorrect = false) {
        const type = getQuestionType(q);
        if (type === 'multiple') {
            const values = isCorrect ? answerArray(q) : (Array.isArray(answer) ? answer.map(optionLetter).filter(Boolean).sort() : []);
            const entries = values.map(value => resolveCorrectOption(q, value));
            return {
                answer: values.length ? values.map(value => `（${optionLetter(value).toUpperCase()}）`).join('、') : '未填答',
                content: values.length ? values.map((value, index) => entries[index] ? formatAnswerText(q, entries[index].content) : formatAnswerText(q, value)).join('、') : '未填答'
            };
        }
        if (type === 'handwriting') {
            const recognized = !isCorrect && handwritingResults[q.__rmsIndex] && handwritingResults[q.__rmsIndex].recognizedAnswer;
            return {
                answer: isCorrect ? '參考答案' : (recognized ? 'AI 辨識答案' : (isAnswered(q, answer) ? '已提交手寫內容' : '未填答')),
                content: isCorrect ? formatAnswerText(q, q.answer || q.a || '未設定') : formatAnswerText(q, recognized || (isAnswered(q, answer) ? '手寫影像已提交' : '未填答'))
            };
        }
        if (type === 'short') {
            const value = isCorrect ? (q.answer || q.a || '未設定') : (getAnswerValue(answer) || '未填答');
            return { answer: isCorrect ? '參考答案' : (isAnswered(q, answer) ? '文字答案' : '未填答'), content: formatAnswerText(q, value) };
        }
        const value = isCorrect ? q.a : getAnswerValue(answer);
        const entry = resolveCorrectOption(q, value);
        return {
            answer: value ? `（${optionLetter(value).toUpperCase()}）` : '未填答',
            content: entry ? formatAnswerText(q, entry.content) : formatAnswerText(q, value || '未填答')
        };
    }

    function displayCorrectAnswer(q) {
        const parts = answerParts(q, null, true);
        return `${parts.answer}${parts.content === '未填答' ? '' : parts.content}`;
    }

    function reviewQuestionImage(q, index) {
        const imageUrl = resolveQuestionImage(q && q.image);
        if (!imageUrl) return '';
        return `<div class="review-question-image-wrap"><div class="review-image-caption">第 ${index + 1} 題圖片</div><img src="${escapeHtml(imageUrl)}" alt="第 ${index + 1} 題圖片" class="review-question-image" loading="lazy" onerror="this.closest('.review-question-image-wrap').innerHTML='<div class=\"question-image-error\">圖片載入失敗，請確認圖片路徑。</div>'></div>`;
    }

    function saveHandwritingCanvas(index, canvas) {
        const existing = userAnswers[index] && typeof userAnswers[index] === 'object' ? userAnswers[index] : {};
        userAnswers[index] = {
            ...existing,
            type: 'handwriting',
            imageData: canvas.toDataURL('image/png'),
            answered: !isBlankCanvas(canvas)
        };
        const status = document.getElementById(`handwriting-status-${index}`);
        if (status) status.innerText = userAnswers[index].answered ? '已保存手寫內容' : '尚未作答';
    }

    function isBlankCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i] < 245 || pixels[i + 1] < 245 || pixels[i + 2] < 245) return false;
        }
        return true;
    }

    function setupHandwritingCanvas(index, canvas) {
        const ctx = canvas.getContext('2d');
        const ratio = Math.max(1, window.devicePixelRatio || 1);
        const cssWidth = canvas.clientWidth || 600;
        const cssHeight = canvas.clientHeight || 260;
        canvas.width = Math.floor(cssWidth * ratio);
        canvas.height = Math.floor(cssHeight * ratio);
        ctx.scale(ratio, ratio);
        ctx.fillStyle = '#fffef5';
        ctx.fillRect(0, 0, cssWidth, cssHeight);
        ctx.strokeStyle = '#111827';
        ctx.lineWidth = 2.2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const previous = userAnswers[index] && userAnswers[index].imageData;
        if (previous) {
            const image = new Image();
            image.onload = () => ctx.drawImage(image, 0, 0, cssWidth, cssHeight);
            image.src = previous;
        }

        let drawing = false;
        const point = (event) => {
            const rect = canvas.getBoundingClientRect();
            return { x: event.clientX - rect.left, y: event.clientY - rect.top };
        };
        canvas.addEventListener('pointerdown', (event) => {
            drawing = true;
            canvas.setPointerCapture(event.pointerId);
            const p = point(event);
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + 0.1, p.y + 0.1); ctx.stroke();
            saveHandwritingCanvas(index, canvas);
        });
        canvas.addEventListener('pointermove', (event) => {
            if (!drawing) return;
            const p = point(event); ctx.lineTo(p.x, p.y); ctx.stroke();
            saveHandwritingCanvas(index, canvas);
        });
        const stop = () => { drawing = false; saveHandwritingCanvas(index, canvas); };
        canvas.addEventListener('pointerup', stop);
        canvas.addEventListener('pointercancel', stop);
        canvas.addEventListener('pointerleave', stop);
    }

    function clearHandwriting(index) {
        const canvas = document.getElementById(`handwriting-canvas-${index}`);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = '#fffef5'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.restore();
        userAnswers[index] = { type: 'handwriting', imageData: canvas.toDataURL('image/png'), answered: false };
        const status = document.getElementById(`handwriting-status-${index}`);
        if (status) status.innerText = '尚未作答';
    }

    function resolveQuestionImage(imagePath) {
        if (typeof imagePath !== 'string') return '';
        const path = imagePath.trim();
        if (!path) return '';
        try {
            return new URL(path, currentQuizScriptUrl || document.baseURI).href;
        } catch (error) {
            console.warn('題目圖片路徑無效：', imagePath, error);
            return '';
        }
    }

    function renderQuestionSvg(question, index, target) {
        if (!target || !question || question.svg == null) return;
        try {
            const value = typeof question.svg === 'function'
                ? question.svg({ question, index, code: document.getElementById('quiz-code')?.value?.trim() || '' })
                : question.svg;
            if (value == null || value === '') return;
            const markup = typeof value === 'string' ? value : (value instanceof SVGElement ? new XMLSerializer().serializeToString(value) : '');
            if (!markup) throw new Error('svg 欄位必須回傳 SVG 字串或 SVG 元素。');
            const parsed = new DOMParser().parseFromString(markup, 'image/svg+xml');
            const svg = parsed.documentElement;
            if (svg.localName !== 'svg' || svg.namespaceURI !== 'http://www.w3.org/2000/svg' || parsed.querySelector('parsererror')) {
                throw new Error('svg 函式未回傳有效的 SVG 根元素。');
            }
            svg.querySelectorAll('script, foreignObject, iframe, object, embed, audio, video').forEach(node => node.remove());
            [svg, ...svg.querySelectorAll('*')].forEach(node => {
                [...node.attributes].forEach(attr => {
                    const name = attr.name.toLowerCase();
                    const value = attr.value.trim();
                    if (name.startsWith('on') || name === 'src' || ((name === 'href' || name.endsWith(':href')) && !value.startsWith('#')) ||
                        (/url\s*\(/i.test(value) && !/^url\(\s*#[^)]+\)$/i.test(value)) || /javascript:|expression\s*\(|@import/i.test(value)) {
                        node.removeAttribute(attr.name);
                    }
                });
            });
            const wrap = document.createElement('div');
            wrap.className = 'question-svg-wrap';
            wrap.setAttribute('role', 'img');
            wrap.setAttribute('aria-label', question.svgAlt || `第 ${index + 1} 題向量圖`);
            wrap.appendChild(document.importNode(svg, true));
            target.replaceWith(wrap);
        } catch (error) {
            console.warn(`第 ${index + 1} 題 SVG 無法顯示：`, error);
            target.textContent = '此題的 SVG 圖形無法顯示，請檢查題庫腳本的 svg 函式。';
            target.className = 'question-image-error';
        }
    }

    function renderQuiz() {
        const container = document.getElementById('quiz-container');
        container.innerHTML = '';

        currentQuestions.forEach((q, i) => {
            const card = document.createElement('div');
            card.className = `question-card ${i === currentActiveIndex ? '' : 'hidden'}`;
            card.id = `q-card-${i}`;
            const type = getQuestionType(q);
            const typeNames = { single: '單選題', multiple: '複選題', short: '簡答題', handwriting: '手寫計算題' };
            const typeColors = { single: '#2980b9', multiple: '#0f766e', short: '#d97706', handwriting: '#8b5cf6' };
            const typeLabel = `<span style="color:${typeColors[type]};">【${typeNames[type]}】</span>`;
            const imageUrl = resolveQuestionImage(q.image);
            const imageHtml = imageUrl
                ? `<div class="question-image-wrap">
                       <img src="${escapeHtml(imageUrl)}"
                            alt="第 ${i + 1} 題圖片"
                            class="question-image"
                            loading="lazy">
                   </div>`
                : '';
            card.innerHTML = `${imageHtml}
                <div class="question-title">第 ${i+1} 題 / 共 ${currentQuestions.length} 題 ${typeLabel}</div>
                <div class="question-text">${q.q || ''}</div>
                <div id="question-svg-slot-${i}"></div>
                <div id="opts-${i}"></div>`;
            container.appendChild(card);
            renderQuestionSvg(q, i, card.querySelector(`#question-svg-slot-${i}`));
            const questionImage = card.querySelector('.question-image');
            if (questionImage) {
                questionImage.addEventListener('error', () => {
                    const wrap = questionImage.closest('.question-image-wrap');
                    if (wrap) wrap.innerHTML = '<div class="question-image-error">圖片載入失敗，請確認 GitHub 圖片路徑。</div>';
                }, { once: true });
            }

            const answerArea = document.getElementById(`opts-${i}`);
            if (type === 'handwriting') {
                answerArea.innerHTML = `<div class="handwriting-wrap"><canvas id="handwriting-canvas-${i}" class="handwriting-canvas" aria-label="手寫作答區"></canvas><div class="handwriting-tools"><button type="button" onclick="clearHandwriting(${i})">清除筆跡</button><span class="handwriting-status" id="handwriting-status-${i}">尚未作答</span></div></div>`;
                const canvas = document.getElementById(`handwriting-canvas-${i}`);
                setupHandwritingCanvas(i, canvas);
                if (userAnswers[i] && userAnswers[i].answered) document.getElementById(`handwriting-status-${i}`).innerText = '已保存手寫內容';
            } else if (type === 'short') {
                const saved = getAnswerValue(userAnswers[i]) || '';
                answerArea.innerHTML = `<textarea id="short-answer-${i}" class="chat-textarea" placeholder="請輸入答案"></textarea><div class="handwriting-status">字數：<span id="short-count-${i}">0</span></div>`;
                const input = document.getElementById(`short-answer-${i}`);
                input.value = saved;
                const save = () => {
                    userAnswers[i] = { type: 'short', value: input.value, answered: !!input.value.trim() };
                    document.getElementById(`short-count-${i}`).innerText = input.value.length;
                };
                input.addEventListener('input', save);
            } else {
                const selected = type === 'multiple' ? (Array.isArray(userAnswers[i]) ? userAnswers[i] : []) : [optionLetter(getAnswerValue(userAnswers[i]))];
                (q.o || []).forEach(opt => {
                    const b = document.createElement('button');
                    b.className = 'opt-btn';
                    b.innerText = opt;
                    const letter = optionLetter(opt);
                    if (selected.includes(letter)) b.classList.add('selected');
                    b.onclick = () => {
                        if (type === 'multiple') {
                            const values = Array.isArray(userAnswers[i]) ? userAnswers[i].slice() : [];
                            const pos = values.indexOf(letter);
                            if (pos >= 0) values.splice(pos, 1); else values.push(letter);
                            userAnswers[i] = values.sort();
                            b.classList.toggle('selected', values.includes(letter));
                        } else {
                            userAnswers[i] = letter;
                            Array.from(b.parentElement.children).forEach(x => x.classList.remove('selected'));
                            b.classList.add('selected');
                            setTimeout(() => { if (currentActiveIndex < currentQuestions.length - 1) navigateQuestion(1); }, 300);
                        }
                    };
                    answerArea.appendChild(b);
                });
                if (type === 'multiple') {
                    const hint = document.createElement('div');
                    hint.className = 'handwriting-status';
                    hint.innerText = '複選題：可選擇一個或多個答案';
                    answerArea.appendChild(hint);
                }
            }
        });
        window.typesetRmsMath(container);
    }

    function navigateQuestion(direction) {
        const newIndex = currentActiveIndex + direction;
        if(newIndex >= 0 && newIndex < currentQuestions.length) {
            document.getElementById(`q-card-${currentActiveIndex}`).classList.add('hidden');
            currentActiveIndex = newIndex;
            document.getElementById(`q-card-${currentActiveIndex}`).classList.remove('hidden');
        }
    }

    function confirmSubmit() {
        const answeredCount = currentQuestions.filter((q, i) => isAnswered(q, userAnswers[i])).length;
        if(answeredCount < currentQuestions.length) {
            if(!confirm(`尚有 ${currentQuestions.length - answeredCount} 題未作答，確定要提早提交？`)) return;
        } else {
            if(!confirm("確定提交作答評量？")) return;
        }
        evalQuiz();
    }

    function evalQuiz() {
        if (!isWrongQuestionsMode && !window.__rmsContestContext && !quizAttemptCounted) {
            try { recordCompletedQuizAttempt(document.getElementById('quiz-code')?.value.trim() || 'test01'); } catch (counterError) { console.warn('答題次數寫入略過：', counterError); }
            quizAttemptCounted = true;
        }
        quizActive = false;
        clearInterval(timerInterval);
        endTimeObj = new Date();

        exitFullScreen();
        setMenuDisabledState(false);

        document.getElementById('quiz-ui').classList.add('hidden');
        document.getElementById('result-screen').classList.remove('hidden');

        let correctCount = 0;
        let reviewHTML = '<h3 style="color:#ffffff; margin-top:20px;">詳細解析評估</h3>';
        originalWrongQuestions = [];

        let earnedPoints = 0;
        let possiblePoints = 0;
        let answeredCount = 0;
        let wrongCount = 0;
        currentQuestions.forEach((q, i) => {
            const type = getQuestionType(q);
            const hand = type === 'handwriting';
            const maxPoints = Math.max(1, Number(q.score) || (hand ? 10 : 1));
            possiblePoints += maxPoints;
            const answer = userAnswers[i];
            const answered = isAnswered(q, answer);
            if (answered) answeredCount++;
            let isRight = false;
            let answerText = hand ? (answered ? '已提交手寫內容，等待 AI 批改' : '未作答') : (getAnswerValue(answer) || '未填答');
            q.__rmsIndex = i;
            const submittedParts = answerParts(q, answer, false);
            const correctParts = answerParts(q, null, true);
            if (!hand) {
                isRight = isAnswerCorrect(q, answer);
                if (isRight) { correctCount++; earnedPoints += maxPoints; } else if (answered) wrongCount++;
            } else if (handwritingResults[i]) {
                const result = handwritingResults[i];
                earnedPoints += Math.max(0, Math.min(maxPoints, Number(result.score) || 0));
                isRight = !!result.isCorrect;
                answerText = result.recognizedAnswer || answerText;
                if (!isRight && answered) wrongCount++;
            }
            if (Array.isArray(answerText)) answerText = answerText.join(', ');
            if (!isRight && answered) originalWrongQuestions.push({ index: i, qObj: q, userAns: answerText, rawAnswer: answer });
            const subjective = hand || type === 'short';
            reviewHTML += `<div class="review-card" id="review-card-${i}" style="border-left: 4px solid ${isRight ? 'var(--success)' : (subjective && answered && !handwritingResults[i] ? '#f59e0b' : 'var(--error)')}" >
                <p><b>題目 ${i+1}: ${q.q}</b></p>
                ${reviewQuestionImage(q, i)}
                <div class="answer-detail-row"><b>你的答案</b>${escapeHtml(String(submittedParts.answer))}${submittedParts.content}</div>
                ${!isRight ? `<div class="answer-detail-row"><b style="color:var(--success);">正確答案</b>${escapeHtml(String(correctParts.answer))}${correctParts.content}</div>` : ''}
                ${subjective ? `<p class="handwriting-feedback" style="color:#8b5cf6;">${handwritingResults[i] ? escapeHtml(handwritingResults[i].feedback || 'AI 已完成批改') : (answered ? 'AI 批改中，請稍候……' : '未作答')}</p>` : ''}
            </div>`;
        });

        const totalQ = currentQuestions.length;
        const unansweredCount = totalQ - answeredCount;
        calculatedScore = possiblePoints ? Math.round(earnedPoints * 100 / possiblePoints) : 0;

        let testCountKey = `test_count_${window.currentQuiz.name}`;
        let localCount = parseInt(localStorage.getItem(testCountKey)) || 0;
        let totalTestsRun = parseInt(localStorage.getItem('total_tests_run')) || 0;
        if (!isWrongQuestionsMode) {
            localCount += 1;
            totalTestsRun += 1;
            localStorage.setItem(testCountKey, localCount);
            localStorage.setItem('total_tests_run', totalTestsRun);
        }

        const formatTimeFull = (date) => {
            const y = date.getFullYear() - 1911;
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            const h = String(date.getHours()).padStart(2, '0');
            const min = String(date.getMinutes()).padStart(2, '0');
            return `民國${y}年${m}月${d}日 ${h}:${min}`;
        };

        const durationSec = Math.max(1, Math.floor((endTimeObj - startTimeObj) / 1000));
        const hours = String(Math.floor(durationSec / 3600)).padStart(2, '0');
        const mins = String(Math.floor((durationSec % 3600) / 60)).padStart(2, '0');
        const secs = String(durationSec % 60).padStart(2, '0');
        const avgSpeed = (durationSec / totalQ).toFixed(1);

        const currentQuizCode = document.getElementById('quiz-code').value.trim() || 'test01';
        const isCheated = warningCount > 0;

        if (!isWrongQuestionsMode && !isCheated) {
            const recordObj = {
                quizCode: currentQuizCode,
                userName: currentUser ? currentUser.name : '訪客',
                userEmail: currentUser ? currentUser.email : '',
                contestId: window.__rmsContestContext?.id || '',
                correctCount: correctCount,
                questionCount: totalQ,
                score: calculatedScore,
                startTime: formatTimeFull(startTimeObj),
                endTime: formatTimeFull(endTimeObj),
                duration: `${hours}時${mins}分${secs}秒`,
                avgSpeed: avgSpeed,
                isCheated: false
            };
            testHistoryRecords.push(recordObj);
            saveToFirebase('testHistory', testHistoryRecords);
            if (currentUser && window.syncAutomaticTitles) {
                window.syncAutomaticTitles(currentUser);
                saveToFirebase('users', globalUsersDB);
            }
            window.__rmsContestContext = null;
        }

        document.getElementById('res-subject').innerText = window.currentQuiz.name;
        document.getElementById('res-test-count').innerText = localCount;
        document.getElementById('res-score').innerText = calculatedScore;
        document.getElementById('res-correct').innerText = correctCount;
        document.getElementById('res-orange').innerText = wrongCount;

        const unAnsElem = document.getElementById('res-unanswered');
        unAnsElem.innerText = `${unansweredCount} 題`;
        unAnsElem.className = unansweredCount === 0 ? "tb-val res-green" : "tb-val res-red";

        const passLabel = document.getElementById('res-pass-label');
        if (isCheated) {
            passLabel.innerText = "因作弊不記錄成績";
            passLabel.className = "tb-val res-red";
        } else if (calculatedScore >= 60) {
            passLabel.innerText = "及格 論";
            passLabel.className = "tb-val res-black-pass";
        } else {
            passLabel.innerText = "不及格 論";
            passLabel.className = "tb-val res-red";
        }

        document.getElementById('res-username').innerText = currentUser ? currentUser.name : '訪客';
        document.getElementById('res-start-time').innerText = formatTimeFull(startTimeObj);
        document.getElementById('res-end-time').innerText = formatTimeFull(endTimeObj);

        const cheatElem = document.getElementById('res-cheated');
        if (isCheated) {
            cheatElem.innerText = `檢測到離開畫面 ${warningCount} 次`;
            cheatElem.className = "tb-val res-red";
        } else {
            cheatElem.innerText = "否";
            cheatElem.className = "tb-val res-yellow";
        }

        const emptyRow = document.getElementById('empty-paper-row');
        if (answeredCount === 0) {
            emptyRow.classList.remove('hidden');
        } else {
            emptyRow.classList.add('hidden');
        }

        document.getElementById('res-duration').innerText = `${hours}時${mins}分${secs}秒`;
        document.getElementById('res-ip').innerText = userIP;
        document.getElementById('res-platform').innerText = getPlatform();
        document.getElementById('res-avg-speed').innerText = avgSpeed;

        document.getElementById('review-area').innerHTML = reviewHTML;

        const retryBtn = document.getElementById('retry-failed-btn');
        if(originalWrongQuestions.length > 0) {
            retryBtn.classList.remove('hidden');
        } else {
            retryBtn.classList.add('hidden');
        }

        window.typesetRmsMath(document.getElementById('review-area'));
        gradePendingHandwriting(currentQuestions, currentQuizCode);
    }

    function refreshScoreAfterHandwritingAI(questions) {
        let earned = 0, possible = 0;
        questions.forEach((q, i) => {
            const hand = isHandwritingQuestion(q);
            const max = Math.max(1, Number(q.score) || (hand ? 10 : 1));
            possible += max;
            if (hand || getQuestionType(q) === 'short') earned += Math.max(0, Math.min(max, Number(handwritingResults[i] && handwritingResults[i].score) || 0));
            else if (isAnswerCorrect(q, userAnswers[i])) earned += max;
        });
        calculatedScore = possible ? Math.round(earned * 100 / possible) : 0;
        const scoreEl = document.getElementById('res-score');
        if (scoreEl) scoreEl.innerText = calculatedScore;
        const passEl = document.getElementById('res-pass-label');
        if (passEl && warningCount === 0) {
            passEl.innerText = calculatedScore >= 60 ? '及格 論' : '不及格 論';
            passEl.className = calculatedScore >= 60 ? 'tb-val res-black-pass' : 'tb-val res-red';
        }
    }

    async function gradePendingHandwriting(questions, quizCode) {
        if (handwritingGradingInProgress) return;
        const pending = questions.map((q, i) => ({ q, i })).filter(({q, i}) => {
            const type = getQuestionType(q);
            return (type === 'handwriting' || type === 'short') && isAnswered(q, userAnswers[i]) && !handwritingResults[i];
        });
        if (!window.gradeHandwritingWithFirebaseAI) {
            pending.forEach(({i}) => {
                const feedback = document.querySelector(`#review-card-${i} .handwriting-feedback`);
                if (feedback) feedback.innerText = 'AI 批改尚未啟用：請在 Firebase Console 開啟 AI Logic、Gemini Developer API，並設定 App Check。';
            });
            return;
        }
        if (!pending.length) return;
        handwritingGradingInProgress = true;
        for (const item of pending) {
            const q = item.q, i = item.i;
            try {
                const type = getQuestionType(q);
                const result = type === 'short'
                    ? await window.gradeShortAnswerWithGemini({ question: q.q, studentAnswer: getAnswerValue(userAnswers[i]), standardAnswer: q.answer || q.a || '', rubric: q.rubric, maxScore: Number(q.score) || 10 })
                    : await window.gradeHandwritingWithFirebaseAI({ question: q.q, standardAnswer: q.answer || '', rubric: q.rubric || '請依照計算過程與最後答案給分。', maxScore: Number(q.score) || 10, imageData: userAnswers[i].imageData });
                handwritingResults[i] = result;
                refreshScoreAfterHandwritingAI(questions);
                const card = document.getElementById(`review-card-${i}`);
                if (card) {
                    card.style.borderLeftColor = result.isCorrect ? 'var(--success)' : 'var(--error)';
                    const feedback = card.querySelector('.handwriting-feedback');
                    if (feedback) feedback.innerText = `AI 批改：${result.feedback || '已完成批改'}（${result.score || 0}/${result.maxScore || q.score || 10} 分）`;
                }
            } catch (error) {
                const feedback = document.querySelector(`#review-card-${i} .handwriting-feedback`);
                if (feedback) feedback.innerText = 'AI 暫時無法批改，請由老師人工批改。';
            }
        }
        handwritingGradingInProgress = false;
        alert('手寫題 AI 批改已完成，請查看詳細解析。');
    }

    function startWrongQuestionsQuiz() {
        if(originalWrongQuestions.length === 0) return;
        const wrongDataset = originalWrongQuestions.map(item => item.qObj);
        if (!ensureLocalApiForQuestions(wrongDataset)) return;
        requestFullScreen();
        setMenuDisabledState(true);
        isWrongQuestionsMode = true;
        beginQuiz(applyQuizMode(wrongDataset, window.currentQuiz));
    }

    function validateStampOption(chk) {
        if (!chk.checked) return;
        const val = chk.value;
        const answeredCount = Object.keys(userAnswers).length;
        if (val === 'valid') {
            if (warningCount > 0 || answeredCount === 0) {
                alert("【無法勾選】檢測到測驗過程中存在作弊行為或惡意交白卷，無法開立「測驗成績真實有效章」！");
                chk.checked = false;
            }
        } else if (val === 'pass') {
            if (calculatedScore < 60 || warningCount > 0) {
                alert("【無法勾選】成績未達及格標準 (60分) 或成績無效，無法開立「成績及格證明章」！");
                chk.checked = false;
            }
        } else if (val === 'excellent') {
            if (calculatedScore < 80 || warningCount > 0) {
                alert("【無法勾選】成績未達優良標準 (80分) 或成績無效，無法開立「成績優良證明章」！");
                chk.checked = false;
            }
        }
    }

    function openPdfModal() {
        const pdfModal = document.getElementById('pdf-modal');
        const btnWithWrong = document.getElementById('btn-pdf-with-wrong');
        document.getElementById('pdf-step-1').classList.remove('hidden');
        document.getElementById('pdf-step-2').classList.add('hidden');
        document.getElementById('pdf-step-3').classList.add('hidden');
        document.getElementById('addon-code-input').value = '';
        document.querySelectorAll('.stamp-option').forEach(chk => chk.checked = false);

        if (originalWrongQuestions.length === 0) {
            btnWithWrong.disabled = true;
            btnWithWrong.style.opacity = "0.5";
            btnWithWrong.innerText = "評量結果 + 錯題解析 (無錯題)";
        } else {
            btnWithWrong.disabled = false;
            btnWithWrong.style.opacity = "1";
            btnWithWrong.innerText = "評量結果 + 錯題解析";
        }
        pdfModal.classList.remove('hidden');
    }

    function closePdfModal() {
        document.getElementById('pdf-modal').classList.add('hidden');
    }

    function selectPdfFormat(includeWrong) {
        selectedPdfIncludeWrong = includeWrong;
        document.getElementById('pdf-step-1').classList.add('hidden');
        document.getElementById('pdf-step-2').classList.remove('hidden');
    }

    function showAddonInput(wantAddon) {
        if (wantAddon) {
            document.getElementById('pdf-step-2').classList.add('hidden');
            document.getElementById('pdf-step-3').classList.remove('hidden');
        } else {
            processPDFDownload(selectedPdfIncludeWrong, null, []);
        }
    }

    function confirmAddonAndDownload() {
        const code = document.getElementById('addon-code-input').value.trim();
        const selectedStamps = [];
        document.querySelectorAll('.stamp-option:checked').forEach(chk => {
            selectedStamps.push(chk.value);
        });
        if (!code && selectedStamps.length === 0) {
            return alert("請輸入附加元件代碼或至少勾選一項印章！");
        }
        processPDFDownload(selectedPdfIncludeWrong, code, selectedStamps);
    }

    function getRocDateString() {
        const d = new Date();
        const year = d.getFullYear() - 1911;
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `民國${year}年${month}月${day}日`;
    }

    function processPDFDownload(includeWrong, addonCode, selectedStamps) {
        closePdfModal();
        const element = document.getElementById('report-card');
        const pdfWrongList = document.getElementById('pdf-wrong-list');
        const stampPageSection = document.getElementById('stamp-page-section');
        const addonRow = document.getElementById('addon-code-row');
        const addonVal = document.getElementById('res-addon-code');
        const stampsArea = document.getElementById('stamps-area');
        const username = currentUser ? currentUser.name : '考生';
        const subject = window.currentQuiz ? window.currentQuiz.name : '測驗報告';
        const answeredCount = Object.keys(userAnswers).length;

        if (addonCode) {
            addonVal.innerText = addonCode;
            addonRow.classList.remove('hidden');
        } else {
            addonRow.classList.add('hidden');
        }

        let stampsHtml = '';
        const rocDate = getRocDateString();

        if (warningCount > 0 || answeredCount === 0) {
            stampsHtml += `<div class="official-stamp"><div class="stamp-title">多功能線上測驗網</div><div class="stamp-date">${rocDate}</div><div class="stamp-body">因作答或成績異常取消此次成績</div></div>`;
        } else {
            if (selectedStamps.includes('valid')) stampsHtml += `<div class="official-stamp"><div class="stamp-title">多功能線上測驗網</div><div class="stamp-date">${rocDate}</div><div class="stamp-body">成績真實有效</div></div>`;
            if (selectedStamps.includes('pass')) stampsHtml += `<div class="official-stamp"><div class="stamp-title">多功能線上測驗網</div><div class="stamp-date">${rocDate}</div><div class="stamp-body">成績及格證明</div></div>`;
            if (selectedStamps.includes('excellent')) stampsHtml += `<div class="official-stamp"><div class="stamp-title">多功能線上測驗網</div><div class="stamp-date">${rocDate}</div><div class="stamp-body">成績優良證明</div></div>`;
        }

        if (stampsHtml !== '') {
            stampsArea.innerHTML = stampsHtml;
            stampPageSection.classList.remove('hidden');
        } else {
            stampPageSection.classList.add('hidden');
        }

        if (includeWrong && originalWrongQuestions.length > 0) {
            let html = '<div style="margin-top:25px; border-top:1px solid #334155; padding-top:15px;"><h3 style="color:#ef4444; margin-bottom:15px;">錯題解析與參考答案</h3>';
            originalWrongQuestions.forEach((item) => {
                const q = item.qObj;
                const options = Array.isArray(q.o) ? q.o.join(' | ') : '非選擇題';
                const submittedParts = answerParts(q, item.rawAnswer, false);
                const correctParts = answerParts(q, null, true);
                const imageUrl = resolveQuestionImage(q && q.image);
                const imageHtml = imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="第 ${item.index + 1} 題圖片" class="pdf-question-image">` : '';
                html += `<div class="pdf-wrong-card"><div style="font-weight:bold; color:#ffffff; margin-bottom:6px;">第 ${item.index + 1} 題：${q.q}</div>${imageHtml}<div style="color:#cbd5e1; margin-bottom:4px;">選項：${escapeHtml(options)}</div><div style="margin:4px 0;">你的答案<span style="color:#ef4444; font-weight:bold;">${escapeHtml(String(submittedParts.answer))}</span>${submittedParts.content}</div><div style="margin:4px 0;">正確答案<span style="color:#22c55e; font-weight:bold;">${escapeHtml(String(correctParts.answer))}</span>${correctParts.content}</div></div>`;
            });
            html += '</div>';
            pdfWrongList.innerHTML = html;
            pdfWrongList.classList.remove('hidden');
        } else {
            pdfWrongList.innerHTML = '';
            pdfWrongList.classList.add('hidden');
        }

        element.scrollIntoView();
        const opt = {
            margin: [8, 8, 8, 8],
            filename: `${username}_${subject}_${includeWrong ? '完整' : '簡要'}測驗結果.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, backgroundColor: '#000000', logging: false, scrollY: 0, scrollX: 0, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            pdfWrongList.classList.add('hidden');
            addonRow.classList.add('hidden');
            stampPageSection.classList.add('hidden');
        });
    }
