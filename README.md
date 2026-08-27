# diegosaid

Personal portfolio and writing — a statically rendered Astro site with an academic, LaTeX-inspired visual language. Every page ships as complete HTML with no client-side JavaScript. Hosted on Cloudflare Pages.

**Live:** https://diegosaid.com

## What this repo demonstrates

The site is built so that the content exists in the HTML, not in a bundle that has to run first. That constraint drives most of the decisions here.

- **Zero client JavaScript.** No framework runtime, no hydration, no router. The build emits HTML, CSS, and images; the only script on the page is the analytics beacon. Crawlers, link-preview bots, and text extractors see the full content on first fetch.
- **Build-time rendering for everything dynamic.** Syntax highlighting runs through Shiki and math through KaTeX, both at build time — the browser receives styled markup and a stylesheet, never a highlighter or a formula parser.
- **Content as data.** Posts are Markdown in a typed content collection ([`src/content.config.ts`](src/content.config.ts)); the schema is enforced at build, and `/blog` derives its index from the collection rather than a hand-maintained array that can drift from the posts themselves.
- **Per-route metadata.** [`BaseLayout.astro`](src/layouts/BaseLayout.astro) emits `<title>`, description, canonical, and Open Graph tags per page, so a shared post preview shows that post.
- **Generated OG images.** [`src/pages/og/[...route].png.ts`](src/pages/og/[...route].png.ts) renders a 1200×630 card per route at build time with satori and resvg, using the site's own typography and palette.
- **Security headers.** CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` are served from [`public/_headers`](public/_headers). The CSP allows no inline script, which the markup respects.

## Stack

| Concern      | Choice                                        |
| ------------ | --------------------------------------------- |
| Framework    | Astro 7 (static output) + TypeScript 5.9      |
| Content      | Markdown via content collections, MDX enabled |
| Styling      | Tailwind CSS 3 via PostCSS                    |
| Highlighting | Shiki (`github-light`), build time            |
| Math         | remark-math + rehype-katex, build time        |
| OG images    | satori + resvg, build time                    |
| Hosting      | Cloudflare Pages via Wrangler                 |

## Getting started

```bash
npm install
npm run dev          # http://localhost:4321
```

## Scripts

| Script                | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `npm run dev`         | Astro dev server with HMR.                                 |
| `npm run build`       | Build the static site to `dist/`.                          |
| `npm run check`       | Type-check `.astro` and `.ts` files.                       |
| `npm run preview`     | Serve the production build locally.                        |
| `npm run deploy`      | Build and upload `dist/` to Cloudflare Pages via Wrangler. |
| `npm run deploy:prod` | Push `main`, then build and deploy.                        |

## Routes

- `/` — CV: about, experience, open source, publications, education, honors, skills, contact.
- `/blog` — Writing index, generated from the content collection.
- `/blog/<slug>` — Individual posts.
- `/og/<route>.png` — Generated Open Graph image per route.

## Project layout

```
src/
  assets/fonts/      Source Serif 4 TTFs, used only by the build to draw OG images
  components/        Navbar, Footer
  content/blog/      Posts as Markdown with typed frontmatter
  content.config.ts  Collection schema
  layouts/           BaseLayout (head + chrome), BlogPost
  lib/format.ts      Date and read-time display strings
  pages/             Route entry points, including the OG image endpoint
  styles/global.css  Tailwind layers, article typography, focus rings
public/              Static assets, _headers, _redirects, robots, manifest
```

## Adding a post

Create `src/content/blog/<slug>.md` with the frontmatter the schema requires — `title`, `subtitle`, `excerpt`, `date`, `readMinutes`, `tags`. The post appears at `/blog/<slug>`, is listed on `/blog`, enters the sitemap, and gets an OG image, with no other file to touch.

Write math as `$inline$` or a `$$` block with the delimiters on their own lines. Posts are `.md` because MDX would parse LaTeX braces as JSX expressions; `.mdx` still works for a post that genuinely needs a component.

## Deployment

```bash
npm run deploy:prod   # push to GitHub, build, deploy
npm run deploy        # build and deploy without pushing
```

Pushes to `main` also build and deploy through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Wrangler reads the Cloudflare Pages project name from the script flag (`--project-name=diegosaid`); auth is handled once with `wrangler login`.

## License

All rights reserved. Code is published for portfolio review; reuse of brand assets and copy requires permission.
