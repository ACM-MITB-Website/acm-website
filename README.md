# ACM Website Redesign - Space Theme

This is the redesigned ACM student chapter website featuring a "deep-space, glowing-planet" aesthetic. It is a Multi-Page Application (MPA) built with React, Vite, Tailwind CSS, and Three.js.

## Features

- **Immersive Space Theme**: 3D glowing planet, starfield background, and holographic UI elements.
- **Multi-Page Structure**: Dedicated pages for each chapter:
  - **SIGSOFT**: `/sigsoft.html` (Green Theme)
  - **SIG AI**: `/sigai.html` (Cyan Theme)
  - **ACM MITB**: `/acm-mitb.html` (Dark Blue Theme)
  - **ACM-W**: `/acm-w.html` (Pink/Purple Theme)
- **Interactive Elements**:
  - **Holographic Crew Manifest**: Team members displayed in glassmorphism cards with tilt and glow effects.
  - **Events Horizon**: Horizontal scrolling timeline for events.
  - **Chapter Navigation**: Prominent, interactive list of chapters.
- **Tech Stack**:
  - **Vite**: Fast build tool and dev server.
  - **React**: UI library.
  - **Tailwind CSS**: Utility-first styling.
  - **Three.js / React Three Fiber**: 3D graphics.
  - **GSAP**: Advanced animations.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Project Structure

- `src/`: Source code.
  - `components/`: Reusable components (Hero, Navbar, Footer, Timeline, etc.).
  - `assets/`: Images and static assets.
  - `*.jsx`: Entry components for each chapter page (e.g., `SigSoftApp.jsx`).
  - `main-*.jsx`: Entry points for Vite.
- `*.html`: HTML entry points for each page.
- `vite.config.js`: Vite configuration for MPA.
