/* 積分銀行 UI 與流程。點數交易本身由 firebase.js 的 Realtime Database transaction 處理。 */
let pointsBankSyncPromise = null;

function pointsUserKey(email) {
    return encodeURIComponent(String(email || '').trim().toLowerCase()).replace(/\./g, '%2E');
}

function pointsDeviceId() {
    const storageKey = 'arn_points_device_profile_id';
    let id = '';
    try { id = localStorage.getItem(storageKey) || ''; } catch (error) {}
    if (!id) {
        id = `device_${(window.crypto?.randomUUID?.() || `${Date.now()}_${Math.random().toString(36).slice(2)}`).replace(/[^a-zA-Z0-9_-]/g, '')}`;
        try { localStorage.setItem(storageKey, id); } catch (error) {}
    }
    return id;
}

function formatPoints(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return '—';
    return new Intl.NumberFormat('zh-TW', { maximumFractionDigits: 2 }).format(Math.round(number * 100) / 100);
}

function formatPointsDate(timestamp) {
    if (!Number(timestamp)) return '無期限';
    return new Intl.DateTimeFormat('zh-TW', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(Number(timestamp)));
}

function getPointsPurchaseQuote(kind, code, user = currentUser) {
    const isReview = kind === 'review';
    const quizLimit = getQuizLimitForUser(code);
    const mode = isReview ? 'time' : (quizLimit?.mode || 'time');
    const max = Math.max(1, parseInt(isReview ? 1 : quizLimit?.count, 10) || (isReview ? 1 : 10));
    const configuredPrice = Number(quizLimitsMap?.[code]?.price);
    const base = Math.max(0.01, configuredPrice > 0 ? configuredPrice : 10) * (isReview ? 2 : 1);
    if (!user || user.role === 'admin') return { allowed: true, cost: 0, base, overLimit: false, mode, max, accountDaily: 0, deviceDaily: 0 };

    const key = isReview ? '__daily_review__' : String(code || '').trim();
    const today = getTaipeiDateKey();
    const account = pointsBankMap?.purchaseCounts?.accounts?.[pointsUserKey(user.email)]?.[key] || {};
    const device = pointsBankMap?.purchaseCounts?.devices?.[pointsDeviceId()]?.[key] || {};
    const accountDaily = account.dailyDate === today ? Number(account.dailyCount || 0) : 0;
    const deviceDaily = device.dailyDate === today ? Number(device.dailyCount || 0) : 0;
    const accountGlobal = Number(account.globalCount || 0);
    const deviceGlobal = Number(device.globalCount || 0);
    if (mode === 'global' && (accountGlobal >= max || deviceGlobal >= max)) {
        const isAccount = accountGlobal >= max;
        return {
            allowed: false, locked: true, cost: base, base, overLimit: false, mode, max,
            accountDaily, deviceDaily, accountGlobal, deviceGlobal,
            message: isAccount ? '此帳號的題庫永久購買次數已達上限，無法再購買。' : '此瀏覽器設定檔的題庫永久購買次數已達上限；更換帳號也無法繼續購買。'
        };
    }
    let cost = base;
    const used = mode === 'global' ? Math.max(accountGlobal, deviceGlobal) : Math.max(accountDaily, deviceDaily);
    const overLimit = mode === 'time' && used >= max;
    if (overLimit) {
        const tier = Math.max(1, used - max + 1);
        cost = Math.min(Number.MAX_SAFE_INTEGER, base * Math.pow(10, Math.min(tier, 15)));
    }
    return { allowed: true, cost: Math.round(cost * 100) / 100, base, overLimit, mode, max, accountDaily, deviceDaily, accountGlobal, deviceGlobal, key };
}

function applyPointsBankResult(result, options = {}) {
    if (result?.state) pointsBankMap = result.state;
    const treasuryStatus = document.getElementById('points-admin-treasury-status');
    if (treasuryStatus) {
        treasuryStatus.textContent = options.claimStatus || (pointsBankMap?.treasuryEmail ? `目前綁定帳戶：${pointsBankMap.treasuryEmail}` : '目前尚未綁定積分銀行帳戶。');
        treasuryStatus.classList.toggle('is-error', !!options.claimIsError);
    }
    if (document.getElementById('points-permanent-balance')) renderPointsWallet();
    if (currentUser) renderPublicQuizzesList();
    if (currentUser?.role === 'admin') {
        renderPointsAdminLedger();
        if (typeof updateAdminStats === 'function') updateAdminStats();
    }
    if (options.status && document.getElementById('points-wallet-status')) {
        const status = document.getElementById('points-wallet-status');
        status.textContent = options.status;
        status.classList.toggle('is-error', !!options.isError);
        status.classList.toggle('is-warning', !!options.isWarning);
    }
}

async function syncPointsBankAfterLogin() {
    if (!currentUser || typeof window.fbPointsBankAction !== 'function') return;
    if (pointsBankSyncPromise) return pointsBankSyncPromise;
    const loginEmail = currentUser.email;
    pointsBankSyncPromise = (async () => {
        try {
            let result = await window.fbPointsBankAction('refresh', { email: loginEmail, actorRole: currentUser?.role });
            if (currentUser?.email !== loginEmail) return;
            applyPointsBankResult(result, { status: result.ok ? '積分銀行餘額已同步。' : pointsActionMessage(result), isError: !result.ok });
            if (currentUser?.role === 'admin' && !pointsBankMap?.treasuryEmail) {
                result = await window.fbPointsBankAction('setTreasury', { actorRole: 'admin', actorEmail: loginEmail });
                applyPointsBankResult(result, { status: '積分銀行管理員帳戶已就緒。' });
            }
        } catch (error) {
            console.error('積分銀行同步失敗：', error);
            applyPointsBankResult(null, { status: '積分銀行暫時無法連線；點數交易需連線成功後才會執行。', isError: true });
        } finally {
            pointsBankSyncPromise = null;
        }
    })();
    return pointsBankSyncPromise;
}

async function claimPointsBankAdmin() {
    const status = document.getElementById('points-admin-treasury-status');
    const button = document.getElementById('admin-claim-points-treasury');
    if (!currentUser || currentUser.role !== 'admin') {
        if (status) { status.textContent = '只有管理員可以認領積分銀行帳戶。'; status.classList.add('is-error'); }
        return;
    }
    if (typeof window.fbPointsBankAction !== 'function') {
        if (status) { status.textContent = '積分銀行尚未連線，請稍後重試。'; status.classList.add('is-error'); }
        return;
    }
    const actorEmail = String(currentUser.email || '').trim();
    if (!actorEmail) {
        if (status) { status.textContent = '目前管理員帳號沒有可綁定的信箱。'; status.classList.add('is-error'); }
        return;
    }
    if (button) button.disabled = true;
    if (status) { status.textContent = '正在綁定目前管理員帳號…'; status.classList.remove('is-error'); }
    try {
        const result = await window.fbPointsBankAction('setTreasury', { actorRole: 'admin', actorEmail });
        if (currentUser?.email !== actorEmail) return;
        const success = !!result?.ok;
        const message = success ? `已將 ${actorEmail} 綁定為積分銀行帳戶。` : pointsActionMessage(result);
        applyPointsBankResult(result, { status: message, isError: !success, claimStatus: message, claimIsError: !success });
    } catch (error) {
        console.error('認領積分銀行帳戶失敗：', error);
        const message = '認領失敗，請確認網路連線後重試。';
        if (status) { status.textContent = message; status.classList.add('is-error'); }
    } finally {
        if (button) button.disabled = false;
    }
}

async function refreshPointsWallet() {
    if (!currentUser) return;
    if (typeof window.fbPointsBankAction !== 'function') return alert('積分銀行尚未連線。');
    const button = document.querySelector('.points-wallet-heading button');
    if (button) button.disabled = true;
    try {
        const result = await window.fbPointsBankAction('refresh', { email: currentUser.email, actorRole: currentUser.role });
        applyPointsBankResult(result, { status: result.ok ? '餘額及到期貸款已更新。' : pointsActionMessage(result), isError: !result.ok });
    } catch (error) {
        console.error(error);
        applyPointsBankResult(null, { status: '更新失敗，請確認網路後重試。', isError: true });
    } finally {
        if (button) button.disabled = false;
    }
}

function getPointsUserLoans(email) {
    return Object.values(pointsBankMap?.loans || {}).filter(loan => pointsUserKey(loan.userEmail) === pointsUserKey(email) && Number(loan.remainingPrincipal || 0) + Number(loan.remainingFee || 0) > 0.0001 && loan.status !== 'paid');
}

function getPointsLoanSummary(email) {
    const loans = getPointsUserLoans(email);
    const principal = loans.reduce((sum, loan) => sum + Number(loan.remainingPrincipal || 0), 0);
    const debt = loans.reduce((sum, loan) => sum + Number(loan.remainingPrincipal || 0) + Number(loan.remainingFee || 0), 0);
    const limit = Number(pointsBankMap?.loanLimits?.[pointsUserKey(email)]) || 0;
    const overdue = loans.some(loan => loan.status === 'overdue' || Number(loan.dueAt) <= Date.now());
    return { loans, principal: Math.round(principal * 100) / 100, debt: Math.round(debt * 100) / 100, limit, remaining: Math.max(0, Math.round((limit - principal) * 100) / 100), overdue };
}

function goToPointsBank() {
    if (!currentUser) return alert('請先登入後查看積分銀行。');
    switchView('account');
    window.setTimeout(() => document.getElementById('points-wallet-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
}

function renderPointsWallet() {
    const shortcut = document.getElementById('points-home-points-shortcut');
    if (!currentUser) { shortcut?.classList.add('hidden'); return; }
    shortcut?.classList.remove('hidden');
    const key = pointsUserKey(currentUser.email);
    const wallet = pointsBankMap?.wallets?.[key] || { permanent: 0, timedLots: [] };
    const now = Date.now();
    const lots = (Array.isArray(wallet.timedLots) ? wallet.timedLots : []).filter(lot => Number(lot.amount) > 0 && (!Number(lot.expiresAt) || Number(lot.expiresAt) > now)).sort((a, b) => (Number(a.expiresAt) || Number.MAX_SAFE_INTEGER) - (Number(b.expiresAt) || Number.MAX_SAFE_INTEGER));
    const timed = lots.reduce((sum, lot) => sum + Number(lot.amount || 0), 0);
    const totalBalance = Math.round((Number(wallet.permanent || 0) + timed) * 100) / 100;
    const loan = getPointsLoanSummary(currentUser.email);
    const summaryBalance = document.getElementById('points-home-total-balance');
    if (summaryBalance) summaryBalance.textContent = formatPoints(totalBalance);
    document.getElementById('points-permanent-balance').textContent = formatPoints(wallet.permanent || 0);
    document.getElementById('points-timed-balance').textContent = formatPoints(timed);
    document.getElementById('points-loan-balance').textContent = formatPoints(loan.debt);
    const status = document.getElementById('points-wallet-status');
    status.classList.toggle('is-warning', loan.overdue);
    status.classList.toggle('is-error', false);
    status.textContent = loan.overdue
        ? `目前有逾期欠款 ${formatPoints(loan.debt)} 點；已鎖定新借款。點數到帳後將依規則補結算。`
        : loan.debt > 0 ? `貸款尚未到期；未償本金 ${formatPoints(loan.principal)} 點，含固定 5% 費用的剩餘應還額 ${formatPoints(loan.debt)} 點。`
            : currentUser.role === 'admin' ? `銀行管理帳戶：${pointsBankMap?.treasuryEmail || currentUser.email}。管理員購買免扣點。`
                : '消費優先扣除最早到期的限時積分，再使用永久積分。';
    const lotsContainer = document.getElementById('points-timed-lots');
    lotsContainer.innerHTML = lots.length ? `<strong>限時積分批次（先用最早到期批次）</strong>${lots.map(lot => `<div class="points-timed-lot">${formatPoints(lot.amount)} 點 · 到期：${formatPointsDate(lot.expiresAt)}</div>`).join('')}` : '<div class="points-timed-lot">目前沒有有效的限時積分。</div>';
    const limit = Number(pointsBankMap?.loanLimits?.[key]) || 0;
    const loanInfo = document.getElementById('points-loan-limit-display');
    if (currentUser.role === 'admin') loanInfo.textContent = '管理員帳戶免受積分不足限制；銀行無需預先有帳面點數即可放款。';
    else loanInfo.textContent = `個人本金上限 ${formatPoints(limit)} 點；目前未償本金 ${formatPoints(loan.principal)} 點，可用額度 ${formatPoints(loan.remaining)} 點。${loan.overdue ? '逾期欠款中，借款功能已鎖定。' : limit <= loan.principal ? '已達上限或尚未設定上限。' : ''}`;
    const loansContainer = document.getElementById('points-user-loans');
    loansContainer.innerHTML = loan.loans.length ? `<strong>貸款明細</strong>${loan.loans.sort((a, b) => Number(a.dueAt) - Number(b.dueAt)).map(item => {
        const due = Number(item.remainingPrincipal || 0) + Number(item.remainingFee || 0);
        const overdue = item.status === 'overdue' || Number(item.dueAt) <= now;
        return `<div class="points-user-loan ${overdue ? 'is-overdue' : ''}">${overdue ? '逾期欠款' : '未到期貸款'}：本金 ${formatPoints(item.remainingPrincipal)} 點，費用 ${formatPoints(item.remainingFee)} 點，剩餘應還 ${formatPoints(due)} 點；到期 ${formatPointsDate(item.dueAt)}</div>`;
    }).join('')}` : '';
}

function pointsActionMessage(result) {
    const messages = {
        not_admin: '只有管理員可以執行此管理操作。',
        missing_user: '找不到指定帳號。',
        missing_code: '題庫資料不完整，請重新載入。',
        invalid_recipient: '收款帳號無效，不能轉給自己。',
        invalid_amount: '請輸入大於 0 的有效點數。',
        invalid_grant: '發放資料無效；限時積分需要晚於現在的到期時間。',
        insufficient: `積分不足（目前餘額 ${formatPoints(result.balance || 0)} 點）。`,
        account_global_limit: '此帳號已達題庫永久購買次數上限，不能用積分跳過。',
        device_global_limit: '此裝置設定檔已達題庫永久購買次數上限；切換帳號也無法購買。',
        overdue: '目前有逾期欠款，還款完成前不能再借款。',
        limit: '借款金額超過個人剩餘借款上限，或管理員尚未設定借款額度。',
        loan_limit: '借款超過個人可用上限；請先歸還積分或聯絡管理員調整額度。',
        admin_loan_not_needed: '管理員不受積分不足限制。',
        price_changed: '價格或購買次數剛被其他裝置更新，請確認最新價格後再購買。',
        loan_amount_changed: '餘額或價格已變動，所需借款超過您剛才同意的本金；請重新確認。',
        treasury_not_configured: '積分銀行管理員帳戶正在自動同步，請稍候片刻後重試。'
    };
    return messages[result?.reason] || '操作未完成，請稍後再試。';
}

function showPointsLoanConsent(context, amount, summaryText) {
    const principal = Math.max(0, Math.round(Number(amount) * 100) / 100);
    if (principal <= 0) return false;
    pendingPointsLoan = { ...context, amount: principal };
    document.getElementById('points-loan-consent').checked = false;
    document.getElementById('points-loan-confirm-btn').disabled = true;
    document.getElementById('points-loan-modal-title').textContent = context.type === 'purchase' ? '點數不足：積分銀行急難借款' : '積分銀行急難借款申請';
    document.getElementById('points-loan-modal-summary').innerHTML = `${summaryText}<br><strong>本次申請本金：${formatPoints(principal)} 點；固定 5% 費用：${formatPoints(principal * 0.05)} 點；到期應還：${formatPoints(principal * 1.05)} 點。</strong>`;
    document.getElementById('points-loan-modal').classList.remove('hidden');
    return true;
}

function togglePointsLoanConsent() {
    document.getElementById('points-loan-confirm-btn').disabled = !document.getElementById('points-loan-consent').checked;
}

function cancelPointsLoan() {
    const context = pendingPointsLoan;
    pendingPointsLoan = null;
    document.getElementById('points-loan-modal').classList.add('hidden');
    if (context?.type === 'purchase') {
        pendingQuizReview = false;
        if (context.purchaseKind === 'quiz' && currentUser) openQuizConfirmModal();
        renderPublicQuizzesList();
    }
}

async function requestPointsPurchase(kind, code, afterSuccess) {
    if (!currentUser) return false;
    if (currentUser.role === 'admin' || window.__rmsContestContext) { afterSuccess?.(); return true; }
    if (pointsActionPending) return false;
    const quote = getPointsPurchaseQuote(kind, code, currentUser);
    if (!quote.allowed) { alert(quote.message); return false; }
    if (typeof window.fbPointsBankAction !== 'function') { alert('積分銀行尚未連線，無法購買。'); return false; }
    const payload = {
        email: currentUser.email,
        actorRole: currentUser.role,
        code,
        kind,
        basePrice: quote.base / (kind === 'review' ? 2 : 1),
        limit: getQuizLimitForUser(code),
        deviceId: pointsDeviceId(),
        treasuryEmail: pointsBankMap?.treasuryEmail || globalUsersDB.find(user => user.role === 'admin')?.email || '',
        expectedCost: quote.cost
    };
    pointsActionPending = true;
    try {
        const result = await window.fbPointsBankAction('buy', payload);
        applyPointsBankResult(result);
        if (result.ok) {
            if (result.cost > 0) applyPointsBankResult(result, { status: `已購買${kind === 'review' ? '複習會話' : '作答資格'}，扣除 ${formatPoints(result.cost)} 點。` });
            afterSuccess?.();
            return true;
        }
        if (result.reason === 'insufficient') {
            const loan = getPointsLoanSummary(currentUser.email);
            if (loan.overdue) {
                applyPointsBankResult(result, { status: `目前有逾期欠款 ${formatPoints(loan.debt)} 點；請先還款後再申請借款。`, isWarning: true });
                alert(`積分不足，且目前有逾期欠款 ${formatPoints(loan.debt)} 點，借款功能已鎖定。請歸還積分後再試。`);
                return false;
            }
            if (loan.limit <= 0 || loan.remaining + 0.0001 < Number(result.shortfall || 0)) {
                applyPointsBankResult(result, { status: `借款額度不足：可用本金額度 ${formatPoints(loan.remaining)} 點，所需 ${formatPoints(result.shortfall)} 點。`, isWarning: true });
                alert(`積分不足；本次需要借 ${formatPoints(result.shortfall)} 點，但個人剩餘借款額度只有 ${formatPoints(loan.remaining)} 點。請歸還積分或聯絡管理員調整上限。`);
                return false;
            }
            showPointsLoanConsent({ type: 'purchase', purchaseKind: kind, payload: { ...payload, expectedCost: result.cost }, expectedCost: result.cost, approvedLoanAmount: result.shortfall, afterSuccess }, result.shortfall,
                `本次${kind === 'review' ? '完整複習會話' : '測驗'}價格 ${formatPoints(result.cost)} 點；目前可用餘額 ${formatPoints(result.balance)} 點，尚缺 ${formatPoints(result.shortfall)} 點。`);
            return false;
        }
        if (result.reason === 'price_changed') {
            alert(`${pointsActionMessage(result)} 最新估價 ${formatPoints(result.cost)} 點。`);
            if (kind === 'quiz' && currentUser) openQuizConfirmModal();
            else renderPublicQuizzesList();
            return false;
        }
        alert(pointsActionMessage(result));
        return false;
    } catch (error) {
        console.error('積分購買失敗：', error);
        alert(`積分購買目前無法完成：${error.message || '網路連線失敗'}`);
        return false;
    } finally {
        pointsActionPending = false;
    }
}

async function confirmPointsLoan() {
    if (!pendingPointsLoan || !currentUser || !document.getElementById('points-loan-consent').checked || pointsActionPending) return;
    const context = pendingPointsLoan;
    pointsActionPending = true;
    document.getElementById('points-loan-confirm-btn').disabled = true;
    try {
        let result;
        if (context.type === 'purchase') {
            result = await window.fbPointsBankAction('buy', {
                ...context.payload,
                acceptLoan: true,
                approvedLoanAmount: context.approvedLoanAmount
            });
        } else {
            result = await window.fbPointsBankAction('loan', {
                email: currentUser.email,
                actorRole: currentUser.role,
                amount: context.amount
            });
        }
        applyPointsBankResult(result);
        if (!result.ok) {
            pendingPointsLoan = null;
            document.getElementById('points-loan-modal').classList.add('hidden');
            if (result.reason === 'insufficient' || result.reason === 'loan_amount_changed' || result.reason === 'price_changed') {
                alert(`${pointsActionMessage(result)} ${result.shortfall ? `目前需借 ${formatPoints(result.shortfall)} 點。` : ''}`);
                if (context.purchaseKind === 'quiz' && currentUser) openQuizConfirmModal();
            } else alert(pointsActionMessage(result));
            pendingQuizReview = false;
            return;
        }
        pendingPointsLoan = null;
        document.getElementById('points-loan-modal').classList.add('hidden');
        document.getElementById('points-loan-amount').value = '';
        if (context.type === 'purchase') {
            applyPointsBankResult(result, { status: `已核准急難借款並完成購買；本次借款 ${formatPoints(result.borrowed)} 點，購買支出 ${formatPoints(result.cost)} 點。` });
            context.afterSuccess?.();
        } else {
            applyPointsBankResult(result, { status: `借款已核准 ${formatPoints(context.amount)} 點；本金 30 天到期，固定加還 5%。` });
        }
    } catch (error) {
        console.error('積分借款失敗：', error);
        alert(`借款目前無法完成：${error.message || '網路連線失敗'}`);
    } finally {
        pointsActionPending = false;
        if (document.getElementById('points-loan-modal').classList.contains('hidden')) document.getElementById('points-loan-confirm-btn').disabled = true;
    }
}

function requestDirectPointsLoan() {
    if (!currentUser) return alert('請先登入。');
    if (currentUser.role === 'admin') return alert('管理員不受積分不足限制，不需借款。');
    const amount = Math.round((Number(document.getElementById('points-loan-amount').value) || 0) * 100) / 100;
    if (amount <= 0) return alert('請輸入有效的借款本金。');
    const loan = getPointsLoanSummary(currentUser.email);
    if (loan.overdue) return alert(`目前有逾期欠款 ${formatPoints(loan.debt)} 點，清償前不能再借款。`);
    if (loan.limit <= 0 || amount + loan.principal > loan.limit) return alert(`本次本金超過個人剩餘借款額度。目前可借 ${formatPoints(loan.remaining)} 點。`);
    showPointsLoanConsent({ type: 'direct' }, amount, '您正在主動申請積分銀行急難救助借款。');
}

async function transferPoints() {
    if (!currentUser || pointsActionPending) return;
    const receiverText = document.getElementById('points-transfer-recipient').value.trim();
    const receiver = globalUsersDB.find(user => String(user.email).toLowerCase() === receiverText.toLowerCase());
    const amount = Math.round((Number(document.getElementById('points-transfer-amount').value) || 0) * 100) / 100;
    if (!receiver) return alert('找不到此收款帳號，請輸入對方登入信箱或帳號。');
    if (receiver.email.toLowerCase() === currentUser.email.toLowerCase()) return alert('不能轉帳給自己。');
    if (amount <= 0) return alert('請輸入大於 0 的轉帳點數。');
    if (!confirm(`確認轉帳 ${formatPoints(amount)} 點給 ${receiver.email}？限時積分會保留原到期日；轉帳不可撤回。`)) return;
    pointsActionPending = true;
    try {
        const result = await window.fbPointsBankAction('transfer', { email: currentUser.email, toEmail: receiver.email, amount, actorRole: currentUser.role });
        applyPointsBankResult(result);
        if (!result.ok) return alert(pointsActionMessage(result));
        document.getElementById('points-transfer-amount').value = '';
        applyPointsBankResult(result, { status: `已成功轉帳 ${formatPoints(amount)} 點給 ${receiver.email}。` });
    } catch (error) {
        console.error(error);
        alert(`轉帳失敗：${error.message || '網路連線失敗'}`);
    } finally { pointsActionPending = false; }
}

function populatePointsAdminUsers() {
    if (!currentUser || currentUser.role !== 'admin') return;
    const allTarget = document.getElementById('admin-points-grant-target');
    const regularUsers = globalUsersDB.filter(user => user.role !== 'admin');
    const grantPrevious = allTarget.value;
    allTarget.innerHTML = '<option value="__active_general__">群發：所有啟用中的一般用戶</option>';
    regularUsers.forEach(user => allTarget.add(new Option(`${user.name || user.email} (${user.email})${user.disabled ? ' [停用]' : ''}`, user.email)));
    if ([...allTarget.options].some(option => option.value === grantPrevious)) allTarget.value = grantPrevious;
    ['admin-points-deduct-target', 'admin-points-loan-target'].forEach(id => {
        const select = document.getElementById(id);
        const previous = select.value;
        select.innerHTML = '<option value="">選擇一般用戶</option>';
        regularUsers.forEach(user => select.add(new Option(`${user.name || user.email} (${user.email})${user.disabled ? ' [停用]' : ''}`, user.email)));
        if ([...select.options].some(option => option.value === previous)) select.value = previous;
    });
    const loanTarget = document.getElementById('admin-points-loan-target');
    if (loanTarget.value) document.getElementById('admin-points-loan-limit').value = pointsBankMap?.loanLimits?.[pointsUserKey(loanTarget.value)] || 0;
    loanTarget.onchange = () => { document.getElementById('admin-points-loan-limit').value = pointsBankMap?.loanLimits?.[pointsUserKey(loanTarget.value)] || 0; };
    toggleAdminPointsExpiry();
}

function toggleAdminPointsExpiry() {
    const type = document.getElementById('admin-points-grant-type');
    const expiry = document.getElementById('admin-points-grant-expiry');
    if (!type || !expiry) return;
    expiry.disabled = type.value !== 'timed';
    expiry.required = type.value === 'timed';
}

async function adminGrantPoints() {
    if (!currentUser || currentUser.role !== 'admin') return alert('只有管理員可以發放積分。');
    const target = document.getElementById('admin-points-grant-target').value;
    const pointType = document.getElementById('admin-points-grant-type').value;
    const amount = Math.round((Number(document.getElementById('admin-points-grant-amount').value) || 0) * 100) / 100;
    const reason = document.getElementById('admin-points-grant-reason').value.trim();
    const expiryInput = document.getElementById('admin-points-grant-expiry').value;
    const expiresAt = pointType === 'timed' ? new Date(expiryInput).getTime() : null;
    const recipients = target === '__active_general__'
        ? globalUsersDB.filter(user => user.role !== 'admin' && !user.disabled).map(user => user.email)
        : [target];
    if (!recipients[0] || amount <= 0) return alert('請選擇發放對象並輸入有效點數。');
    if (pointType === 'timed' && (!expiryInput || !Number.isFinite(expiresAt) || expiresAt <= Date.now())) return alert('請設定晚於現在的限時積分到期時間。');
    if (!confirm(`即將向 ${recipients.length} 個帳號發放 ${formatPoints(amount)} 點${pointType === 'timed' ? `限時積分（到期 ${formatPointsDate(expiresAt)}）` : '永久積分'}。繼續？`)) return;
    pointsActionPending = true;
    try {
        const result = await window.fbPointsBankAction('adminGrant', { actorRole: currentUser.role, actorEmail: currentUser.email, recipients, amount, pointType, expiresAt, reason });
        applyPointsBankResult(result);
        if (!result.ok) return alert(pointsActionMessage(result));
        document.getElementById('admin-points-grant-amount').value = '';
        applyPointsBankResult(result, { status: `已向 ${result.recipients} 個帳號完成積分發放。` });
    } catch (error) { console.error(error); alert(`發放失敗：${error.message || '網路連線失敗'}`); }
    finally { pointsActionPending = false; }
}

async function adminDeductPoints() {
    if (!currentUser || currentUser.role !== 'admin') return alert('只有管理員可以扣除積分。');
    const targetEmail = document.getElementById('admin-points-deduct-target').value;
    const amount = Math.round((Number(document.getElementById('admin-points-deduct-amount').value) || 0) * 100) / 100;
    const pointType = document.getElementById('admin-points-deduct-type').value;
    const reason = document.getElementById('admin-points-deduct-reason').value.trim();
    if (!targetEmail || amount <= 0 || !reason) return alert('請選擇帳號、輸入點數數量及扣除理由。');
    if (!confirm(`將從 ${targetEmail} 扣除 ${formatPoints(amount)} 點（${pointType === 'priority' ? '先限時後永久' : pointType === 'timed' ? '限時積分' : '永久積分'}）。繼續？`)) return;
    pointsActionPending = true;
    try {
        const result = await window.fbPointsBankAction('adminDeduct', { actorRole: currentUser.role, actorEmail: currentUser.email, targetEmail, amount, pointType, reason });
        applyPointsBankResult(result);
        if (!result.ok) return alert(pointsActionMessage(result));
        document.getElementById('admin-points-deduct-amount').value = '';
        applyPointsBankResult(result, { status: `已從 ${targetEmail} 扣除 ${formatPoints(amount)} 點。` });
    } catch (error) { console.error(error); alert(`扣點失敗：${error.message || '網路連線失敗'}`); }
    finally { pointsActionPending = false; }
}

async function adminSetPointsLoanLimit() {
    if (!currentUser || currentUser.role !== 'admin') return alert('只有管理員可以設定借款上限。');
    const targetEmail = document.getElementById('admin-points-loan-target').value;
    const limit = Math.round((Number(document.getElementById('admin-points-loan-limit').value) || 0) * 100) / 100;
    const reason = document.getElementById('admin-points-loan-reason').value.trim();
    if (!targetEmail) return alert('請選擇帳號。');
    pointsActionPending = true;
    try {
        const result = await window.fbPointsBankAction('setLoanLimit', { actorRole: currentUser.role, actorEmail: currentUser.email, targetEmail, limit, reason });
        applyPointsBankResult(result);
        if (!result.ok) return alert(pointsActionMessage(result));
        applyPointsBankResult(result, { status: `已設定 ${targetEmail} 的個人借款本金上限為 ${formatPoints(limit)} 點。` });
    } catch (error) { console.error(error); alert(`儲存借款上限失敗：${error.message || '網路連線失敗'}`); }
    finally { pointsActionPending = false; }
}

function pointsLedgerLabel(record) {
    const labels = { grant: '管理員發放', admin_deduct: '管理員扣點', purchase: record.purchaseKind === 'review' ? '購買題庫複習' : '購買題庫作答', transfer: '用戶轉帳', loan_issued: '急難借款', loan_repayment: '貸款還款', loan_limit: '設定借款上限' };
    return labels[record.type] || record.type || '積分交易';
}

function renderPointsAdminLedger() {
    const container = document.getElementById('admin-points-ledger');
    if (!container) return;
    if (!currentUser || currentUser.role !== 'admin') { container.innerHTML = '<div class="points-ledger-entry">請以管理員登入後查看。</div>'; return; }
    const records = Object.values(pointsBankMap?.ledger || {}).sort((a, b) => Number(b.at || 0) - Number(a.at || 0));
    if (!records.length) { container.innerHTML = '<div class="points-ledger-entry">目前沒有積分流水。</div>'; return; }
    const safe = value => escapeHtml(String(value ?? ''));
    container.innerHTML = records.map(record => {
        const who = record.type === 'transfer' ? `${record.fromEmail || ''} → ${record.toEmail || ''}` : record.userEmail || record.actorEmail || '銀行';
        const parts = Array.isArray(record.parts) && record.parts.length
            ? `點數來源：${record.parts.map(part => `${formatPoints(part.amount)} 點${part.type === 'timed' ? '限時' : '永久'}${part.expiresAt ? `（到期 ${formatPointsDate(part.expiresAt)}）` : ''}`).join('、')}`
            : '';
        const detail = [record.quizCode ? `題庫：${record.quizCode}` : '', record.pointType ? `類型：${record.pointType === 'timed' ? '限時' : '永久'}` : '', record.expiresAt ? `到期：${formatPointsDate(record.expiresAt)}` : '', record.dueAt ? `還款期限：${formatPointsDate(record.dueAt)}` : '', parts, record.reason || ''].filter(Boolean).join(' · ');
        const amount = record.type === 'admin_deduct' ? `−${formatPoints(record.amount)}` : `${formatPoints(record.amount)} 點`;
        return `<div class="points-ledger-entry"><strong>${safe(pointsLedgerLabel(record))}</strong><span>${safe(who)}${detail ? `<br>${safe(detail)}` : ''}<br><small>${safe(formatPointsDate(record.at))}</small></span><span class="points-ledger-amount">${safe(amount)}</span></div>`;
    }).join('');
}
