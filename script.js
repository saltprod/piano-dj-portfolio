// ============================================================================
// Smooth Scroll
// ============================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================================
// Scroll Animations
// ============================================================================
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add scroll-animate class to elements
document.querySelectorAll('.world-content, .about-content, .contact-content').forEach(el => {
    el.classList.add('scroll-animate');
    scrollObserver.observe(el);
});

// ============================================================================
// Parallax Effect for World Sections
// ============================================================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    document.querySelectorAll('.world-section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPosition = scrolled - sectionTop;
        
        if (scrollPosition > -window.innerHeight && scrollPosition < sectionHeight) {
            const parallaxSpeed = 0.3;
            const bg = section.querySelector('.world-bg');
            if (bg) {
                bg.style.transform = `translateY(${scrollPosition * parallaxSpeed}px)`;
            }
        }
    });
});

// ============================================================================
// Image Load Fade-in
// ============================================================================
document.querySelectorAll('.world-image').forEach(img => {
    img.addEventListener('load', () => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            img.style.opacity = '1';
        }, 100);
    });
    
    // If image is already cached
    if (img.complete) {
        img.style.opacity = '1';
    }
});

// ============================================================================
// Dynamic Year in Footer
// ============================================================================
const footerYear = document.querySelector('.footer p');
if (footerYear) {
    const year = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', year);
}

// ============================================================================
// Console Greeting
// ============================================================================
console.log('%cPIANO / DJ', 'font-size: 24px; font-weight: bold; color: #ffffff;');
console.log('%cLearn music. Make music.', 'font-size: 14px; color: #888888;');