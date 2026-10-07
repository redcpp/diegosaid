/**
 * Two languages, two URL trees: Spanish at the root, English under /en/.
 *
 * Spanish is the language the essays are written in, so it is the site's own
 * language; English is the translation. The switch in the navbar is a plain
 * link to the same page in the other tree, so the site stays free of client
 * JavaScript. Nothing guesses the reader's language from Accept-Language; the
 * root is Spanish and the link is one click.
 */

import { getCollection, type CollectionEntry } from 'astro:content';
import { isPublished } from '@/lib/schedule';

export type Lang = 'en' | 'es';

/** In the order the navbar switch shows them. */
export const LANGS: readonly Lang[] = ['es', 'en'];
export const DEFAULT_LANG: Lang = 'es';

export const OG_LOCALE: Record<Lang, string> = { en: 'en_US', es: 'es_MX' };

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'es' : 'en';
}

/** '/blog/' in Spanish is '/en/blog/' in English. Paths keep their trailing slash. */
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

/**
 * Profiles listed in the footer, the contact block and the Person schema.
 * YouTube is coming: give it a URL here and it shows up in all three.
 */
export const SOCIAL: { name: string; url: string | null }[] = [
  { name: 'GitHub', url: 'https://github.com/redcpp' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/redcpp' },
  { name: 'YouTube', url: null },
];

export const EMAIL = 'contacto@diegosaid.com';
/** The US number. The Mexican one stays off the site. */
export const PHONE = '+1 720 331 5493';
export const TOPTAL = 'https://www.toptal.com/developers/resume/diego-said-anaya-mancilla#xnDmEW';

/** Strings for the site chrome. Page content lives with its page. */
const EN = {
  writing: 'Writing',
  contact: 'Contact',
  /** Fragment id of the contact block, so the URL reads in the page's language. */
  contactId: 'contact',
  cv: 'CV',
  writingDescription:
    'Essays on what I learn building software, running companies, and training to race.',
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
  notFoundBody: 'That page does not exist, or it has moved.',
  /** Label of the link that leads to this language, read from the other one. */
  switchLabel: 'Read in English',
  latestWriting: 'Latest writing',
  seeAllWriting: 'All writing →',
  contents: 'Contents',
  previous: '← Previous',
  next: 'Next →',
  subscribeVia: 'Follow the new essays by',
  subscribeOr: ', or write to me at',
  bio: 'Software engineer and business owner in Vallarta, Mexico. I write about what I learn building systems, running companies, and training to race.',
  rss: 'RSS',
  markdown: 'Markdown version',
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
    contactId: 'contacto',
    cv: 'CV',
    writingDescription:
      'Ensayos sobre lo que aprendo construyendo software, dirigiendo empresas y entrenando para competir.',
    allArticles: '← Todos los artículos',
    featured: 'Destacado',
    allWriting: 'Todos los escritos',
    order: 'Orden',
    newest: 'Más recientes',
    oldest: 'Más antiguos',
    scheduled: 'Programado',
    home: '← Inicio',
    notFound: 'Página no encontrada',
    notFoundBody: 'Esa página no existe o cambió de dirección.',
    switchLabel: 'Leer en español',
    latestWriting: 'Escritos recientes',
    seeAllWriting: 'Todos los escritos →',
    contents: 'Contenido',
    previous: '← Anterior',
    next: 'Siguiente →',
    subscribeVia: 'Sigue los ensayos nuevos por',
    subscribeOr: ', o escríbeme a',
    bio: 'Ingeniero de software y empresario en Vallarta, México. Escribo sobre lo que aprendo construyendo sistemas, dirigiendo empresas y entrenando para competir.',
    rss: 'RSS',
    markdown: 'Versión en Markdown',
  },
};

type Post = CollectionEntry<'blog'>;

/** 'es/adr47' → 'es'. The folder is the language. */
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

/**
 * The posts on either side of this one in its language's index: `previous` is
 * the older one, `next` the newer one, the way a reader moves through time.
 */
export async function adjacentPosts(post: Post): Promise<{ previous?: Post; next?: Post }> {
  const posts = await getPosts(postLang(post));
  const i = posts.findIndex((other) => other.id === post.id);
  return { previous: posts[i + 1], next: i > 0 ? posts[i - 1] : undefined };
}

/** The profiles that have a URL yet. */
export const PROFILES = SOCIAL.filter((p): p is { name: string; url: string } => p.url !== null);
