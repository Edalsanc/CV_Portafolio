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

        // --- Menú Hamburguesa ---
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const navLinks = document.querySelector('.nav-links');

        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
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

        // --- Formulario Netlify Forms ---
        const contactForm = document.getElementById('contactForm');
        const msgStatus = document.getElementById('msg-status');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Recopilar los datos del formulario
            const formData = new FormData(this);

            // Enviar datos a Netlify
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                // Mostrar mensaje de éxito
                msgStatus.style.display = 'block';
                contactForm.reset();
                
                // Ocultar el mensaje después de 4 segundos
                setTimeout(() => {
                    msgStatus.style.display = 'none';
                }, 4000);
            })
            .catch(error => {
                console.error('Error al enviar formulario:', error);
                msgStatus.textContent = 'Error al enviar. Intenta de nuevo.';
                msgStatus.style.color = 'var(--primary-color)';
                msgStatus.style.display = 'block';
            });
        });