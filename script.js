document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const styleSwitcher = document.getElementById('style-switcher');
    const themeStylesheet = document.getElementById('theme-stylesheet');
    const body = document.body;

    // --- PERSISTENCE: URL Params & LocalStorage ---
    // Handle file:// protocol restrictions by using URL params as backup
    const urlParams = new URLSearchParams(window.location.search);

    // 1. Sync URL params to localStorage (if present, they take precedence)
    const styleParam = urlParams.get('style');
    const themeParam = urlParams.get('theme');

    if (styleParam) localStorage.setItem('style', styleParam);
    if (themeParam) localStorage.setItem('theme', themeParam);

    // 2. Load state
    // Default to style.css and light mode if nothing saved
    let savedStyle = localStorage.getItem('style') || 'style.css';
    let savedTheme = localStorage.getItem('theme') || 'light';

    // 3. Apply Style
    if (savedStyle) {
        if (savedStyle.includes('style.css') || savedStyle.includes('alternate_style.css')) {
            themeStylesheet.setAttribute('href', savedStyle);
        }
    }

    // 4. Apply Theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '🌙';
    } else {
        if (themeToggle) themeToggle.textContent = '☀️';
    }

    // 5. Link Rewriter helper (Crucial for keeping theme across simplified static navigation)
    const updateLinks = () => {
        const currentStyle = localStorage.getItem('style');
        const currentTheme = localStorage.getItem('theme');
        const links = document.querySelectorAll('a');

        links.forEach(link => {
            const href = link.getAttribute('href');
            // Skip anchors, mailto, javascript, or external links
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:') || href.startsWith('http')) {
                return;
            }

            try {
                const url = new URL(href, window.location.origin + window.location.pathname);

                // Set or remove params based on current state
                if (currentStyle) url.searchParams.set('style', currentStyle);
                if (currentTheme) url.searchParams.set('theme', currentTheme);

                // Simple reconstruction for file:// compatibility
                let newHref = href.split('?')[0];
                const search = url.searchParams.toString();
                if (search) {
                    newHref += '?' + search;
                }
                link.setAttribute('href', newHref);
            } catch (e) {
                // Ignore errors for invalid/complex URLs
            }
        });
    };

    // Initial link update
    updateLinks();

    // --- EVENT LISTENERS ---

    // Dark Mode Toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            themeToggle.textContent = isDark ? '🌙' : '☀️';

            const newTheme = isDark ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            updateLinks();
        });
    }

    // Style Switcher
    if (styleSwitcher) {
        styleSwitcher.addEventListener('click', () => {
            const currentHref = themeStylesheet.getAttribute('href');
            const isAlternate = currentHref.includes('alternate_style.css');
            const newHref = isAlternate ? 'style.css' : 'alternate_style.css';

            themeStylesheet.setAttribute('href', newHref);
            localStorage.setItem('style', newHref);
            updateLinks();
        });
    }

    // Mobile Menu
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- START BUTTON LOGIC (Restored) ---
    const startButton = document.querySelector('.start-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            const name = document.querySelector('.name-input')?.value || 'Joueur';
            // Save cosmetic pseudo for next pages
            localStorage.setItem('currentUser', name);

            // Navigate to Salon with params
            const currentTheme = localStorage.getItem('theme') || '';
            const currentStyle = localStorage.getItem('style') || '';

            let targetUrl = `salon.html?pseudo=${encodeURIComponent(name)}`;
            if (currentTheme) targetUrl += `&theme=${currentTheme}`;
            if (currentStyle) targetUrl += `&style=${currentStyle}`;

            window.location.href = targetUrl;
        });
    }

    // --- COSMETIC UI (No Logic) ---

    // Avatar Modal (Visual only)
    const modal = document.getElementById('characterModal');
    if (modal) {
        document.querySelectorAll('.avatar-plus').forEach(btn => {
            btn.addEventListener('click', () => modal.classList.add('active'));
        });

        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => modal.classList.remove('active'));
        });

        modal.addEventListener('click', (e) => {
            if (e.target.id === 'characterModal') modal.classList.remove('active');
        });

        // Click on character just closes modal
        document.querySelectorAll('.character-option').forEach(opt => {
            opt.addEventListener('click', () => modal.classList.remove('active'));
        });
    }

    // Mode Selection (Visual only)
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Dots (Visual only)
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });
});
