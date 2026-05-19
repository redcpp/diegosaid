# diegosaid

Personal portfolio site — editorial layout, scroll-driven animation, deployed on Cloudflare Pages.

**Live:** https://diegosaid.com

## Stack

- React 19 + TypeScript
- Vite 7 (dev/build) — requires Node 20.19+
- Tailwind CSS 3 + shadcn/ui (Radix primitives)
- GSAP + Lenis for scroll choreography; Framer Motion for component-level motion
- React Router 7
- Cloudflare Pages (Wrangler)

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Script                  | Purpose                                                      |
| ----------------------- | ------------------------------------------------------------ |
| `npm run dev`           | Vite dev server with HMR.                                    |
| `npm run build`         | Type-check (`tsc -b`) then build to `dist/`.                 |
| `npm run lint`          | ESLint over the codebase.                                    |
| `npm run preview`       | Serve the production build locally.                          |
| `npm run deploy`        | Build and upload `dist/` to Cloudflare Pages via Wrangler.   |
| `npm run deploy:prod`   | `git push origin main`, then build and deploy.               |

## Routes

- `/` — Home (hero, manifesto, selected projects, profile, timeline, skills, awards, contact, social, blog preview)
- `/projects` — Project index and case studies
- `/blog` — Writing index
- `/blog/:slug` — Individual posts

## Project layout

```
src/
  components/        Layout chrome (Navbar, Footer, ErrorBoundary) + reusable atoms
    ui/              shadcn/ui primitives
  hooks/             matchMedia, lazy video, reduced-motion
  lib/               Utilities and the Lenis scroll context
  pages/             Route entry points
  sections/          Home sections in render order (Section01..Section11)
  index.css          Global styles, focus rings, texture utilities
  main.tsx           Application entry
public/              Static assets (videos, SVGs, _redirects)
```

## Deployment

```bash
npm run deploy:prod   # push to GitHub, then build and deploy
npm run deploy        # build and deploy without pushing
```

Wrangler reads the Cloudflare Pages project name from the script (`--project-name=diegosaid`); auth is handled by `wrangler login` on first use.

## License

All rights reserved. Code is published for portfolio review; reuse of brand
assets, copy, and videos requires permission.
