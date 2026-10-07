import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { readFileSync, readdirSync } from 'node:fs';
import { rename, rmdir } from 'node:fs/promises';

/**
 * Cloudflare Pages answers a missing path with the 404.html nearest to it, so
 * /en/whatever gets the English page only if en/404.html exists. Astro writes
 * src/pages/404.astro as 404.html but every other 404.astro as 404/index.html;
 * move the English one to where Pages looks.
 */
const nestedNotFound = {
  name: 'nested-404',
  hooks: {
    'astro:build:done': async ({ dir }) => {
      const en = new URL('en/', dir);
      await rename(new URL('404/index.html', en), new URL('404.html', en));
      await rmdir(new URL('404/', en));
    },
  },
};

/**
 * Each post's date by URL, for the sitemap's <lastmod>. Read from the front
 * matter directly: the config loads before the content layer exists. The
 * indexes and home pages take the newest date among the posts they list.
 */
function postDates() {
  const dates = new Map();
  for (const lang of ['es', 'en']) {
    const dir = new URL(`./src/content/blog/${lang}/`, import.meta.url);
    for (const name of readdirSync(dir).filter((file) => /\.mdx?$/.test(file))) {
      const date = readFileSync(new URL(name, dir), 'utf8').match(/^date:\s*(\S+)/m)?.[1];
      if (!date) continue;
      const prefix = lang === 'es' ? '' : '/en';
      dates.set(`${prefix}/blog/${name.replace(/\.mdx?$/, '')}/`, date);
    }
  }
  return dates;
}

const DATES = postDates();

function lastmod(path) {
  if (DATES.has(path)) return DATES.get(path);
  // A listing page changes when the newest post it lists does.
  const prefix = path.startsWith('/en/') ? '/en/' : '/';
  if (path === prefix || path === `${prefix}blog/`) {
    const today = new Date().toISOString().slice(0, 10);
    return [...DATES]
      .filter(([url]) => url.startsWith(`${prefix === '/' ? '' : '/en'}/blog/`))
      .map(([, date]) => date)
      .filter((date) => date <= today)
      .sort()
      .at(-1);
  }
  return undefined;
}

export default defineConfig({
  site: 'https://diegosaid.com',
  integrations: [
    mdx(),
    // Pairs /x/ with /en/x/ and writes the hreflang links into the sitemap,
    // with the same bare language codes the pages use.
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es', en: 'en' } },
      filter: (page) => !page.endsWith('/404/'),
      serialize(item) {
        const date = lastmod(new URL(item.url).pathname);
        return date ? { ...item, lastmod: date } : item;
      },
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
