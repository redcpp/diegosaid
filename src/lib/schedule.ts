/**
 * Scheduled posts.
 *
 * A post dated in the future is left out of the build: no page, no index
 * entry, no feed item, no OG card, no sitemap line. The site is static, so a
 * post goes up when the site is built again on or after its date. The deploy
 * workflow rebuilds every day just after midnight in Mexico City, which is what
 * makes a scheduled post publish itself.
 *
 * The day turns over in Mexico City, not UTC. YAML reads `date: 2026-10-12` as
 * midnight UTC, which is the evening of the 11th there, so comparing instants
 * would publish a day early. The comparison is on calendar days instead.
 *
 * `astro dev` shows scheduled posts anyway, flagged on the index, so a post can
 * be read in place before its date.
 *
 * No imports: the tests load this file under Node directly.
 */

export const TIME_ZONE = 'America/Mexico_City';

// en-CA formats as YYYY-MM-DD, which compares correctly as a string.
const DAY = new Intl.DateTimeFormat('en-CA', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** Today in Mexico City, as YYYY-MM-DD. */
export function today(now: Date = new Date()): string {
  return DAY.format(now);
}

/** True once the post's date has arrived in Mexico City. */
export function isPublished(date: Date, now: Date = new Date()): boolean {
  return date.toISOString().slice(0, 10) <= today(now);
}
