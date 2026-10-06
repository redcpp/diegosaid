/**
 * Two languages, two URL trees: English at the root, Spanish under /es/.
 *
 * The switch in the navbar is a plain link to the same page in the other tree,
 * so the site stays free of client JavaScript. Nothing guesses the reader's
 * language from Accept-Language; the root is English and the link is one click.
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import { isPublished } from '@/lib/schedule';

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

/**
 * The generated card for a route: ogRoute('blog', 'es') is 'es/blog', served
 * at /og/es/blog.png. The OG endpoint and the pages both go through here, so
 * a page can never point at a card under a different path.
 */
export function ogRoute(route: string, lang: Lang): string {
  return localizePath(`/${route}`, lang).slice(1);
}

export function ogImagePath(route: string, lang: Lang): string {
  return `/og/${ogRoute(route, lang)}.png`;
}

/** Strings for the site chrome. Page content lives with its page. */
const EN = {
  writing: 'Writing',
  contact: 'Contact',
  writingDescription:
    'Long-form essays on protocol design, distributed systems, and AI infrastructure.',
  allArticles: '← All articles',
  featured: 'Featured',
  allWriting: 'All writing',
  order: 'Order',
  newest: 'Newest',
  oldest: 'Oldest',
  /** Shown only by `astro dev`, on a post whose date has not arrived. */
  scheduled: 'Scheduled',
  home: '← Home',
  notFound: 'Not Found',
  notFoundBody: 'That page does not exist.',
  /** Label of the link that leads to this language, read from the other one. */
  switchLabel: 'Read in English',
};

/**
 * Typed against the English keys, so a string added to one language and not
 * the other fails `astro check` instead of rendering undefined.
 */
export const UI: Record<Lang, Record<keyof typeof EN, string>> = {
  en: EN,
  es: {
    writing: 'Escritos',
    contact: 'Contacto',
    writingDescription:
      'Ensayos largos sobre diseño de protocolos, sistemas distribuidos e infraestructura de IA.',
    allArticles: '← Todos los artículos',
    featured: 'Destacado',
    allWriting: 'Todos los escritos',
    order: 'Orden',
    newest: 'Más recientes',
    oldest: 'Más antiguos',
    scheduled: 'Programado',
    home: '← Inicio',
    notFound: 'Página no encontrada',
    notFoundBody: 'Esa página no existe.',
    switchLabel: 'Leer en español',
  },
};

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

/** Published posts, plus scheduled ones under `astro dev` so they can be previewed. */
function isVisible(post: Post): boolean {
  return import.meta.env.DEV || isPublished(post.data.date);
}

/** True for a post that only `astro dev` shows. */
export function isScheduled(post: Post): boolean {
  return !isPublished(post.data.date);
}

/**
 * Posts in one language, newest first. Several posts share a date, so the
 * translation key breaks ties; it is the same in both languages, which keeps
 * the two indexes in the same order.
 */
export async function getPosts(lang: Lang): Promise<Post[]> {
  return (await getCollection('blog', (post) => postLang(post) === lang && isVisible(post))).sort(
    (a, b) =>
      b.data.date.valueOf() - a.data.date.valueOf() || postKey(b).localeCompare(postKey(a)),
  );
}

/** The same post in each language it has been written in, keyed by language. */
export async function postTranslations(post: Post): Promise<Partial<Record<Lang, string>>> {
  const key = postKey(post);
  const all = await getCollection('blog', (other) => postKey(other) === key && isVisible(other));
  return Object.fromEntries(all.map((other) => [postLang(other), postPath(other)]));
}

/** getStaticPaths for one language's /blog/<slug>/ route. */
export async function postStaticPaths(lang: Lang) {
  return (await getPosts(lang)).map((post) => ({
    params: { slug: postSlug(post) },
    props: { post },
  }));
}
