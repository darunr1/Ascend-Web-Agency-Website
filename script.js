// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Pill navbar: add .scrolled class on scroll for deeper shadow
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe portfolio items
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(item);
});

// Parallax effect for hero orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Add hover effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add click animation to service cards
serviceCards.forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Dynamic gradient animation for hero title
const gradientText = document.querySelector('.gradient-text');
if (gradientText) {
    let hue = 180;
    setInterval(() => {
        hue = (hue + 0.5) % 360;
        // Subtle animation - keeping teal to lime gradient but with slight variation
    }, 50);
}

// Console message
console.log('%c🚀 Ascend Web Agency', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #14b8a6, #84cc16); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cReady to elevate your digital presence?', 'font-size: 14px; color: #14b8a6;');

// =====================
// PAGE TRANSITION LOADER
// =====================
(function () {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = '<div class="ldr-ring"></div><span class="ldr-label">ASCEND</span>';
    document.body.appendChild(loader);

    const s = document.createElement('style');
    s.textContent = `
        #page-loader {
            position: fixed; inset: 0;
            background: #0a0f0d;
            z-index: 99999;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 1.25rem;
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        #page-loader.out { opacity: 0; pointer-events: none; }
        .ldr-ring {
            width: 48px; height: 48px;
            border: 3px solid rgba(20,184,166,0.15);
            border-top-color: #14b8a6;
            border-radius: 50%;
            animation: ldrSpin 0.75s linear infinite;
        }
        .ldr-label {
            font-family: 'Inter', sans-serif;
            font-size: 0.68rem; font-weight: 800;
            letter-spacing: 0.28em;
            background: linear-gradient(135deg, #14b8a6, #84cc16);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        @keyframes ldrSpin { to { transform: rotate(360deg); } }
    `;
    document.head.appendChild(s);

    // Fade out on page load
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('out'), 120);
    });

    // Intercept internal link clicks
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;
        const href = a.getAttribute('href');
        if (!href) return;
        const isInternal = !href.startsWith('http') && !href.startsWith('#') &&
                           !href.startsWith('mailto') && !href.startsWith('tel') &&
                           a.getAttribute('target') !== '_blank';
        if (!isInternal) return;
        e.preventDefault();
        loader.classList.remove('out');
        setTimeout(() => { window.location.href = href; }, 380);
    });
})();
