// Основной скрипт для лендинга хакатона

document.addEventListener('DOMContentLoaded', function() {
    console.log('Лендинг фестиваля «ТехноСпортФест – 2026» загружен (этап 1, кейс № 1)');
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Плавное появление карточек и галереи при скролле (с запасным вариантом,
    // чтобы контент гарантированно оставался видимым даже при проблемах с JS)
    const revealEl = el => {
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = '';
    };

    const featureCards = document.querySelectorAll('.feature-card, .module-card');
    const galleryItems = document.querySelectorAll('.gallery-item');

    const style = document.createElement('style');
    style.textContent = `
        .feature-card.visible,
        .module-card.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .gallery-item.visible {
            opacity: 1 !important;
            transform: scale(1) !important;
        }
    `;
    document.head.appendChild(style);

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealEl(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });

        galleryItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(item);
        });

        // Запасной вариант: принудительно показываем всё, даже если наблюдатель не сработал
        setTimeout(() => {
            featureCards.forEach(revealEl);
            galleryItems.forEach(revealEl);
        }, 4000);
    } else {
        // Без поддержки IntersectionObserver показываем всё сразу
        featureCards.forEach(revealEl);
        galleryItems.forEach(revealEl);
    }
    
    const yearElements = document.querySelectorAll('.footer-text, .site-subtitle');
    yearElements.forEach(el => {
        if (el.textContent.includes('2026')) {
        }
    });
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 30px rgba(0, 212, 255, 0.15)';
            this.style.borderColor = '#00d4ff';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            this.style.borderColor = '#eee';
        });
    });
    
    console.log(`
    ██████╗ █████╗  ██████╗ ██████╗ ██████╗ ██████╗ ███╗   ███╗
    ██╔══██╗██╔══██╗██╔════╝██╔═══██╗██╔══██╗██╔══██╗████╗ ████║
    ██████╔╝███████║██║     ██║   ██║██████╔╝██████╔╝██╔████╔██║
    ██╔═══╝ ██╔══██║██║     ██║   ██║██╔══██╗██╔═══╝ ██║╚██╔╝██║
    ██║     ██║  ██║╚██████╗╚██████╔╝██║  ██║██║     ██║ ╚═╝ ██║
    ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝     ╚═╝
    Республиканский фестиваль «ТехноСпортФест – 2026» • Кейс № 1 • Этап: дистанционный
    `);
});