import { client } from '@/sanity/lib/client';
import { Timeline } from '@/components/Timeline/Timeline';
import { Group, Item } from '@/components/Timeline/types';
export const revalidate = 0; // never cache, always SSR on every request
export const dynamic = 'force-dynamic';
import {
  // START_YEAR,
  // END_YEAR,
  // TIMELINE_GROUPS,
  // TIMELINE_ITEMS,
} from '../components/Constants/constants';
// import { time } from 'console';


export default async function Home() {
  // const { title } = await client.fetch<{ title: string }>(
  //   `*[_type == "siteSettings"][0]{ title }`
  // );
  const timelineGroups = await client.fetch<Group[]>(
    `*[_type == "timelineGroup"] | order(id asc) { id, label , "icon": icon, }`
  );
   const { title, startYear = 1700, endYear = 1877 } =
    await client.fetch<{ title: string; startYear: number; endYear: number }>(
      `*[_type == "siteSettings"][0]{
        title,
        "startYear": startYear,
        "endYear": endYear
      }`
    )

    const timelineItems = await client.fetch<Item[]>(
    `*[_type == "timelineItem"] | order(startYear asc) {
       "id": _id,
       title,
       description,
       startYear,
       endYear,
       "photo": photo.asset->url,
      "fileUrl": file.asset->url,
       "group": group->id
     }`
  )

// const startYear = START_YEAR;
// const endYear   = END_YEAR;
// const groups    = TIMELINE_GROUPS as Group[];
// const items     = TIMELINE_ITEMS as Item[];
  return (
    // <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-6">
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-300 to-yellow-800 py-12 px-6">
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
      <section className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <Timeline
          startYear={startYear}
          endYear={endYear}
          groups={timelineGroups}
          // items={items}
           items={timelineItems}
        />
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto mt-12 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} {title || 'My Timeline App'}. All rights reserved.
      </footer>
    </main>
  );
}