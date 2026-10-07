/**
 * Each post as plain Markdown, at its page's URL with .md in place of the
 * trailing slash: /blog/adr47/ is also /blog/adr47.md.
 *
 * The page is built for people; this is for the tools people send to read it:
 * an assistant fetching a link, a reader that wants the text without KaTeX's
 * markup or Shiki's spans. It is the source the page is rendered from, with a
 * short header and site links made absolute so it stands on its own.
 */

import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getPosts, postLang, postPath, postSlug, type Lang } from '@/i18n';

const SITE = 'https://diegosaid.com';

export async function markdownStaticPaths(lang: Lang) {
  return (await getPosts(lang)).map((post) => ({
    params: { slug: postSlug(post) },
    props: { post },
  }));
}

/** ](/blog/x/) → ](https://diegosaid.com/blog/x/), so links survive outside the site. */
function absoluteLinks(markdown: string) {
  return markdown.replace(/\]\(\//g, `](${SITE}/`);
}

export function postMarkdown(post: CollectionEntry<'blog'>): string {
  const { title, subtitle, date, origin } = post.data;
  const lang = postLang(post);
  const meta = [
    'Diego Said',
    date.toISOString().slice(0, 10),
    `${SITE}${postPath(post)}`,
  ].join(' · ');
  return [
    `# ${title}`,
    '',
    `> ${subtitle}`,
    '',
    meta,
    ...(origin ? ['', `_${origin}_`] : []),
    '',
    absoluteLinks(post.body ?? '').trim(),
    '',
    '---',
    '',
    lang === 'es'
      ? `Más escritos: ${SITE}/blog/ · Contacto: contacto@diegosaid.com`
      : `More writing: ${SITE}/en/blog/ · Contact: contacto@diegosaid.com`,
    '',
  ].join('\n');
}

export const markdownResponse: APIRoute = ({ props }) =>
  new Response(postMarkdown(props.post as CollectionEntry<'blog'>), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
