window.MathJax = {
            tex: { inlineMath: [['$','$']], displayMath: [['$$','$$']], processEscapes: true },
            options: { skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre'] }
        };
        window.__rmsMathJaxPromise = null;
        window.loadRmsMathJax = function() {
            if (window.MathJax && window.MathJax.startup && window.MathJax.typesetPromise) {
                return Promise.resolve(window.MathJax);
            }
            if (window.__rmsMathJaxPromise) return window.__rmsMathJaxPromise;
            window.__rmsMathJaxPromise = new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
                script.async = true;
                script.onload = () => resolve(window.MathJax);
                script.onerror = reject;
                document.head.appendChild(script);
            });
            return window.__rmsMathJaxPromise;
        };
        window.typesetRmsMath = function(root) {
            if (!root) return;
            const text = root.textContent || '';
            if (!/[\$]|\\(?:frac|sqrt|text|times|cdot|pm|leq|geq|left|right)|\\\(|\\\[/.test(text)) return;
            window.loadRmsMathJax()
                .then(() => window.MathJax?.typesetPromise?.([root]))
                .catch(error => console.warn('MathJax 載入略過：', error));
        };
