# Soumyadip Sil | Developer Portfolio

Welcome to the source code of my personal portfolio website. This project showcases my skills, experience, and the software I've built, wrapped in a highly aesthetic, animated, and responsive user interface.

## ?? Tech Stack

This portfolio is built with a modern, high-performance web stack:

- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling & UI:** 
  - Tailwind CSS
  - Custom Glassmorphism & Neumorphism elements
  - Once UI (Design System)
  - Magic UI & Framer Motion (Animations)
- **Deployment:** Vercel

## ?? Project Structure

The project follows a clean, modular Next.js 15 structure:

```text
+-- public/                  # Static assets (Resume PDF, images, icons)
+-- src/
¦   +-- app/                 # Next.js App Router root
¦   ¦   +-- api/             # Backend API routes (Email handling, OG images)
¦   ¦   +-- components/      # Core page sections (Hero, Projects, Experience, Skills)
¦   ¦   +-- layout.tsx       # Root layout & providers
¦   ¦   +-- page.tsx         # Main landing page
¦   +-- blocks/              # Complex animated components (Text animations, Cursors)
¦   +-- components/          # Shared UI components (Magic UI effects, Buttons)
¦   +-- lib/                 # Utility functions
¦   +-- resources/           # Global configuration (once-ui.config.js) and custom CSS
+-- tailwind.config.ts       # Tailwind styling configuration
+-- package.json             # Project dependencies
```

## ? Key Features

- **Advanced UI/UX:** Features a premium glassmorphism navigation bar, smooth scroll animations, and interactive hover states.
- **Component-Driven:** Highly modular architecture making it easy to swap out projects, skills, or experience blocks.
- **Fully Responsive:** Beautifully adapts to all screen sizes, from mobile devices to ultrawide desktop monitors.
- **SEO Optimized:** Dynamic OpenGraph routing and semantic HTML structure.

## ??? Local Development

To run this project locally, clone the repository and install the dependencies:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

## ?? Contact

- **Email:** soumyadipsil602@gmail.com
- **LinkedIn:** [Soumyadip Sil](https://www.linkedin.com/in/soumyadip-sil-bb0935385/)
- **GitHub:** [@SoumyadipSil](https://github.com/SoumyadipSil)

