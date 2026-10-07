import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { render, type CollectionEntry } from 'astro:content';
import { getPosts, localizePath, postPath, UI, type Lang } from '@/i18n';

const FEED_LANGUAGE: Record<Lang, string> = { en: 'en-us', es: 'es-mx' };
const SITE = 'https://diegosaid.com';

const MATH_NOTE: Record<Lang, string> = {
  es: 'Este artículo tiene matemáticas que un lector de feeds no muestra bien. Léelo completo en el sitio:',
  en: 'This article has math that a feed reader does not display well. Read it in full on the site:',
};

/**
 * The post's HTML for content:encoded, or null when it should stay on the site.
 *
 * Essays travel whole: a reader who follows by RSS reads them in the reader.
 * A post with KaTeX does not, because KaTeX's markup needs its stylesheet and
 * without it every formula shows twice. Those posts carry the excerpt and a
 * link instead. Inline styles go (Shiki's colours mean nothing without the
 * site's CSS), and site links become absolute so they work from the reader.
 */
async function postHtml(container: AstroContainer, post: CollectionEntry<'blog'>) {
  const { Content } = await render(post);
  const html = await container.renderToString(Content);
  if (html.includes('class="katex')) return null;
  return html.replace(/\sstyle="[^"]*"/g, '').replace(/(href|src)="\//g, `$1="${SITE}/`);
}

/**
 * Feed for one language's /blog/, newest first, the order getPosts returns.
 */
export async function feed(context: APIContext, lang: Lang) {
  const posts = await getPosts(lang);
  const t = UI[lang];
  const container = await AstroContainer.create();
  // Set in astro.config; the type is nullable because a site-less config is
  // legal, so fall back rather than emit a feed full of relative links.
  const site = context.site ?? new URL(SITE);
  const self = new URL(localizePath('/rss.xml', lang), site).href;
  const blog = new URL(localizePath('/blog/', lang), site).href;
  const newest = posts[0]?.data.date ?? new Date();

  const items = await Promise.all(
    posts.map(async (post) => {
      const link = postPath(post);
      const html = await postHtml(container, post);
      const content =
        html ??
        `<p>${post.data.excerpt}</p><p>${MATH_NOTE[lang]} <a href="${SITE}${link}">${SITE}${link}</a></p>`;
      return {
        title: post.data.title,
        description: post.data.excerpt,
        content,
        pubDate: post.data.date,
        categories: post.data.tags,
        // Trailing slash: Cloudflare Pages 308-redirects the bare form, and a
        // feed reader that follows the redirect would record a different id.
        link,
        customData: '<dc:creator>Diego Said</dc:creator>',
      };
    }),
  );

  return rss({
    title: `Diego Said — ${t.writing}`,
    description: t.writingDescription,
    site: blog,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      dc: 'http://purl.org/dc/elements/1.1/',
    },
    items,
    customData: [
      `<language>${FEED_LANGUAGE[lang]}</language>`,
      `<atom:link href="${self}" rel="self" type="application/rss+xml"/>`,
      `<lastBuildDate>${newest.toUTCString()}</lastBuildDate>`,
      `<image><url>${SITE}/apple-touch-icon.png</url><title>Diego Said — ${t.writing}</title><link>${blog}</link></image>`,
    ].join(''),
  });
}
