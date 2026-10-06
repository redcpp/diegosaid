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
| `npm test`            | Check that the built site is fully bilingual (build first). |
| `npm run preview`     | Serve the production build locally.                        |
| `npm run deploy`      | Build, check, test, then upload `dist/` to Cloudflare Pages. |
| `npm run deploy:prod` | Push `main`, then build and deploy.                        |

## Routes

The site is bilingual: English at the root, Spanish under `/es/`. Every route below exists in both trees, and the EN / ES switch in the navbar links each page to its counterpart. It is a plain link, so the site still ships no client JavaScript.

- `/`, `/es/` — CV: about, experience, open source, publications, education, honors, skills, contact.
- `/blog/`, `/es/blog/` — Writing index, generated from that language's posts: every post, newest first, featured ones marked with a small star, with a switch to read it oldest first. The switch is two radio buttons and a CSS `:has()` rule.
- `/blog/<slug>/`, `/es/blog/<slug>/` — Individual posts.
- `/rss.xml`, `/es/rss.xml` — One feed per language.
- `/og/<route>.png`, `/og/es/<route>.png` — Generated Open Graph image per route.

Pages carry `hreflang` alternates, and the sitemap pairs `/x/` with `/es/x/`. Cloudflare Pages serves `es/404.html` for missing paths under `/es/`; a small hook in `astro.config.mjs` moves it there, since Astro writes nested 404 pages as `404/index.html`.

## Project layout

```
src/
  assets/fonts/      Source Serif 4 TTFs, used only by the build to draw OG images
  components/        Navbar (with the language switch), Footer
  content/blog/      Posts as Markdown with typed frontmatter, one folder per language (en/, es/)
  content.config.ts  Collection schema
  i18n/              Languages, path helpers and chrome strings; cv.ts holds the home page in both languages
  layouts/           BaseLayout (head + chrome), BlogPost
  lib/format.ts      Date and read-time display strings
  pages/             Thin route entry points per language, plus the OG image endpoint
  views/             The pages themselves, rendered once per language
  styles/global.css  Tailwind layers, article typography, focus rings
public/              Static assets, _headers, _redirects, robots, manifest
```

## Adding a post

Create `src/content/blog/en/<slug>.md` or `src/content/blog/es/<slug>.md` with the frontmatter the schema requires — `title`, `subtitle`, `excerpt`, `date`, `readMinutes`, `tags`. The folder is the language: it sets `<html lang>`, `og:locale`, the header labels and the URL (`/blog/<slug>/` or `/es/blog/<slug>/`). The post is listed on that language's index and feed, enters the sitemap, and gets an OG image, with no other file to touch.

Set `featured: true` to mark a post with a small star on `/blog/`; a translation must carry the same flag.

A post dated in the future is scheduled: it stays out of the pages, index, feeds, sitemap and OG cards until that date in Mexico City, and the deploy workflow rebuilds every day at 00:10 Mexico City time to publish it. `npm run dev` shows scheduled posts anyway, marked on the index, so they can be read before their date. The rule lives in [`src/lib/schedule.ts`](src/lib/schedule.ts).

A translation is the same file name in the other folder; the two link to each other through the navbar switch and `hreflang`. If the translation needs its own slug, set `key:` in its frontmatter to the original's file name. Until a post has a translation, the switch on it leads to the other language's `/blog/`. Links between posts point inside the same tree (`/es/blog/adr47/` from a Spanish post).

Write math as `$inline$` or a `$$` block with the delimiters on their own lines. Posts are `.md` because MDX would parse LaTeX braces as JSX expressions; `.mdx` still works for a post that genuinely needs a component.

## Bilingual tests

[`tests/bilingual.test.mjs`](tests/bilingual.test.mjs) runs on Node's built-in test runner with no dependencies. Nothing in it is listed by hand: a new post or page is covered as soon as it exists, and fails until its translation does.

- **Source.** Every post in `en/` has a translation in `es/` and the reverse, keys are unique, and each pair shares a date, a tag count and its `featured` flag. The CV has the same entries in both languages.
- **Build.** Every page in `dist/` has `hreflang` links to both languages, the targets exist and point back, `<html lang>` matches the tree, and the navbar switch leads to the translation rather than a fallback. Each translation keeps the original's skeleton (headings, code blocks, math, tables, lists, images), so a section dropped in translation fails. Links inside a page stay in its language, except a link to the page's own translation. Every page has its own OG card, each language has its own 404, both feeds carry every published post, and no scheduled post is built before its date.
- **Types.** `UI.es` is typed against the English keys, so a chrome string added in one language only fails `npm run check`.

CI runs the type check and the tests after the build and before the deploy, so a post published in one language does not ship until its translation exists.

## Deployment

```bash
npm run deploy:prod   # push to GitHub, build, deploy
npm run deploy        # build and deploy without pushing
```

Pushes to `main` also build and deploy through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which also runs every day at 00:10 Mexico City time to publish scheduled posts, and can be run by hand from the Actions tab. Wrangler reads the Cloudflare Pages project name from the script flag (`--project-name=diegosaid`); auth is handled once with `wrangler login`.

## License

All rights reserved. Code is published for portfolio review; reuse of brand assets and copy requires permission.
