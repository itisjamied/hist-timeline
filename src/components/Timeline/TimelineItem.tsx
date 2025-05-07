import React from 'react';
import { PositionedItem, Group } from './types';
import { COLUMN_WIDTH_VW } from '../Constants/constants';

interface TimelineItemProps {
  item: PositionedItem;
  startYear: number;
  groups: Group[];
  className?: string;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, startYear, groups }) => {
  const overlapOffset = 3;
  const bgClasses = ['bg-red-50','bg-green-50','bg-blue-50','bg-yellow-50','bg-purple-50'];
  const itemBg = bgClasses[item.group % bgClasses.length];
  const rowIndex = groups.findIndex(g => g.id === item.group);
  if (rowIndex === -1) return null;

  const startOffset = item.startYear - startYear;
  const spanYears = item.endYear - item.startYear +1;
  const colStart = startOffset + 2;
  const colEnd = colStart + spanYears;

  return (
    <div
      className={`absolute flex items-center justify-center px-1 text-xs font-bold text-black rounded z-10 p-2  border-2 border-black hover:border-none hover:cursor-pointer ${itemBg}`}
      style={{
        gridColumn: `${colStart} / ${colEnd}`,
        gridRowStart: rowIndex + 1,
        width: `${spanYears * COLUMN_WIDTH_VW}vw`,
        top: `${item.level * overlapOffset}rem`,
        zIndex: item.level + 10,
      }}
    >
      {item.title}
    </div>
  );
};
