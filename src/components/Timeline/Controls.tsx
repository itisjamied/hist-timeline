// components/Timeline/Controls.tsx
'use client'

import React from 'react';

interface ControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onToggleFullscreen,
  isFullscreen,
}) => (
  <div className="absolute top-4 right-4 z-20 flex space-x-2 bg-white bg-opacity-75 p-2 rounded text-black">
    <button
      onClick={onZoomOut}
      className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
    >
      –
    </button>
    <button
      onClick={onZoomIn}
      className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
    >
      +
    </button>
    <button
      onClick={onToggleFullscreen}
      className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
    >
      {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    </button>
  </div>
);
