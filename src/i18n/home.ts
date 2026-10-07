/**
 * The home page's content in both languages: who this is, what he is doing
 * now, and how to reach him. The CV lives in cv.ts; the home only points at it.
 *
 * `now` is dated on purpose. It goes stale the day a race is run or a project
 * ends, and the date tells the reader how fresh it is. Update both together.
 */

import { TOPTAL, type Lang } from '@/i18n';
import { IRONMAN, LEETCODE } from '@/i18n/cv';

const DOI = 'https://doi.org/10.1093/bioinformatics/btz458';

interface Home {
  meta: { title: string; description: string };
  tagline: string;
  /**
   * Credentials under the tagline, each linked to its evidence: the paper's
   * DOI, the Toptal profile, the CV. A path starting with / is localized where
   * it renders. Only facts that a reader can check.
   */
  credentials: { label: string; href: string }[];
  location: string;
  headings: { now: string; work: string };
  /** Shown beside the "now" heading. */
  nowUpdated: string;
  now: string[];
  /** One paragraph on the past, ending in a link to the CV. */
  work: string;
  workLink: string;
  contactLabels: { email: string; phone: string };
  /** The line under the contact details. The Toptal badge sits beside them. */
  contractor: string;
}

export const HOME: Record<Lang, Home> = {
  es: {
    meta: {
      title: 'Diego Said — Ingeniero de software y empresario',
      description:
        'Ingeniero de software y empresario en Vallarta, México. Escribo sobre lo que aprendo construyendo sistemas, dirigiendo empresas y entrenando para competir.',
    },
    tagline:
      'Ingeniero de software y empresario. Escribo sobre lo que aprendo construyendo sistemas, dirigiendo empresas y entrenando para competir.',
    credentials: [
      { label: 'Oracle Cloud', href: '/cv/' },
      { label: 'Publicado en Bioinformatics (Oxford)', href: DOI },
      { label: 'Toptal, 3% superior', href: TOPTAL },
      { label: 'LeetCode: rating 1,733, 12% superior', href: LEETCODE },
      { label: 'Finalista regional ACM-ICPC', href: '/cv/' },
      { label: 'Dos veces finisher de Ironman 70.3', href: IRONMAN },
    ],
    location: 'Vallarta, México (UTC−6)',
    headings: { now: 'Ahora', work: 'Trayectoria' },
    nowUpdated: 'octubre 2026',
    now: [
      'Soy dueño de Century 21 CAM Grupo, una inmobiliaria en Riviera Nayarit. No la opero en el día a día; construyo su tecnología: contratos automatizados, inteligencia de mercado y un servidor de IA privado.',
      'Dirijo el proyecto de una SOFOM.',
      'Curso la maestría en Ciencias de la Computación en CU Boulder.',
      'Entreno para el GFNY Cozumel del 8 de noviembre: dos vueltas a la isla en bici, 154 kilómetros.',
      'Acepto proyectos como contratista independiente.',
    ],
    work: 'Antes construí pipelines en Oracle Cloud, fui contratista de plataformas de salud para equipos de Estados Unidos, desarrollador core de una stablecoin en Algorand y coautor de un artículo en Bioinformatics.',
    workLink: 'El detalle está en el CV →',
    contactLabels: { email: 'Correo', phone: 'Teléfono' },
    contractor: 'Para proyectos como contratista independiente, escríbeme directamente.',
  },
  en: {
    meta: {
      title: 'Diego Said — Software engineer and business owner',
      description:
        'Software engineer and business owner in Vallarta, Mexico. I write about what I learn building systems, running companies, and training to race.',
    },
    tagline:
      'Software engineer and business owner. I write about what I learn building systems, running companies, and training to race.',
    credentials: [
      { label: 'Oracle Cloud', href: '/cv/' },
      { label: 'Published in Bioinformatics (Oxford)', href: DOI },
      { label: 'Toptal, top 3%', href: TOPTAL },
      { label: 'LeetCode: 1,733 rating, top 12%', href: LEETCODE },
      { label: 'ACM-ICPC regional finalist', href: '/cv/' },
      { label: 'Two-time Ironman 70.3 finisher', href: IRONMAN },
    ],
    location: 'Vallarta, Mexico (UTC−6)',
    headings: { now: 'Now', work: 'Background' },
    nowUpdated: 'October 2026',
    now: [
      'I own Century 21 CAM Grupo, a real estate brokerage in Riviera Nayarit. I don’t run it day to day; I build its technology: automated contracts, market intelligence, and a private AI server.',
      'I lead the project of a SOFOM, a Mexican non-bank lender.',
      'I’m completing an M.S. in Computer Science at CU Boulder.',
      'I’m training for GFNY Cozumel on November 8: two laps of the island by bike, 154 kilometers.',
      'I take on projects as an independent contractor.',
    ],
    work: 'Before this I built pipelines at Oracle Cloud, contracted on healthcare platforms for US teams, was a core developer of a stablecoin on Algorand, and co-authored a paper in Bioinformatics.',
    workLink: 'The details are in the CV →',
    contactLabels: { email: 'Email', phone: 'Phone' },
    contractor: 'For independent contract work, write to me directly.',
  },
};
