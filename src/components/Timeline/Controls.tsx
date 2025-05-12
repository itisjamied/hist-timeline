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
  <div className="absolute top-4 right-4 z-20 flex space-x-2 bg-white bg-opacity-75 p-2 rounded text-black font-black">
    <button
      onClick={onZoomOut}
      className="px-2 py-1 bg-red-200 rounded-md hover:bg-red-300 cursor-pointer"
    >
      –
    </button>
    <button
      onClick={onZoomIn}
      className="px-2 py-1 bg-green-200 rounded-md hover:bg-green-300 cursor-pointer"
    >
      +
    </button>
    <button
      onClick={onToggleFullscreen}
      className="px-2 py-1 bg-yellow-200 rounded-md hover:bg-yellow-300 cursor-pointer"
    >
      {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    </button>
  </div>
);
