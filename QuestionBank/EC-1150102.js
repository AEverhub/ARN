window.currentQuiz = {
  name: "電子學1150102（圖片+文字）",
  time: 50,
  mode: 4,
  data: [
    {
      q: "一個 AC 110V 的電源，用 220V：12V 的電源變壓器降壓後，次級線圈的電壓為多少？",
      o: [
        "(A) 6V",
        "(B) 12V",
        "(C) 24V",
        "(D) 220V"
      ],
      a: "A"
    },
    {
      q: "如圖 3-1 所示之理想變壓器電路，初級線圈的電流 $I_1$ 為多少？",
      preserveOptionOrder: true,
      svgAlt: "理想變壓器，初級 AC 110V 正弦波，匝數比 110V:11V，次級接 11Ω 負載，標示 I1、I2 電流方向",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 210" role="img"><rect width="400" height="210" rx="12" fill="#f8fafc"/><circle cx="40" cy="60" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="40" cy="150" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="44,60 130,60" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="44,150 130,150" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M130,60 V74.4 M130,74.4 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 M130,135.6 V150" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="137,60 137,150" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="142,60 142,150" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M149,60 V74.4 M149,74.4 a7.65,7.65 0 0 1 0,15.3 a7.65,7.65 0 0 1 0,15.3 a7.65,7.65 0 0 1 0,15.3 a7.65,7.65 0 0 1 0,15.3 M149,135.6 V150" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="149,60 300,60 300,86" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="300,86 300,94 293,97 307,103 293,109 307,115 293,121 307,127 300,130 300,138" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="300,138 300,150 149,150" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="143" y="36" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">110V : 11V</tspan></text><text x="80" y="100" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">AC 110V</tspan></text><text x="80" y="120" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"><tspan font-style="normal">正弦波</tspan></text><line x1="70" y1="46" x2="102" y2="46" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="108,46 99.64,49.34 99.64,42.66" fill="#16a34a"/><text x="88" y="38" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">I</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">1</tspan></text><line x1="210" y1="46" x2="242" y2="46" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="248,46 239.64,49.34 239.64,42.66" fill="#16a34a"/><text x="229" y="38" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">I</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">2</tspan></text><text x="314" y="118" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">11Ω</tspan></text></svg>`,
      o: [
        "(A) 0.01A",
        "(B) 0.1A",
        "(C) 1A",
        "(D) 10A"
      ],
      a: "B"
    },
    {
      q: "AC 110V 60Hz 的電源經全波整流後，其輸出電壓之頻率為多少？",
      o: [
        "(A) 30Hz",
        "(B) 60Hz",
        "(C) 120Hz",
        "(D) 240Hz"
      ],
      a: "C"
    },
    {
      q: "如圖 3-2 所示之 $V_{out}$ 直流電壓約為多少？",
      preserveOptionOrder: true,
      svgAlt: "半波整流電路：AC 110V 經 11:2 變壓器，串接二極體後接負載 RL，輸出 Vout",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 220" role="img"><rect width="410" height="220" rx="12" fill="#f8fafc"/><circle cx="30" cy="70" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="30" cy="160" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="34,70 110,70" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="34,160 110,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M110,70 V84.4 M110,84.4 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 M110,145.6 V160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="117,70 117,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="122,70 122,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M129,70 V84.4 M129,84.4 a7.65,7.65 0 0 1 0,15.3 a7.65,7.65 0 0 1 0,15.3 a7.65,7.65 0 0 1 0,15.3 a7.65,7.65 0 0 1 0,15.3 M129,145.6 V160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="124" y="46" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">11 : 2</tspan></text><text x="60" y="108" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">AC 110V</tspan></text><text x="60" y="128" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"><tspan font-style="normal">正弦波</tspan></text><polyline points="129,70 176.5,70" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="192.5,70 240,70" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(184.5 70) rotate(0)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="240,70 320,70" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="260" cy="70" r="3.4" fill="#1f2937"/><circle cx="320" cy="70" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="260,70 260,94" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="260,94 260,102 253,105 267,111 253,117 267,123 253,129 267,135 260,138 260,146" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="260,146 260,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="260" cy="160" r="3.4" fill="#1f2937"/><polyline points="129,160 320,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="320" cy="160" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="276" y="124" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">R</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">L</tspan></text><line x1="345" y1="106" x2="345" y2="78" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="345,72 348.34,80.36 341.66,80.36" fill="#16a34a"/><line x1="345" y1="124" x2="345" y2="152" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="345,158 341.66,149.64 348.34,149.64" fill="#16a34a"/><text x="354" y="80" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="354" y="120" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">out</tspan></text><text x="354" y="160" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text></svg>`,
      o: [
        "(A) 0.6V",
        "(B) 9V",
        "(C) 12.6V",
        "(D) 18V"
      ],
      a: "B"
    },
    {
      q: "如圖 3-3 所示之電路，二極體的耐壓 (PIV) 不得小於幾伏特？",
      preserveOptionOrder: true,
      svgAlt: "中間抽頭全波整流電路：110V:6V 變壓器，兩個二極體，負載 RL 接於抽頭與二極體輸出端之間",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 250" role="img"><rect width="440" height="250" rx="12" fill="#f8fafc"/><circle cx="30" cy="80" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="30" cy="170" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="34,80 110,80" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="34,170 110,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M110,80 V94.4 M110,94.4 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 M110,155.6 V170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="117,50 117,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="122,50 122,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M129,50 V61.2 M129,61.2 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 M129,108.8 V120" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M129,120 V131.2 M129,131.2 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 M129,178.8 V190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="129,50 206.5,50" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="222.5,50 300,50" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(214.5 50) rotate(0)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="300,50 380,50 380,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="129,190 206.5,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="222.5,190 300,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(214.5 190) rotate(0)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="300,190 380,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="129,120 240,120" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="240,120 248,120 251.33,113 258,127 264.67,113 271.33,127 278,113 284.67,127 288,120 296,120" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="296,120 380,120" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="380" cy="120" r="3.4" fill="#1f2937"/><text x="124" y="28" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">110V : 6V</tspan></text><text x="58" y="118" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">AC 110V</tspan></text><text x="58" y="138" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"><tspan font-style="normal">正弦波</tspan></text><text x="268" y="102" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">R</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">L</tspan></text></svg>`,
      o: [
        "(A) 3V",
        "(B) $3\\sqrt{2}$V",
        "(C) $6\\sqrt{2}$V",
        "(D) $12\\sqrt{2}$V"
      ],
      a: "C"
    },
    {
      q: "若圖 3-3 之二極體為理想二極體，則 $R_L$ 兩端之直流電壓約為多少？",
      preserveOptionOrder: true,
      svgAlt: "中間抽頭全波整流電路：110V:6V 變壓器，兩個二極體，負載 RL 接於抽頭與二極體輸出端之間",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 250" role="img"><rect width="440" height="250" rx="12" fill="#f8fafc"/><circle cx="30" cy="80" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="30" cy="170" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="34,80 110,80" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="34,170 110,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M110,80 V94.4 M110,94.4 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 M110,155.6 V170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="117,50 117,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="122,50 122,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M129,50 V61.2 M129,61.2 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 M129,108.8 V120" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M129,120 V131.2 M129,131.2 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 M129,178.8 V190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="129,50 206.5,50" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="222.5,50 300,50" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(214.5 50) rotate(0)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="300,50 380,50 380,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="129,190 206.5,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="222.5,190 300,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(214.5 190) rotate(0)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="300,190 380,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="129,120 240,120" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="240,120 248,120 251.33,113 258,127 264.67,113 271.33,127 278,113 284.67,127 288,120 296,120" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="296,120 380,120" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="380" cy="120" r="3.4" fill="#1f2937"/><text x="124" y="28" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">110V : 6V</tspan></text><text x="58" y="118" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">AC 110V</tspan></text><text x="58" y="138" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"><tspan font-style="normal">正弦波</tspan></text><text x="268" y="102" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">R</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">L</tspan></text></svg>`,
      o: [
        "(A) 1.35V",
        "(B) 2.7V",
        "(C) 3V",
        "(D) 5.4V"
      ],
      a: "B"
    },
    {
      q: "如圖 3-4 所示之 $V_{out}$ 直流電壓約為多少？",
      preserveOptionOrder: true,
      svgAlt: "半波整流加 100μF 濾波電容：AC 110V 經 11:2 變壓器、二極體，輸出 Vout（無負載）",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 220" role="img"><rect width="410" height="220" rx="12" fill="#f8fafc"/><circle cx="30" cy="70" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="30" cy="160" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="34,70 110,70" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="34,160 110,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M110,70 V84.4 M110,84.4 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 M110,145.6 V160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="117,70 117,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="122,70 122,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M129,70 V84.4 M129,84.4 a7.65,7.65 0 0 1 0,15.3 a7.65,7.65 0 0 1 0,15.3 a7.65,7.65 0 0 1 0,15.3 a7.65,7.65 0 0 1 0,15.3 M129,145.6 V160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="124" y="46" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">11 : 2</tspan></text><text x="60" y="108" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">AC 110V</tspan></text><text x="60" y="128" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"><tspan font-style="normal">正弦波</tspan></text><polyline points="129,70 176.5,70" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="192.5,70 240,70" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(184.5 70) rotate(0)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="240,70 320,70" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="260" cy="70" r="3.4" fill="#1f2937"/><circle cx="320" cy="70" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="260,70 260,111" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="260,119 260,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="248,111 272,111" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="248,119 272,119" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="260" cy="160" r="3.4" fill="#1f2937"/><polyline points="129,160 320,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="320" cy="160" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="278" y="120" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">100μF</tspan></text><line x1="345" y1="106" x2="345" y2="78" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="345,72 348.34,80.36 341.66,80.36" fill="#16a34a"/><line x1="345" y1="124" x2="345" y2="152" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="345,158 341.66,149.64 348.34,149.64" fill="#16a34a"/><text x="354" y="80" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="354" y="120" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">out</tspan></text><text x="354" y="160" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text></svg>`,
      o: [
        "(A) 12.6V",
        "(B) 14V",
        "(C) 20V",
        "(D) 28V"
      ],
      a: "D"
    },
    {
      q: "如圖 3-4 所示之電路，二極體的耐壓 (PIV) 不得小於幾伏特？",
      preserveOptionOrder: true,
      svgAlt: "半波整流加 100μF 濾波電容：AC 110V 經 11:2 變壓器、二極體，輸出 Vout（無負載）",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 410 220" role="img"><rect width="410" height="220" rx="12" fill="#f8fafc"/><circle cx="30" cy="70" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="30" cy="160" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="34,70 110,70" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="34,160 110,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M110,70 V84.4 M110,84.4 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 a7.65,7.65 0 0 0 0,15.3 M110,145.6 V160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="117,70 117,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="122,70 122,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M129,70 V84.4 M129,84.4 a7.65,7.65 0 0 1 0,15.3 a7.65,7.65 0 0 1 0,15.3 a7.65,7.65 0 0 1 0,15.3 a7.65,7.65 0 0 1 0,15.3 M129,145.6 V160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="124" y="46" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">11 : 2</tspan></text><text x="60" y="108" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">AC 110V</tspan></text><text x="60" y="128" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"><tspan font-style="normal">正弦波</tspan></text><polyline points="129,70 176.5,70" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="192.5,70 240,70" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(184.5 70) rotate(0)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="240,70 320,70" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="260" cy="70" r="3.4" fill="#1f2937"/><circle cx="320" cy="70" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="260,70 260,111" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="260,119 260,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="248,111 272,111" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="248,119 272,119" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="260" cy="160" r="3.4" fill="#1f2937"/><polyline points="129,160 320,160" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="320" cy="160" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="278" y="120" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">100μF</tspan></text><line x1="345" y1="106" x2="345" y2="78" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="345,72 348.34,80.36 341.66,80.36" fill="#16a34a"/><line x1="345" y1="124" x2="345" y2="152" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="345,158 341.66,149.64 348.34,149.64" fill="#16a34a"/><text x="354" y="80" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="354" y="120" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">out</tspan></text><text x="354" y="160" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text></svg>`,
      o: [
        "(A) 20V",
        "(B) 28V",
        "(C) 40V",
        "(D) 57V"
      ],
      a: "D"
    },
    {
      q: "對於電容濾波電路之敘述，下列何者正確？",
      o: [
        "(A) 無載時漣波最小",
        "(B) 滿載時漣波最小",
        "(C) 電容量越大，漣波越大",
        "(D) 負載電流越大，漣波越小"
      ],
      a: "A"
    },
    {
      q: "如圖 3-5 所示之電路，漣波電壓的峰對峰值 $V_{r(P-P)}$ 約為多少？",
      preserveOptionOrder: true,
      svgAlt: "半波整流加 100μF 電容濾波，AC 110V 60Hz 正弦波，負載 RL 電流 60mA",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 200" role="img"><rect width="360" height="200" rx="12" fill="#f8fafc"/><circle cx="30" cy="60" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="34,60 74,60" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="90,60 130,60" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(82 60) rotate(0)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="130,60 290,60 290,88" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="190" cy="60" r="3.4" fill="#1f2937"/><polyline points="190,60 190,101" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,109 190,150" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="178,101 202,101" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="178,109 202,109" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="190" cy="150" r="3.4" fill="#1f2937"/><polyline points="290,88 290,96 283,99 297,105 283,111 297,117 283,123 297,129 290,132 290,140" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="290,140 290,150" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="34,150 290,150" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="30" cy="150" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><line x1="205" y1="46" x2="256" y2="46" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="262,46 253.64,49.34 253.64,42.66" fill="#16a34a"/><text x="233" y="34" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">60mA</tspan></text><text x="206" y="112" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">100μF</tspan></text><text x="306" y="118" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">R</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">L</tspan></text><text x="76" y="100" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">AC 110V</tspan></text><text x="76" y="120" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">60Hz</tspan></text><text x="76" y="140" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"><tspan font-style="normal">正弦波</tspan></text></svg>`,
      o: [
        "(A) 5V",
        "(B) 10V",
        "(C) 60V",
        "(D) 110V"
      ],
      a: "B"
    },
    {
      q: "如圖 3-5 所示之電路，二極體的耐壓 (PIV) 不得小於幾伏特？",
      preserveOptionOrder: true,
      svgAlt: "半波整流加 100μF 電容濾波，AC 110V 60Hz 正弦波，負載 RL 電流 60mA",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 200" role="img"><rect width="360" height="200" rx="12" fill="#f8fafc"/><circle cx="30" cy="60" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="34,60 74,60" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="90,60 130,60" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(82 60) rotate(0)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="130,60 290,60 290,88" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="190" cy="60" r="3.4" fill="#1f2937"/><polyline points="190,60 190,101" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,109 190,150" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="178,101 202,101" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="178,109 202,109" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="190" cy="150" r="3.4" fill="#1f2937"/><polyline points="290,88 290,96 283,99 297,105 283,111 297,117 283,123 297,129 290,132 290,140" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="290,140 290,150" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="34,150 290,150" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="30" cy="150" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><line x1="205" y1="46" x2="256" y2="46" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="262,46 253.64,49.34 253.64,42.66" fill="#16a34a"/><text x="233" y="34" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">60mA</tspan></text><text x="206" y="112" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">100μF</tspan></text><text x="306" y="118" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">R</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">L</tspan></text><text x="76" y="100" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">AC 110V</tspan></text><text x="76" y="120" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">60Hz</tspan></text><text x="76" y="140" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"><tspan font-style="normal">正弦波</tspan></text></svg>`,
      o: [
        "(A) 110V",
        "(B) $110\\sqrt{2}$V",
        "(C) 220V",
        "(D) $220\\sqrt{2}$V"
      ],
      a: "D"
    },
    {
      q: "某直流電源供應器輸出之直流電壓為 30V，漣波電壓的有效值為 60mV，則漣波因數為多少？",
      o: [
        "(A) 0.002",
        "(B) 1.8",
        "(C) 60",
        "(D) 500"
      ],
      a: "A"
    },
    {
      q: "某電源供應器在未接負載時輸出電壓為 30V，接上滿載的負載後輸出電壓為 25V，則電壓調整率為多少？",
      o: [
        "(A) 5%",
        "(B) 17%",
        "(C) 20%",
        "(D) 55%"
      ],
      a: "C"
    },
    {
      q: "如圖 3-6 所示之電路，下列有關 $V_{out}$ 漣波電壓的峰對峰值之敘述，何者正確？",
      preserveOptionOrder: true,
      svgAlt: "橋式整流加濾波電容 C 與負載 RL，輸入 Vin = Vm sin ωt，輸出 Vout",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 550 260" role="img"><rect width="550" height="260" rx="12" fill="#f8fafc"/><circle cx="30" cy="60" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="30" cy="180" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="34,60 230,60" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="34,180 230,180" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="230,60 258.93,84.79" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="271.07,95.21 300,120" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(265 90) rotate(40.6)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="230,180 258.93,155.21" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="271.07,144.79 300,120" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(265 150) rotate(-40.6)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="160,120 188.93,95.21" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="201.07,84.79 230,60" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(195 90) rotate(-40.6)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="160,120 188.93,144.79" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="201.07,155.21 230,180" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(195 150) rotate(40.6)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="300,120 470,120" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="350" cy="120" r="3.4" fill="#1f2937"/><circle cx="420" cy="120" r="3.4" fill="#1f2937"/><polyline points="350,120 350,171" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="350,179 350,230" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="338,171 362,171" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="338,179 362,179" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="420,120 420,145" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="420,145 420,153 413,156.67 427,164 413,171.33 427,178.67 413,186 427,193.33 420,197 420,205" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="420,205 420,230" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="160,120 160,230 470,230" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="350" cy="230" r="3.4" fill="#1f2937"/><circle cx="420" cy="230" r="3.4" fill="#1f2937"/><circle cx="470" cy="120" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="470" cy="230" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><line x1="492" y1="166" x2="492" y2="128" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="492,122 495.34,130.36 488.66,130.36" fill="#16a34a"/><line x1="492" y1="184" x2="492" y2="222" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="492,228 488.66,219.64 495.34,219.64" fill="#16a34a"/><text x="501" y="130" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="501" y="180" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">out</tspan></text><text x="501" y="230" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text><text x="14" y="126" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">in</tspan><tspan font-style="normal" dy="-3.75">=</tspan><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">m</tspan><tspan font-style="normal" dy="-3.75"> sin</tspan><tspan font-style="italic">ωt</tspan><tspan font-style="normal"> V</tspan></text><text x="366" y="182" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">C</tspan></text><text x="436" y="182" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">R</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">L</tspan></text></svg>`,
      o: [
        "(A) 與 $V_{in}$ 的頻率成正比",
        "(B) 與 $V_m$ 成正比",
        "(C) 與 $R_L$ 的電阻值成正比",
        "(D) 與 C 的電容量成正比"
      ],
      a: "B"
    },
    {
      q: "如圖 3-7 所示之電路，若 $R_L=22\\text{k}\\Omega$，$C=10\\mu\\text{F}$，則輸出電壓 $v_o$ 的波形為下列何者？",
      preserveOptionOrder: true,
      svgAlt: "中間抽頭全波整流（110V 60Hz，次級 12V+12V，D1、D2）加電容濾波；上方為 (A)(B)(C)(D) 四個 vo 波形：(A) 全波 T=8.33ms 無濾波、(B) 全波 T=8.33ms 小漣波、(C) T=16.67ms 無濾波、(D) T=16.67ms 小漣波",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 545" role="img"><rect width="560" height="545" rx="12" fill="#f8fafc"/><path d="M50,105 C57.2,31.67 66.8,31.67 74,105 C81.2,31.67 90.8,31.67 98,105 C105.2,31.67 114.8,31.67 122,105 C129.2,31.67 138.8,31.67 146,105 C153.2,31.67 162.8,31.67 170,105 C177.2,31.67 186.8,31.67 194,105 C201.2,31.67 210.8,31.67 218,105 C225.2,31.67 234.8,31.67 242,105" fill="none" stroke="#dc2626" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/><line x1="46" y1="105" x2="258" y2="105" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/><polygon points="264,105 255.64,108.34 255.64,101.66" fill="#1f2937"/><line x1="46" y1="105" x2="46" y2="33" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/><polygon points="46,27 49.34,35.36 42.66,35.36" fill="#1f2937"/><text x="34" y="120" font-size="14" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">0</tspan></text><text x="40" y="39" font-size="15" fill="#1f2937" text-anchor="end" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">v</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">o</tspan></text><text x="270" y="110" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">t</tspan></text><line x1="74" y1="105" x2="74" y2="33" stroke="#1f2937" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="98" y1="105" x2="98" y2="33" stroke="#1f2937" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="86" y1="39" x2="92" y2="39" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="98,39 89.64,42.34 89.64,35.66" fill="#16a34a"/><line x1="86" y1="39" x2="80" y2="39" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="74,39 82.36,35.66 82.36,42.34" fill="#16a34a"/><text x="86" y="27" font-size="13" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">T</tspan><tspan font-style="normal">=8.33ms</tspan></text><text x="8" y="69" font-size="17" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">(A)</tspan></text><path d="M320,105 C321.2,74.75 323.6,50 326,50 Q335.6,52 344,59 Q345.44,53 350,50 Q359.6,52 368,59 Q369.44,53 374,50 Q383.6,52 392,59 Q393.44,53 398,50 Q407.6,52 416,59 Q417.44,53 422,50 Q431.6,52 440,59 Q441.44,53 446,50 Q455.6,52 464,59 Q465.44,53 470,50 Q479.6,52 488,59 Q489.44,53 494,50 Q503.6,52 512,59" fill="none" stroke="#dc2626" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/><line x1="316" y1="105" x2="528" y2="105" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/><polygon points="534,105 525.64,108.34 525.64,101.66" fill="#1f2937"/><line x1="316" y1="105" x2="316" y2="33" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/><polygon points="316,27 319.34,35.36 312.66,35.36" fill="#1f2937"/><text x="304" y="120" font-size="14" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">0</tspan></text><text x="310" y="39" font-size="15" fill="#1f2937" text-anchor="end" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">v</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">o</tspan></text><text x="540" y="110" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">t</tspan></text><line x1="344" y1="105" x2="344" y2="33" stroke="#1f2937" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="368" y1="105" x2="368" y2="33" stroke="#1f2937" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="356" y1="39" x2="362" y2="39" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="368,39 359.64,42.34 359.64,35.66" fill="#16a34a"/><line x1="356" y1="39" x2="350" y2="39" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="344,39 352.36,35.66 352.36,42.34" fill="#16a34a"/><text x="356" y="27" font-size="13" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">T</tspan><tspan font-style="normal">=8.33ms</tspan></text><text x="278" y="69" font-size="17" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">(B)</tspan></text><path d="M50,250 C64.4,176.67 83.6,176.67 98,250 C112.4,176.67 131.6,176.67 146,250 C160.4,176.67 179.6,176.67 194,250 C208.4,176.67 227.6,176.67 242,250" fill="none" stroke="#dc2626" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/><line x1="46" y1="250" x2="258" y2="250" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/><polygon points="264,250 255.64,253.34 255.64,246.66" fill="#1f2937"/><line x1="46" y1="250" x2="46" y2="178" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/><polygon points="46,172 49.34,180.36 42.66,180.36" fill="#1f2937"/><text x="34" y="265" font-size="14" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">0</tspan></text><text x="40" y="184" font-size="15" fill="#1f2937" text-anchor="end" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">v</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">o</tspan></text><text x="270" y="255" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">t</tspan></text><line x1="98" y1="250" x2="98" y2="178" stroke="#1f2937" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="146" y1="250" x2="146" y2="178" stroke="#1f2937" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="122" y1="184" x2="140" y2="184" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="146,184 137.64,187.34 137.64,180.66" fill="#16a34a"/><line x1="122" y1="184" x2="104" y2="184" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="98,184 106.36,180.66 106.36,187.34" fill="#16a34a"/><text x="122" y="172" font-size="13" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">T</tspan><tspan font-style="normal">=16.67ms</tspan></text><text x="8" y="214" font-size="17" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">(C)</tspan></text><path d="M320,250 C322.4,219.75 327.2,195 332,195 Q351.2,197 368,204 Q370.88,198 380,195 Q399.2,197 416,204 Q418.88,198 428,195 Q447.2,197 464,204 Q466.88,198 476,195 Q495.2,197 512,204" fill="none" stroke="#dc2626" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/><line x1="316" y1="250" x2="528" y2="250" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/><polygon points="534,250 525.64,253.34 525.64,246.66" fill="#1f2937"/><line x1="316" y1="250" x2="316" y2="178" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/><polygon points="316,172 319.34,180.36 312.66,180.36" fill="#1f2937"/><text x="304" y="265" font-size="14" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">0</tspan></text><text x="310" y="184" font-size="15" fill="#1f2937" text-anchor="end" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">v</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">o</tspan></text><text x="540" y="255" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">t</tspan></text><line x1="368" y1="250" x2="368" y2="178" stroke="#1f2937" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="416" y1="250" x2="416" y2="178" stroke="#1f2937" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="392" y1="184" x2="410" y2="184" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="416,184 407.64,187.34 407.64,180.66" fill="#16a34a"/><line x1="392" y1="184" x2="374" y2="184" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="368,184 376.36,180.66 376.36,187.34" fill="#16a34a"/><text x="392" y="172" font-size="13" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">T</tspan><tspan font-style="normal">=16.67ms</tspan></text><text x="278" y="214" font-size="17" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">(D)</tspan></text><circle cx="80" cy="395" r="17" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M70,395 C74,383 77,383 80,395 S86,407 90,395" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="52" y="391" font-size="15" fill="#1f2937" text-anchor="end" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">110V</tspan></text><text x="52" y="409" font-size="15" fill="#1f2937" text-anchor="end" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">60Hz</tspan></text><polyline points="80,378 80,345 160,345" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="80,412 80,445 160,445" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="104" y="337" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="104" y="466" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text><path d="M160,345 V361 M160,361 a8.5,8.5 0 0 0 0,17 a8.5,8.5 0 0 0 0,17 a8.5,8.5 0 0 0 0,17 a8.5,8.5 0 0 0 0,17 M160,429 V445" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="167,325 167,465" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="172,325 172,465" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M179,325 V336.2 M179,336.2 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 M179,383.8 V395" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M179,395 V406.2 M179,406.2 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 a5.95,5.95 0 0 1 0,11.9 M179,453.8 V465" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="192" y="349" font-size="14" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="192" y="367" font-size="14" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">12V</tspan></text><text x="192" y="385" font-size="14" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text><text x="192" y="419" font-size="14" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="192" y="437" font-size="14" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">12V</tspan></text><text x="192" y="455" font-size="14" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text><polyline points="179,325 216.5,325" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="232.5,325 270,325" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(224.5 325) rotate(0)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="179,465 216.5,465" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="232.5,465 270,465" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(224.5 465) rotate(0)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="270,465 300,465 300,325" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="270,325 500,325" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="300" cy="325" r="3.4" fill="#1f2937"/><text x="224" y="306" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">D</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">1</tspan></text><text x="224" y="494" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">D</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">2</tspan></text><polyline points="179,395 252,395 252,505 500,505" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="370,325 370,411" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="370,419 370,505" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="358,411 382,411" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="358,419 382,419" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="370" cy="325" r="3.4" fill="#1f2937"/><circle cx="370" cy="505" r="3.4" fill="#1f2937"/><text x="352" y="420" font-size="14" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="352" y="440" font-size="14" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text><text x="388" y="420" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">C</tspan></text><polyline points="440,325 440,385" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="440,385 440,393 433,396.67 447,404 433,411.33 447,418.67 433,426 447,433.33 440,437 440,445" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="440,445 440,505" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="440" cy="325" r="3.4" fill="#1f2937"/><circle cx="440" cy="505" r="3.4" fill="#1f2937"/><text x="456" y="420" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">R</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">L</tspan></text><circle cx="500" cy="325" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="500" cy="505" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="512" y="331" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="512" y="420" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">v</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">o</tspan></text><text x="512" y="511" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text></svg>`,
      o: [
        "(A) 波形 (A)",
        "(B) 波形 (B)",
        "(C) 波形 (C)",
        "(D) 波形 (D)"
      ],
      a: "B"
    },
                        {
      q: "關於 BJT 電晶體之 B、C、E 三極摻雜濃度之敘述，下列何者正確？",
      o: [
        "(A) B 極濃度最高",
        "(B) C 極、E 極濃度相同且較 B 極高",
        "(C) C 極濃度最高",
        "(D) E 極濃度最高"
      ],
      a: "D"
    },
    {
      q: "若把電晶體的 E 與 C 對調使用，則電流增益與耐壓會如何？",
      o: [
        "(A) 增大",
        "(B) 降低",
        "(C) 不變",
        "(D) 不一定"
      ],
      a: "B"
    },
    {
      q: "下列有關 BJT 基極之敘述，何者正確？",
      o: [
        "(A) 發射載子以提供傳導之電流",
        "(B) 收集射極發出的大部分載子",
        "(C) 控制射極載子流向集極的數量",
        "(D) 基極摻雜濃度最高"
      ],
      a: "C"
    },
    {
      q: "電晶體的基極非常薄，是為了下列何者？",
      o: [
        "(A) 降低 $I_B$",
        "(B) 提高電流增益",
        "(C) 以上皆是"
      ],
      a: "C"
    },
    {
      q: "雙極性電晶體 (BJT) 是屬於下列何者控制的元件？",
      o: [
        "(A) 電流",
        "(B) 磁場",
        "(C) 電場",
        "(D) 溫度"
      ],
      a: "A"
    },
    {
      q: "線性放大器的電晶體是操作在哪一區？",
      o: [
        "(A) 飽和區",
        "(B) 工作區",
        "(C) 截止區",
        "(D) 崩潰區"
      ],
      a: "B"
    },
    {
      q: "某電晶體於 $I_B=0.2\\text{mA}$ 時 $I_C=10\\text{mA}$，則 $I_E$ 應等於多少？",
      o: [
        "(A) 10.2mA",
        "(B) 10mA",
        "(C) 9.8mA",
        "(D) 0.2mA"
      ],
      a: "A"
    },
    {
      q: "某電晶體於 $I_B=0.1\\text{mA}$ 時 $I_C=10\\text{mA}$，則 $\\beta$ 應為多少？",
      o: [
        "(A) 0.01",
        "(B) 99",
        "(C) 100",
        "(D) 101"
      ],
      a: "C"
    },
    {
      q: "某電晶體之 $\\alpha=0.99$，則 $\\beta$ 等於多少？",
      o: [
        "(A) 40",
        "(B) 50",
        "(C) 99",
        "(D) 101"
      ],
      a: "C"
    },
    {
      q: "若 NPN 電晶體操作於工作區，則下列敘述何者正確？",
      o: [
        "(A) $V_{BE}>0$，$V_{BC}<0$，$V_{CE}>0$",
        "(B) $V_{BE}>0$，$V_{BC}>0$，$V_{CE}>0$",
        "(C) $V_{BE}<0$，$V_{BC}>0$，$V_{CE}>0$",
        "(D) $V_{BE}<0$，$V_{BC}>0$，$V_{CE}<0$"
      ],
      a: "A"
    },
    {
      q: "下列何者不屬於 BJT 正常操作的區域？",
      o: [
        "(A) 作用區",
        "(B) 截止區",
        "(C) 飽和區",
        "(D) 崩潰區"
      ],
      a: "D"
    },
    {
      q: "下列有關雙極性接面電晶體 (BJT) 操作於工作 (active) 區之條件描述，何者正確？",
      o: [
        "(A) NPN 電晶體操作條件為 $B\\text{-}E$ 接面順偏，$B\\text{-}C$ 接面逆偏",
        "(B) NPN 電晶體操作條件為 $B\\text{-}E$ 接面順偏，$B\\text{-}C$ 接面順偏",
        "(C) PNP 電晶體操作條件為 $B\\text{-}E$ 接面逆偏，$B\\text{-}C$ 接面順偏",
        "(D) PNP 電晶體操作條件為 $B\\text{-}E$ 接面逆偏，$B\\text{-}C$ 接面逆偏"
      ],
      a: "A"
    },
    {
      q: "一個電晶體的 $\\beta$ 值會受哪些因素影響？",
      o: [
        "(A) 集極電流 $I_C$",
        "(B) 溫度",
        "(C) 以上皆是"
      ],
      a: "C"
    },
    {
      q: "下列敘述何者「錯誤」？",
      o: [
        "(A) BJT 當開關使用時是操作於飽和區或截止區",
        "(B) BJT 當線性放大器使用時是操作於工作區",
        "(C) BJT 在工作區的偏壓方式是 BE 接面順向偏壓，BC 接面逆向偏壓",
        "(D) BJT 在飽和區的偏壓方式是 BE 接面逆向偏壓，BC 接面逆向偏壓"
      ],
      a: "D"
    },
    {
      q: "電晶體當作開關使用時，是操作在哪兩區？",
      o: [
        "(A) 工作區與飽和區",
        "(B) 工作區與截止區",
        "(C) 截止區與飽和區",
        "(D) 以上皆可"
      ],
      a: "C"
    },
    {
      q: "將電晶體當開關使用，若開關閉合，則電晶體應工作於下列哪個區域？",
      o: [
        "(A) 截止區",
        "(B) 工作區",
        "(C) 飽和區",
        "(D) 線性區"
      ],
      a: "C"
    },
    {
      q: "電晶體開關電路中，當集射極為 ON 狀態時，下列選項何者正確？",
      o: [
        "(A) $I_B=I_E=0$",
        "(B) $\\beta I_B\\geq I_{C(sat)}$",
        "(C) $\\beta I_B<I_{C(sat)}$",
        "(D) $V_{BE}=0\\text{V}$"
      ],
      a: "B"
    },
    {
      q: "通常當一電晶體開關進入飽和區時，其集極 - 射極間的電壓 ($V_{CE}$) 大約為多少？",
      o: [
        "(A) 1.2V",
        "(B) 5V",
        "(C) 0.2V",
        "(D) 0.8V"
      ],
      a: "C"
    },
    {
      q: "若 NPN 電晶體操作於飽和區，則下列敘述何者正確？",
      o: [
        "(A) $V_{BE}>0$，$V_{BC}<0$",
        "(B) $V_{BE}>0$，$V_{BC}>0$",
        "(C) $V_{BE}<0$，$V_{BC}<0$",
        "(D) $V_{BE}<0$，$V_{BC}>0$"
      ],
      a: "B"
    },
    {
      q: "某電晶體之 $\\beta=100$，當 $I_B=1\\text{mA}$ 時 $I_C=80\\text{mA}$，則此電晶體是操作在哪個區域？",
      o: [
        "(A) 工作區",
        "(B) 截止區",
        "(C) 飽和區",
        "(D) 無法判定"
      ],
      a: "C"
    },
    {
      q: "如圖 4-1 所示之電路，使電晶體處於飽和狀態的最小 $I_B$ 約為多少？",
      preserveOptionOrder: true,
      svgAlt: "NPN 電晶體開關：+5V 經 1kΩ 接集極，射極接地，基極經電阻輸入 IB，β=100",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 250" role="img"><rect width="330" height="250" rx="12" fill="#f8fafc"/><circle cx="210" cy="34" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="210" y="20" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+5V</tspan></text><polyline points="210,38 210,64" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="210,64 210,72 203,75.5 217,82.5 203,89.5 217,96.5 203,103.5 217,110.5 210,114 210,122" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="226" y="98" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">1kΩ</tspan></text><polyline points="210,122 210,136" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="200" cy="170" r="26" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="174,170 192,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="192" y1="156" x2="192" y2="184" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round"/><polyline points="192,164 210,150 210,136" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="192,176 210,190 210,204" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polygon points="207.48,188.04 196.82,185.45 202.35,178.35" fill="#1f2937"/><polyline points="210,204 210,224" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="210,224 210,232" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="198,232 222,232" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="202,236 218,236" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="206,240 214,240" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="174,170 156,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="100,170 108,170 111.33,163 118,177 124.67,163 131.33,177 138,163 144.67,177 148,170 156,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="64,170 100,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="170" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><line x1="108" y1="152" x2="144" y2="152" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="150,152 141.64,155.34 141.64,148.66" fill="#16a34a"/><text x="129" y="142" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">I</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">B</tspan></text><text x="246" y="176" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">β</tspan><tspan font-style="normal">=100</tspan></text></svg>`,
      o: [
        "(A) 0.05mA",
        "(B) 0.5mA",
        "(C) 5mA",
        "(D) 500mA"
      ],
      a: "A"
    },
    {
      q: "如圖 4-2 所示之電路，二極體的作用為下列何者？",
      preserveOptionOrder: true,
      svgAlt: "NPN 電晶體驅動繼電器線圈，+Vcc 供電，二極體並聯於線圈兩端（陰極接 +Vcc），基極經電阻接 Vin",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 320" role="img"><rect width="360" height="320" rx="12" fill="#f8fafc"/><circle cx="216" cy="34" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="216" y="20" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">CC</tspan></text><polyline points="216,38 216,66" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="216" cy="66" r="3.4" fill="#1f2937"/><polyline points="216,66 190,66" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,210 190,146" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,130 190,66" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(190 138) rotate(-90)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="190,210 216,210" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="216" cy="210" r="3.4" fill="#1f2937"/><polyline points="216,66 216,90" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M216,90 V113.04 M216,113.04 a12.24,12.24 0 0 1 0,24.48 a12.24,12.24 0 0 1 0,24.48 a12.24,12.24 0 0 1 0,24.48 a12.24,12.24 0 0 1 0,24.48 M216,210.96 V234" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="216,186 216,210" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="240,90 240,186" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="245,90 245,186" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="262,108 326,108" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="330" cy="108" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="262,108 294,127" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="302,132 326,132" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="330" cy="132" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polygon points="268,148 268,164 284,156" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="284,156 326,156" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="330" cy="156" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="206" cy="244" r="26" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="180,244 198,244" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="198" y1="230" x2="198" y2="258" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round"/><polyline points="198,238 216,224 216,210" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="198,250 216,264 216,278" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polygon points="213.48,262.04 202.82,259.45 208.35,252.35" fill="#1f2937"/><polyline points="216,278 216,286" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="216,286 216,294" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="204,294 228,294" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="208,298 224,298" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="212,302 220,302" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="40" cy="244" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="32" y="249" font-size="15" fill="#1f2937" text-anchor="end" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">in</tspan></text><polyline points="44,244 100,244" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="100,244 108,244 111.33,237 118,251 124.67,237 131.33,251 138,237 144.67,251 148,244 156,244" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="156,244 180,244" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      o: [
        "(A) 整流",
        "(B) 濾波",
        "(C) 保護繼電器",
        "(D) 保護電晶體"
      ],
      a: "D"
    },
    {
      q: "如圖 4-3 所示之電路，若 $V_{BE}=0.7\\text{V}$，$V_{CE}=6\\text{V}$，則電晶體是工作於哪個區域？",
      preserveOptionOrder: true,
      svgAlt: "NPN 電晶體：+12V 經電阻接集極，射極接地，Vin 經電阻輸入基極 IB",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 250" role="img"><rect width="330" height="250" rx="12" fill="#f8fafc"/><circle cx="210" cy="34" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="210" y="20" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+12V</tspan></text><polyline points="210,38 210,64" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="210,64 210,72 203,75.5 217,82.5 203,89.5 217,96.5 203,103.5 217,110.5 210,114 210,122" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="210,122 210,136" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="200" cy="170" r="26" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="174,170 192,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="192" y1="156" x2="192" y2="184" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round"/><polyline points="192,164 210,150 210,136" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="192,176 210,190 210,204" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polygon points="207.48,188.04 196.82,185.45 202.35,178.35" fill="#1f2937"/><polyline points="210,204 210,224" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="210,224 210,232" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="198,232 222,232" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="202,236 218,236" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="206,240 214,240" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="174,170 156,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="100,170 108,170 111.33,163 118,177 124.67,163 131.33,177 138,163 144.67,177 148,170 156,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="64,170 100,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="170" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="52" y="175" font-size="15" fill="#1f2937" text-anchor="end" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">in</tspan></text><line x1="108" y1="152" x2="144" y2="152" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="150,152 141.64,155.34 141.64,148.66" fill="#16a34a"/><text x="129" y="142" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">I</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">B</tspan></text></svg>`,
      o: [
        "(A) 工作區",
        "(B) 飽和區",
        "(C) 截止區",
        "(D) 無法判斷"
      ],
      a: "A"
    },
    {
      q: "如圖 4-3 所示之電路，若 $V_{BE}=0.8\\text{V}$，$V_{CE}=0.2\\text{V}$，則電晶體是工作於哪個區域？",
      preserveOptionOrder: true,
      svgAlt: "NPN 電晶體：+12V 經電阻接集極，射極接地，Vin 經電阻輸入基極 IB",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 250" role="img"><rect width="330" height="250" rx="12" fill="#f8fafc"/><circle cx="210" cy="34" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="210" y="20" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+12V</tspan></text><polyline points="210,38 210,64" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="210,64 210,72 203,75.5 217,82.5 203,89.5 217,96.5 203,103.5 217,110.5 210,114 210,122" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="210,122 210,136" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="200" cy="170" r="26" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="174,170 192,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="192" y1="156" x2="192" y2="184" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round"/><polyline points="192,164 210,150 210,136" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="192,176 210,190 210,204" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polygon points="207.48,188.04 196.82,185.45 202.35,178.35" fill="#1f2937"/><polyline points="210,204 210,224" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="210,224 210,232" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="198,232 222,232" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="202,236 218,236" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="206,240 214,240" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="174,170 156,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="100,170 108,170 111.33,163 118,177 124.67,163 131.33,177 138,163 144.67,177 148,170 156,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="64,170 100,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="170" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="52" y="175" font-size="15" fill="#1f2937" text-anchor="end" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">in</tspan></text><line x1="108" y1="152" x2="144" y2="152" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="150,152 141.64,155.34 141.64,148.66" fill="#16a34a"/><text x="129" y="142" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">I</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">B</tspan></text></svg>`,
      o: [
        "(A) 工作區",
        "(B) 飽和區",
        "(C) 截止區",
        "(D) 無法判斷"
      ],
      a: "B"
    },
    {
      q: "如圖 4-3 所示之電路，若 $V_{BE}=0\\text{V}$，$V_{CE}=12\\text{V}$，則電晶體是工作於哪個區域？",
      preserveOptionOrder: true,
      svgAlt: "NPN 電晶體：+12V 經電阻接集極，射極接地，Vin 經電阻輸入基極 IB",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 250" role="img"><rect width="330" height="250" rx="12" fill="#f8fafc"/><circle cx="210" cy="34" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="210" y="20" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+12V</tspan></text><polyline points="210,38 210,64" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="210,64 210,72 203,75.5 217,82.5 203,89.5 217,96.5 203,103.5 217,110.5 210,114 210,122" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="210,122 210,136" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="200" cy="170" r="26" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="174,170 192,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="192" y1="156" x2="192" y2="184" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round"/><polyline points="192,164 210,150 210,136" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="192,176 210,190 210,204" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polygon points="207.48,188.04 196.82,185.45 202.35,178.35" fill="#1f2937"/><polyline points="210,204 210,224" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="210,224 210,232" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="198,232 222,232" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="202,236 218,236" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="206,240 214,240" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="174,170 156,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="100,170 108,170 111.33,163 118,177 124.67,163 131.33,177 138,163 144.67,177 148,170 156,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="64,170 100,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="170" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="52" y="175" font-size="15" fill="#1f2937" text-anchor="end" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">in</tspan></text><line x1="108" y1="152" x2="144" y2="152" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="150,152 141.64,155.34 141.64,148.66" fill="#16a34a"/><text x="129" y="142" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">I</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">B</tspan></text></svg>`,
      o: [
        "(A) 工作區",
        "(B) 飽和區",
        "(C) 截止區",
        "(D) 無法判斷"
      ],
      a: "C"
    },
    {
      q: "如圖 4-4 所示之電路，電容器的作用為下列何者？",
      preserveOptionOrder: true,
      svgAlt: "NPN 電晶體驅動繼電器線圈（並聯二極體），基極電阻兩端並聯一個電容器",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 320" role="img"><rect width="360" height="320" rx="12" fill="#f8fafc"/><circle cx="216" cy="34" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="216" y="20" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">CC</tspan></text><polyline points="216,38 216,66" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="216" cy="66" r="3.4" fill="#1f2937"/><polyline points="216,66 190,66" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,210 190,146" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,130 190,66" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(190 138) rotate(-90)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><polyline points="190,210 216,210" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="216" cy="210" r="3.4" fill="#1f2937"/><polyline points="216,66 216,90" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M216,90 V113.04 M216,113.04 a12.24,12.24 0 0 1 0,24.48 a12.24,12.24 0 0 1 0,24.48 a12.24,12.24 0 0 1 0,24.48 a12.24,12.24 0 0 1 0,24.48 M216,210.96 V234" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="216,186 216,210" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="240,90 240,186" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="245,90 245,186" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="262,108 326,108" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="330" cy="108" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="262,108 294,127" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="302,132 326,132" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="330" cy="132" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polygon points="268,148 268,164 284,156" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="284,156 326,156" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="330" cy="156" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="206" cy="244" r="26" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="180,244 198,244" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="198" y1="230" x2="198" y2="258" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round"/><polyline points="198,238 216,224 216,210" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="198,250 216,264 216,278" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polygon points="213.48,262.04 202.82,259.45 208.35,252.35" fill="#1f2937"/><polyline points="216,278 216,286" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="216,286 216,294" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="204,294 228,294" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="208,298 224,298" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="212,302 220,302" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="40" cy="244" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="32" y="249" font-size="15" fill="#1f2937" text-anchor="end" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">in</tspan></text><polyline points="44,244 100,244" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="100,244 108,244 111.33,237 118,251 124.67,237 131.33,251 138,237 144.67,251 148,244 156,244" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="156,244 180,244" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="90" cy="244" r="3.4" fill="#1f2937"/><circle cx="166" cy="244" r="3.4" fill="#1f2937"/><polyline points="90,244 90,218" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="90,218 124,218" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="132,218 166,218" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="124,206 124,230" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="132,206 132,230" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="166,218 166,244" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      o: [
        "(A) 消除反電勢，保護電晶體",
        "(B) 保護二極體",
        "(C) 保護繼電器",
        "(D) 縮短電晶體的開啟時間及關閉時間"
      ],
      a: "D"
    },
    {
      q: "如圖 4-5 的電晶體，其 $\\beta=100$，若此電晶體當開關使用，當輸入的電壓 $V_i$ 為 5V，LED 亮時，輸出電壓 $V_o$ 約為多少？",
      preserveOptionOrder: true,
      svgAlt: "+12V 經 1kΩ 與 LED 接 NPN 集極，輸出 Vo 取自集極，基極經 1kΩ 接輸入 Vi，射極接地",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 350" role="img"><rect width="330" height="350" rx="12" fill="#f8fafc"/><circle cx="190" cy="34" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="190" y="20" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+12V</tspan></text><polyline points="190,38 190,50" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,50 190,58 183,61.33 197,68 183,74.67 197,81.33 183,88 197,94.67 190,98 190,106" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="206" y="84" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">1kΩ</tspan></text><polyline points="190,106 190,118" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,118 190,135" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,151 190,168" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(190 143) rotate(90)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><line x1="198" y1="150" x2="217.01" y2="137.33" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="222,134 216.9,141.41 213.19,135.86" fill="#16a34a"/><line x1="204" y1="160" x2="223.01" y2="147.33" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="228,144 222.9,151.41 219.19,145.86" fill="#16a34a"/><text x="206" y="120" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">LED</tspan></text><polyline points="190,168 190,206" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="190" cy="190" r="3.4" fill="#1f2937"/><polyline points="190,190 260,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="260" cy="190" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="180" cy="240" r="26" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="154,240 172,240" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="172" y1="226" x2="172" y2="254" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round"/><polyline points="172,234 190,220 190,206" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="172,246 190,260 190,274" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polygon points="187.48,258.04 176.82,255.45 182.35,248.35" fill="#1f2937"/><polyline points="190,274 190,298" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,298 190,306" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="178,306 202,306" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="182,310 198,310" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="186,314 194,314" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="272" y="200" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="272" y="232" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">o</tspan></text><text x="272" y="262" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text><circle cx="260" cy="268" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="260,272 260,298" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="260,298 260,306" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="248,306 272,306" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="252,310 268,310" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="256,314 264,314" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="154,240 136,240" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="80,240 88,240 91.33,233 98,247 104.67,233 111.33,247 118,233 124.67,247 128,240 136,240" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="64,240 80,240" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="240" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="108" y="224" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">1kΩ</tspan></text><text x="72" y="262" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="72" y="290" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">i</tspan></text><text x="72" y="312" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text><polyline points="60,244 60,262" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="60,276 60,318" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="322" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="60,326 60,330" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="60,330 60,338" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="48,338 72,338" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="52,342 68,342" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="56,346 64,346" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      o: [
        "(A) 0V",
        "(B) 5V",
        "(C) 7.5V",
        "(D) 15V"
      ],
      a: "A"
    },
    {
      q: "如圖 4-5 的電晶體，其 $\\beta=100$，當輸入電壓 $V_i$ 為 5V 時，該電晶體的工作區域為下列何者？",
      preserveOptionOrder: true,
      svgAlt: "+12V 經 1kΩ 與 LED 接 NPN 集極，輸出 Vo 取自集極，基極經 1kΩ 接輸入 Vi，射極接地",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 350" role="img"><rect width="330" height="350" rx="12" fill="#f8fafc"/><circle cx="190" cy="34" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="190" y="20" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+12V</tspan></text><polyline points="190,38 190,50" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,50 190,58 183,61.33 197,68 183,74.67 197,81.33 183,88 197,94.67 190,98 190,106" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="206" y="84" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">1kΩ</tspan></text><polyline points="190,106 190,118" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,118 190,135" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,151 190,168" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><g transform="translate(190 143) rotate(90)"><polygon points="-8,-8 -8,8 8,0" fill="#1f2937"/><line x1="8" y1="-8" x2="8" y2="8" stroke="#1f2937" stroke-width="2.4"/></g><line x1="198" y1="150" x2="217.01" y2="137.33" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="222,134 216.9,141.41 213.19,135.86" fill="#16a34a"/><line x1="204" y1="160" x2="223.01" y2="147.33" stroke="#16a34a" stroke-width="2" stroke-linecap="round"/><polygon points="228,144 222.9,151.41 219.19,145.86" fill="#16a34a"/><text x="206" y="120" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">LED</tspan></text><polyline points="190,168 190,206" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="190" cy="190" r="3.4" fill="#1f2937"/><polyline points="190,190 260,190" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="260" cy="190" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><circle cx="180" cy="240" r="26" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="154,240 172,240" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="172" y1="226" x2="172" y2="254" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round"/><polyline points="172,234 190,220 190,206" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="172,246 190,260 190,274" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polygon points="187.48,258.04 176.82,255.45 182.35,248.35" fill="#1f2937"/><polyline points="190,274 190,298" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="190,298 190,306" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="178,306 202,306" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="182,310 198,310" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="186,314 194,314" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="272" y="200" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="272" y="232" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">o</tspan></text><text x="272" y="262" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text><circle cx="260" cy="268" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="260,272 260,298" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="260,298 260,306" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="248,306 272,306" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="252,310 268,310" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="256,314 264,314" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="154,240 136,240" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="80,240 88,240 91.33,233 98,247 104.67,233 111.33,247 118,233 124.67,247 128,240 136,240" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="64,240 80,240" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="240" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="108" y="224" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">1kΩ</tspan></text><text x="72" y="262" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="72" y="290" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">i</tspan></text><text x="72" y="312" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text><polyline points="60,244 60,262" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="60,276 60,318" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="60" cy="322" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="60,326 60,330" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="60,330 60,338" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="48,338 72,338" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="52,342 68,342" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="56,346 64,346" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      o: [
        "(A) 作用區",
        "(B) 飽和區",
        "(C) 截止區",
        "(D) 負電阻區"
      ],
      a: "B"
    },
    {
      q: "如圖 4-6 中電晶體作為開關使用，欲使燈泡高亮度的亮起，下列敘述何者正確？",
      preserveOptionOrder: true,
      svgAlt: "+Vcc 接燈泡，燈泡接 NPN 集極，射極接地，基極經 RB 接輸入 Vi",
      svg: ({ index }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 320" role="img"><rect width="330" height="320" rx="12" fill="#f8fafc"/><circle cx="200" cy="34" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="212" y="38" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">CC</tspan></text><polyline points="200,38 200,83" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="200" cy="100" r="17" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M191,107 C191,90 200,90 200,100 S209,110 209,93" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><text x="168" y="106" font-size="15" fill="#1f2937" text-anchor="end" font-family="Noto Sans TC, PingFang TC, Microsoft JhengHei, sans-serif"><tspan font-style="normal">燈泡</tspan></text><polyline points="200,117 200,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="190" cy="204" r="26" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="164,204 182,204" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><line x1="182" y1="190" x2="182" y2="218" stroke="#1f2937" stroke-width="4.5" stroke-linecap="round"/><polyline points="182,198 200,184 200,170" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="182,210 200,224 200,238" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polygon points="197.48,222.04 186.82,219.45 192.35,212.35" fill="#1f2937"/><polyline points="200,238 200,262" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="200,262 200,270" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="188,270 212,270" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="192,274 208,274" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="196,278 204,278" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="164,204 156,204" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="100,204 108,204 111.33,197 118,211 124.67,197 131.33,211 138,197 144.67,211 148,204 156,204" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="74,204 100,204" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="70" cy="204" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><text x="128" y="188" font-size="15" fill="#1f2937" text-anchor="middle" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">R</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">B</tspan></text><text x="80" y="226" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">+</tspan></text><text x="80" y="252" font-size="15" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="italic">V</tspan><tspan font-style="italic" font-size="10.5" dy="3.75">i</tspan></text><text x="80" y="274" font-size="16" fill="#1f2937" text-anchor="start" font-family="Times New Roman, Noto Serif TC, serif"><tspan font-style="normal">−</tspan></text><polyline points="70,208 70,226" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="70,240 70,280" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="70" cy="284" r="4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><polyline points="70,288 70,292" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="70,292 70,300" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="58,300 82,300" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="62,304 78,304" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/><polyline points="66,308 74,308" stroke="#1f2937" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      o: [
        "(A) 基 - 射極接面為順向偏壓，基 - 集極接面為逆向偏壓",
        "(B) 基 - 射極接面為順向偏壓，基 - 集極接面為順向偏壓",
        "(C) 基 - 射極接面為逆向偏壓，基 - 集極接面為順向偏壓",
        "(D) 基 - 射極接面為逆向偏壓，基 - 集極接面為逆向偏壓"
      ],
      a: "B"
    },
    {
      q: "PNP 電晶體工作於飽和區時，其基射極電壓 $V_{BE}$ 和基集極電壓 $V_{BC}$ 為何？",
      o: [
        "(A) $V_{BE}>0$ 及 $V_{BC}>0$",
        "(B) $V_{BE}>0$ 及 $V_{BC}<0$",
        "(C) $V_{BE}<0$ 及 $V_{BC}>0$",
        "(D) $V_{BE}<0$ 及 $V_{BC}<0$"
      ],
      a: "D"
    },
    {
      q: "電晶體開關電路的上升時間是指 $I_C$ 由 10% 上升至幾 % 所需之時間？",
      o: [
        "(A) 20%",
        "(B) 50%",
        "(C) 90%",
        "(D) 100%"
      ],
      a: "C"
    },
    {
      q: "電晶體開關電路的下降時間是指 $I_C$ 由 90% 下降至幾 % 所需之時間？",
      o: [
        "(A) 80%",
        "(B) 50%",
        "(C) 10%",
        "(D) 0%"
      ],
      a: "C"
    },
    {
      q: "某電晶體之射極電流為 5mA，基極電流為 0.1mA，則 $\\beta$ 為多少？",
      o: [
        "(A) 49",
        "(B) 50",
        "(C) 51",
        "(D) 99"
      ],
      a: "A"
    },
            {
      q: "某 $\\beta=100$ 之電晶體工作於飽和區時，$I_B=1\\text{mA}$，$I_C=50\\text{mA}$，則 $I_E$ 為多少？",
      o: [
        "(A) 1mA",
        "(B) 49mA",
        "(C) 50mA",
        "(D) 51mA"
      ],
      a: "D"
    },
              ]
};
