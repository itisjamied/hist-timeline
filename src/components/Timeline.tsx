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

  return (
    <div
      className="overflow-x-auto border mt-8"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numYears}, 5vw)`,
        gridTemplateRows: `repeat(${groups.length}, 4rem)`,
      }}
    >
      {groups.map((group, rowIdx) =>
        years.map((year, colIdx) => (
          <div
            key={`${group.id}-${year}`}
            className="border-l border-t flex items-center justify-center text-xs"
          >
            {rowIdx === 0 && (
              <span className="absolute top-0 transform -translate-y-full text-[10px]">
                {year}
              </span>
            )}
            {colIdx === 0 && (
              <span className="absolute left-0 transform -translate-x-full text-[10px]">
                {group.label}
              </span>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Timeline;