import { client } from '@/sanity/lib/client';
import Timeline, { Group } from '@/components/Timeline';
export const revalidate = 0; // never cache, always SSR on every request
export const dynamic = 'force-dynamic';

export default async function Home() {
  const { title } = await client.fetch<{ title: string }>(
    `*[_type == "siteSettings"][0]{ title }`
  );
  const startYear = 1700;
  const endYear = 1877;

  const groups: Group[] = [
    { id: 1, label: 'Wars' },
    { id: 2, label: 'Imperial Legislation' },
    { id: 3, label: 'Colonial Protest & Conflict' },
  ];

  const items = [
    { id:  1, group: 1, title: 'French & Indian War',startYear: 1754, endYear: 1763 },
    { id:  2, group: 2, title: 'Royal Proclamation Line',startYear: 1763, endYear: 1764 },
    { id:  3, group: 2, title: 'Sugar Act',startYear: 1764, endYear: 1764 },
    { id:  4, group: 2, title: 'Stamp Act',startYear: 1765, endYear: 1765 },
    { id:  5, group: 2, title: 'Townshend Duties', startYear: 1767, endYear: 1768 },
    { id:  6, group: 3, title: 'Boston Massacre',startYear: 1770, endYear: 1770 }, 
    { id:  7, group: 3, title: 'Boston Tea Party',startYear: 1773, endYear: 1773 },
    { id:  8, group: 2, title: 'Intolerable Acts',startYear: 1774, endYear: 1774 },
    { id:  9, group: 3, title: 'Military conflict in Boston', startYear: 1775, endYear: 1775 },
  ];
  
  return (
    <main className="min-h-screen flex flex-col justify-center p-8">
      <h1 className="text-4xl text-center font-bold">{title || 'Your title goes here'}</h1>
      <Timeline startYear={startYear} endYear={endYear} groups={groups} items={items} />
    </main>
  );
}