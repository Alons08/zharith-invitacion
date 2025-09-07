document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const envelope = document.querySelector('.envelope');
    const envelopeScreen = document.getElementById('envelopeScreen');
    const invitationContent = document.getElementById('invitationContent');
    const playButton = document.getElementById('playButton');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const mapButton = document.getElementById('mapButton');
    const rsvpButton = document.getElementById('rsvpButton');
    const carousel = document.getElementById('carousel');
    const carouselDots = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const calendarDays = document.getElementById('calendarDays');
    
    // Variables para el carrusel
    let currentIndex = 0;
    let intervalId;
    const images = [
        'img/foto1.jpg',
        'img/foto2.jpg',
        'img/foto3.jpg',
        'img/foto4.jpg'
    ];
    
    // Evento para abrir el sobre
    envelope.addEventListener('click', function() {
        // Agregar clase de clicked para activar la animación
        this.classList.add('clicked');
        
        // Crear efecto de partículas
        createParticles();
        
        // Esperar a que termine la animación para mostrar el contenido
        setTimeout(() => {
            envelopeScreen.style.opacity = '0';
            
            // Ocultar completamente después de la transición
            setTimeout(() => {
                envelopeScreen.style.display = 'none';
                invitationContent.style.display = 'block';
                
                // Iniciar componentes después de mostrar el contenido
                initCarousel();
                initCountdown();
                initCalendar();
            }, 500);
        }, 1200); // Aumentado para coincidir con la duración de la animación
    });
    
    // Función para crear efecto de partículas
    function createParticles() {
        const particlesContainer = document.getElementById('particlesContainer');
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Posición aleatoria alrededor del centro
            const angle = (i / particleCount) * 2 * Math.PI;
            const radius = Math.random() * 100 + 50;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.setProperty('--end-x', x + 'px');
            particle.style.setProperty('--end-y', y + 'px');
            
            // Color aleatorio entre los colores de la paleta
            const colors = ['#FFD166', '#7b2cbf', '#9d4edd', '#ff9e00'];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Agregar animación personalizada
            particle.style.animation = `particleMove 1.5s ease-out ${i * 0.05}s forwards`;
            
            particlesContainer.appendChild(particle);
            
            // Remover partícula después de la animación
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1500 + (i * 50));
        }
    }
    
    // Control del reproductor de música
    playButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play()
                .then(() => {
                    playButton.innerHTML = '<i class="fas fa-pause"></i> Pausar música';
                })
                .catch(error => {
                    console.error("Error al reproducir música:", error);
                });
        } else {
            backgroundMusic.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i> Reproducir música';
        }
    });
    
    // Botón de mapa
    mapButton.addEventListener('click', function() {
        // Enlace a La Cochera Campestre en Chimbote
        window.open('https://www.google.com/maps/place/LA+COCHERA+CAMPESTRE/@-9.0499497,-78.5720138,17z/data=!3m1!4b1!4m6!3m5!1s0x91ab80d69f66b42f:0xb3beae3ee8265684!8m2!3d-9.0499497!4d-78.5720138!16s%2Fg%2F11cm0c9wsc?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D', '_blank');
    });
    
    // Botón de confirmación
    rsvpButton.addEventListener('click', function() {
        // Reemplaza con tu enlace de Google Forms
        window.open('https://forms.gle/vbh7YkmG73XwJBCg8', '_blank');
    });
    
    // Inicializar el countdown
    function initCountdown() {
        const eventDate = new Date('October 4, 2025 19:00:00').getTime();
        
        const countdown = setInterval(function() {
            const now = new Date().getTime();
            const distance = eventDate - now;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            
            if (distance < 0) {
                clearInterval(countdown);
                document.querySelector('.countdown-container').innerHTML = '<p class="event-started">¡El evento ha comenzado!</p>';
            }
        }, 1000);
    }
    
    // Inicializar el calendario
    function initCalendar() {
        const eventDate = new Date('October 4, 2025');
        const month = eventDate.getMonth();
        const year = eventDate.getFullYear();
        
        // Obtener el primer día del mes
        const firstDay = new Date(year, month, 1);
        // Obtener el último día del mes
        const lastDay = new Date(year, month + 1, 0);
        // Obtener el día de la semana del primer día (0-6)
        const firstDayOfWeek = firstDay.getDay();
        
        // Limpiar el calendario
        calendarDays.innerHTML = '';
        
        // Agregar días vacíos para alinear el primer día
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            calendarDays.appendChild(emptyDay);
        }
        
        // Agregar los días del mes
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dayElement = document.createElement('div');
            dayElement.textContent = i;
            
            // Marcar el día del evento
            if (i === 4) { // 4 de octubre
                dayElement.classList.add('event-day');
                dayElement.innerHTML = `${i}<span class="event-dot"></span>`;
            }
            
            calendarDays.appendChild(dayElement);
        }
    }
    
    // Inicializar el carrusel
    function initCarousel() {
        // Limpiar el carrusel
        carousel.innerHTML = '';
        carouselDots.innerHTML = '';
        
        // Agregar imágenes al carrusel
        images.forEach((image, index) => {
            // Crear elemento de imagen
            const imgElement = document.createElement('div');
            imgElement.classList.add('carousel-item');
            
            const img = document.createElement('img');
            img.src = image;
            img.alt = `Foto ${index + 1} de la cumpleañera`;
            img.loading = 'lazy';
            
            imgElement.appendChild(img);
            carousel.appendChild(imgElement);
            
            // Crear puntos de navegación
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            carouselDots.appendChild(dot);
        });
        
        // Iniciar auto-play
        startAutoPlay();
        
        // Event listeners para controles
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Pausar auto-play al interactuar
        carousel.addEventListener('mouseenter', pauseAutoPlay);
        carousel.addEventListener('touchstart', pauseAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    function startAutoPlay() {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, 5000);
    }
    
    function pauseAutoPlay() {
        clearInterval(intervalId);
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
        startAutoPlay();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
        startAutoPlay();
    }
    
    function updateCarousel() {
        // Mover el carrusel
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar puntos activos
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Efecto de confeti al abrir la invitación (opcional)
    function createConfetti() {
        const confettiCount = 100;
        const container = envelopeScreen;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = getRandomColor();
            confetti.style.animationDelay = `${Math.random() * 3}s`;
            container.appendChild(confetti);
        }
        
        function getRandomColor() {
            const colors = ['#7b2cbf', '#9d4edd', '#ff9e00', '#ffd166', '#ffffff'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    }
    
    // Descomenta la siguiente línea si quieres agregar confeti
    // createConfetti();
});