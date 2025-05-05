export const revalidate = 0;           // never cache, always SSR on every request
export const dynamic = 'force-dynamic';

import { client } from '@/sanity/lib/client';

export default async function Home() {
  // Fetch only the site title from Sanity
  const { title } = await client.fetch<{ title: string }>(
    `*[_type == "siteSettings"][0]{ title }`
  );
   // ───── YOUR TIMELINE CONFIG ─────
   const startYear = 2000;
   const endYear   = 2020;
   const groups = [
     { id: 1, label: 'Group A' },
     { id: 2, label: 'Group B' },
     { id: 3, label: 'Group C' },
   ];
 
   const numYears  = endYear - startYear + 1;    // e.g. 21 years
   const years     = Array.from(
     { length: numYears },
     (_, i) => startYear + i
   );

  return (
    <main className="min-h-screen flex flex-col justify-center p-8">
      <h1 className="text-4xl font-bold"> {title || 'Your title goes here'} </h1>
      <div
        className="overflow-x-auto border mt-8"
        style={{
          display: 'grid',
          // one 5vw-wide column per year:
          gridTemplateColumns: `repeat(${numYears}, 5vw)`,
          // one 4rem-tall row per group:
          gridTemplateRows: `repeat(${groups.length}, 4rem)`,
        }}
      >
        {groups.map((group, rowIdx) =>
          years.map((year, colIdx) => (
            <div
              key={`${group.id}-${year}`}
              className="border-l border-t flex items-center justify-center text-xs"
            >
              {/* placeholder: you could later render your “item” if it falls in this year/group */}
              {rowIdx === 0 && (
                <span className="absolute top-0 transform -translate-y-full text-[10px]">
                  {year}
                </span>
              )}
              {/* optionally label rows on the left edge */}
              {colIdx === 0 && (
                <span className="absolute left-0 transform -translate-x-full text-[10px]">
                  {group.label}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </main>
  );
}
