import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // .md by default: LaTeX braces ($P_{\text{pool}}$) are literal there, whereas
  // MDX would parse them as JSX expressions. .mdx stays available for a post
  // that actually needs a component.
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    /** Post title. Used in the header, the index, <title> and og:title. */
    title: z.string(),
    /** Short deck under the post title. */
    subtitle: z.string(),
    /** Longer blurb for the /blog index and the meta description. */
    excerpt: z.string(),
    /** Real date, so sorting and the sitemap don't depend on a display string. */
    date: z.date(),
    /** Minutes, as a number: display strings are derived, never stored twice. */
    readMinutes: z.number().int().positive(),
    tags: z.array(z.string()).nonempty(),
  }),
});

export const collections = { blog };
