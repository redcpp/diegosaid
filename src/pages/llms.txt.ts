import type { APIRoute } from 'astro';
import { EMAIL, getPosts, LANGS, postPath, PROFILES, TOPTAL, type Lang } from '@/i18n';
import { IRONMAN } from '@/i18n/cv';
import { HOME } from '@/i18n/home';

/**
 * /llms.txt: the site described for a language model, per llmstxt.org.
 *
 * An assistant asked about Diego, or handed a link to the site, gets who he
 * is, what he does now, and every essay with a link to its plain Markdown
 * version, without parsing the pages. Built from the same data as the pages,
 * so it never drifts from them.
 */

const SITE = 'https://diegosaid.com';

const SECTION: Record<Lang, string> = {
  es: 'Escritos en español (idioma original)',
  en: 'Writing in English (translations)',
};

export const GET: APIRoute = async () => {
  const { tagline, now } = HOME.es;
  const lines = [
    '# Diego Said',
    '',
    `> ${HOME.en.tagline} Diego Said Anaya Mancilla, Vallarta, Mexico. The site is in Spanish first, with every page translated to English under /en/.`,
    '',
    tagline,
    '',
    '## Ahora (now)',
    '',
    ...now.map((item) => `- ${item}`),
    '',
    '## Pages',
    '',
    `- [Inicio](${SITE}/): quién soy, qué hago ahora y escritos recientes`,
    `- [CV](${SITE}/cv/): experiencia, código abierto, publicaciones y formación ([English](${SITE}/en/cv/))`,
    `- [Home in English](${SITE}/en/)`,
    '',
  ];

  for (const lang of LANGS) {
    lines.push(`## ${SECTION[lang]}`, '');
    for (const post of await getPosts(lang)) {
      const markdown = postPath(post).replace(/\/$/, '.md');
      lines.push(`- [${post.data.title}](${SITE}${markdown}): ${post.data.excerpt}`);
    }
    lines.push('');
  }

  lines.push(
    '## Contact',
    '',
    `- Email: ${EMAIL}`,
    ...PROFILES.map(({ name, url }) => `- ${name}: ${url}`),
    `- Toptal: ${TOPTAL.split('#')[0]}`,
    `- Ironman 70.3 results: ${IRONMAN}`,
    '- Available for projects as an independent contractor.',
    '',
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
