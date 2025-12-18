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
        startButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor navigation to ensure params are added

            // Navigate to Salon with params
            const currentTheme = localStorage.getItem('theme') || '';
            const currentStyle = localStorage.getItem('style') || '';

            let targetUrl = 'salon.html';
            const params = [];
            if (currentTheme) params.push(`theme=${currentTheme}`);
            if (currentStyle) params.push(`style=${currentStyle}`);

            if (params.length > 0) {
                targetUrl += '?' + params.join('&');
            }

            window.location.href = targetUrl;
        });
    }

    // --- AVATAR SELECTION LOGIC ---

    // Avatar Modal & Selection Logic
    const modal = document.getElementById('characterModal');
    if (modal) {
        // Open Modal
        document.querySelectorAll('.avatar-plus').forEach(btn => {
            btn.addEventListener('click', () => modal.classList.add('active'));
        });

        // Close Modal Handlers
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => modal.classList.remove('active'));
        });
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'characterModal') modal.classList.remove('active');
        });

        // Handle Avatar Selection
        document.querySelectorAll('.choixavatar-option').forEach(input => {
            input.addEventListener('change', (e) => {
                const newAvatarUrl = e.target.value;

                // Update Main Preview
                updateMainAvatar(newAvatarUrl);

                // Save to Storage
                localStorage.setItem('selectedAvatar', newAvatarUrl);

                // Close Modal
                setTimeout(() => modal.classList.remove('active'), 200); // Small delay for visual feedback
            });
        });
    }

    // Helper to update the avatar visual
    function updateMainAvatar(url) {
        const avatarIcon = document.querySelector('.avatar-icon');
        if (avatarIcon && url) {
            // Check if there is an image inside, if so update src, else replace innerHTML
            const img = avatarIcon.querySelector('img');
            if (img) {
                img.src = url;
            } else {
                avatarIcon.innerHTML = `<img src="${url}" alt="Selected Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
            }
        }
    }

    // Restore Avatar on Load
    const savedAvatar = localStorage.getItem('selectedAvatar');
    if (savedAvatar) {
        updateMainAvatar(savedAvatar);
    }
});
