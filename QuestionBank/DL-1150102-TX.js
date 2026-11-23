// 由 DL-1150102.js 依 SVG 圖題與文字題分類；題目、選項與答案沿用原題庫。
window.currentQuiz = {
  "name": "數位邏輯設計 第3–4章 選擇題（文字題）",
  "time": 100,
  "mode": 1,
  "data": [
    {
      "q": "【3-2 課內題 1】下列布林式中，何者錯誤？",
      "o": [
        "(A) $A+A=A$",
        "(B) $A+AB=A$",
        "(C) $A\\cdot\\overline{A}=1$",
        "(D) $A+B\\cdot C=(A+B)\\cdot(A+C)$"
      ],
      "a": "C"
    },
    {
      "q": "【3-2 課內題 2】布林代數式 $(A\\cdot\\overline{A})$，$(A+\\overline{A})$，$(A+1)$，$A+0$ 的結果分別為？",
      "o": [
        "(A) $(A,\\,1,\\,\\overline{A},\\,0)$",
        "(B) $(0,\\,1,\\,1,\\,A)$",
        "(C) $(1,\\,0,\\,1,\\,0)$",
        "(D) $(A,\\,\\overline{A},\\,1,\\,0)$"
      ],
      "a": "B"
    },
    {
      "q": "【3-2 課內題 3】下列布林式中，何者不正確？",
      "o": [
        "(A) $A+\\overline{A}B=A+B$",
        "(B) $ABC=CBA$",
        "(C) $A+\\overline{A}=1$",
        "(D) $\\overline{A}A=1$"
      ],
      "a": "D"
    },
    {
      "q": "【3-3 課內題 4】有關布林式，下列何者錯誤？",
      "o": [
        "(A) $A+\\overline{A}=1$",
        "(B) $B\\cdot\\overline{B}=0$",
        "(C) $A\\cdot\\overline{A}+B=A$",
        "(D) $A(\\overline{A}+B)=AB$"
      ],
      "a": "C"
    },
    {
      "q": "【3-3 課內題 5】下列何者為第摩根(De Morgan)定律？",
      "o": [
        "(A) $\\overline{A\\cdot B}=\\overline{A+B}$",
        "(B) $\\overline{\\overline{A}\\cdot\\overline{B}}=A\\cdot B$",
        "(C) $\\overline{\\overline{A\\cdot B}}=\\overline{A}+\\overline{B}$",
        "(D) $\\overline{A+B}=\\overline{A}\\cdot\\overline{B}$"
      ],
      "a": "D"
    },
    {
      "q": "【3-3 課內題 6】布林代數式 $\\overline{\\overline{(A+B)}\\cdot(AB)}$ 等於？",
      "o": [
        "(A) $0$",
        "(B) $1$",
        "(C) $AB$",
        "(D) $A+B$"
      ],
      "a": "B"
    },
    {
      "q": "【3-4 課內題 13】至少需要幾個 2-input 的 NOR 閘才能組成一個 3-input 的 NOR 閘？",
      "o": [
        "(A) 二個",
        "(B) 三個",
        "(C) 四個",
        "(D) 五個"
      ],
      "a": "B"
    },
    {
      "q": "【3-4 課內題 14】若以兩個輸入端之 NAND 閘來執行兩個輸入端之 NOR 閘的工作，最少需使用幾個 NAND 閘？",
      "o": [
        "(A) 2 個",
        "(B) 3 個",
        "(C) 4 個",
        "(D) 5 個"
      ],
      "a": "C"
    },
    {
      "q": "【3-6 課外題 1】布林式 $W+X+Y+WY+\\overline{X}$ 等於？",
      "o": [
        "(A) $0$",
        "(B) $1$",
        "(C) $X+Y$",
        "(D) $W+X+Y$"
      ],
      "a": "B"
    },
    {
      "q": "【3-6 課外題 2】若將等式中的所有 0 改為 1、1 改為 0，且將 + 改為 ‧、‧ 改為 + 後，該等式仍相等，為下列何種特性？",
      "o": [
        "(A) 對偶原理(principle of duality)",
        "(B) 同一律(laws of identity)",
        "(C) 第摩根定理(DeMorgan's theorems)",
        "(D) 交換律(commutative laws)"
      ],
      "a": "A"
    },
    {
      "q": "【3-6 課外題 3】布林式 $Y=A\\oplus B$ 不等於下列何者？",
      "o": [
        "(A) $Y=\\overline{A}B+A\\overline{B}$",
        "(B) $Y=(A+B)(\\overline{A}+\\overline{B})$",
        "(C) $Y=\\overline{AB+\\overline{A}\\,\\overline{B}}$",
        "(D) $Y=AB+\\overline{AB}$"
      ],
      "a": "D"
    },
    {
      "q": "【3-6 課外題 4】最少需使用多少個兩輸入端之 NOR 閘，才能完成具有兩輸入端之 NAND 閘作用？",
      "o": [
        "(A) 3 個",
        "(B) 4 個",
        "(C) 5 個",
        "(D) 6 個"
      ],
      "a": "B"
    },
    {
      "q": "【3-6 課外題 5】組合成一個 4 輸入的 AND 閘時，則最少需要幾個 2 輸入 NAND 閘來實現？",
      "o": [
        "(A) 3 個",
        "(B) 5 個",
        "(C) 6 個",
        "(D) 7 個"
      ],
      "a": "C"
    },
    {
      "q": "【3-6 高手過招 1】【104 統測資電類】依據布林代數 $(A+C)(A+B+C)$ 等於？",
      "o": [
        "(A) $A+B+C$",
        "(B) $A+C$",
        "(C) $AB+BC$",
        "(D) $A+B+C$"
      ],
      "a": "B"
    },
    {
      "q": "【3-7 高手過招 3】【106 統測資電類】某邏輯電路的輸出布林函數：$F=\\overline{A+B+C+D}$，若想只使用雙輸入的 NOR 閘來實現此函數 $F$，則至少要用幾個雙輸入的 NOR 閘？",
      "o": [
        "(A) 6",
        "(B) 5",
        "(C) 4",
        "(D) 3"
      ],
      "a": "B"
    },
    {
      "q": "【3-7 高手過招 4】【107 統測電子類】下列布林代數表示式之真值表，何者與另外三者不同？",
      "o": [
        "(A) $A\\overline{B}+AB$",
        "(B) $A+AB$",
        "(C) $A+\\overline{A}B$",
        "(D) $(A+B)(A+\\overline{B})$"
      ],
      "a": "C"
    },
    {
      "q": "【3-7 高手過招 5】【109 統測資電類】下列邏輯閘何者不具結合性？",
      "o": [
        "(A) 或(OR)閘",
        "(B) 及(AND)閘",
        "(C) 反或(NOR)閘",
        "(D) 互斥或(XOR)閘"
      ],
      "a": "C"
    },
    {
      "q": "【3-7 高手過招 7】【109 統測資電類】數位邏輯實習需一個 4 輸入的 NOR 閘時，則最少需要幾個 2 輸入 NOR 閘來實現？",
      "o": [
        "(A) 3 個",
        "(B) 5 個",
        "(C) 6 個",
        "(D) 7 個"
      ],
      "a": "B"
    },
    {
      "q": "【4-2 課內題 1】試用卡諾圖，化簡 $f=A\\overline{B}C\\overline{D}+ACD+BCD+A\\overline{B}C+\\overline{A}\\,\\overline{B}CD+\\overline{A}\\,\\overline{B}C\\overline{D}+\\overline{A}B\\overline{C}\\,\\overline{D}+AB\\overline{C}\\,\\overline{D}$，其值為？",
      "o": [
        "(A) $CD+\\overline{B}C+B\\overline{C}\\,\\overline{D}$",
        "(B) $AB+CD$",
        "(C) $A\\overline{B}+C\\overline{D}+AC\\overline{D}$",
        "(D) $BC+B\\overline{C}\\,\\overline{D}$"
      ],
      "a": "A"
    },
    {
      "q": "【4-2 課內題 2】布林函數 $f=AB+\\overline{B}C+\\overline{A}\\,\\overline{B}\\,\\overline{C}+AB\\overline{D}+\\overline{A}\\,\\overline{B}\\,\\overline{C}\\,\\overline{D}$ 的最簡式為？",
      "o": [
        "(A) $A+\\overline{B}+CD$",
        "(B) $\\overline{A}\\,\\overline{B}+AB+AC$",
        "(C) $\\overline{A}\\,\\overline{B}+\\overline{A}\\,\\overline{C}$",
        "(D) $AC+AB+\\overline{C}\\,\\overline{D}$"
      ],
      "a": "B"
    },
    {
      "q": "【4-2 課內題 5】有一布林函數 $F(A,B,C,D)=\\Sigma(4,6,7,12,14,15)$，化簡後可得函數 $F$ 為？",
      "o": [
        "(A) $B\\overline{C}+B\\overline{D}$",
        "(B) $BC+B\\overline{D}$",
        "(C) $B\\overline{C}+\\overline{B}\\,\\overline{D}$",
        "(D) $BC+BD$"
      ],
      "a": "B"
    },
    {
      "q": "【4-2 課內題 6】試問布林式 $f(A,B,C,D)=(A+B+C+D)\\cdot(A+B+C+\\overline{D})\\cdot(A+B+\\overline{C})\\cdot(\\overline{A}+\\overline{B}+\\overline{C})\\cdot(\\overline{A}+B)$ 之最簡式為何？",
      "o": [
        "(A) $B\\cdot(A+C)$",
        "(B) $(A+\\overline{B})\\cdot(A+B)\\cdot(\\overline{A}+\\overline{C})$",
        "(C) $B\\cdot(\\overline{A}+\\overline{C})$",
        "(D) $(A+B)\\cdot(\\overline{A}+B)$"
      ],
      "a": "C"
    },
    {
      "q": "【4-2 課內題 7】布林代數式 $Y=\\overline{A}\\,\\overline{C}+\\overline{C}\\,\\overline{D}+A\\overline{C}+\\overline{A}C\\overline{D}+\\overline{A}\\,\\overline{B}D+\\overline{A}BD$，經化簡後其最簡式為？",
      "o": [
        "(A) $Y=A+C$",
        "(B) $Y=A+B$",
        "(C) $Y=\\overline{A}+\\overline{C}$",
        "(D) $Y=\\overline{A}+\\overline{B}$"
      ],
      "a": "C"
    },
    {
      "q": "【4-2 課內題 8】邏輯函數 $f=A\\overline{C}D+A\\overline{B}C+A\\overline{D}+AB\\overline{C}$ 的最簡積項之和(SOP)式為？",
      "o": [
        "(A) $A\\overline{B}+A\\overline{C}+AC\\overline{D}$",
        "(B) $A\\overline{B}+A\\overline{C}$",
        "(C) $A\\overline{B}+A\\overline{C}+A\\overline{D}$",
        "(D) $A(\\overline{B}+\\overline{C}+\\overline{D})$"
      ],
      "a": "C"
    },
    {
      "q": "【4-3 課內題 9】邏輯函數 $f(A,B,C,D)=\\Sigma(0,2,8,12,13)$；則 $f$ 之最簡布林代數式為？",
      "o": [
        "(A) $(A+C)(\\overline{A}+\\overline{B})(B+C)$",
        "(B) $(\\overline{A}+\\overline{C})(\\overline{A}+B)(\\overline{B}+C)$",
        "(C) $(\\overline{A}+\\overline{C})(A+\\overline{B})(B+\\overline{D})$",
        "(D) $(A+B)(B+\\overline{D})(\\overline{A}+C)$"
      ],
      "a": "C"
    },
    {
      "q": "【4-3 課內題 10】布林式 $f(A,B,C,D)=A'B'C'D+A'B'CD+A'BC'D+A'BCD+AB'C'D'+AB'CD'+ABC'D$，若以標準和項之積(POS)數字式表示 $f$，則下列何者為 $f$ 的表示式？",
      "o": [
        "(A) $\\Pi(1,3,5,7,8,10,13)$",
        "(B) $\\Pi(15,13,11,9,8,6,3)$",
        "(C) $\\Pi(0,2,4,6,9,11,12,14,15)$",
        "(D) $\\Pi(2,3,4,6,9,11,12,14,15)$"
      ],
      "a": "C"
    },
    {
      "q": "【4-3 課內題 11】若 $f_1(A,B,C)=AB+\\overline{A}C$，$f_2(A,B,C)=(A+B)(\\overline{A}+C)$，則 $f_1\\oplus f_2$ 之結果以標準積項之和式表示時，其結果為何？",
      "o": [
        "(A) $\\Sigma(0,5,6)$",
        "(B) $\\Sigma(1,2,5,7)$",
        "(C) $\\Sigma(1,2,5,6)$",
        "(D) $\\Sigma(3,5,6,7)$"
      ],
      "a": "C"
    },
    {
      "q": "【4-3 課內題 12】布林函數 $f(A,B,C,D)=\\Sigma(1,3,7,11,15)$，另外 $f(A,B,C,D)$ 尚有 3 個隨意項(don't care)分別為 $\\overline{A}\\,\\overline{B}\\,\\overline{C}\\,\\overline{D}$、$\\overline{A}\\,\\overline{B}C\\overline{D}$ 與 $\\overline{A}B\\overline{C}D$，將 $f$ 進行卡諾圖化簡後，下列何者不可能是其化簡後之結果？",
      "o": [
        "(A) $CD+\\overline{AB}$",
        "(B) $CD+\\overline{A}B$",
        "(C) $D(\\overline{A}+C)$",
        "(D) $CD+\\overline{A}D$"
      ],
      "a": "B"
    },
    {
      "q": "【4-3 課內題 13】若布林函數 $f(A,B,C,D)=AD+B\\overline{C}\\,\\overline{D}+ABC+\\overline{A}B\\overline{C}D$，則 $\\overline{f}$ 為下列何者？",
      "o": [
        "(A) $\\overline{A}\\,\\overline{B}+\\overline{A}C+\\overline{B}\\,\\overline{D}$",
        "(B) $\\overline{A}\\,\\overline{D}+B\\overline{D}+B\\overline{C}$",
        "(C) $A\\overline{C}+\\overline{B}\\,\\overline{D}+B\\overline{C}$",
        "(D) $CD+\\overline{B}D+\\overline{B}C$"
      ],
      "a": "A"
    },
    {
      "q": "【4-3 課內題 14】化簡布林代數 $f(A,B,C,D)=\\overline{B}\\cdot C\\cdot\\overline{D}+\\overline{B}\\cdot\\overline{C}+\\overline{A}\\cdot\\overline{C}\\cdot D$ 為最簡的和項之積(POS)式，可得下列何式？",
      "o": [
        "(A) $f(A,B,C,D)=\\overline{B}\\cdot\\overline{D}+\\overline{B}\\cdot\\overline{C}+\\overline{A}\\cdot\\overline{C}\\cdot D$",
        "(B) $f(A,B,C,D)=(A+\\overline{B})\\cdot(\\overline{C}+\\overline{D})$",
        "(C) $f(A,B,C,D)=(\\overline{A}+\\overline{B})\\cdot(\\overline{C}+\\overline{D})\\cdot(\\overline{B}+D)$",
        "(D) $f(A,B,C,D)=(A+\\overline{B})\\cdot(\\overline{B}+\\overline{D})$"
      ],
      "a": "C"
    },
    {
      "q": "【4-3 課內題 15】令 $d$ 代表不睬條件(Don't Care)，化簡 $f(X,Y,Z,W)=\\Sigma(1,3,6,7,11,15)+d(0,2,4,5)$ 之結果為何？",
      "o": [
        "(A) $\\overline{X}+ZW$",
        "(B) $\\overline{X}+\\overline{Z}\\,\\overline{W}$",
        "(C) $X+ZW$",
        "(D) $X+\\overline{Z}\\,\\overline{W}$"
      ],
      "a": "A"
    },
    {
      "q": "【4-3 課內題 16】布林函數 $f(A,B,C)=(A\\oplus B)\\cdot C+\\overline{A}\\cdot(B\\oplus C)$，其中 $\\oplus$ 表示互斥或(XOR)運算。請問下列何者為其積項之和(SOP)的最簡式？",
      "o": [
        "(A) $\\overline{A}C+\\overline{B}C$",
        "(B) $(\\overline{A}+C)\\cdot(\\overline{B}+C)$",
        "(C) $(\\overline{A}+B)\\cdot(\\overline{B}+C)$",
        "(D) $\\overline{A}B+\\overline{B}C$"
      ],
      "a": "D"
    },
    {
      "q": "【4-11 課外題 4】布林函數 $F(A,B,C,D)=(A+B+C'+D')(A+B'+C+D)(A'+B+C+D')(A'+B'+C'+D)$ 的最簡積之和(SOP)式為？",
      "o": [
        "(A) $A'C'+A'BC+AC'D'+ABC'+B'C'D$",
        "(B) $B'D'+A'C'D+ACD+ABC'+A'BC$",
        "(C) $BD+A'CD+AB'C+AC'D'+A'B'D$",
        "(D) $AC+A'BC+ACD+ABC'+A'C'D$"
      ],
      "a": "B"
    },
    {
      "q": "【4-12 高手過招 5】【105 統測資電類】令 $d$ 代表不睬條件(don't Care)，化簡 $F(X,Y,Z,W)=\\Sigma(1,3,6,7,11,15)+d(0,2,4,5)$ 之結果為何？",
      "o": [
        "(A) $\\overline{X}+ZW$",
        "(B) $\\overline{X}+\\overline{Z}\\,\\overline{W}$",
        "(C) $X+ZW$",
        "(D) $F=BD+\\overline{B}\\,\\overline{D}$"
      ],
      "a": "A"
    },
    {
      "q": "【4-13 高手過招 6】【105 統測資電類】一布林代數 $F(A,B,C,D)=\\Sigma(0,2,5,7,8,10,13,15)$，下列何者為其化簡之結果？",
      "o": [
        "(A) $F=AD+\\overline{A}\\,\\overline{D}$",
        "(B) $F=BD+\\overline{B}\\,\\overline{D}$",
        "(C) $F=AC+\\overline{A}\\,\\overline{C}$",
        "(D) $F=BD+\\overline{B}\\,\\overline{D}$"
      ],
      "a": "B"
    }
  ]
};
