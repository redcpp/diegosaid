import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

/**
 * Build-time Open Graph images, one per route.
 *
 * The site previously pointed og:image at /og-image.png, which did not exist —
 * the SPA catch-all answered it with HTML, so every share preview was broken.
 * Rendering here means each post gets a preview carrying its own title instead
 * of a single generic card.
 */

const PAPER = '#FAFAF8';
const INK = '#2C2C2C';
const ACCENT = '#2B4C8C';
const RULE = '#E4E4E7';
const MUTED = '#71717A';

// Read from the project root, not import.meta.url: this module is bundled into
// dist/.prerender during the build, so a relative URL would resolve there. The
// fonts stay out of the client bundle — they are only ever used at build time.
const fontDir = join(process.cwd(), 'src/assets/fonts');
const regular = readFileSync(join(fontDir, 'SourceSerif4-Regular.ttf'));
const bold = readFileSync(join(fontDir, 'SourceSerif4-Bold.ttf'));

interface Card {
  title: string;
  subtitle: string;
  eyebrow: string;
}

export async function getStaticPaths() {
  const posts = await getCollection('blog');

  const cards: Array<{ route: string; card: Card }> = [
    {
      route: 'index',
      card: {
        title: 'Diego Said Anaya Mancilla',
        subtitle: 'Applied AI Engineer · Systems Architect',
        eyebrow: 'diegosaid.com',
      },
    },
    {
      route: 'blog',
      card: {
        title: 'Writing',
        subtitle:
          'Long-form essays on protocol design, distributed systems, and AI infrastructure.',
        eyebrow: 'diegosaid.com',
      },
    },
    ...posts.map((post) => ({
      route: `blog/${post.id}`,
      card: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        eyebrow: post.data.tags.slice(0, 3).join(' · '),
      },
    })),
  ];

  return cards.map(({ route, card }) => ({ params: { route }, props: { card } }));
}

/** Satori takes React-shaped objects; building them by hand avoids a JSX runtime. */
function h(type: string, props: Record<string, unknown>, ...children: unknown[]) {
  return { type, props: { ...props, children: children.length === 1 ? children[0] : children } };
}

function template({ title, subtitle, eyebrow }: Card) {
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
        padding: '80px',
        fontFamily: 'Source Serif 4',
      },
    },
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column' } },
      h(
        'div',
        {
          style: {
            display: 'flex',
            fontSize: '24px',
            color: ACCENT,
            letterSpacing: '0.04em',
            marginBottom: '32px',
          },
        },
        eyebrow,
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            fontSize: title.length > 34 ? '64px' : '76px',
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          },
        },
        title,
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            fontSize: '30px',
            color: MUTED,
            lineHeight: 1.4,
            marginTop: '28px',
          },
        },
        subtitle,
      ),
    ),
    h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          borderTop: `2px solid ${RULE}`,
          paddingTop: '28px',
          fontSize: '24px',
          color: MUTED,
        },
      },
      'Diego Said Anaya Mancilla',
    ),
  );
}

export const GET: APIRoute = async ({ props }) => {
  const svg = await satori(template(props.card as Card) as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Source Serif 4', data: regular, weight: 400, style: 'normal' },
      { name: 'Source Serif 4', data: bold, weight: 700, style: 'normal' },
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
