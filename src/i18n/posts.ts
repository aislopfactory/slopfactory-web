import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from './ui';

export type Post = CollectionEntry<'blog'> & { lang: Lang; slug: string };

/** All published posts for a language, newest first. Drafts are hidden in production builds. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const all = await getCollection('blog', ({ id, data }) => id.startsWith(`${lang}/`) && (import.meta.env.DEV || !data.draft));
  return all
    .map((p) => ({ ...p, lang, slug: p.id.slice(lang.length + 1).replace(/\.md$/, '') }))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Rough reading time: ~220 wpm for English words, ~500 chars/min for Korean. */
export function readingMinutes(body: string | undefined, lang: Lang): number {
  const text = body ?? '';
  const n = lang === 'ko' ? text.replace(/\s/g, '').length / 500 : text.split(/\s+/).filter(Boolean).length / 220;
  return Math.max(1, Math.round(n));
}
