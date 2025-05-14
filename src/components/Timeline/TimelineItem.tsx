import React, { useState } from 'react'
import { IconType } from 'react-icons'
import {FaFlag, FaGavel, FaExclamationCircle, FaBeer, FaCoffee,
        FaHome, FaUser, FaLock, FaUnlock, FaHeart, FaStar,
        FaChartBar, FaCalculator, FaCamera, FaBell, FaCalendar,
        FaComment, FaEnvelope} from 'react-icons/fa'
import { PositionedItem, Group } from './types'
import { COLUMN_WIDTH_VW, TIMELINE_BG_CLASSES } from '../Constants/constants'

interface TimelineItemProps {
  item: PositionedItem
  startYear: number
  groups: Group[]
  className?: string
  description?: string
  onItemClick?: (item: PositionedItem) => void
}

// map group-id → icon
// const groupIcons: Record<number, IconType> = {
//   1: FaFlag,
//   2: FaGavel,
//   3: FaExclamationCircle,
// }

// map the Sanity icon‐name → React component
const iconMap: Record<string, IconType> = {
  FaFlag:             FaFlag,
  FaGavel:            FaGavel,
  FaExclamationCircle:FaExclamationCircle,
  FaBeer:             FaBeer,
  FaCoffee:           FaCoffee,
  FaHome:             FaHome,
  FaUser:             FaUser,
  FaLock:             FaLock,
  FaUnlock:           FaUnlock,
  FaHeart:            FaHeart,
  FaStar:             FaStar,
  FaChartBar:         FaChartBar,
  FaCalculator:       FaCalculator,
  FaCamera:           FaCamera,
  FaBell:             FaBell,
  FaCalendar:         FaCalendar,
  FaComment:          FaComment,
  FaEnvelope:         FaEnvelope,
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  startYear,
  groups,
  onItemClick,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const overlapOffset = 3
  const itemBg = TIMELINE_BG_CLASSES[(item.group - 1) % TIMELINE_BG_CLASSES.length]
  const rowIndex = groups.findIndex(g => g.id === item.group)
  if (rowIndex === -1) return null

  const startOffset = item.startYear - startYear
  const spanYears = item.endYear - item.startYear + 1
  const colStart = startOffset + 2
  const colEnd = colStart + spanYears
  const zIndex = isHovered ? 30 : item.level + 10
   const group = groups.find(g => g.id===item.group)
  if (!group) return null
  const Icon = iconMap[group.icon] || FaExclamationCircle

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onItemClick?.(item)}
      className={`
        absolute flex items-center justify-start space-x-1
        px-2 py-1 text-m font-bold text-black rounded border-2 border-black
        hover:border-red-600 hover:cursor-pointer ${itemBg}
      `}
      style={{
        gridColumn: `${colStart} / ${colEnd}`,
        gridRowStart: rowIndex + 1,
        width: `${spanYears * COLUMN_WIDTH_VW}vw`,
        top: `${item.level * overlapOffset}rem`,
        zIndex,
        transform: `translateX(${COLUMN_WIDTH_VW / 2}vw)`,
      }}
    >
      <Icon className="flex-shrink-0" size={14} />
      <span className='text-xl'>{item.title}</span>
      {/* connector line */}
      <div
        className="absolute w-px top-full left-0 h-600 bg-black"
        style={{ zIndex }}
      />
    </div>
  )
}