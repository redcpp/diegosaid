import { markdownStaticPaths, markdownResponse } from '@/i18n/markdown';

export const getStaticPaths = () => markdownStaticPaths('en');
export const GET = markdownResponse;
