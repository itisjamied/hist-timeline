import { client } from '@/sanity/lib/client';
import { Timeline } from '@/components/Timeline/Timeline';
import { Group, Item } from '@/components/Timeline/types';
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
    { id: 4, label: 'Test' },
    { id: 5, label: 'Test' },
    { id: 6, label: 'Test' },
  ];

  const items: Item[] = [
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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-6">
      {/* Site Header */}
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-5xl font-extrabold text-center text-gray-800">
          {title || 'Your title goes here'}
        </h1>
        <p className="mt-2 text-center text-gray-600">A visual history timeline for History 265: American History to 1877</p>
      </header>

      {/* Course Context */}
      <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Context</h2>
        <p className="text-gray-700 leading-relaxed">
          This interactive timeline is designed to accompany History 265: American History to 1877 (Spring 2025). It visually presents major events from early Anglo-American colonization through the Civil War and Reconstruction. By mapping these events chronologically, students can better grasp historical dynamics, support their document analysis papers, and prepare for exams as outlined in the course syllabus. 
        </p>
      </section>

      {/* Timeline Section */}
      <section className="max-w-8xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <Timeline
          startYear={startYear}
          endYear={endYear}
          groups={groups}
          items={items}
        />
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} {title || 'My Timeline App'}. All rights reserved.
      </footer>
    </main>
  );
}