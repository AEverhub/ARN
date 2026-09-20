window.currentQuiz = {
    name: "公開測試題庫",
    time: 15,
    data: [
        {
            q: "在進行 USB 裝置模擬時，哪一種韌體協定最常用於實作自動化指令執行？",
            o: [
                "(A) USB Mass Storage",
                "(B) USB HID (Human Interface Device)",
                "(C) USB Audio Class",
                "(D) USB CDC-ACM"
            ],
            a: "B"
        },

        {
            type: "handwriting",
            q: "請計算：125 × 24，請寫出完整計算過程與最後答案。",
            answer: "3000",
            score: 10,
            rubric: "答案正確且計算過程合理得 10 分；答案正確但過程不完整得 8 分；過程合理但答案錯誤得部分分數。"
        },

        {
            q: "在 C++ 氣泡排序優化時，若某一輪沒有元素交換，最佳做法是什麼？",
            o: [
                "(A) 重新啟動 CPU",
                "(B) 將指標歸零",
                "(C) 使用布林旗標，若未交換則 break",
                "(D) 改成遞迴"
            ],
            a: "C"
        },

        {
            type: "handwriting",
            q: "請解方程式：2x + 6 = 20，請寫出移項過程與 x 的答案。",
            answer: "x = 7",
            score: 10,
            rubric: "需要檢查移項及除法過程；答案與過程完整得 10 分。"
        }
    ]
};