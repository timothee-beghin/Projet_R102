# Feature Restoration & Script Fixes

## User Review Required
> [!NOTE]
> The missing video issue is still under investigation. The user recalled a video on the homepage, but git inspection suggests it belongs on the **Presentation** page. I will clarify this.

## Proposed Changes
### Script Logic (`script.js`)
#### [MODIFY] [script.js](file:///home/androtim/Documents/GitHub/Projet_R102/script.js)
-   **Start Button**: Implement event listener to handle navigation to `jouer.html` with URL parameters (`pseudo`, `avatar`, `theme`, `style`).
-   **Modal Logic**: Ensure avatar selection modal opens and updates state correctly.
-   **Cleanup**: Remove duplicated code blocks affecting button logic.

### Simplified Architecture (Static Flow)
#### [MODIFY] [script.js](file:///home/androtim/Documents/GitHub/Projet_R102/script.js)
-   **Simplify**: Remove User/Avatar persistence logic.
-   **Focus**: Keep only UI interactivity (Theme Toggle, Style Switcher, Mobile Menu, Modal cosmetic interactions).

#### [MODIFY] [salon.html](file:///home/androtim/Documents/GitHub/Projet_R102/salon.html)
-   **Static UI**: Hardcode "Participant" list (cosmetic).
-   **Invite Button**: Add cosmetic button.
-   **Navigation**: "Lancer" button links directly to `jouer.html` (no complex params).

#### [MODIFY] [jouer.html](file:///home/androtim/Documents/GitHub/Projet_R102/jouer.html), [jouer_2.html](file:///home/androtim/Documents/GitHub/Projet_R102/jouer_2.html), [jouer_3.html](file:///home/androtim/Documents/GitHub/Projet_R102/jouer_3.html)
-   **Design**: Apply "Hear Out" design to all game pages.
-   **Hardcoded Flow**:
    -   `jouer.html` -> `jouer_2.html`
    -   `jouer_2.html` -> `jouer_3.html`
    -   `jouer_3.html` -> `fin.html`
-   **Content**: Different meme content for each page (static).

## Verification Plan
### Manual Verification
-   **Flow**: Click through the entire sequence (Home -> Salon -> Game 1 -> Game 2 -> Game 3 -> End).
-   **No Errors**: Check console for absence of JS errors (due to removed logic).



