import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { rename, rmdir } from 'node:fs/promises';

/**
 * Cloudflare Pages answers a missing path with the 404.html nearest to it, so
 * /es/whatever gets the Spanish page only if es/404.html exists. Astro writes
 * src/pages/404.astro as 404.html but every other 404.astro as 404/index.html;
 * move the Spanish one to where Pages looks.
 */
const nestedNotFound = {
  name: 'nested-404',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const es = new URL('es/', dir);
      await rename(new URL('404/index.html', es), new URL('404.html', es));
      await rmdir(new URL('404/', es));
    },
  },
};

export default defineConfig({
  site: 'https://diegosaid.com',
  integrations: [
    mdx(),
    // Pairs /x/ with /es/x/ and writes the hreflang links into the sitemap.
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-US', es: 'es-MX' } },
      filter: (page) => !page.endsWith('/404/'),
    }),
    nestedNotFound,
  ],
  markdown: {
    // KaTeX renders at build time; only its stylesheet reaches the browser.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    shikiConfig: {
      // Both themes are emitted per token as --shiki-light / --shiki-dark
      // custom properties; global.css picks one under prefers-color-scheme.
      // A single light theme would leave dark-mode code unreadable.
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: false,
    },
  },
});
