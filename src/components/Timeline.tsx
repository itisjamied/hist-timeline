// components/Timeline.tsx
import React from 'react';

export interface Group {
  id: number;
  label: string;
}

export interface TimelineProps {
  startYear: number;
  endYear: number;
  groups: Group[];
}

const Timeline: React.FC<TimelineProps> = ({ startYear, endYear, groups }) => {
  const numYears = endYear - startYear + 1;
  const years = Array.from({ length: numYears }, (_, i) => startYear + i);

  // Common grid column definition
  const columnStyles = { gridTemplateColumns: `5vw repeat(${numYears}, 5vw)` };

  return (
    <div className="timeline-container overflow-x-auto border mt-8 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-white">
      {/* Main timeline grid for groups */}
      <div
        className="grid min-w-max"
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
              bg-white z-10
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
