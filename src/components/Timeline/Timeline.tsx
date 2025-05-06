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
  const columnStyles = { gridTemplateColumns: `5vw repeat(${numYears}, 5vw)` };

  const itemsWithLevel = computeLevels(items);
  const maxLevelByGroup: Record<number, number> = {};
  itemsWithLevel.forEach(item => {
    maxLevelByGroup[item.group] = Math.max(maxLevelByGroup[item.group] ?? 0, item.level);
  });

  const base = 4;
  const pad = 1;
  const offset = 3;
  const rowHeights = groups.map(g => {
    const maxLevel = maxLevelByGroup[g.id] ?? 0;
    return `${base + maxLevel * offset + pad * 2}rem`;
  });

  return (
    <div className="timeline-container overflow-x-auto border-l-2 rounded mt-8 scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-white">
      <div className="grid min-w-max relative" style={{ ...columnStyles, gridTemplateRows: rowHeights.join(' ') }}>
        {groups.map(group => (
          <TimelineRow key={group.id} group={group} years={years} columnCount={numYears} />
        ))}
        {itemsWithLevel.map(item => (
          <TimelineItem key={item.id} item={item} startYear={startYear} groups={groups} />
        ))}
      </div>
      <YearLabels years={years} columnStyles={columnStyles} />
    </div>
  );
};