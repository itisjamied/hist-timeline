import React from 'react';
import { Group, Item } from './types';
import { computeLevels } from './utils/computeLevels';
import { TimelineRow } from './TimelineRow';
import { TimelineItem } from './TimelineItem';
import { YearLabels } from './YearLabels';

interface TimelineProps {
  startYear: number;
  endYear: number;
  groups: Group[];
  items: Item[];
}

export const Timeline: React.FC<TimelineProps> = ({ startYear, endYear, groups, items }) => {
  const numYears = endYear - startYear + 1;
  const years = Array.from({ length: numYears }, (_, i) => startYear + i);
  const columnStyles = { gridTemplateColumns: `10vw repeat(${numYears}, 10vw)` };

  const itemsWithLevel = computeLevels(items);
  const maxLevelByGroup: Record<number, number> = {};
  itemsWithLevel.forEach(item => {
    maxLevelByGroup[item.group] = Math.max(maxLevelByGroup[item.group] ?? 0, item.level);
  });

  const base = 3;
  const gap = 0.5;
  const offset = 2.5;
  const rowHeights = groups.map(g => {
    const maxLevel = maxLevelByGroup[g.id] ?? 0;
    return `${base + maxLevel * offset + gap}rem`;
  });

  return (
      <div className="timeline-container bg-white rounded-2xl rounded-br-none shadow-inner overflow-x-auto m-6 h-[60vh]">

      <div
        className="grid min-w-max relative divide-y divide-gray-200"
        style={{
           ...columnStyles, 
          //  gridTemplateRows: `repeat(${groups.length}, minmax(4rem, 1fr))`,
          gridTemplateRows: rowHeights.map(h => `minmax(${h}, 1fr)`).join(' '),
          height: '95%',
          }}
      >
        {groups.map(group => (
          <TimelineRow
            key={group.id}
            group={group}
            years={years}
            columnCount={numYears}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50"
          />
        ))}
        {itemsWithLevel.map(item => (
          <TimelineItem
            key={item.id}
            item={item}
            startYear={startYear}
            groups={groups}
            className="bg-indigo-100 text-indigo-800 rounded-full px-2 py-1 shadow"
          />
        ))}
      </div>
      <YearLabels
        years={years}
        columnStyles={columnStyles}
        className="mt-4 text-xs text-gray-500"
      />
    </div>
  );
};
