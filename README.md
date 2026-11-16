# ARN 線上測驗系統

這個儲存庫包含測驗系統前端、Firebase 整合與題庫腳本。題庫 JavaScript 集中放在 `QuestionBank/`；登入、題目畫面及既有管理功能仍由原系統提供。

## 專案結構

```text
index.html
assets/
  css/
    styles.css
    mbti.css
  js/
    mathjax-config.js
    app.js
    extensions.js
    firebase.js
    mbti.js
QuestionBank/
  <題庫代碼>.js
```

舊有題庫腳本已清除；新題庫請放在 `QuestionBank/`，檔名需為「題庫代碼.js」。例如代碼 `math001` 對應 `QuestionBank/math001.js`。題庫代碼僅可使用英文字母、數字、底線及短橫線。

系統會在公開題庫清單、管理員題庫狀態檢查及開始測驗時，從 `QuestionBank/<代碼>.js` 載入題庫。既有的 `window.currentQuiz` 與 `window.bankData_*` 格式仍可使用。

## 一般題庫格式

```js
window.currentQuiz = {
  name: "電子學基礎題庫",
  time: 15,
  mode: 1,
  data: [
    {
      q: "電流的基本單位是什麼？",
      o: ["(A) 安培 (A)", "(B) 伏特 (V)", "(C) 歐姆 (Ω)", "(D) 瓦特 (W)"],
      a: "A"
    }
  ]
};
```

- `name`：題庫顯示名稱。
- `time`：測驗時間（分鐘）；未設定時系統使用預設值。
- `mode`：題目洗牌模式。`1` 固定題序及選項；`2` 洗牌選項；`3` 洗牌題目；`4` 題目及選項皆洗牌。
- `data`：題目陣列。每題至少需提供 `q` 或 `question`。

### 單選題

```js
{
  q: "2 + 2 = ?",
  o: ["(A) 3", "(B) 4", "(C) 5", "(D) 6"],
  a: "B"
}
```

### 複選題

```js
{
  type: "multiple",
  q: "下列哪些是程式語言？",
  o: ["(A) C++", "(B) Python", "(C) HDMI", "(D) JavaScript"],
  a: ["A", "B", "D"]
}
```

### 簡答題

```js
{
  type: "short",
  q: "請寫出水的化學式。",
  answer: "H2O",
  acceptedAnswers: ["H2O", "H₂O"],
  keywords: ["H", "O"],
  score: 10,
  rubric: "答案正確得 10 分。"
}
```

簡答題及手寫題的 AI 批改功能仍沿用系統原有設定；使用者需在系統內設定可用的 API。

### 手寫題

```js
{
  type: "handwriting",
  q: "請計算：2x + 6 = 20，並寫出計算過程。",
  answer: "x = 7",
  score: 10,
  rubric: "依計算步驟與最後答案給分。"
}
```

## 在題目中繪製 SVG

在題目物件新增 `svg` 函式即可。函式回傳 SVG 字串，測驗時會顯示在題目敘述下方、選項上方。`svgAlt` 可提供圖形的無障礙文字描述。圖形可依題號動態產生：

```js
window.currentQuiz = {
  name: "SVG 圖形題示範",
  time: 10,
  data: [
    {
      q: "請觀察座標圖，判斷直線的斜率。",
      svgAlt: "座標平面上有一條通過原點的上升直線",
      svg: ({ index }) => `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img">
          <rect width="320" height="180" rx="12" fill="#f8fafc"/>
          <path d="M40 145H290M55 160V20" stroke="#475569" stroke-width="2"/>
          <path d="M65 135L260 40" stroke="#2563eb" stroke-width="5"/>
          <circle cx="65" cy="135" r="5" fill="#dc2626"/>
          <text x="80" y="30" font-size="18" fill="#0f172a">第 ${index + 1} 題</text>
        </svg>`
    }
  ]
};
```

也可以直接提供字串，例如 `svg: "<svg ...>...</svg>"`。SVG 會經過基本清理：移除腳本、事件處理屬性、嵌入式 HTML 與外部資源引用。請使用自包含的 SVG，避免依賴外部圖片或字型。

## 圖片路徑

一般圖片檔可繼續放在儲存庫根目錄；由於題庫腳本現在位於 `QuestionBank/`，題目圖片路徑必須以題庫腳本所在資料夾為基準。例如引用根目錄的圖片，使用 `../EC-P2-1.jpg`：

```js
{
  q: "請觀察電路圖後回答。",
  image: "../EC-P2-1.jpg",
  imageAlt: "電路圖",
  o: ["(A) 選項一", "(B) 選項二", "(C) 選項三", "(D) 選項四"],
  a: "A"
}
```

也可以把圖片放在 `QuestionBank/images/`，再使用 `images/figure.png`。路徑以題庫腳本網址解析，不是以 `index.html` 解析。

## 舊版題庫相容性

系統仍支援 `window.bankData_*` 格式，例如：

```js
window.bankData_001 = {
  title: "電子學基礎題庫",
  questions: [
    { q: "電流的基本單位是什麼？", options: ["安培", "伏特", "歐姆", "瓦特"], ans: 0 }
  ]
};
```

題庫格式仍支援 `window.bankData_*`。舊題庫腳本已依需求清除；如果 Firebase 公開清單仍有舊題庫代碼，請先新增同代碼的新腳本或移除舊公開設定。選項洗牌時，系統仍會同步調整正確答案標記。

## 檢查及管理

管理員在「題庫公開快捷管理」輸入檔名（不含 `.js`），按下「檢查狀態」確認載入成功後，再選擇是否公開。題庫檔案會由瀏覽器下載並執行，因此不要在題庫腳本內放入密碼、API Key 或其他機密資料。發布前建議確認題庫名稱、題目數、題目答案及圖片路徑。
