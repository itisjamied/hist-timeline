// components/Timeline.tsx
import React from 'react';

export interface Group {
  id: number;
  label: string;
}

export interface Item {
  id: number;
  group: number;// must match one of the Group.id values
  title: string;
  startYear: number;
  endYear: number;// inclusive
}

export interface TimelineProps {
  startYear: number;
  endYear: number;
  groups: Group[];
  items: Item[];
}

interface PositionedItem extends Item { level: number }
// Given all items, compute a `level` for each so overlapping ones get successive levels.
function computeLevels(items: Item[]): PositionedItem[] {
  // 1) bucket by group
  const byGroup: Record<number, Item[]> = {};
  items.forEach(item => {
    (byGroup[item.group] ||= []).push(item);
  });

  const result: PositionedItem[] = [];

  // 2) for each group, assign levels
  Object.values(byGroup).forEach(groupItems => {
    // sort so earliest events get placed first
    groupItems.sort((a, b) => a.startYear - b.startYear);

    // this array tracks, for each level index, the last endYear we placed there
    const levelEndYears: number[] = [];

    groupItems.forEach(item => {
      // find a level where this item doesn't overlap the last endYear
      let level = 0;
      while (level < levelEndYears.length && item.startYear <= levelEndYears[level]) {
        level++;
      }

      // record this item’s endYear on that level
      levelEndYears[level] = Math.max(levelEndYears[level] || 0, item.endYear);

      result.push({ ...item, level });
    });
  });

  return result;
}

const Timeline: React.FC<TimelineProps> = ({ startYear, endYear, groups, items }) => {
  const numYears = endYear - startYear + 1;
  const years = Array.from({ length: numYears }, (_, i) => startYear + i);
  // Common grid column definition
  const columnStyles = { gridTemplateColumns: `5vw repeat(${numYears}, 5vw)` };
   // 1) assign levels:
   const overlapOffset = 3; // rem per level
   const itemsWithLevel = computeLevels(items);
 
   // 2) find max level per group
   const maxLevelByGroup: Record<number, number> = {};
   itemsWithLevel.forEach(item => {
     maxLevelByGroup[item.group] = Math.max(
       maxLevelByGroup[item.group] ?? 0,
       item.level
     );
   });
 
   // 3) build one CSS height per row
   //    baseRowHeight = 4rem, plus overlapOffset×maxLevel
   const rowHeights = groups.map(g => {
     const max = maxLevelByGroup[g.id] ?? 0;
     return `${4 + max * overlapOffset}rem`;
   });
 

  return (
    <div className="timeline-container overflow-x-auto border mt-8 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-white">
      {/* Main timeline grid for groups */}
      <div
        className="grid min-w-max relative"
        style={{
          ...columnStyles,
          gridTemplateRows: rowHeights.join(" "),
        }}
      >
        {groups.map((group) =>
     
          <React.Fragment key={group.id}>
          {/* <-- Sticky label cell */}
          <div
            className="
              sticky left-0
              flex items-center pl-2
              text-xs font-semibold
              bg-white z-20
              border-t border-r
            "
          >
            {group.label}
          </div>
          {/* Year cells */}
          {years.map((year) => (
            <div
              key={`${group.id}-${year}`}
              className="border-t border-l flex items-center justify-center text-xs"
            >
            </div>
          ))}
        </React.Fragment>
        )}

    {itemsWithLevel.map((item) => {
          const rowIndex = groups.findIndex((g) => g.id === item.group);
          if (rowIndex === -1) return null;

          const startOffset = item.startYear - startYear;// e.g. 1805–1800 = 5 → zero‐based
          const spanYears = item.endYear - item.startYear + 1;// inclusive span
          const colStart = startOffset + 2;// +1 for labels column, +1 because grid‐lines start at 1
          const colEnd = colStart + spanYears;
          // const overlapOffset = 2; // in rem
          const topShift = `calc(${rowIndex} * 4rem + ${item.level} * ${overlapOffset}rem)`;

          return (
            <div
              key={item.id}
              className="absolute flex w-[100%] items-centerjustify-center px-1 text-xs font-medium bg-blue-200 text-blue-900 rounded z-10 p-2 border-2 hover:border-none hover:cursor-pointer"
              style={{
                gridColumn: `${colStart} / ${colEnd}`,
                top: topShift,
                zIndex: item.level + 10,  // higher levels float above
              }}
            >
              {item.title}
            </div>
          );
        })}

      </div>

      {/* Year labels underneath */}
      <div className="grid bg-black" style={columnStyles}>
      <div /> 
        {years.map(year => (
          <div
            key={year}
            className=" flex items-center justify-center text-xs h-6 bg-black text-white"
          >
            {year}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
