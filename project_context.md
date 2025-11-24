# Project Instructions & Context

## Goal
Create a static website in HTML and CSS.
**Constraint**: DO NOT USE `<div>` tags. Use semantic HTML5 tags (`<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, etc.).
**Constraint**: Respect W3C conventions.
**Constraint**: Content in French, but conversation in English.
**Constraint**: **NO INLINE STYLES**. All styling must be in external CSS files. Do not use `style="..."` attributes in HTML tags.

## Features
1.  **Hamburger Menu** (Top Right, always visible):
    - Home
    - Jouer
    - Présentation
    - Contact

2.  **Theme Controls** (Top Right):
    - Sun/Moon toggle for Dark/Light mode.
    - "Changer style" button to swap the CSS stylesheet.

3.  **Pages**:
    - **Home**: Profile image selection, Name input, "Start" button -> Redirects to "Jouer".
    - **Jouer**:
        - Displays a brainrot/meme image.
        - Options: Like, Dislike, Previous.
        - Like/Dislike -> Next meme page.
        - Previous -> Browser back.
        - *Simulation of Tinder swipe using only HTML/CSS (multiple pages).*
    - **Présentation**: Video section.
    - **Contact**: Contact form (opens `mailto:`).

## Implemented PDF Requirements
- **Favicon**: Added to all pages.
- **Meta Descriptions**: Added for SEO.
- **Local SEO**: Address in footer.
- **External Links**: Added in Presentation page.
- **Back to Top**: Anchor link in footer.
- **Persistence**: Theme and Style choices saved in `localStorage`.

## Resources
- `s18-projet.pdf` (Contains full instructions).
- Reference: `https://github.com/timothee-beghin/Projet_R102.git`

## Notes
- Keep the UI beautiful, readable, and pleasant.
- Commit and push often.
