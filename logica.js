document.addEventListener("DOMContentLoaded", () => {
    
    // 1. OBTENER ELEMENTOS DEL DOM
    const mybutton = document.getElementById("btnTop");
    const progressBar = document.getElementById("myBar");

    // 2. FUNCIÓN ÚNICA DE SCROLL (Aquí unificamos todo)
    window.onscroll = function () {
        // Obtenemos la posición actual del scroll
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        
        // --- Lógica del Botón "Volver Arriba" ---
        if (mybutton) {
            if (winScroll > 200) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }

        // --- Lógica de la Barra de Progreso ---
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (progressBar && height > 0) {
            let scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        }
    };

    // 3. ACCIÓN DEL BOTÓN VOLVER ARRIBA
    if (mybutton) {
        mybutton.onclick = function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };
    }

    // 4. LÓGICA DEL CONTADOR ANIMADO
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.innerText = '0';
        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');
            const c = +counter.innerText;
            const increment = target / 100;

            if (c < target) {
                counter.innerText = `${Math.ceil(c + increment)}`;
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCounter();
    });
});

// 5. FUNCIÓN DE FILTRO (Debe estar fuera para ser llamada desde el HTML)
function filterSkills(category) {
    const skills = document.querySelectorAll('.skill-badge');
    skills.forEach(skill => {
        // Usamos style.display directamente para asegurar que funcione sin clases extra
        if (category === 'all' || skill.classList.contains(category)) {
            skill.style.display = "inline-block";
        } else {
            skill.style.display = "none";
        }
    });
}