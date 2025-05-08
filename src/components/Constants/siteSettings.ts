// Constants/siteSettings.ts
import { client } from '@/sanity/lib/client';

export const SITE_TITLE_QUERY = `*[_type == "siteSettings"][0]{ title }`;

/** A sensible fallback if your Sanity doc is empty */
export const DEFAULT_SITE_TITLE = 'My Timeline App';

export async function fetchSiteTitle(): Promise<string> {
  const { title } = await client.fetch<{ title: string }>(SITE_TITLE_QUERY);
  return title || DEFAULT_SITE_TITLE;
}
