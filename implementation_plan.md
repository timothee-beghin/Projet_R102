# Implementation Plan - Redesign Style 1 & Favicon

## Goal Description
Redesign the initial style (`style.css`) to match the aesthetic of `meow.css` (purple gradients, glassmorphism, rounded corners) and update the site favicon to use the provided logo image.

## User Review Required
> [!IMPORTANT]
> I will rename `Sans titre.png` to `logo.png` to avoid issues with spaces in filenames and for better clarity.

## Proposed Changes

### CSS
#### [MODIFY] [style.css](file:///home/androtim/Documents/GitHub/Projet_R102/style.css)
- Update `:root` variables to match `meow.css` colors.
- Apply the linear gradient background.
- Implement glassmorphism (translucent backgrounds + blur) for cards and sections.
- Update typography to match `meow.css` (Arial, sans-serif).
- Adjust border styles and shadows.

### Assets
#### [RENAME] `Sans titre.png` -> `logo.png`

### HTML
#### [MODIFY] [index.html](file:///home/androtim/Documents/GitHub/Projet_R102/index.html)
#### [MODIFY] [jouer.html](file:///home/androtim/Documents/GitHub/Projet_R102/jouer.html)
#### [MODIFY] [jouer_2.html](file:///home/androtim/Documents/GitHub/Projet_R102/jouer_2.html)
#### [MODIFY] [jouer_3.html](file:///home/androtim/Documents/GitHub/Projet_R102/jouer_3.html)
#### [MODIFY] [presentation.html](file:///home/androtim/Documents/GitHub/Projet_R102/presentation.html)
#### [MODIFY] [contact.html](file:///home/androtim/Documents/GitHub/Projet_R102/contact.html)
#### [MODIFY] [fin.html](file:///home/androtim/Documents/GitHub/Projet_R102/fin.html)
- Update `<link rel="icon" ...>` to point to `logo.png`.

## Verification Plan
### Manual Verification
- Open `index.html` and check if the background and cards match the `meow.css` style.
- Verify the favicon is displayed correctly in the browser tab (simulated by checking the code).
- Check responsiveness on mobile (since we previously fixed it, ensure new styles don't break it).
