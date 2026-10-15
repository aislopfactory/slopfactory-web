import type { APIContext } from 'astro';
import { languages, ui, type Lang } from '../../i18n/ui';
import { getPosts } from '../../i18n/posts';

export function getStaticPaths() {
  return languages.map((lang) => ({ params: { lang } }));
}
const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

export async function GET({ params, site }: APIContext) {
  const lang = params.lang as Lang;
  const base = site ? site.toString().replace(/\/$/, '') : '';
  const posts = await getPosts(lang);
  const items = posts.map((p) => `<item><title>${esc(p.data.title)}</title><link>${base}/${lang}/blog/${p.slug}/</link><guid>${base}/${lang}/blog/${p.slug}/</guid><pubDate>${p.data.date.toUTCString()}</pubDate><description>${esc(p.data.description)}</description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(ui[lang].siteTitle)}</title><link>${base}/${lang}/</link><description>${esc(ui[lang].siteDescription)}</description><language>${lang}</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
