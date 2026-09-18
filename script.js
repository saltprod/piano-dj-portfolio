// ============================================================================
// Book Pagination
// ============================================================================
const book = document.getElementById('book');
const spreads = [...document.querySelectorAll('.spread')];
const leaves = [...document.querySelectorAll('.leaf')];
const dots = [...document.querySelectorAll('.dot')];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const desktopQuery = window.matchMedia('(min-width: 769px)');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const LAST_LEAF = leaves.length - 1;

const state = {
    currentLeaf: 0
};

function isDesktop() {
    return desktopQuery.matches;
}

function leafIndexFromHash() {
    const id = window.location.hash.replace('#', '');
    if (!id) return -1;
    return leaves.findIndex(leaf => leaf.id === id);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

// ============================================================================
// Render
// ============================================================================
function render() {
    const spreadIndex = Math.floor(state.currentLeaf / 2);

    spreads.forEach((spread, i) => {
        spread.classList.toggle('active', i === spreadIndex);
    });

    leaves.forEach((leaf, i) => {
        const inActiveSpread = Math.floor(i / 2) === spreadIndex;
        const isCurrent = i === state.currentLeaf;
        leaf.classList.toggle('leaf-active', isDesktop() ? inActiveSpread : isCurrent);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === spreadIndex);
    });

    prevBtn.disabled = state.currentLeaf === 0;
    nextBtn.disabled = state.currentLeaf === LAST_LEAF;

    const targetId = leaves[state.currentLeaf].id;
    if (window.location.hash !== `#${targetId}`) {
        history.replaceState(null, '', `#${targetId}`);
    }
}

function goTo(index) {
    state.currentLeaf = clamp(index, 0, LAST_LEAF);
    render();
}

function step(direction) {
    const amount = isDesktop() ? 2 : 1;
    const spreadIndex = Math.floor(state.currentLeaf / 2);

    if (isDesktop()) {
        goTo(clamp(spreadIndex * 2 + direction * amount, 0, LAST_LEAF));
    } else {
        goTo(state.currentLeaf + direction * amount);
    }
}

function next() {
    step(1);
}

function prev() {
    step(-1);
}

// ============================================================================
// Init leaf index labels (static, doesn't change with navigation)
// ============================================================================
leaves.forEach((leaf, i) => {
    const label = leaf.querySelector('.leaf-index');
    if (label) {
        label.textContent = `${String(i + 1).padStart(2, '0')}/${String(leaves.length).padStart(2, '0')}`;
    }
});

// ============================================================================
// Controls
// ============================================================================
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.spread, 10) * 2);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
});

// Intercept any in-page link that targets a leaf (brand, hero CTA, contact tab, "learn more" links)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').replace('#', '');
        const index = leaves.findIndex(leaf => leaf.id === id);
        if (index !== -1) {
            e.preventDefault();
            goTo(index);
        }
    });
});

// ============================================================================
// Touch swipe (mobile page turn)
// ============================================================================
let touchStartX = 0;
let touchStartY = 0;

book.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
}, { passive: true });

book.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) {
        next();
    } else {
        prev();
    }
}, { passive: true });

// ============================================================================
// Resize (re-render on breakpoint change: desktop shows spreads, mobile single leaf)
// ============================================================================
let lastIsDesktop = isDesktop();
window.addEventListener('resize', () => {
    if (isDesktop() !== lastIsDesktop) {
        lastIsDesktop = isDesktop();
        render();
    }
});

// ============================================================================
// Image Loading
// ============================================================================
document.querySelectorAll('.photo-img').forEach(img => {
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        img.style.opacity = '0';
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.addEventListener('error', () => {
            img.style.display = 'none';
        });
    }
});

// ============================================================================
// Dynamic Year in Footer
// ============================================================================
const footerCredit = document.querySelector('.footer-credit');
if (footerCredit) {
    const year = new Date().getFullYear();
    footerCredit.textContent = footerCredit.textContent.replace('2024', year);
}

// ============================================================================
// Console Greeting
// ============================================================================
console.log('%cELIJAH', 'font-size: 24px; font-weight: 700; color: #f2ede1;');
console.log('%cPIANO / DJ', 'font-size: 14px; color: #9a9484;');
console.log('%cLearn music. Make music.', 'font-size: 12px; color: #6b6656;');

// ============================================================================
// Initial render
// ============================================================================
const initialIndex = leafIndexFromHash();
state.currentLeaf = initialIndex !== -1 ? initialIndex : 0;
render();
