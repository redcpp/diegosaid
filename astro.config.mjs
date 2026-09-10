import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://diegosaid.com',
  integrations: [mdx(), sitemap()],
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
