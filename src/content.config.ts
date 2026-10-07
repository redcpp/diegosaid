import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  // One folder per language: en/<slug>.md is served at /blog/<slug>/ and
  // es/<slug>.md at /es/blog/<slug>/. The folder is the post's language, so
  // there is no lang field to keep in step with it.
  //
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
    /**
     * Real date, so sorting and the sitemap don't depend on a display string.
     * A future date schedules the post: it stays out of the build until that
     * day in Mexico City (see src/lib/schedule.ts).
     */
    date: z.date(),
    /** Minutes, as a number: display strings are derived, never stored twice. */
    readMinutes: z.number().int().positive(),
    tags: z.array(z.string()).nonempty(),
    /** Marked with a small star on the /blog/ index. */
    featured: z.boolean().default(false),
    /**
     * Where the post comes from, when it is older than its date: the ADRs and
     * the litepaper were written in 2022 and annotated here years later. Shown
     * under the post header, in the post's language.
     */
    origin: z.string().optional(),
    /**
     * Pairs a post with its translation. Defaults to the file name, so two
     * posts with the same slug in en/ and es/ are each other's translation;
     * set it only when a translation carries a slug of its own.
     */
    key: z.string().optional(),
  }),
});

export const collections = { blog };
