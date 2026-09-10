import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

/**
 * Feed for /blog.
 *
 * Newest first — the reverse of the index page, which reads oldest first the
 * way a bibliography does. A reader pulls the feed to see what is new.
 *
 * Items carry the excerpt, not the post body. The posts run to several thousand
 * words with KaTeX and highlighted code, none of which survives a feed reader
 * intact, so the description is the blurb and the link is the article.
 */
export async function GET(context: APIContext) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: 'Diego Said — Writing',
    description:
      'Long-form essays on protocol design, distributed systems, and AI infrastructure.',
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
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
