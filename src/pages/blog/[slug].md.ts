import { markdownStaticPaths, markdownResponse } from '@/i18n/markdown';

export const getStaticPaths = () => markdownStaticPaths('es');
export const GET = markdownResponse;
