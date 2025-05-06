import { client } from '@/sanity/lib/client';
import Timeline, { Group } from '@/components/Timeline';
export const revalidate = 0; // never cache, always SSR on every request
export const dynamic = 'force-dynamic';

export default async function Home() {
  const { title } = await client.fetch<{ title: string }>(
    `*[_type == "siteSettings"][0]{ title }`
  );
  const startYear = 1800;
  const endYear = 1877;
  const groups: Group[] = [
    { id: 1, label: 'Group A' },
    { id: 2, label: 'Group B' },
    { id: 3, label: 'Group C' },
    { id: 4, label: 'Group D' },
    { id: 5, label: 'Group E' },
    { id: 6, label: 'Group F' },
    { id: 7, label: 'Group G' },
  ];

  return (
    <main className="min-h-screen flex flex-col justify-center p-8">
      <h1 className="text-4xl text-center font-bold">{title || 'Your title goes here'}</h1>
      <Timeline startYear={startYear} endYear={endYear} groups={groups} />
    </main>
  );
}