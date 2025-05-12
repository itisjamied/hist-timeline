import React from 'react';
import { Group } from './types';
import { TIMELINE_BG_CLASSES } from '../Constants/constants';

interface TimelineRowProps {
  group: Group;
  years: number[];
  columnCount: number;
  className?: string;
}

export const TimelineRow: React.FC<TimelineRowProps> = ({ group, years }) => {
  const rowBg = TIMELINE_BG_CLASSES[(group.id - 1) % TIMELINE_BG_CLASSES.length];

  return (
    <>
      <div className={`sticky left-0 flex items-center justify-center text-center p-8 text-m font-bold z-20 border-r-2 border-t-2 ${rowBg}  min-w-[6rem] text-black`} >  
        {group.label}
      </div>
      {years.map(year => (
        <div key={year} className="flex items-center justify-center text-xs" />
      ))}
    </>
  );
};
