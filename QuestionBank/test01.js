window.currentQuiz = {
  name: "測試題庫1",
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