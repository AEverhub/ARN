window.currentQuiz = {
    name: "嵌入式系統與韌體開發實務測驗",
    password: "1234", 
    time: 15, // 測驗時間 15 分鐘
    data: [
        {
            q: "在進行 USB 裝置模擬時，哪一種韌體協定或手勢最常用於實作自動化指令執行（如 BadUSB 腳本）？",
            o: [
                "(A) USB Mass Storage",
                "(B) USB HID (Human Interface Device)",
                "(C) USB Audio Class",
                "(D) USB CDC-ACM"
            ],
            a: "B"
        },
        {
            q: "針對具有原生 USB 介面的微控制器（如 ESP32-S2 晶片），下列哪一個常見的 Python 執行環境常被用來快速編寫與除錯 HID 攻擊腳本？",
            o: [
                "(A) CircuitPython",
                "(B) MicroPython (純網路核心)",
                "(C) Node.js Embedded",
                "(D) Standard Arduino IDE C-only"
            ],
            a: "A"
        },
        {
            q: "在 C++ 語言進行陣列排序（例如氣泡排序 Bubble Sort）優化時，若某一輪迴圈中未發生任何相鄰元素的交換，最有效率的提早結束機制為何？",
            o: [
                "(A) 直接強制重新啟動 CPU",
                "(B) 使用指標（Pointer）將記憶體位址歸零",
                "(C) 引入一個布林值旗標（Swapped Flag）若為 false 則立即 break 跳出迴圈",
                "(D) 自動切換為遞迴呼叫"
            ],
            a: "C"
        },
        {
            q: "關於 ESP32-S2 晶片相較於傳統基礎款晶片的核心硬體特性，下列敘述何者正確？",
            o: [
                "(A) 具備完整的藍牙 5.0 雙模通訊能力",
                "(B) 具備原生 USB On-The-Go (OTG) / USB 介面支援，適合做為 USB 裝置開發",
                "(C) 內建硬體級 3D 繪圖加速引擎",
                "(D) 僅能使用低階組合語言進行燒錄"
            ],
            a: "B"
        },
        {
            q: "在實作無線網路 (WiFi) 相關的重新導向或 AP 邏輯時，若希望保留原本底層的硬體/天線喚醒機制（Antenna-wake logic），最佳的修改原則是什麼？",
            o: [
                "(A) 完整刪除舊有的底層中斷函式",
                "(B) 將天線供電直接切斷以節省電力",
                "(C) 確保原有的 AP 封包與天線喚醒邏輯不受破壞，僅在上方疊加或串接新的 URL 重導向函式",
                "(D) 強制將 Wi-Fi 降級為藍牙協定"
            ],
            a: "C"
        }
    ]
};
