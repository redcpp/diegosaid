/**
 * schema.org blocks, emitted as JSON-LD by BaseLayout.
 *
 * The Person is the one entity every page refers back to: the home page
 * declares it in full, and each post names it as author by its @id, so a
 * search engine or an assistant ties the essays to the same person as the CV.
 */

import type { CollectionEntry } from 'astro:content';
import {
  EMAIL,
  PROFILES,
  TOPTAL,
  localizePath,
  postLang,
  postPath,
  type Lang,
} from '@/i18n';

const SITE = 'https://diegosaid.com';
const PERSON_ID = `${SITE}/#person`;
const WEBSITE_ID = `${SITE}/#website`;

export function person() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Diego Said Anaya Mancilla',
    alternateName: 'Diego Said',
    jobTitle: 'Software Engineer',
    email: `mailto:${EMAIL}`,
    url: `${SITE}/`,
    sameAs: [
      ...PROFILES.map((profile) => profile.url),
      TOPTAL.split('#')[0],
      'https://pubmed.ncbi.nlm.nih.gov/?term=Anaya-Mancilla+DS',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Century 21 CAM Grupo',
      url: 'https://www.camgrupo.com',
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'University of Colorado Boulder',
        url: 'https://www.colorado.edu',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Harvard Business School Online',
        url: 'https://online.hbs.edu',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Universidad Autónoma de Querétaro',
        url: 'https://www.uaq.mx',
      },
    ],
    knowsAbout: [
      'Software Engineering',
      'Data Pipelines',
      'Cloud Infrastructure',
      'LLM Integration',
      'DeFi Protocol Design',
      'Real Estate Technology',
    ],
  };
}

export function website(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: 'Diego Said',
    url: `${SITE}${localizePath('/', lang)}`,
    inLanguage: ['es', 'en'],
    author: { '@id': PERSON_ID },
  };
}

export function blogPosting(post: CollectionEntry<'blog'>, image: string) {
  const { title, excerpt, date, tags } = post.data;
  const url = `${SITE}${postPath(post)}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    datePublished: date.toISOString(),
    inLanguage: postLang(post),
    url,
    mainEntityOfPage: url,
    image: `${SITE}${image}`,
    keywords: tags.join(', '),
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Diego Said Anaya Mancilla',
      url: `${SITE}/`,
    },
    isPartOf: { '@id': WEBSITE_ID },
  };
}
