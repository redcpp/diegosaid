import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postPath, UI, type Lang } from '@/i18n';

const FEED_LANGUAGE: Record<Lang, string> = { en: 'en-us', es: 'es-mx' };

/**
 * Feed for one language's /blog/.
 *
 * Newest first, the order getPosts returns. A reader pulls the feed to see
 * what is new.
 *
 * Items carry the excerpt, not the post body. The posts run to several thousand
 * words with KaTeX and highlighted code, none of which survives a feed reader
 * intact, so the description is the blurb and the link is the article.
 */
export async function feed(context: APIContext, lang: Lang) {
  const posts = await getPosts(lang);
  const t = UI[lang];

  return rss({
    title: `Diego Said — ${t.writing}`,
    description: t.writingDescription,
    // Set in astro.config; the type is nullable because a site-less config is
    // legal, so fall back rather than emit a feed full of relative links.
    site: context.site ?? 'https://diegosaid.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      categories: post.data.tags,
      // Trailing slash: Cloudflare Pages 308-redirects the bare form, and a
      // feed reader that follows the redirect would record a different id.
      link: postPath(post),
    })),
    customData: `<language>${FEED_LANGUAGE[lang]}</language>`,
  });
}
