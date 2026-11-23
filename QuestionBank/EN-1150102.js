// 英文 1150102 題庫（第 21–42 題），依 ARN currentQuiz 格式轉入。
window.currentQuiz = (function () {
  /* ---------- SVG 輔助函式 ---------- */
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = (x, y, arr, lh, attrs) =>
    `<text x="${x}" y="${y}" ${attrs || ""}>` +
    arr.map((l, i) => `<tspan x="${x}" dy="${i ? lh : 0}">${esc(l)}</tspan>`).join("") +
    `</text>`;

  /* ---------- 第 29–30 題：Elsa's Blog ---------- */
  function blogSvg() {
    const p1 = [
      "Watched Barbie this afternoon with Mom and Dad. I think",
      "it is a great movie. Mom and I like it very much, but Dad",
      "doesn't seem impressed. I found some very interesting",
      "reviews. Will add links to these blogs when I have",
      "finished reading them."
    ];
    const p2 = [
      "Aunt Nancy came to visit today. We haven't seen her for",
      "almost two years. She is my mom's youngest sister and a",
      "successful scientist. She asked what I wanted to be in the",
      "future. I said I had no idea at all. But, now I'll start to",
      "think about it."
    ];
    const p3 = [
      "Went to Pa Pasta with Mom. The owner is an Italian chef.",
      "He and his wife are my uncle's friends. They met when my",
      "uncle studied in Italy. My favorite dish is Beef Risotto",
      "(beef stew with rice). Mom ordered Spaghetti Vongole",
      "(white wine clam pasta). We both had ice cream for dessert.",
      "Happy time!"
    ];
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 530" role="img" font-family="Arial, Helvetica, sans-serif">`;
    s += `<rect x="8" y="8" width="624" height="514" fill="#fff" stroke="#444" stroke-width="1.5"/>`;
    s += `<text x="170" y="52" font-size="26" font-style="italic" font-weight="bold" fill="#111">Elsa's Blog</text>`;
    // 社群小圖示
    [["f", 500], ["X", 530], ["o", 560], ["▶", 590]].forEach(([t, x]) => {
      s += `<rect x="${x}" y="30" width="22" height="22" rx="3" fill="#fff" stroke="#333"/>`;
      s += `<text x="${x + 11}" y="46" text-anchor="middle" font-size="12" font-weight="bold">${t}</text>`;
    });
    // 導覽列
    s += `<rect x="8" y="72" width="624" height="34" fill="#c9c9c9"/>`;
    [["Home", 50], ["Blog", 190], ["About Me", 320], ["Contact", 490]].forEach(([t, x]) => {
      s += `<rect x="${x - 22}" y="82" width="14" height="14" rx="2" fill="#333"/>`;
      s += `<text x="${x}" y="95" font-size="14" font-weight="bold" fill="#111">${t}</text>`;
    });
    s += `<text x="24" y="132" font-size="16" font-weight="bold">Recent Posts</text>`;
    // 貼文
    const post = (date, y, arr) =>
      `<text x="24" y="${y}" font-size="14" font-weight="bold" font-style="italic">${date}</text>` +
      lines(24, y + 20, arr, 18, `font-size="13.5" fill="#111"`);
    s += post("April 2, 2026", 158, p1);
    s += post("April 6, 2026", 280, p2);
    s += post("April 8, 2026", 402, p3);
    // 頭像
    s += `<circle cx="535" cy="190" r="58" fill="#fff" stroke="#222" stroke-width="2"/>`;
    s += `<circle cx="535" cy="182" r="26" fill="#fff" stroke="#222" stroke-width="2"/>`;
    s += `<path d="M509 180 Q512 150 535 152 Q558 150 561 180 Q548 166 535 166 Q522 166 509 180Z" fill="#222"/>`;
    s += `<circle cx="526" cy="186" r="2.5" fill="#222"/><circle cx="544" cy="186" r="2.5" fill="#222"/>`;
    s += `<path d="M528 196 Q535 202 542 196" fill="none" stroke="#222" stroke-width="2"/>`;
    s += `<path d="M493 236 Q497 214 520 210 L550 210 Q573 214 577 236" fill="#fff" stroke="#222" stroke-width="2"/>`;
    s += lines(535, 275, ["Hi, I'm Elsa.", "Welcome to my", "blog!"], 20, `text-anchor="middle" font-size="14" font-weight="bold"`);
    s += `</svg>`;
    return s;
  }

  /* ---------- 第 31–32 題：折線圖 ---------- */
  function lineChartSvg() {
    const years = [2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024];
    const S = [
      { lab: ["Oil and Petroleum", "Products"], d: [54, 54.5, 55.5, 48.5, 50, 50, 49.5, 47.5, 45, 45.5, 45], dash: "1.5 3", w: 2, ly: 80 },
      { lab: ["Coal and Coal", "Products"], d: [31, 32, 31, 34, 33, 33.5, 33.5, 33, 34, 32.5, 30], dash: "", w: 1.5, ly: 130 },
      { lab: ["Natural Gas"], d: [7.5, 8.2, 9.9, 13, 13.2, 13.5, 16, 16, 18.5, 20, 22], dash: "7 4", w: 2, ly: 180 },
      { lab: ["Nuclear"], d: [9, 9, 10, 9.7, 9.8, 9, 5.5, 6, 6.8, 5, 3], dash: "", w: 3, ly: 225 },
      { lab: ["Renewable Energy"], d: [1.5, 1.7, 1.9, 2.1, 2.3, 2.5, 2.7, 2.8, 3, 3.1, 3.3], dash: "10 4 2 4", w: 2, ly: 270 }
    ];
    const X = (y) => 60 + ((y - 2004) / 20) * 380;
    const Y = (v) => 320 - v * 4.5;
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 385" role="img" font-family="Arial, Helvetica, sans-serif">`;
    s += `<rect x="1" y="1" width="618" height="383" fill="#fff" stroke="#999"/>`;
    s += `<text x="300" y="28" text-anchor="middle" font-size="16" font-weight="bold">Energy Supply in Taiwan from 2004 to 2024</text>`;
    for (let v = 0; v <= 60; v += 10) {
      s += `<line x1="60" y1="${Y(v)}" x2="440" y2="${Y(v)}" stroke="#d0d0d0"/>`;
      s += `<text x="52" y="${Y(v) + 4}" text-anchor="end" font-size="11">${v.toFixed(2)}</text>`;
    }
    s += `<line x1="60" y1="50" x2="60" y2="320" stroke="#333"/><line x1="60" y1="320" x2="440" y2="320" stroke="#333"/>`;
    years.forEach((y) => {
      s += `<text x="${X(y)}" y="338" text-anchor="middle" font-size="11">${y}</text>`;
    });
    s += `<text x="250" y="362" text-anchor="middle" font-size="12" font-weight="bold">Year</text>`;
    s += `<text transform="rotate(-90 14 185)" x="14" y="185" text-anchor="middle" font-size="12" font-weight="bold">Percentage</text>`;
    S.forEach((se) => {
      const pts = se.d.map((v, i) => `${X(years[i]).toFixed(1)},${Y(v).toFixed(1)}`).join(" ");
      const da = se.dash ? ` stroke-dasharray="${se.dash}"` : "";
      s += `<polyline points="${pts}" fill="none" stroke="#111" stroke-width="${se.w}"${da}/>`;
      s += `<line x1="452" y1="${se.ly}" x2="484" y2="${se.ly}" stroke="#111" stroke-width="${se.w}"${da}/>`;
      s += lines(492, se.ly + 4, se.lab, 14, `font-size="12"`);
    });
    s += `</svg>`;
    return s;
  }

  /* ---------- 第 33–35 題：長條圖 ---------- */
  function barChartSvg() {
    const rows = [
      ["Nobu Restaurant", 10.1],
      ["The Cheesecake Factory", 12.4],
      ["Smith and Wollensky", 13.4],
      ["Del Frisco's Double Eagle Steak House", 13.8],
      ["Mastro's Restaurants", 14.5],
      ["Din Tai Fung", 27.4]
    ];
    const x0 = 250, k = 12, top = 52, pitch = 38, bh = 22;
    const axisY = top + rows.length * pitch;
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 335" role="img" font-family="Arial, Helvetica, sans-serif">`;
    s += `<rect x="1" y="1" width="638" height="333" fill="#fff" stroke="#999"/>`;
    s += `<text x="330" y="30" text-anchor="middle" font-size="16" font-weight="bold">The Revenue per Store for the US Restaurant Chains</text>`;
    [0, 10, 20, 30].forEach((v) => {
      s += `<line x1="${x0 + v * k}" y1="${top - 6}" x2="${x0 + v * k}" y2="${axisY}" stroke="#e0e0e0"/>`;
      s += `<text x="${x0 + v * k}" y="${axisY + 18}" text-anchor="middle" font-size="12">${v}</text>`;
    });
    s += `<line x1="${x0}" y1="${top - 6}" x2="${x0}" y2="${axisY}" stroke="#333"/>`;
    rows.forEach(([name, v], i) => {
      const y = top + i * pitch + (pitch - bh) / 2 - 4;
      const w = v * k;
      s += `<text x="${x0 - 10}" y="${y + bh / 2 + 4}" text-anchor="end" font-size="12.5">${esc(name)}</text>`;
      s += `<rect x="${x0}" y="${y}" width="${w}" height="${bh}" fill="#f1f1f1" stroke="#222" stroke-width="1.2"/>`;
      s += `<rect x="${x0 + w - 42}" y="${y + 3}" width="38" height="${bh - 6}" fill="#fff" stroke="#222"/>`;
      s += `<text x="${x0 + w - 23}" y="${y + bh / 2 + 4}" text-anchor="middle" font-size="12" font-weight="bold">${v}</text>`;
    });
    s += `<text x="${x0 + 180}" y="${axisY + 42}" text-anchor="middle" font-size="13" font-weight="bold">Revenue ( Million USD )</text>`;
    s += `<text transform="rotate(-90 16 170)" x="16" y="170" text-anchor="middle" font-size="13" font-weight="bold">US Restaurant Chains</text>`;
    s += `</svg>`;
    return s;
  }

  /* ---------- 文章段落 ---------- */
  const P_MARITIME = `May 18 is International Day for Women in Maritime, which recognizes the importance of women in the ocean transport industry. The theme for 2025 was “An Ocean of Opportunities for Women.” In Taiwan, women represent only 4% of seafarers (航海人員). __21__ the 260 women seafarers, many have proved that seafaring can be a rewarding career. One woman who shows the way is Huang Chao-ling (黃昭玲). Huang, who was a captain, is Taiwan’s first and only female harbor pilot. As a harbor pilot, she guides ships safely in and out of the port, which is a __22__ job that requires taking risks, such as climbing onto a moving ship in big waves. Another front-runner is Lin Chia-ling (林嘉玲), Taiwan’s first woman oil tanker captain. Lin’s job is to ensure reliable delivery of oil to all ports in Taiwan, __23__ the weather is terrible. Huang and Lin share a hard career path, given that women seafarers face various challenges, including insufficient onboard facilities. Today, the maritime industry is working to create a gender-friendly workplace __24__. Such efforts are seeing results, with the number of Taiwanese women captains standing at 22 in 2024, up from 6 about ten years ago.`;

  const P_BRIDGE = `The Tamkang Bridge (淡江大橋) has been under construction since 2019 and is ready for use this year. It was built because the Tamsui (淡水) and Bali (八里) areas have grown quickly in recent years, and more people now commute between them. Once it opens, people can save about half an hour when traveling between the two places. Besides making __25__ smooth, the bridge will also appeal to visitors with its special architectural style. It was designed by the world-famous architect Zaha Hadid. Being the first bridge in Taiwan __26__ through an international design competition, the Tamkang Bridge will become the world’s longest single-tower asymmetric cable-stayed bridge (單塔不對稱斜張橋). Expressing a sense of art and beauty, the bridge’s 200-meter tower rises into the sky, __27__ a dancer were lifting both hands in prayer. Moreover, the bridge’s shape goes well with the sunset over the Tamsui River, making the view much more eye-catching. Visitors can appreciate the riverside views here. With shorter travel time between Tamsui and Bali and its unique beauty, the Tamkang Bridge will play an important role in both __28__. The bridge will definitely bring travel convenience and recreational benefits to the people of northern Taiwan.`;

  const P_BLOG = `Elsa is telling Pam about her new hobby. Answer the questions based on the conversation and the blog.

Elsa: Hey, Pam, I’ve started a blog.
Pam: Really? What kind of things do you post?
Elsa: Anything I feel like posting.
Pam: You have to be careful about your personal information.
Elsa: Of course! I never give out personal information like my address or things like that.
Pam: And will you link to other sites and other blogs?
Elsa: Yes, I’ll link to good podcasting blogs.`;

  const P_SOLAR = `Read the following line chart and paragraph about energy. Then answer the questions.

Renewable energy in Taiwan includes solar energy. Solar energy comes from natural sources, renews quickly, and does not produce large amounts of greenhouse gases. When considering the transition to solar energy, it is important to weigh both the advantages and disadvantages. One major advantage of solar energy is that sunlight is plentiful and does not run out like natural gas or oil. Solar power can also help lower electricity bills. Besides, with owned solar panels, the property value can be increased. However, solar energy has some challenges. Since it depends on sunlight, we need battery storage systems to save the energy for cloudy days and nighttime. Although these systems are quite expensive, they provide limited energy storage. In addition, solar panels also require a lot of space, which can be a problem in crowded urban areas.`;

  const P_DTF = `As the chart below shows, Din Tai Fung (鼎泰豐) has emerged as the top-performing restaurant in the United States (US) in terms of revenue* per store, according to the 2025 Technomic Top 500 Chain Restaurant Report.

Founded in 1958 in Taiwan as a cooking oil business, Din Tai Fung began selling xiao long bao in 1972 in Taipei. About 25 years later, it opened its first American branch store in Los Angeles. Over the years, it has expanded to 180 branch stores in 13 countries around the world.

Din Tai Fung’s success was not achieved through expensive ads. Instead, the restaurant chain has built its brand on global consistent product excellence, operational discipline, and social media buzz. Whether in Los Angeles or Taipei, customers experience the same taste and service. Every Din Tai Fung xiao long bao is folded exactly 18 times and weighs precisely 21 grams. Through glass walls, customers can see chefs in the kitchen, making xiao long bao with exactness and care. The way the chefs make the food, the steam coming off the baskets, and the perfect look of each dish all make for great photos and videos. Customers post the pictures and share their dining experience widely online, giving the brand effective publicity. The consistent quality, combined with visual pleasure and the power of social media, has made Din Tai Fung successful and popular in the US.

*revenue 營收`;

  const P_TEEN = `Recent studies show that teenagers experience more anxiety and mental health issues than those in earlier generations. In his book The Anxious Generation: How the Great Rewiring of Childhood Is Causing an Epidemic of Mental Illness, Professor Jonathan Haidt explains that two major changes in childhood are mainly responsible for their problems.

First, these young people lost real-world freedom during childhood. Their parents tended to protect them too much and carefully control their daily activities. They were not encouraged to explore outdoors, take risks, and solve problems independently. As a result, they might have missed many opportunities to develop confidence and independence. According to Professor Haidt, plenty of free, unsupervised outdoor play is important for healthy development. Without outdoor play, children may be less willing to try new things as they grow into teenagers.

Another major change is the shift from a play-based childhood to a phone-based one. Since childhood, these young people have often spent many hours using smartphones and social media for leisure activities. This leads to several problems. For example, they do not get enough sleep because of long hours on screens. Instead of interacting face to face, they often communicate online, making them feel less connected to people in the real world. Also, constant phone messages and addictive apps make it hard for them to stay focused. When they cannot check their phones, they feel anxious.`;

  const P_TECH = `Taiwan is a global high-tech powerhouse because of its dynamic industries. Of these, the electronics industry is best known for its importance in the digital age. This industry has a competitive strength which was built from years of developing expertise in electronics manufacturing.

Electronics manufacturing in Taiwan began around the mid-20th century. Initially, companies produced mainly components according to customers’ designs and requirements, functioning as contract manufacturers for other brands. In the process, they learned to adapt, innovate, and compete. By the 1990s, Taiwan had become a global leader in computer and notebook production. Major manufacturers developed the expert skills and knowledge for product designing and innovation. Today, some of them are able to provide a full range of electronics manufacturing services (EMS). These EMS providers serve various industries that include computing, communications, and consumer electronics. Four Taiwanese companies are among the world’s top ten EMS providers.

Taiwan’s electronics industry owes its success to several factors. First, there is a ready pool of professionals to meet industry needs. Secondly, official policies provide the necessary industrial support. Thirdly, a wide network of local suppliers adds to better efficiency and innovation. Last but not least, manufacturers pay special attention to producing high-quality products, rather than competing on price.

Currently, the great demand for AI products offers new business opportunities. Manufacturers who ride the wave of change are making more money from AI servers than from iPhones. For the first time, AI-related products have beaten consumer electronics in manufacturing business. In fact, Taiwan made over 80 percent of the world’s AI servers (伺服器) in 2025. Quite clearly, this demonstrates the ability of Taiwan’s electronics industry to move forward with technology.`;

  /* ---------- 組題 ---------- */
  const H1 = "▲下篇短文共有 4 個空格，為第 21–24 題，請依短文文意，選出一個最適合該空格的答案。";
  const H2 = "▲下篇短文共有 4 個空格，為第 25–28 題，請依短文文意，選出一個最適合該空格的答案。";
  const mk = (head, passage, stem) => `${head}\n\n${passage}\n\n${stem}`;

  return {
    name: "英文1150102",
    time: 30,
    mode: 1,
    data: [
      /* ===== III. 綜合測驗 21–24 ===== */
      { q: mk(H1, P_MARITIME, "第 21 題：請選出空格 21 的最適合答案。"), o: ["(A) Among", "(B) During", "(C) Near", "(D) Opposite"], a: "A" },
      { q: mk(H1, P_MARITIME, "第 22 題：請選出空格 22 的最適合答案。"), o: ["(A) domestic", "(B) remote", "(C) simple", "(D) tough"], a: "D" },
      { q: mk(H1, P_MARITIME, "第 23 題：請選出空格 23 的最適合答案。"), o: ["(A) even when", "(B) just where", "(C) or else", "(D) so that"], a: "A" },
      { q: mk(H1, P_MARITIME, "第 24 題：請選出空格 24 的最適合答案。"), o: ["(A) to pose a career obstacle", "(B) to increase ocean-going ships", "(C) to improve women’s employment", "(D) to raise women’s work challenges"], a: "C" },

      /* ===== 綜合測驗 25–28 ===== */
      { q: mk(H2, P_BRIDGE, "第 25 題：請選出空格 25 的最適合答案。"), o: ["(A) air quality", "(B) traffic flow", "(C) water safety", "(D) local culture"], a: "B" },
      { q: mk(H2, P_BRIDGE, "第 26 題：請選出空格 26 的最適合答案。"), o: ["(A) selected", "(B) selecting", "(C) is selected", "(D) to select"], a: "A" },
      { q: mk(H2, P_BRIDGE, "第 27 題：請選出空格 27 的最適合答案。"), o: ["(A) as if", "(B) in case", "(C) in order that", "(D) as long as"], a: "A" },
      { q: mk(H2, P_BRIDGE, "第 28 題：請選出空格 28 的最適合答案。"), o: ["(A) dance and design", "(B) art and competition", "(C) construction and religion", "(D) transportation and tourism"], a: "D" },

      /* ===== IV. 閱讀測驗 29–30（Elsa's Blog） ===== */
      {
        q: mk("▲閱讀下文，回答第 29–30 題", P_BLOG, "第 29 題：What did Elsa post on her blog?"),
        svg: blogSvg,
        svgAlt: "Elsa’s Blog 網頁：Recent Posts 有 4 月 2 日看 Barbie 電影、4 月 6 日 Nancy 阿姨來訪、4 月 8 日與媽媽去 Pa Pasta 吃飯三篇貼文",
        o: ["(A) Family life.", "(B) Pasta menu.", "(C) Movie reviews.", "(D) School activities."],
        a: "A"
      },
      {
        q: mk("▲閱讀下文，回答第 29–30 題", P_BLOG, "第 30 題：According to the passage, what would Elsa probably do with her blog next?"),
        svg: blogSvg,
        svgAlt: "Elsa’s Blog 網頁：Recent Posts 有 4 月 2 日看 Barbie 電影、4 月 6 日 Nancy 阿姨來訪、4 月 8 日與媽媽去 Pa Pasta 吃飯三篇貼文",
        o: ["(A) Post her school activities.", "(B) Link to Aunt Nancy’s blog.", "(C) Link to movie review blogs.", "(D) Post her address and date of birth."],
        a: "C"
      },

      /* ===== 31–32（折線圖 + 太陽能段落） ===== */
      {
        q: mk("▲閱讀下文，回答第 31–32 題", P_SOLAR, "第 31 題：According to the line chart, what is one trend in Taiwan’s energy supply from 2004 to 2024?"),
        svg: lineChartSvg,
        svgAlt: "折線圖：2004 到 2024 年臺灣能源供給百分比，石油約 45–55%、煤約 30–34%、天然氣由約 7% 上升到約 22%、核能由約 9% 降到約 3%、再生能源約 1.5–3.5%",
        o: [
          "(A) Energy generated by natural gas has gradually decreased for the last 20 years.",
          "(B) Nuclear energy has accounted for more than 10% of the energy supply since 2004.",
          "(C) Coal and coal products have been supplying about 30% of the total energy since 2004.",
          "(D) Energy supplied by oil and petroleum products has steadily increased over the past 20 years."
        ],
        a: "C"
      },
      {
        q: mk("▲閱讀下文，回答第 31–32 題", P_SOLAR, "第 32 題：According to the paragraph, which of the following are the challenges of solar energy?"),
        svg: lineChartSvg,
        svgAlt: "折線圖：2004 到 2024 年臺灣能源供給百分比，石油約 45–55%、煤約 30–34%、天然氣由約 7% 上升到約 22%、核能由約 9% 降到約 3%、再生能源約 1.5–3.5%",
        o: [
          "(A) House value and pollution concerns.",
          "(B) Energy source and greenhouse gases.",
          "(C) Energy costs and weather dependence.",
          "(D) Energy storage and space requirements."
        ],
        a: "D"
      },

      /* ===== 33–35（長條圖 + 鼎泰豐） ===== */
      {
        q: mk("▲閱讀下文，回答第 33–35 題", P_DTF, "第 33 題：According to the chart, which of the following is correct?"),
        svg: barChartSvg,
        svgAlt: "橫條圖：美國連鎖餐廳每店營收（百萬美元），Nobu 10.1、Cheesecake Factory 12.4、Smith and Wollensky 13.4、Del Frisco’s 13.8、Mastro’s 14.5、鼎泰豐 27.4",
        o: [
          "(A) The revenue per store of the Cheesecake Factory is half of that of Din Tai Fung.",
          "(B) The revenue per store of Mastro’s Restaurants is higher than that of Nobu Restaurant.",
          "(C) Nobu Restaurant has higher revenue per store than Del Frisco’s Double Eagle Steak House.",
          "(D) Smith and Wollensky’s revenue per store is one million USD more than that of Din Tai Fung."
        ],
        a: "B"
      },
      {
        q: mk("▲閱讀下文，回答第 33–35 題", P_DTF, "第 34 題：Which of the following is NOT mentioned as a reason that makes Din Tai Fung successful?"),
        svg: barChartSvg,
        svgAlt: "橫條圖：美國連鎖餐廳每店營收（百萬美元），Nobu 10.1、Cheesecake Factory 12.4、Smith and Wollensky 13.4、Del Frisco’s 13.8、Mastro’s 14.5、鼎泰豐 27.4",
        o: [
          "(A) Every xiao long bao is folded 18 times and weighs 21 grams.",
          "(B) Din Tai Fung has 180 stores in 13 countries all over the world.",
          "(C) Customers can see chefs preparing food in glass-walled kitchens.",
          "(D) Customer service and taste of food are the same in any branch store."
        ],
        a: "B"
      },
      {
        q: mk("▲閱讀下文，回答第 33–35 題", P_DTF, "第 35 題：Which is the correct order about Din Tai Fung’s business history?\na. Starting to sell xiao long bao in 1972.\nb. Opening its first American branch store.\nc. Setting up a cooking oil business in Taiwan.\nd. Achieving the most revenue per store in the US."),
        svg: barChartSvg,
        svgAlt: "橫條圖：美國連鎖餐廳每店營收（百萬美元），Nobu 10.1、Cheesecake Factory 12.4、Smith and Wollensky 13.4、Del Frisco’s 13.8、Mastro’s 14.5、鼎泰豐 27.4",
        o: ["(A) a → b → c → d", "(B) a → d → c → b", "(C) c → a → b → d", "(D) c → d → b → a"],
        a: "C"
      },

      /* ===== 36–38（青少年焦慮） ===== */
      {
        q: mk("▲閱讀下文，回答第 36–38 題", P_TEEN, "第 36 題：Which of the following is the best conclusion for the above passage?"),
        o: [
          "(A) In a phone-based world, teenagers will spend more time on digital technologies like virtual reality and online shopping. These technologies will help them solve problems effectively, so companies should develop new features to meet their needs.",
          "(B) To address these concerns, teenagers should be allowed to use social media for two reasons: to make new friends and to talk to people face to face. In this way, they will become more confident about their future.",
          "(C) Smartphones have become part of everyday life. Teenagers cannot avoid using digital devices as apps become more interesting. Therefore, parents should help their children benefit from technology instead of strictly limiting their phone use.",
          "(D) To solve these problems, the following actions are suggested. First, children should spend more time interacting with people face to face instead of communicating online. Also, schools should provide more time and space for free, unsupervised play."
        ],
        a: "D"
      },
      {
        q: mk("▲閱讀下文，回答第 36–38 題", P_TEEN, "第 37 題：According to the passage, which of the following is true?"),
        o: [
          "(A) Too many free, unsupervised activities make it hard for teenagers to focus and sleep.",
          "(B) A lack of guidance from parents is a main reason causing teenagers’ mental health issues.",
          "(C) Growing up in a phone-based childhood helps teenagers develop new skills and make friends easily.",
          "(D) The loss of outdoor play in childhood and too much online time may cause teenagers’ anxiety problems."
        ],
        a: "D"
      },
      {
        q: mk("▲閱讀下文，回答第 36–38 題", P_TEEN, "第 38 題：According to the passage, what would happen to children when their parents overprotected them?"),
        o: [
          "(A) It would be easier for them to deal with problems on their own.",
          "(B) They would develop a strong sense of teamwork and risk-taking.",
          "(C) It would be harder for them to become confident and independent.",
          "(D) They would have no problem making friends in a new environment."
        ],
        a: "C"
      },

      /* ===== 39–42（臺灣電子業） ===== */
      {
        q: mk("▲閱讀下文，回答第 39–42 題", P_TECH, "第 39 題：What is the passage mainly about?"),
        o: [
          "(A) Markets for Taiwan’s AI-related products.",
          "(B) Progress of Taiwan’s electronics industry.",
          "(C) Development of artificial intelligence industry.",
          "(D) Examples of Taiwan’s electronics manufacturers."
        ],
        a: "B"
      },
      {
        q: mk("▲閱讀下文，回答第 39–42 題", P_TECH, "第 40 題：According to the passage, which is NOT an important reason for the strength of Taiwan’s electronics industry?"),
        o: ["(A) Labor pool.", "(B) Government support.", "(C) Business network.", "(D) Product price."],
        a: "D"
      },
      {
        q: mk("▲閱讀下文，回答第 39–42 題", P_TECH, "第 41 題：Which is closest in meaning to “ride the wave of change” in paragraph 4?"),
        o: [
          "(A) let go of these new opportunities",
          "(B) have trouble with making the change",
          "(C) end up with missing new opportunities",
          "(D) take advantage of the new change"
        ],
        a: "D"
      },
      {
        q: mk("▲閱讀下文，回答第 39–42 題", P_TECH, "第 42 題：According to the passage, which of the following is true?"),
        o: [
          "(A) Ten Taiwanese companies are providing electronic manufacturing services.",
          "(B) Taiwan was the world’s largest market for AI-related products in the 1990s.",
          "(C) AI servers are selling better than smartphones for electronics manufacturers.",
          "(D) Contract manufacturers in the early days designed new products for customers."
        ],
        a: "C"
      }
    ]
  };
})();
