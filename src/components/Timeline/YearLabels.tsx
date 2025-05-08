import React from 'react';

interface YearLabelsProps {
  years: number[];
  columnStyles: React.CSSProperties;
  className?: string;
}

export const YearLabels: React.FC<YearLabelsProps> = ({ years, columnStyles }) => (
  <div className="grid bg-black" style={columnStyles}>
    <div />
    {years.map(year => (
      <div key={year} className="flex items-center justify-center text-xs h-6 bg-black text-white">
        {year}
      </div>
    ))}
  </div>
);