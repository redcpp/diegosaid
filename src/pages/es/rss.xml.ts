import type { APIContext } from 'astro';
import { feed } from '@/i18n/feed';

export const GET = (context: APIContext) => feed(context, 'es');
