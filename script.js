// ============================================================================
// Navigation
// ============================================================================
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
let lastScroll = 0;

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
}, { passive: true });

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = isExpanded ? '' : 'hidden';
});

// Close mobile menu when clicking a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================================================
// Smooth Scroll with offset for fixed nav
// ============================================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

            if (prefersReducedMotion.matches) {
                window.scrollTo(0, targetPosition);
            } else {
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================================================
// Scroll Reveal Animations
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
    rootMargin: '0px 0px -30px 0px'
});

document.querySelectorAll('.scroll-reveal').forEach(element => {
    scrollObserver.observe(element);
});

// ============================================================================
// Subtle Parallax Effect for World Sections
// ============================================================================
const parallaxSections = document.querySelectorAll('.world-section');

if (!prefersReducedMotion.matches) {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = scrolled - sectionTop;

            if (scrollPosition > -window.innerHeight && scrollPosition < sectionHeight) {
                const bg = section.querySelector('.world-bg');
                const image = section.querySelector('.world-image');

                if (bg && image) {
                    // Subtle parallax
                    const parallaxSpeed = 0.15;
                    const translateY = scrollPosition * parallaxSpeed;
                    bg.style.transform = `translateY(${translateY}px)`;

                    // Gentle scale effect
                    const scale = 1 + (scrollPosition * 0.0005);
                    image.style.transform = `scale(${Math.min(Math.max(scale, 1), 1.1)})`;
                }
            }
        });
    }, { passive: true });
}

// ============================================================================
// Image Loading
// ============================================================================
document.querySelectorAll('.world-image').forEach(img => {
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.addEventListener('error', () => {
            // Hide broken image, keep background color
            img.style.display = 'none';
        });
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
console.log('%cELIJAH', 'font-size: 24px; font-weight: 300; color: #ffffff;');
console.log('%cPIANO / DJ', 'font-size: 14px; color: #888888;');
console.log('%cLearn music. Make music.', 'font-size: 12px; color: #555555;');