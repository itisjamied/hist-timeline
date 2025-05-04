export const revalidate = 0;           // never cache, always SSR on every request
export const dynamic = 'force-dynamic';

import { client } from '@/sanity/lib/client';

export default async function Home() {
  // Fetch only the site title from Sanity
  const { title } = await client.fetch<{ title: string }>(
    `*[_type == "siteSettings"][0]{ title }`
  );

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <h1 className="text-4xl font-bold">
        {title || 'Your title goes here'}
      </h1>
    </main>
  );
}
