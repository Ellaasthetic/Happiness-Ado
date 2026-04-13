// Image data for lightbox - UPDATED PATHS
const images = [
    { src: 'images/portfolio-1.jpeg', title: 'Golden Hour' },
    { src: 'images/portfolio-2.jpeg', title: 'Velvet Dreams' },
    { src: 'images/portfolio-3.jpeg', title: 'Midnight Rose' },
    { src: 'images/portfolio-4.jpeg', title: 'Silk & Shadows' },
    { src: 'images/portfolio-5.jpeg', title: 'Ethereal' },
    { src: 'images/portfolio-6.jpeg', title: 'Crimson Light' },
    { src: 'images/portfolio-7.jpeg', title: 'Velvet Dreams' },
    { src: 'images/portfolio-8.jpeg', title: 'Ethereal' },
    { src: 'images/portfolio-10.jpeg', title: 'Crimson Light' },
    { src: 'images/portfolio-13.jpeg', title: 'Golden Hour' },
    { src: 'images/portfolio-14.jpeg', title: 'Golden Hour' }
];

let currentImageIndex = 0;

// DOM Elements
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const navbar = document.getElementById('navbar');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');
const menuToggle = document.getElementById('menu-toggle');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initNavigation();
    initScrollReveal();
    initLightbox();
    initParallax();
    initMobileMenu();
});

// Custom Cursor
function initCustomCursor() {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Cursor hover effect
    const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .lightbox-nav, .contact-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

// Navigation Scroll Effect
function initNavigation() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Lightbox Functions
function initLightbox() {
    // Gallery item clicks
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'));
            openLightbox(index);
        });
    });

    // Lightbox controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => changeImage(-1));
    lightboxNext.addEventListener('click', () => changeImage(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    lightboxImg.src = images[index].src;
    lightboxImg.alt = images[index].title;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.alt = images[currentImageIndex].title;
        lightboxImg.style.opacity = '1';
    }, 200);
}

// Parallax Effect for Floating Images
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-img');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.1);
            const rotation = el.style.getPropertyValue('--r') || '0deg';
            el.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation})`;
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    menuToggle.addEventListener('click', () => {
        const nav = document.querySelector('.nav-container .hidden');
        nav.classList.toggle('hidden');
        nav.classList.toggle('flex');
        nav.classList.toggle('flex-col');
        nav.classList.toggle('absolute');
        nav.classList.toggle('top-16');
        nav.classList.toggle('left-0');
        nav.classList.toggle('right-0');
        nav.classList.toggle('bg-black');
        nav.classList.toggle('p-4');
    });
}