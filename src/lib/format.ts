/**
 * Display strings derived from the collection's structured fields, so the post
 * header and the /blog index can differ in case without storing two copies.
 */

const MONTH_YEAR = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "May 2024" — used in the /blog index. */
export function monthYear(date: Date): string {
  return MONTH_YEAR.format(date);
}

/** "MAY 2024" — used in the post header. */
export function monthYearUpper(date: Date): string {
  return monthYear(date).toUpperCase();
}

/** "12 min" — used in the /blog index. */
export function readTime(minutes: number): string {
  return `${minutes} min`;
}

/** "12 MIN READ" — used in the post header. */
export function readTimeUpper(minutes: number): string {
  return `${minutes} MIN READ`;
}
