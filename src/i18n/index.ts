/**
 * Two languages, two URL trees: English at the root, Spanish under /es/.
 *
 * The switch in the navbar is a plain link to the same page in the other tree,
 * so the site stays free of client JavaScript. Nothing guesses the reader's
 * language from Accept-Language; the root is English and the link is one click.
 */

import { getCollection, type CollectionEntry } from 'astro:content';

export type Lang = 'en' | 'es';

export const LANGS: readonly Lang[] = ['en', 'es'];
export const DEFAULT_LANG: Lang = 'en';

export const OG_LOCALE: Record<Lang, string> = { en: 'en_US', es: 'es_MX' };

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'es' : 'en';
}

/** '/blog/' in English is '/es/blog/' in Spanish. Paths keep their trailing slash. */
export function localizePath(path: string, lang: Lang): string {
  return lang === DEFAULT_LANG ? path : `/${lang}${path}`;
}

/** Strings for the site chrome. Page content lives with its page. */
export const UI = {
  en: {
    writing: 'Writing',
    contact: 'Contact',
    writingDescription:
      'Long-form essays on protocol design, distributed systems, and AI infrastructure.',
    allArticles: '← All articles',
    home: '← Home',
    notFound: 'Not Found',
    notFoundBody: 'That page does not exist.',
    /** Label of the link that leads to this language, read from the other one. */
    switchLabel: 'Read in English',
  },
  es: {
    writing: 'Escritos',
    contact: 'Contacto',
    writingDescription:
      'Ensayos largos sobre diseño de protocolos, sistemas distribuidos e infraestructura de IA.',
    allArticles: '← Todos los artículos',
    home: '← Inicio',
    notFound: 'Página no encontrada',
    notFoundBody: 'Esa página no existe.',
    switchLabel: 'Leer en español',
  },
} satisfies Record<Lang, Record<string, string>>;

type Post = CollectionEntry<'blog'>;

/** 'es/adr47' → 'es'. */
export function postLang(post: Post): Lang {
  return post.id.split('/')[0] as Lang;
}

/** 'es/adr47' → 'adr47'. */
export function postSlug(post: Post): string {
  return post.id.slice(post.id.indexOf('/') + 1);
}

export function postPath(post: Post): string {
  return localizePath(`/blog/${postSlug(post)}/`, postLang(post));
}

function postKey(post: Post): string {
  return post.data.key ?? postSlug(post);
}

/** Posts in one language, oldest first, the way a bibliography reads. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  return (await getCollection('blog', (post) => postLang(post) === lang)).sort(
    (a, b) => a.data.date.valueOf() - b.data.date.valueOf(),
  );
}

/** The same post in each language it has been written in, keyed by language. */
export async function postTranslations(post: Post): Promise<Partial<Record<Lang, string>>> {
  const key = postKey(post);
  const all = await getCollection('blog', (other) => postKey(other) === key);
  return Object.fromEntries(all.map((other) => [postLang(other), postPath(other)]));
}

/** getStaticPaths for one language's /blog/<slug>/ route. */
export async function postStaticPaths(lang: Lang) {
  return (await getPosts(lang)).map((post) => ({
    params: { slug: postSlug(post) },
    props: { post },
  }));
}
