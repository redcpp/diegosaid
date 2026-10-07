/**
 * Tag colours on the Open Graph card.
 *
 * The colour cycles with the tag's position, so a card's eyebrow never puts
 * two of the same colour side by side. On the card it is decoration; the
 * pages set tags in one neutral tone (see components/Tags.astro), because a
 * colour that changes from post to post told the reader nothing.
 */

const TAG_HEXES = ['#C5221F', '#185ABC', '#137333', '#B45309'];

export function tagHex(index: number) {
  return TAG_HEXES[index % TAG_HEXES.length];
}
