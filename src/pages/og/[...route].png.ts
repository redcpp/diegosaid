import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { tagHex } from '@/lib/tags';

/**
 * Build-time Open Graph images, one per route.
 *
 * The site previously pointed og:image at /og-image.png, which did not exist —
 * the SPA catch-all answered it with HTML, so every share preview was broken.
 * Rendering here means each post gets a preview carrying its own title instead
 * of a single generic card.
 *
 * The card is the site's own palette and type: near-white stock, serif title,
 * mono metadata, tags in the same four colours they wear on the site. The red
 * colophon band across the foot is what carries it in a feed — an all-white
 * card at thumbnail size reads as a blank rectangle.
 */

const PAPER = '#FCFCFA';
const INK = '#1A1A1A';
const ACCENT = '#C5221F';
const MUTED = '#6B6B70';
/** White dimmed against the red band, the counterpart of MUTED on paper. */
const BAND_MUTED = '#F3C9C8';

// Read from the project root, not import.meta.url: this module is bundled into
// dist/.prerender during the build, so a relative URL would resolve there. The
// fonts stay out of the client bundle — they are only ever used at build time.
const fontDir = join(process.cwd(), 'src/assets/fonts');
const regular = readFileSync(join(fontDir, 'SourceSerif4-Regular.ttf'));
const bold = readFileSync(join(fontDir, 'SourceSerif4-Bold.ttf'));
const mono = readFileSync(join(fontDir, 'IBMPlexMono-Regular.ttf'));

const SERIF = 'Source Serif 4';
const MONO = 'IBM Plex Mono';
const SITE = 'diegosaid.com';
const AUTHOR = 'Diego Said Anaya Mancilla';

interface Card {
  title: string;
  subtitle: string;
  /** Plain mono kicker, for cards that have no tags to show. */
  kicker?: string;
  /** Post tags, each in the colour it carries on the site. */
  tags?: string[];
  /**
   * Left half of the colophon band. Omitted on the home card, whose title is
   * already the name — the band would only repeat it.
   */
  byline?: string;
}

export async function getStaticPaths() {
  const posts = await getCollection('blog');

  const cards: Array<{ route: string; card: Card }> = [
    {
      route: 'index',
      card: {
        kicker: 'Software Engineer',
        title: AUTHOR,
        subtitle:
          'Production backend and full-stack systems. Portfolio, publications, and technical writing.',
      },
    },
    {
      route: 'blog',
      card: {
        title: 'Writing',
        subtitle:
          'Long-form essays on protocol design, distributed systems, and AI infrastructure.',
        byline: AUTHOR,
      },
    },
    ...posts.map((post) => ({
      route: `blog/${post.id}`,
      card: {
        tags: post.data.tags.slice(0, 3),
        title: post.data.title,
        subtitle: post.data.subtitle,
        byline: AUTHOR,
      },
    })),
  ];

  return cards.map(({ route, card }) => ({ params: { route }, props: { card } }));
}

/** Satori takes React-shaped objects; building them by hand avoids a JSX runtime. */
function h(type: string, props: Record<string, unknown>, ...children: unknown[]) {
  const kids = children.filter((child) => child !== null && child !== undefined);
  return { type, props: { ...props, children: kids.length === 1 ? kids[0] : kids } };
}

/**
 * Satori has no text-overflow, so an over-long subtitle would push the title
 * block into the band. Trim on a word boundary instead. The cap clears every
 * subtitle the collection currently holds (the longest is 188 characters); it
 * is a guard against a future one, not a design element.
 */
function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).replace(/[.,;:]$/, '')}…`;
}

const monoBand = { fontFamily: MONO, fontSize: '23px', letterSpacing: '0.06em' };

/** Longer titles step down so three lines still clear the band. */
function titleSize(title: string) {
  if (title.length > 46) return 60;
  if (title.length > 30) return 68;
  return 80;
}

const eyebrowText = {
  fontFamily: MONO,
  fontSize: '21px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
};

/** Tags keep their own colours; a plain kicker takes the accent. */
function eyebrow({ kicker, tags }: Card) {
  const row = (children: unknown[]) =>
    h('div', { style: { display: 'flex', marginBottom: '30px' } }, ...children);

  if (tags?.length) {
    return row(
      tags.flatMap((tag, i) => [
        i > 0
          ? h(
              'div',
              { style: { display: 'flex', ...eyebrowText, color: MUTED, padding: '0 14px' } },
              '·',
            )
          : null,
        h('div', { style: { display: 'flex', ...eyebrowText, color: tagHex(i) } }, tag),
      ]),
    );
  }

  if (kicker) {
    return row([h('div', { style: { display: 'flex', ...eyebrowText, color: ACCENT } }, kicker)]);
  }

  return null;
}

function template(card: Card) {
  const { title, subtitle, byline } = card;
  return h(
    'div',
    {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: PAPER,
        color: INK,
        fontFamily: SERIF,
      },
    },

    // Masthead rule: a hairline of accent along the very top edge, so the card
    // is bracketed in burgundy even where a client crops the foot away.
    h('div', { style: { display: 'flex', height: '8px', backgroundColor: ACCENT } }),

    h(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          padding: '0 84px',
        },
      },
      eyebrow(card),
      h(
        'div',
        {
          style: {
            display: 'flex',
            fontSize: `${titleSize(title)}px`,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: '-0.021em',
          },
        },
        title,
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            fontSize: '29px',
            color: MUTED,
            lineHeight: 1.45,
            marginTop: '26px',
          },
        },
        clamp(subtitle, 200),
      ),
    ),

    // Colophon band.
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '104px',
          padding: '0 84px',
          backgroundColor: ACCENT,
        },
      },
      // With a byline the name sets in serif and the domain trails it in mono,
      // the way the site pairs them. Without one the domain takes the slot and
      // keeps the mono it wears everywhere else.
      byline
        ? h('div', { style: { display: 'flex', fontSize: '27px', color: PAPER } }, byline)
        : h('div', { style: { display: 'flex', ...monoBand, color: PAPER } }, SITE),
      byline
        ? h('div', { style: { display: 'flex', ...monoBand, color: BAND_MUTED } }, SITE)
        : null,
    ),
  );
}

export const GET: APIRoute = async ({ props }) => {
  const svg = await satori(template(props.card as Card) as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: SERIF, data: regular, weight: 400, style: 'normal' },
      { name: SERIF, data: bold, weight: 700, style: 'normal' },
      { name: MONO, data: mono, weight: 400, style: 'normal' },
    ],
  });

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
