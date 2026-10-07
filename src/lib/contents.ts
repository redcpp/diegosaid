/**
 * The contents list of a post: its h2 sections, titled as written.
 *
 * Astro's own `headings` carry the rendered text, and a heading with math in
 * it comes out as KaTeX's MathML and HTML run together ("la curva 2r2\sqrt…").
 * So the titles are read from the Markdown source, in order, and their inline
 * math is rendered with KaTeX the way the heading itself is; the slugs still
 * come from Astro, so the links match the ids on the page.
 */

import katex from 'katex';
import type { MarkdownHeading } from 'astro';

function escape(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** "## Net exposure is $C_0$" → HTML with the math typeset. */
function titleHtml(markdown: string) {
  return markdown
    .split(/(\$[^$]+\$)/)
    .map((part) =>
      part.startsWith('$') && part.endsWith('$') && part.length > 2
        ? katex.renderToString(part.slice(1, -1), { output: 'html', throwOnError: false })
        : escape(part).replace(/`([^`]+)`/g, '<code>$1</code>'),
    )
    .join('');
}

/** The source's h2 lines, skipping fenced code, where "## " is not a heading. */
function sourceSections(body: string) {
  const titles: string[] = [];
  let fenced = false;
  for (const line of body.split('\n')) {
    if (/^(```|~~~)/.test(line)) fenced = !fenced;
    else if (!fenced && line.startsWith('## ')) titles.push(line.slice(3).trim());
  }
  return titles;
}

export function contents(body: string, headings: MarkdownHeading[]) {
  const sections = headings.filter((heading) => heading.depth === 2);
  const titles = sourceSections(body);
  // If the two ever disagree, fall back to Astro's text rather than mislabel.
  const aligned = titles.length === sections.length;
  return sections.map((heading, i) => ({
    slug: heading.slug,
    html: aligned ? titleHtml(titles[i]) : escape(heading.text),
  }));
}
