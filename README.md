# Anniversary Website - For Malu ❤️

This is a special front-end project created as a 1-year anniversary gift. It is a static site, yet fully dynamic and responsive, built with **pure HTML5, CSS3, and Vanilla JavaScript**.

The primary goal was to create a personalized and emotional experience, while also serving as a practical case study for a modern, high-performance, and **data-driven** front-end architecture.

### ✨ [View the live site](https://lucas-e-malu.netlify.app/)

## 🚀 Key Features

* **Real-Time Countdown:** A counter that displays the time we've been together (years, months, days, hours, minutes, and seconds), updating every second.
* **Data-Driven Architecture:** All site content (dates, text, photo URLs, declarations, letters) is dynamically loaded from a single `metadata.json` file.
* **Photo Gallery with Lightbox:** A responsive grid gallery that, when clicked, opens images in a custom, from-scratch lightbox modal.
* **Interactive "Read when..." Section:** A set of buttons that open modals with personalized letters and messages for different moods.
* **Spotify Integration:** An embedded Spotify playlist player, loaded via JavaScript.
* **100% Responsive Design:** A fully adaptive layout for a seamless experience on desktops, tablets, and mobile phones (Mobile-First).

## 💻 Tech Stack & Concepts Applied

This project was intentionally built **without any external frameworks or libraries** (like React, Vue, jQuery, or Bootstrap) to demonstrate proficiency in core web fundamentals.

* **Semantic HTML5:** Correct use of tags like `<main>`, `<section>`, `<header>`, `<footer>`, and `alt` attributes for accessibility.

* **Modern CSS3:**
    * **CSS Variables (`:root`):** The entire color palette is centralized in variables, allowing for easy and rapid theme changes (like the shift from the blue to the green theme).
    * **CSS Grid:** Used to build the responsive photo gallery layout.
    * **Flexbox:** Used for centering, counter alignment, and modal layouts.
    * **Responsive Design (Mobile-First):** The layout was built for mobile first and then adapted for larger screens using `@media queries`.
    * **Transitions & Animations:** Used to provide smooth user feedback on hovers and modal open/close events.

* **JavaScript (Vanilla - ES6+):**
    * **Async (`async`/`await`):** The site's initialization function is asynchronous, using the `fetch()` API to read the `metadata.json` before building the page.
    * **DOM Manipulation:** The site is "built" by JS. Gallery items, message buttons, and the playlist are created (`createElement`, `innerHTML`) and dynamically injected into the DOM.
    * **Event Delegation:** To optimize performance, only one `addEventListener` is used on the gallery container (and another on the messages container). The script then identifies which child item was clicked, rather than adding a listener to every single button/photo.
    * **Date/Time Logic:** Use of `new Date()` for the countdown calculations and `setInterval` to update it every second.
    * **Custom-Built Components:** The photo Lightbox and text Modal were built 100% from scratch in Vanilla JS, controlling CSS classes (`.visible`) to manage their state.

## 🧠 Challenge & Solution (Architecture)

The biggest challenge was: how to create a site that was deeply personal and easy to update (add photos, change letters) without the "owner" (me) having to rewrite the HTML or JavaScript every time?

**Solution:** A data-driven architecture.
1.  **`metadata.json` (The "Brain"):** All site content lives in this JSON file.
2.  **`index.html` (The "Skeleton"):** Contains only empty "target containers" (e.g., `<div id="galeria-container"></div>`).
3.  **`scripts.js` (The "Engine"):** On load, the script reads the JSON and uses that data to build and inject the necessary HTML into the target containers.

This means that to add a new photo to the gallery or a new "Read when..." button, one simply has to add a new object to the corresponding array in `metadata.json`. The site adapts and renders the new content automatically.

## 🔧 How to Run Locally

1.  Clone this repository:
    ```bash
    git clone [https://github.com/SEU-USUARIO/presente-malu.git](https://github.com/SEU-USUARIO/presente-malu.git)
    ```
2.  Navigate into the project folder:
    ```bash
    cd presente-malu
    ```
3.  **Important:** This project uses `fetch()` to read a local `metadata.json` file. Due to browser CORS policy, it **will not work** by opening `index.html` directly (via `file://`).

4.  You **must** run it on a local server. The easiest ways are:

    * **Using VS Code:** Install the [Live Server](http://googleusercontent.com/http/googleusercontent.com/1) extension and click "Go Live".
    * **Using Python (if installed):**
        ```bash
        # For Python 3
        python -m http.server
        ```

5.  Access the site at `http://localhost:8000` (or the port indicated by Live Server).
