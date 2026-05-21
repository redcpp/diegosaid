# diegosaid

Personal portfolio site — a hand-built React SPA that holds scroll-driven animation, a strict performance budget, and a full accessibility baseline in balance. Shipped on Cloudflare Pages.

**Live:** https://diegosaid.com

## What this repo demonstrates

A production single-page app written from scratch with an emphasis on three things: motion that respects user preferences, a payload small enough to load fast on mobile, and an editorial visual language that holds up under scrutiny.

- **Scroll choreography** — GSAP timelines synced to a Lenis smooth-scroll context, with `prefers-reduced-motion` honored at every entry point ([`src/lib/lenis-context.tsx`](src/lib/lenis-context.tsx), [`src/hooks/use-reduced-motion.ts`](src/hooks/use-reduced-motion.ts)).
- **Performance budget** — routes are code-split with `React.lazy`; vendor chunks for React, GSAP and motion libs are pinned in [`vite.config.ts`](vite.config.ts) to keep the initial bundle predictable. Hero and project clips ship as compressed WebM with MP4 fallback and a poster frame.
- **Lazy media** — `useLazyVideo` defers `<video>` decode until the element enters the viewport ([`src/hooks/use-lazy-video.ts`](src/hooks/use-lazy-video.ts)).
- **Resilience** — top-level `ErrorBoundary` catches render errors per route so a broken section never blanks the page.
- **A11y baseline** — visible focus rings, skip link, semantic landmarks, reduced-motion fallbacks, alt text on every illustrative asset.
- **SEO / PWA** — sitemap, robots, OpenGraph image, web manifest, Apple touch icon, and `_headers` with CSP, HSTS, and referrer policy live in [`public/`](public/).

Read end to end, it's a small system kept disciplined: explicit performance and motion budgets, a top-level failure mode that degrades gracefully instead of blanking the page, and a section layout you can reorder without hunting through imports. The same systems-thinking and maintenance instincts, applied to a small surface.

## Stack

| Concern        | Choice                                                         |
| -------------- | -------------------------------------------------------------- |
| Framework      | React 19 + TypeScript 5.9                                      |
| Build          | Vite 7 (Node 20.19+)                                           |
| Styling        | Tailwind CSS 3, shadcn/ui on top of Radix primitives           |
| Motion         | GSAP 3 + Lenis for scroll; Framer Motion for component motion  |
| Routing        | React Router 7 with lazy route boundaries                      |
| Forms          | React Hook Form + Zod                                          |
| Hosting        | Cloudflare Pages via Wrangler                                  |

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Scripts

| Script                | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `npm run dev`         | Vite dev server with HMR.                                  |
| `npm run build`       | Type-check (`tsc -b`) and build to `dist/`.                |
| `npm run lint`        | ESLint over the codebase.                                  |
| `npm run preview`     | Serve the production build locally.                        |
| `npm run deploy`      | Build and upload `dist/` to Cloudflare Pages via Wrangler. |
| `npm run deploy:prod` | Push `main`, then build and deploy.                        |

## Routes

- `/` — Home: hero, manifesto, selected projects, profile, timeline, skills, awards, contact, social, blog preview.
- `/projects` — Project index and case studies.
- `/blog` — Writing index.
- `/blog/:slug` — Individual posts.

## Project layout

```
src/
  components/        Layout chrome (Navbar, Footer, ErrorBoundary, SkipLink) + reusable atoms
    ui/              shadcn/ui primitives
  hooks/             matchMedia, lazy video, reduced-motion
  lib/               Utilities and the Lenis scroll context
  pages/             Route entry points (lazy-loaded)
  sections/          Home sections in render order (Section01..Section11)
  index.css          Global styles, focus rings, texture utilities
  main.tsx           Application entry
public/              Static assets, _headers, _redirects, sitemap, manifest
```

Sections are intentionally numbered to make the home-page render order grep-able and reorderable without hunting through imports.

## Deployment

```bash
npm run deploy:prod   # push to GitHub, build, deploy
npm run deploy        # build and deploy without pushing
```

Wrangler reads the Cloudflare Pages project name from the script flag (`--project-name=diegosaid`). Auth is handled once with `wrangler login`.

Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) and SPA rewrites are served from [`public/_headers`](public/_headers) and [`public/_redirects`](public/_redirects).

## License

All rights reserved. Code is published for portfolio review; reuse of brand assets, copy, and videos requires permission.
