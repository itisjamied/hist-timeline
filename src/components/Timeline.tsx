// components/Timeline.tsx
import React from 'react';

export interface Group {
  id: number;
  label: string;
}

export interface Item {
  id: number;
  group: number;      // must match one of the Group.id values
  title: string;
  startYear: number;
  endYear: number;    // inclusive
}

export interface TimelineProps {
  startYear: number;
  endYear: number;
  groups: Group[];
  items: Item[];
}

const Timeline: React.FC<TimelineProps> = ({ startYear, endYear, groups, items }) => {
  const numYears = endYear - startYear + 1;
  const years = Array.from({ length: numYears }, (_, i) => startYear + i);

  // Common grid column definition
  const columnStyles = { gridTemplateColumns: `5vw repeat(${numYears}, 5vw)` };

  return (
    <div className="timeline-container overflow-x-auto border mt-8 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-white">
      {/* Main timeline grid for groups */}
      <div
        className="grid min-w-max relative"
        style={{
          ...columnStyles,
          gridTemplateRows: `repeat(${groups.length}, 4rem)`,
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
              {/* you could highlight the year if you want */}
            </div>
          ))}
        </React.Fragment>
        )}

    {items.map((item) => {
          const rowIndex = groups.findIndex((g) => g.id === item.group);
          if (rowIndex === -1) return null;

          const startOffset = item.startYear - startYear;                // e.g. 1805–1800 = 5 → zero‐based
          const spanYears = item.endYear - item.startYear + 1;           // inclusive span
          const colStart = startOffset + 2;                              // +1 for labels column, +1 because grid‐lines start at 1
          const colEnd = colStart + spanYears;

          return (
            <div
              key={item.id}
              className="absolute flex w-[100%] items-centerjustify-center px-1 text-xs font-medium bg-blue-200 text-blue-900 rounded z-10 p-2 border-2 hover:border-none hover:cursor-pointer"
              style={{
                gridRow: rowIndex + 1,
                gridColumn: `${colStart} / ${colEnd}`,
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
