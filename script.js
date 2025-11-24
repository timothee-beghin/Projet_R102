document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const styleSwitcher = document.getElementById('style-switcher');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const body = document.body;

    // 1. Load saved state from localStorage
    const savedTheme = localStorage.getItem('theme');
    const savedStyle = localStorage.getItem('style');

    // Apply Theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '🌙';
    } else {
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    // Apply Style
    if (savedStyle) {
        themeStylesheet.setAttribute('href', savedStyle);
    }

    // 2. Event Listeners
    // Dark Mode Toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            themeToggle.textContent = isDark ? '🌙' : '☀️';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Style Switcher
    if (styleSwitcher) {
        styleSwitcher.addEventListener('click', () => {
            const currentHref = themeStylesheet.getAttribute('href');
            // Check if we are currently using the alternate style
            const isAlternate = currentHref.includes('alternate_style.css');
            const newHref = isAlternate ? 'style.css' : 'alternate_style.css';

            themeStylesheet.setAttribute('href', newHref);
            localStorage.setItem('style', newHref);
        });
    }

    // Hamburger Menu Logic
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
});
