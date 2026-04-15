// Funciones de interacción del portafolio

// Función para hacer scroll suave a la sección de contacto
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animaciones al hacer scroll
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar elementos para animaciones
    const elementsToObserve = document.querySelectorAll('.contact-card, .skills-badges, .description-card');
    elementsToObserve.forEach(el => observer.observe(el));
}

// Efecto de escritura para el código
function typewriterEffect() {
    const codeLines = document.querySelectorAll('.code-line');
    
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-10px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.3s ease-out';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 200 + 1000);
    });
}

// Efecto parallax suave
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-right');
        
        parallaxElements.forEach(element => {
            const speed = 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Función para crear partículas flotantes
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(135deg, hsl(270, 70%, 65%), hsl(280, 70%, 75%));
        border-radius: 50%;
        opacity: 0.3;
        animation: floatParticle ${15 + Math.random() * 10}s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    
    container.appendChild(particle);
    
    // CSS para la animación de partículas
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.3;
                }
                90% {
                    opacity: 0.3;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Función para agregar efectos de hover dinámicos
function addDynamicHovers() {
    const cards = document.querySelectorAll('.contact-card, .description-card, .code-window');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px hsl(270, 70%, 65%, 0.3)';
        });
        
        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px -10px hsl(0, 0%, 0%, 0.3)';
        });
        
        // Efecto de seguimiento del mouse
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// Función para agregar efectos de click en los botones
function addButtonEffects() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Crear efecto de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // CSS para la animación de ripple
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Función para mostrar notificaciones toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? 'hsl(120, 70%, 50%)' : 'hsl(270, 70%, 65%)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Función para detectar el tema del sistema
function detectTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!prefersDark) {
        // Ajustar colores para tema claro si es necesario
        document.documentElement.style.setProperty('--background', 'hsl(210, 20%, 98%)');
        document.documentElement.style.setProperty('--foreground', 'hsl(210, 20%, 10%)');
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Detectar tema
    detectTheme();
    
    // Inicializar efectos
    observeElements();
    typewriterEffect();
    parallaxEffect();
    createFloatingParticles();
    addDynamicHovers();
    addButtonEffects();
        
    // Lazy loading para mejorar performance
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.loading = 'lazy';
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Función para mejorar la accesibilidad
function improveAccessibility() {
    // Agregar soporte para navegación por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Agregar indicadores de foco
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid hsl(270, 70%, 65%);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// Inicializar accesibilidad
improveAccessibility();

const hamburguesa = document.querySelector('.hamburguesa');
  const menu = document.querySelector('.menu');

  hamburguesa.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
// Funciones para manejar el modal
function showExpoQR() {
  document.getElementById('expoQRModal').style.display = 'block';
  document.body.style.overflow = 'hidden'; // Evita scroll de fondo
}

function closeExpoQR(event) {
  if (!event || event.target.id === 'expoQRModal' || event.target.classList.contains('modal-close')) {
    document.getElementById('expoQRModal').style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeExpoQR();
  }
});