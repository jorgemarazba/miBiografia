/* ============================================= */
/* MÓDULO 1: LÓGICA DEL HEADER Y EFECTOS (JS) */
/* ============================================= */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionar los elementos del DOM
    const header = document.getElementById('mainHeader');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    // --- Funcionalidad 1: Header dinámico al hacer Scroll ---
    function checkScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // --- Funcionalidad 2: Menú Móvil Responsive ---
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        menuToggle.classList.toggle('open');
    });

    const navLinksLi = document.querySelectorAll('.nav-links a');
    navLinksLi.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')){
                navLinks.classList.remove('nav-active');
                menuToggle.classList.remove('open');
            }
        });
    });

    // --- Funcionalidad 3: Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const textToType = "Desarrollador frontend y estudiante...";
        let i = 0;
        typewriterElement.textContent = '';
        function typeWriter() {
            if (i < textToType.length) {
                typewriterElement.textContent += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 500); // Demora inicial
    }

    // --- Funcionalidad 4: Filtros del Portafolio ---
    const filterPills = document.querySelectorAll('.filter-pills .pill');
    const projectCards = document.querySelectorAll('.project-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remover 'active'
            filterPills.forEach(btn => btn.classList.remove('active'));
            pill.classList.add('active');

            const filterText = pill.innerText.trim();

            projectCards.forEach(card => {
                const cardCategory = card.querySelector('.tiny-pill').innerText.trim();
                
                if (filterText === 'Todos' || cardCategory === filterText) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // --- Funcionalidad 5: Animación Intersecciones ---
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'Habilidades-Tech') {
                    const bars = entry.target.querySelectorAll('.progress-fill');
                    bars.forEach(bar => {
                        const targetWidth = bar.style.width; 
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 100);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillsSec = document.getElementById('Habilidades-Tech');
    if (skillsSec) observer.observe(skillsSec);

    // --- Funcionalidad 6: Lector de Progreso Circular ---
    const scrollProgress = document.getElementById('scrollProgress');
    const progressCircle = document.getElementById('progressCircle');

    if (scrollProgress && progressCircle) {
        // La longitud de la circunferencia es 2 * PI * radio (26)
        const circumference = 2 * Math.PI * 26; 
        
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = circumference;

        const updateScrollProgress = () => {
            const scrollTop = window.scrollY;
            // Altura total del documento menos la altura visible
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            if (docHeight > 0) {
                // Obtenemos porcentaje del scroll 0 a 1
                let scrollPercent = scrollTop / docHeight;
                // Offset es la barra restante a rellenar
                const dashOffset = circumference - (scrollPercent * circumference);
                progressCircle.style.strokeDashoffset = dashOffset;
                
                // Mostrar u ocultar dependiendo si se ha bajado algo
                if (scrollTop > 100) {
                    scrollProgress.classList.add('visible');
                } else {
                    scrollProgress.classList.remove('visible');
                }
            }
        };

        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress(); // Llamada inicial

        // Volver arriba al hacer click
        scrollProgress.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});