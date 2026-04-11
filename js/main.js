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

        // --- Formulario Netlify Forms con Modal ---
        const contactForm = document.getElementById('contactForm');
        const successModal = document.getElementById('successModal');
        const closeModalBtn = document.getElementById('closeModalBtn');

        // Función para mostrar el modal
        function showModal() {
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        }

        // Función para cerrar el modal
        function closeModal() {
            successModal.classList.add('closing');
            setTimeout(() => {
                successModal.classList.remove('active', 'closing');
                document.body.style.overflow = 'auto'; // Restaurar scroll
            }, 300);
        }

        // Event listener para cerrar modal mediante botón
        closeModalBtn.addEventListener('click', closeModal);

        // Cerrar modal al hacer clic en el overlay
        const modalOverlay = successModal.querySelector('.modal-overlay');
        modalOverlay.addEventListener('click', closeModal);

        // Cerrar modal con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && successModal.classList.contains('active')) {
                closeModal();
            }
        });

        // Enviar formulario a Netlify
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
                // Mostrar modal de éxito
                showModal();
                
                // Limpiar campos del formulario
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error al enviar formulario:', error);
                alert('Error al enviar. Intenta de nuevo.');
            });
        });