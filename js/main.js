  // --- Lógica del Tema ---
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        const body = document.body;

        const setTheme = (theme) => {
            body.setAttribute('data-theme', theme);
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            localStorage.setItem('portfolio-theme', theme);
        };

        const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
        setTheme(currentTheme);

        themeToggle.addEventListener('click', () => {
            const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });

        // --- Efecto Navbar ---
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
            handleReveal();
        });

        // --- Animación Scroll Reveal ---
        function handleReveal() {
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(el => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                const elementVisible = 100;
                
                if (elementTop < windowHeight - elementVisible) {
                    el.classList.add('active');
                    const bars = el.querySelectorAll('.progress-bar, .level-fill');
                    bars.forEach(bar => {
                        bar.style.width = bar.getAttribute('data-width');
                    });
                }
            });
        }
        
        handleReveal();

        // --- Formulario ---
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('msg-status').style.display = 'block';
            this.reset();
            setTimeout(() => {
                document.getElementById('msg-status').style.display = 'none';
            }, 4000);
        });