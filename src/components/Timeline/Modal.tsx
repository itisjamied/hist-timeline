'use client'

import React from 'react'
import Image from 'next/image'

interface ModalProps {
  isOpen: boolean
  imageSrc: string | null
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen || !imageSrc) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
      onClick={onClose}
    >
      <div
        className="relative w-full max-h-full p-4 rounded flex items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        {/\.(pdf)$/i.test(imageSrc) ? (
          <object
            data={imageSrc}
            type="application/pdf"
            width="100%"
            height="100%"
          >
            <p>
              <a href={imageSrc} target="_blank" rel="noreferrer">
                Download PDF
              </a>
            </p>
          </object>
        ) : (
             <div className="max-w-[90vw] max-h-[100vh] p-10 overflow-auto">
          <Image
            src={imageSrc}
            alt="attachment"
             className=" object-contain rounded shadow-lg"
            width={900}
            height={700}
          />
          </div>
        )}
        <button
          className="absolute top-2 right-2 text-white text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  )
}
