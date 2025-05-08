'use client';

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Group, Item, PositionedItem } from './types';
import { computeLevels } from './utils/computeLevels';
import { TimelineRow } from './TimelineRow';
import { TimelineItem } from './TimelineItem';
import { YearLabels } from './YearLabels';
import { COLUMN_WIDTH } from '../Constants/constants';

interface TimelineProps {
  startYear: number;
  endYear: number;
  groups: Group[];
  items: Item[];
}

export const Timeline: React.FC<TimelineProps> = ({
  startYear,
  endYear,
  groups,
  items,
}) => {
  const numYears = endYear - startYear + 1;
  const [columnWidth, setColumnWidth] = useState<string>(COLUMN_WIDTH);
  const years = Array.from({ length: numYears }, (_, i) => startYear + i);
  const columnStyles = {
    gridTemplateColumns: `${columnWidth} repeat(${numYears}, ${columnWidth})`,
  };

  // refs for scroll container and to remember scroll ratio
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevCenterRatioRef = useRef<number | null>(null);

  // ref for fullscreen wrapper
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // compute row heights based on overlapping levels
  const itemsWithLevel = computeLevels(items);
  const maxLevelByGroup: Record<number, number> = {};
  itemsWithLevel.forEach((item) => {
    maxLevelByGroup[item.group] = Math.max(
      maxLevelByGroup[item.group] ?? 0,
      item.level
    );
  });

  const base = 3;
  const gap = 0.5;
  const offset = 2.5;
  const rowHeights = groups.map((g) => {
    const maxLevel = maxLevelByGroup[g.id] ?? 0;
    return `${base + maxLevel * offset + gap}rem`;
  });

  // adjust scroll to keep center position on width change
  useLayoutEffect(() => {
    const ratio = prevCenterRatioRef.current;
    const container = scrollRef.current;
    if (ratio !== null && container) {
      const newTotalWidth = container.scrollWidth;
      const newCenter = ratio * newTotalWidth;
      container.scrollLeft = newCenter - container.clientWidth / 2;
      prevCenterRatioRef.current = null;
    }
  }, [columnWidth]);

  // handlers record current center ratio then update width
  const adjustWidth = (delta: number) => {
    const container = scrollRef.current;
    if (container) {
      const { scrollLeft, clientWidth, scrollWidth } = container;
      const center = scrollLeft + clientWidth / 2;
      prevCenterRatioRef.current = center / scrollWidth;
    }
    const unit = columnWidth.replace(/[0-9.]/g, '');
    const num = parseFloat(columnWidth);
    const next = Math.max(num + delta, 1);
    setColumnWidth(`${next}${unit}`);
  };

  // fullscreen toggle
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await wrapperRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error('Failed to enter fullscreen:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error('Failed to exit fullscreen:', err);
      }
    }
  };

  // keep state in sync if user exits via ESC
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const [selectedItem, setSelectedItem] = useState<PositionedItem | null>(null);

  // pass this into each TimelineItem
  const handleItemClick = (item: PositionedItem) => {
    setSelectedItem(item);
  };

  return (
    <>
      <div className="translate-[-20px] z-10 flex justify-end space-x-2 items-end bg-white px-2 py-1 w-full">
        <button
          onClick={() => adjustWidth(-1)}
          className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
        >
          –
        </button>
        <button
          onClick={() => adjustWidth(1)}
          className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
        >
          +
        </button>
        <button
          onClick={toggleFullscreen}
          className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      <div
        ref={wrapperRef}
        className="timeline-wrapper m-6 mt-0 h-[60vh] relative bg-white rounded-2xl rounded-br-none shadow-inner overflow-x-hidden"
      >
        {/* Scrollable timeline content */}
        <div ref={scrollRef} className="overflow-x-auto overflow-y-hidden h-full">
          <div
            className="grid min-w-max relative divide-y divide-gray-200"
            style={{
              ...columnStyles,
              gridTemplateRows: rowHeights.map((h) => `minmax(${h}, 1fr)`).join(' '),
              height: '95%',
            }}
          >
            {groups.map((group) => (
              <TimelineRow
                key={group.id}
                group={group}
                years={years}
                columnCount={numYears}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50"
              />
            ))}

            {itemsWithLevel.map((item) => (
              <TimelineItem
                key={item.id}
                item={item}
                startYear={startYear}
                groups={groups}
                className="bg-indigo-100 text-indigo-800 rounded-full px-2 py-1 shadow"
                onItemClick={handleItemClick}
              />
            ))}
          </div>

          <YearLabels
            years={years}
            columnStyles={columnStyles}
            className="mt-4 text-xs text-gray-500"
          />
        </div>

        {/* SIDE PANEL */}
        <div
          className={`
            absolute top-0 right-0 h-full w-80 bg-white shadow-lg p-6
            transform transition-transform duration-300 z-50
            ${selectedItem ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <button
            className="mb-4 text-gray-500 hover:text-gray-800"
            onClick={() => setSelectedItem(null)}
          >
            Close ×
          </button>

          {selectedItem ? (
            <>
              <h2 className="text-xl font-bold mb-2">{selectedItem.title}</h2>
              <p><strong>Start:</strong> {selectedItem.startYear}</p>
              <p><strong>End: </strong> {selectedItem.endYear}</p>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
