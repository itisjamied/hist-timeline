import { client } from '@/sanity/lib/client';
import Timeline, { Group } from '@/components/Timeline';
export const revalidate = 0; // never cache, always SSR on every request
export const dynamic = 'force-dynamic';

export default async function Home() {
  const { title } = await client.fetch<{ title: string }>(
    `*[_type == "siteSettings"][0]{ title }`
  );
  const startYear = 2000;
  const endYear = 2030;
  const groups: Group[] = [
    { id: 1, label: 'Group A' },
    { id: 2, label: 'Group B' },
    { id: 3, label: 'Group C' },
  ];

  return (
    <main className="min-h-screen flex flex-col justify-center p-8">
      <h1 className="text-4xl font-bold">{title || 'Your title goes here'}</h1>
      <Timeline startYear={startYear} endYear={endYear} groups={groups} />
    </main>
  );
}