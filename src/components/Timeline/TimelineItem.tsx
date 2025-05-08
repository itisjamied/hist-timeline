import React, { useState } from 'react';
import { PositionedItem, Group } from './types';
import { COLUMN_WIDTH_VW, TIMELINE_BG_CLASSES } from '../Constants/constants';

interface TimelineItemProps {
  item: PositionedItem;
  startYear: number;
  groups: Group[];
  className?: string;
  onItemClick?: (item: PositionedItem) => void;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  startYear,
  groups,
  onItemClick, 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const overlapOffset = 3;

  const itemBg = TIMELINE_BG_CLASSES[item.group -1  % TIMELINE_BG_CLASSES.length];


  const rowIndex = groups.findIndex((g) => g.id === item.group);
  if (rowIndex === -1) return null;

  const startOffset = item.startYear - startYear;
  const spanYears = item.endYear - item.startYear + 1;
  const colStart = startOffset + 2;
  const colEnd = colStart + spanYears;

  // bring to front when hovered
  const zIndex = isHovered ? 30 : item.level + 10;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // onClick={() => onItemClick?.(item)} 
      onClick={() => onItemClick?.(item)} 
      // onClick={() => {
      //   console.log(`Name: ${item.title}, Start Year: ${item.startYear}, End Year: ${item.endYear}`);
      // }} 
      className={`absolute flex items-center justify-center px-1 text-xs font-bold text-black rounded p-2 border-2 border-black hover:border-red-600 hover:cursor-pointer ${itemBg}`}
      style={{
        gridColumn: `${colStart} / ${colEnd}`,
        gridRowStart: rowIndex + 1,
        width: `${spanYears * COLUMN_WIDTH_VW}vw`,
        top: `${item.level * overlapOffset}rem`,
        zIndex,
        transform: `translateX(${COLUMN_WIDTH_VW / 2}vw)`,
      }}
    >
      {item.title}
       {/* vertical “connector” down to the year row */}
       <div
        className="absolute w-px top-full left-0 h-150 bg-black"
        style={{ zIndex }}
      />
    </div>
  );
};
