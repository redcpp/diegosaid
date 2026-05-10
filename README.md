# diegosaid

Personal portfolio for **Diego Said** — a single-page editorial site built with React, Vite, Tailwind, and GSAP, deployed on Cloudflare Pages.

**Live**: https://diegosaid.pages.dev

## Stack

- **React 19** + **TypeScript**
- **Vite 7** for dev/build
- **Tailwind CSS v3** + **shadcn/ui** primitives
- **GSAP** + **Lenis** for scroll-driven animation and smooth scrolling
- **React Router v7**
- **Cloudflare Pages** for hosting

## Getting started

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Script           | Purpose                                                        |
| ---------------- | -------------------------------------------------------------- |
| `npm run dev`    | Start the Vite dev server with HMR.                            |
| `npm run build`  | Type-check (`tsc -b`) and build for production into `dist/`.   |
| `npm run lint`   | Run ESLint over the codebase.                                  |
| `npm run preview`| Preview the production build locally.                          |
| `npm run deploy` | Build and deploy `dist/` to Cloudflare Pages via Wrangler.     |

## Project layout

```
src/
  components/        Layout chrome (Navbar, Footer) + reusable atoms
    ui/              shadcn/ui primitives
  hooks/             Reusable React hooks (matchMedia, lazy video, etc.)
  lib/               Utilities and the Lenis scroll context
  pages/             Route entry points (Home, Projects, Blog, blog posts)
  sections/          Home/Projects page sections in render order
  index.css          Global styles, focus rings, texture utilities
  main.tsx           Application entry
public/              Static assets (videos, SVGs, _redirects)
docs/                Planning artifacts
output/              Phase-1 audit, redesign brief, swarm-voting outputs
```

## Deployment

Pushes to `main` are intended to trigger a Cloudflare Pages build (connect the
repo under **Pages → Settings → Builds & deployments**). Build command:
`npm run build`; output directory: `dist`.

For ad-hoc deploys without the Git integration:

```bash
npm run deploy       # builds and uploads dist/ via wrangler
```

## License

All rights reserved. Code is published for portfolio review; reuse of brand
assets, copy, and videos requires permission.
