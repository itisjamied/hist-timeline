'use client'

import React from 'react'
import Image from 'next/image'
import { PositionedItem } from './types'

export interface SidebarProps {
  selectedItem: PositionedItem | null
  width: number
  onClose: () => void
  onInitResize: (e: React.MouseEvent) => void
  onOpenModal: (image: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedItem,
  width,
  onClose,
  onInitResize,
  onOpenModal,
}) => (
  <div
    className={`absolute top-0 right-0 h-full bg-white shadow-lg p-6 text-black transition-transform duration-300 z-30 overflow-y-auto
      ${selectedItem ? 'translate-x-0' : 'translate-x-full'}`}
    style={{ width }}
  >
    <div
      className="absolute top-0 left-0 h-full w-2 bg-gray-300 cursor-ew-resize"
      onMouseDown={onInitResize}
    />
    <button
      onClick={onClose}
      className=" mb-4 text-red-700 px-2 py-1 bg-red-200 rounded font-black hover:text-red-500 cursor-pointer"
    >
      X
    </button>

    {selectedItem && (
      <>
        <h2 className="text-xl font-bold mb-2">{selectedItem.title}</h2>
        {selectedItem.startYear === selectedItem.endYear ? (
          <p><strong>Year:</strong> {selectedItem.startYear}</p>
        ) : (
          <>
            <p><strong>Start:</strong> {selectedItem.startYear}</p>
            <p><strong>End:</strong> {selectedItem.endYear}</p>
          </>
        )}

        {selectedItem.photo && (
          <Image
            src={selectedItem.photo}
            alt={selectedItem.title}
            className="mt-4 w-full h-auto rounded shadow cursor-pointer"
            width={4000}
            height={4000}
            onClick={() => onOpenModal(selectedItem.photo!)}
          />
        )}

        {selectedItem.description && (
          <p className="mt-4 text-gray-700">{selectedItem.description}</p>
        )}

        {selectedItem.fileUrl && (
          <div className="mt-4">
            {/\.(jpe?g|png|gif|webp)$/i.test(selectedItem.fileUrl) ? (
              <Image
                src={selectedItem.fileUrl}
                alt={`${selectedItem.title} attachment`}
                className="w-full h-auto rounded shadow cursor-pointer"
                width={800}
                height={600}
                onClick={() => onOpenModal(selectedItem.fileUrl!)}
              />
            ) : /\.(pdf)$/i.test(selectedItem.fileUrl) ? (
              <object
                data={selectedItem.fileUrl}
                type="application/pdf"
                width="100%"
                height="4000px"
                className="cursor-pointer"
                onClick={() => onOpenModal(selectedItem.fileUrl!)}
              >
                <p>
                  <a href={selectedItem.fileUrl} target="_blank" rel="noreferrer">
                    Download PDF
                  </a>
                </p>
              </object>
            ) : (
              <a
                href={selectedItem.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Download attachment
              </a>
            )}
          </div>
        )}
      </>
    )}
  </div>
)
