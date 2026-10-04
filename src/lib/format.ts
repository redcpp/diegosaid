/**
 * Display strings derived from the collection's structured fields, so the post
 * header and the /blog index can differ in case without storing two copies.
 */

export type Lang = 'en' | 'es';

const MONTH_YEAR: Record<Lang, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }),
  // Spanish puts "de" between month and year ("octubre de 2026"); the header
  // reads better without it, so drop it.
  es: new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric', timeZone: 'UTC' }),
};

/** "May 2024" — used in the /blog index. */
export function monthYear(date: Date, lang: Lang = 'en'): string {
  return MONTH_YEAR[lang].format(date).replace(' de ', ' ');
}

/** "MAY 2024" — used in the post header. */
export function monthYearUpper(date: Date, lang: Lang = 'en'): string {
  return monthYear(date, lang).toUpperCase();
}

/** "12 min" — used in the /blog index. */
export function readTime(minutes: number): string {
  return `${minutes} min`;
}

/** "12 MIN READ" — used in the post header. */
export function readTimeUpper(minutes: number, lang: Lang = 'en'): string {
  return lang === 'es' ? `${minutes} MIN DE LECTURA` : `${minutes} MIN READ`;
}
