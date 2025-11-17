// JavaScript goes here

document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('theme-switcher');
    const themeStyleLink = document.getElementById('theme-style');
    const navLinks = document.querySelectorAll('.nav-link');
    const modeSections = document.querySelectorAll('.mode-section');

    let currentTheme = 'tinder'; // Default theme

    // Theme switching logic
    themeSwitcher.addEventListener('click', () => {
        if (currentTheme === 'tinder') {
            themeStyleLink.href = 'versus.css';
            currentTheme = 'versus';
            themeSwitcher.textContent = 'Passer au thème Tinder'; // Change button text
        } else {
            themeStyleLink.href = 'tinder.css';
            currentTheme = 'tinder';
            themeSwitcher.textContent = 'Passer au thème Versus'; // Change button text
        }
    });

    // Mode navigation logic
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor link behavior
            const targetMode = link.dataset.mode; // Get the target mode from data-mode attribute

            modeSections.forEach(section => {
                section.classList.remove('active'); // Hide all sections
            });

            document.getElementById(`${targetMode}-mode`).classList.add('active'); // Show the target section
        });
    });

    // --- Tinder Mode Functionality ---
    const tinderMode = document.getElementById('tinder-mode');
    const tinderCardImg = tinderMode.querySelector('.card img');
    const dislikeBtn = tinderMode.querySelector('.dislike-btn');
    const gobackBtn = tinderMode.querySelector('.goback-btn');
    const likeBtn = tinderMode.querySelector('.like-btn');

    // Placeholder image data (will be replaced with actual memes in the images/ folder)
    const tinderImages = [
        'images/meme1.jpg',
        'images/meme2.jpg',
        'images/meme3.jpg',
        'images/meme4.jpg',
        'images/meme5.jpg',
        'images/meme6.jpg',
        'images/meme7.jpg',
        'images/meme8.jpg',
        'images/meme9.jpg',
        'images/meme10.jpg',
    ];
    let currentTinderImageIndex = 0;
    const tinderHistory = []; // To implement the go back functionality

    function displayTinderImage() {
        if (tinderImages.length > 0) {
            tinderCardImg.src = tinderImages[currentTinderImageIndex];
        } else {
            tinderCardImg.src = 'https://via.placeholder.com/300x400?text=No+more+memes'; // Fallback if no images
        }
    }

    function nextTinderImage() {
        tinderHistory.push(currentTinderImageIndex); // Save current image to history
        currentTinderImageIndex = (currentTinderImageIndex + 1) % tinderImages.length;
        displayTinderImage();
    }

    function previousTinderImage() {
        if (tinderHistory.length > 0) {
            currentTinderImageIndex = tinderHistory.pop();
            displayTinderImage();
        }
    }

    dislikeBtn.addEventListener('click', nextTinderImage);
    likeBtn.addEventListener('click', nextTinderImage);
    gobackBtn.addEventListener('click', previousTinderImage);

    // Initial display
    if (tinderMode.classList.contains('active')) {
        displayTinderImage();
    }
    // Listen for navigation to Tinder mode to display image
    document.querySelector('.nav-link[data-mode="tinder"]').addEventListener('click', displayTinderImage);


    // --- Versus Mode Functionality ---
    const versusMode = document.getElementById('versus-mode');
    const versusCardImgs = versusMode.querySelectorAll('.versus-card img');
    const versusChooseBtns = versusMode.querySelectorAll('.versus-card .choose-btn');

    // Placeholder image data (will be replaced with actual memes in the images/ folder)
    const versusImages = [
        'images/meme1.jpg',
        'images/meme2.jpg',
        'images/meme3.jpg',
        'images/meme4.jpg',
        'images/meme5.jpg',
        'images/meme6.jpg',
        'images/meme7.jpg',
        'images/meme8.jpg',
        'images/meme9.jpg',
        'images/meme10.jpg',
    ];

    function getRandomVersusImages() {
        if (versusImages.length < 2) {
            return [null, null]; // Not enough images
        }
        let index1 = Math.floor(Math.random() * versusImages.length);
        let index2 = Math.floor(Math.random() * versusImages.length);

        // Ensure two different images
        while (index1 === index2) {
            index2 = Math.floor(Math.random() * versusImages.length);
        }
        return [versusImages[index1], versusImages[index2]];
    }

    function displayVersusImages() {
        const [img1, img2] = getRandomVersusImages();
        if (img1 && img2) {
            versusCardImgs[0].src = img1;
            versusCardImgs[1].src = img2;
        } else {
            versusCardImgs[0].src = 'https://via.placeholder.com/300x400?text=Error'; // Fallback if not enough images
            versusCardImgs[1].src = 'https://via.placeholder.com/300x400?text=Error';
        }
    }

    versusChooseBtns.forEach(button => {
        button.addEventListener('click', displayVersusImages);
    });

    // Initial display for Versus mode if it's active or when navigated to
    document.querySelector('.nav-link[data-mode="versus"]').addEventListener('click', displayVersusImages);

    // Initial display based on active mode on load
    if (tinderMode.classList.contains('active')) {
        displayTinderImage();
    } else if (versusMode.classList.contains('active')) {
        displayVersusImages();
    }
});
