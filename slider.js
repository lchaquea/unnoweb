document.addEventListener('DOMContentLoaded', function() {
    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    
    // Verificar que todos los testimonios estén visibles
    console.log("Total de testimonios:", testimonialCards.length);
    
    // Para un slider continuo, necesitamos clonar algunos elementos
    function setupContinuousSlider() {
        // Clonar los primeros 3 elementos y añadirlos al final
        const firstCards = Array.from(testimonialCards).slice(0, 3);
        firstCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('data-clone', 'true');
            testimonialsContainer.appendChild(clone);
        });
        
        // Clonar los últimos 3 elementos y añadirlos al principio
        const lastCards = Array.from(testimonialCards).slice(-3);
        lastCards.reverse().forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('data-clone', 'true');
            testimonialsContainer.insertBefore(clone, testimonialsContainer.firstChild);
        });
        
        // Actualizar la referencia a todas las tarjetas (incluyendo clones)
        return document.querySelectorAll('.testimonial-card');
    }
    
    // Configurar el slider continuo
    const allCards = setupContinuousSlider();
    
    // Configurar el índice inicial para mostrar los elementos originales
    let currentIndex = 3; // Comenzar después de los clones iniciales
    const cardWidth = allCards[0].offsetWidth + 30; // Ancho + gap
    const totalCards = allCards.length;
    let isAnimating = false;
    
    // Aplicar estilos base a todas las tarjetas
    allCards.forEach(card => {
        card.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.6s ease';
        card.style.willChange = 'transform, opacity';
        
        // Verificar que el contenido sea visible
        const text = card.querySelector('.testimonial-text');
        if (text) {
            text.style.minHeight = "80px";
        }
        
        // Verificar que las imágenes se carguen correctamente
        const img = card.querySelector('.author-image');
        if (img) {
            img.onerror = function() {
                // Si la imagen falla, usar una imagen de respaldo
                this.src = "https://via.placeholder.com/50";
            };
        }
    });
    
    // Inicializar el slider sin animación
    updateSlider(true);
    
    // Función para actualizar las clases de las tarjetas
    function updateCardClasses() {
        allCards.forEach((card, index) => {
            card.classList.remove('active', 'adjacent', 'distant');
            
            if (index === currentIndex + 1) {
                card.classList.add('active');
            } else {
                const distance = Math.abs(index - (currentIndex + 1));
                if (distance === 1) {
                    card.classList.add('adjacent');
                } else {
                    card.classList.add('distant');
                }
            }
        });
    }
    
    // Actualizar el slider
    function updateSlider(noAnimation) {
        requestAnimationFrame(() => {
            if (noAnimation) {
                testimonialsContainer.style.transition = 'none';
                testimonialsContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                testimonialsContainer.offsetHeight; // Forzar reflow
                testimonialsContainer.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
            } else {
                testimonialsContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            }
            
            updateCardClasses();
        });
    }
    
    // Manejar el salto invisible cuando llegamos a los extremos
    function handleInfiniteLoop() {
        // Si llegamos al final (clones), saltar al inicio real
        if (currentIndex >= totalCards - 4) {
            setTimeout(() => {
                testimonialsContainer.style.transition = 'none';
                currentIndex = 3; // Volver a los elementos originales
                testimonialsContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                testimonialsContainer.offsetHeight; // Forzar reflow
                testimonialsContainer.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
                updateCardClasses();
            }, 600);
        }
        
        // Si llegamos al inicio (clones), saltar al final real
        if (currentIndex <= 2) {
            setTimeout(() => {
                testimonialsContainer.style.transition = 'none';
                currentIndex = totalCards - 5; // Ir a los elementos originales del final
                testimonialsContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                testimonialsContainer.offsetHeight; // Forzar reflow
                testimonialsContainer.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)';
                updateCardClasses();
            }, 600);
        }
    }
    
    // Botones de navegación
    prevButton.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex--;
        updateSlider();
        handleInfiniteLoop();
        
        setTimeout(() => { isAnimating = false; }, 650);
    });
    
    nextButton.addEventListener('click', () => {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex++;
        updateSlider();
        handleInfiniteLoop();
        
        setTimeout(() => { isAnimating = false; }, 650);
    });
    
    // Auto-rotación
    let autoRotateInterval;
    
    function startAutoRotate() {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(() => {
            if (isAnimating) return;
            isAnimating = true;
            
            currentIndex++;
            updateSlider();
            handleInfiniteLoop();
            
            setTimeout(() => { isAnimating = false; }, 650);
        }, 4000);
    }
    
    startAutoRotate();
    
    // Pausar rotación con eventos
    [prevButton, nextButton, testimonialsContainer].forEach(el => {
        el.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
        el.addEventListener('touchstart', () => clearInterval(autoRotateInterval), {passive: true});
        
        el.addEventListener('mouseleave', startAutoRotate);
        el.addEventListener('touchend', startAutoRotate, {passive: true});
    });
    
    // Optimización para resize
    const resizeObserver = new ResizeObserver(debounce(() => {
        const newCardWidth = allCards[0].offsetWidth + 30;
        updateSlider(true);
    }, 250));
    
    resizeObserver.observe(testimonialsContainer);
    
    // Función debounce
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, arguments), wait);
        };
    }
    
    const backgroundImages = document.querySelector('.background-images');
    
    if (backgroundImages) {
        const imageSlider = document.createElement('div');
        imageSlider.className = 'image-slider';
        
        // Solo 6 imágenes principales
        const mainImages = [
            'https://images.pexels.com/photos/8353841/pexels-photo-8353841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', // Hombre latino feliz en ambiente profesional
            'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&q=80', // Nueva imagen: Familia latina unida y feliz
            'https://images.pexels.com/photos/8101622/pexels-photo-8101622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', // Familia latina celebrando
            'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80', // Mujer latina profesional
            'https://images.pexels.com/photos/3768114/pexels-photo-3768114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', // Abuela latina sonriente
            'https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750', // Joven latino estudiando feliz y soñador
        ];

        // Crear array con las 6 imágenes principales + 3 duplicadas para el efecto continuo
        const latinoImages = [
            ...mainImages,
            mainImages[0],
            mainImages[1],
            mainImages[2]
        ];
        
        // Asegurarnos de limpiar completamente el contenedor antes de agregar las nuevas imágenes
        backgroundImages.innerHTML = '';
        
        // Crear elementos de imagen para el slider
        latinoImages.forEach(imageUrl => {
            const sliderImage = document.createElement('div');
            sliderImage.className = 'slider-image';
            sliderImage.style.backgroundImage = `url(${imageUrl})`;
            imageSlider.appendChild(sliderImage);
        });

        // Reiniciar la animación con la nueva duración
        imageSlider.addEventListener('animationend', () => {
            imageSlider.style.animation = 'none';
            imageSlider.offsetHeight;
            imageSlider.style.animation = 'slideImages 48s linear infinite';
        });
        
        backgroundImages.appendChild(imageSlider);
    }
});

// Añadir efecto de scroll al header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});