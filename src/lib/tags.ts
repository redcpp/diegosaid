/**
 * Tag colours.
 *
 * The colour cycles with the tag's position in its list rather than with the
 * tag's name. Hashing the name was the first attempt and it clumped: one post
 * came out green, blue, green, green. Cycling by position guarantees an even
 * spread and never puts two of the same colour side by side, and because tags
 * are listed in the same order on every view, a given tag keeps its colour
 * wherever it appears.
 *
 * The two lists are the same four colours in the same order: Tailwind classes
 * for the pages, hex for the Open Graph card, which Satori renders without ever
 * seeing the stylesheet. Keep them in step.
 */

/** Written out in full so Tailwind's scanner finds each class literally. */
const TAG_CLASSES = [
  'text-accent border-accent/30 bg-accent/5',
  'text-url border-url/30 bg-url/5',
  'text-cite border-cite/30 bg-cite/5',
  'text-note border-note/30 bg-note/5',
];

const TAG_HEXES = ['#C5221F', '#185ABC', '#137333', '#B45309'];

export function tagClass(index: number) {
  return TAG_CLASSES[index % TAG_CLASSES.length];
}

export function tagHex(index: number) {
  return TAG_HEXES[index % TAG_HEXES.length];
}
