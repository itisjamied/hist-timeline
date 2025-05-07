import React from 'react';
import { Group } from './types';

interface TimelineRowProps {
  group: Group;
  years: number[];
  columnCount: number;
  className?: string;
}

export const TimelineRow: React.FC<TimelineRowProps> = ({ group, years }) => {
  const bgClasses = ['bg-red-50','bg-green-50','bg-blue-50','bg-yellow-50','bg-purple-50'];
  const rowBg = bgClasses[group.id % bgClasses.length];

  return (
    <>
      <div className={`sticky left-0 flex items-center justify-center text-center p-8 text-xs font-semibold z-20 border-r-2 border-t-2 ${rowBg}`} >  
        {group.label}
      </div>
      {years.map(year => (
        <div key={year} className="flex items-center justify-center text-xs" />
      ))}
    </>
  );
};
