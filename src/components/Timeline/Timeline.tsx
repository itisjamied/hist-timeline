'use client'
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Group, Item, PositionedItem } from './types';
import Image from 'next/image';
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

export const Timeline: React.FC<TimelineProps> = ({ startYear, endYear, groups, items }) => {
  /**
   * State
   */
  const [columnWidth, setColumnWidth] = useState<string>(COLUMN_WIDTH);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PositionedItem | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  /**
   * Refs
   */
  const scrollRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prevCenterRatioRef = useRef<number | null>(null);

  /**
   * Derived values
   */
  const numYears = endYear - startYear + 1;
  const years = Array.from({ length: numYears }, (_, i) => startYear + i);
  const columnStyles = {
    gridTemplateColumns: `${columnWidth} repeat(${numYears}, ${columnWidth})`
  };

  // Compute item levels for vertical stacking
  const itemsWithLevel = computeLevels(items);
  const maxLevelByGroup: Record<number, number> = {};
  itemsWithLevel.forEach(item => {
    maxLevelByGroup[item.group] = Math.max(
      maxLevelByGroup[item.group] ?? 0,
      item.level
    );
  });

  // Calculate row heights based on number of stacked items
  const baseHeight = 3;
  const rowGap = 0.5;
  const levelOffset = 2.5;
  const rowHeights = groups.map(group => {
    const maxLevel = maxLevelByGroup[group.id] ?? 0;
    return `${baseHeight + maxLevel * levelOffset + rowGap}rem`;
  });

  /**
   * Effects
   */
  // Preserve scroll position ratio on resize/zoom
  useLayoutEffect(() => {
    const ratio = prevCenterRatioRef.current;
    const container = scrollRef.current;
    if (ratio !== null && container) {
      const newCenter = ratio * container.scrollWidth;
      container.scrollLeft = newCenter - container.clientWidth / 2;
      prevCenterRatioRef.current = null;
    }
  }, [columnWidth]);

  // Track fullscreen changes to update state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  /**
   * Handlers
   */
  const adjustWidth = (delta: number) => {
    const container = scrollRef.current;
    if (container) {
      const { scrollLeft, clientWidth, scrollWidth } = container;
      prevCenterRatioRef.current = (scrollLeft + clientWidth / 2) / scrollWidth;
    }
    const unit = columnWidth.replace(/[0-9.]/g, '');
    const value = parseFloat(columnWidth);
    const nextValue = Math.max(value + delta, 1);
    setColumnWidth(`${nextValue}${unit}`);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await wrapperRef.current?.requestFullscreen();
      } catch (err) {
        console.error('Fullscreen request failed', err);
      }
    } else {
      try {
        await document.exitFullscreen();
      } catch (err) {
        console.error('Exit fullscreen failed', err);
      }
    }
  };

  const handleItemClick = (item: PositionedItem) => {
    setSelectedItem(item);
  };

  const handleCloseSidebar = () => setSelectedItem(null);

  const handleSidebarResize = (startX: number, startWidth: number) => (moveEvent: MouseEvent) => {
    const newWidth = startWidth - (moveEvent.clientX - startX);
    setSidebarWidth(Math.max(newWidth, 200));
  };

  const initResize = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = sidebarWidth;
    const onMouseMove = handleSidebarResize(startX, startWidth);
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };



  const openModal = (image: string) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  /**
   * Render
   */
  return (
    <div
      ref={wrapperRef}
      className={`timeline-fullscreen-container m-6 relative bg-white rounded-2xl shadow-inner overflow-hidden
        ${isFullscreen ? 'h-screen pt-8' : 'h-[60vh]'}`}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex space-x-2 bg-white bg-opacity-75 p-2 rounded">
        <button onClick={() => adjustWidth(-1)} className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer">–</button>
        <button onClick={() => adjustWidth(1)}  className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer">+</button>
        <button onClick={toggleFullscreen}       className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer">
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      {/* Timeline Grid */}
      <div ref={scrollRef} className={`h-full overflow-x-auto overflow-y-hidden ${isFullscreen ? 'pt-8' : ''}`}>        
        <div
          className="grid min-w-max relative divide-y divide-gray-200"
          style={{
            ...columnStyles,
            gridTemplateRows: rowHeights.map(h => `minmax(${h}, 1fr)`).join(' '),
            height: '95%'
          }}
        >
          {groups.map(group => (
            <TimelineRow
              key={group.id}
              group={group}
              years={years}
              columnCount={numYears}
              className="px-4 py-2 text-sm text-gray-700 bg-gray-50"
            />
          ))}

          {itemsWithLevel.map(item => (
            <TimelineItem
              key={item.id}
              item={item}
              startYear={startYear}
              groups={groups}
              description={item.description}
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

      {/* Side Panel */}
      <div
        className={`absolute top-0 right-0 h-full bg-white shadow-lg p-6 transition-transform duration-300 z-30 overflow-y-auto
          ${selectedItem ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: sidebarWidth }}
      >
        <div
          className="absolute top-0 left-0 h-full w-2 bg-gray-300 cursor-ew-resize"
          onMouseDown={initResize}
        />
        <button onClick={handleCloseSidebar} className="mb-4 text-gray-500 hover:text-gray-800 cursor-pointer">Close ×</button>

        {selectedItem && (
          <>
            <h2 className="text-xl font-bold mb-2">{selectedItem.title}</h2>
            <p><strong>Start:</strong> {selectedItem.startYear}</p>
            <p><strong>End:</strong> {selectedItem.endYear}</p>
            {selectedItem.photo && (
              <Image 
              src={selectedItem.photo} 
              alt={selectedItem.title} 
              className="mt-4 w-full h-auto rounded shadow" 
              width={1000} 
              height={1000} 
              onClick={() => openModal(selectedItem.photo ?? '')}
              />
            )}
            {selectedItem.description && (
              <p className="mt-4 text-gray-700">{selectedItem.description}</p>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 "
          onClick={closeModal} // Close modal when clicking outside the image
        >
          <div className="relative">
            <Image
              src={modalImage}
              alt="Modal"
              className="max-w-full h-auto max-h-screen rounded shadow-lg p-10"
              width={1000}
              height={1000}
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl font-bold cursor-pointer"
              onClick={closeModal}
            >
              ×
            </button>
          </div>
        </div>
      )}



    </div>
  );
};
