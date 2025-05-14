import React from 'react'
import {PatchEvent, set, unset} from 'sanity'
import {FaFlag, FaGavel, FaExclamationCircle, FaBeer, FaCoffee,
        FaHome, FaUser, FaLock, FaUnlock, FaHeart, FaStar,
        FaChartBar, FaCalculator, FaCamera, FaBell, FaCalendar,
        FaComment, FaEnvelope } from 'react-icons/fa'
import {IconType} from 'react-icons'

const OPTIONS: {title:string; value:string; Icon:IconType}[] = [
 { title:'Flag',     value:'FaFlag',             Icon:FaFlag },
  { title:'Gavel',    value:'FaGavel',            Icon:FaGavel },
  { title:'Warning',  value:'FaExclamationCircle',Icon:FaExclamationCircle },
  { title:'Beer',     value:'FaBeer',             Icon:FaBeer },
  { title:'Coffee',   value:'FaCoffee',           Icon:FaCoffee },
  { title:'Home',     value:'FaHome',             Icon:FaHome },
  { title:'User',     value:'FaUser',             Icon:FaUser },
  { title:'Lock',     value:'FaLock',             Icon:FaLock },
  { title:'Unlock',   value:'FaUnlock',           Icon:FaUnlock },
  { title:'Heart',    value:'FaHeart',            Icon:FaHeart },
  { title:'Star',     value:'FaStar',             Icon:FaStar },
  { title:'ChartBar', value:'FaChartBar',         Icon:FaChartBar },
  { title:'Calc',     value:'FaCalculator',       Icon:FaCalculator },
  { title:'Camera',   value:'FaCamera',           Icon:FaCamera },
  { title:'Bell',     value:'FaBell',             Icon:FaBell },
  { title:'Calendar', value:'FaCalendar',         Icon:FaCalendar },
  { title:'Comment',  value:'FaComment',          Icon:FaComment },
  { title:'Envelope', value:'FaEnvelope',         Icon:FaEnvelope },
]

export default function IconPicker({
  value, onChange
}: {
  value: string | undefined
  onChange: (ev: PatchEvent) => void
}) {
  return (
    <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
      {OPTIONS.map(({title, value: val, Icon})=>{
        const selected = val===value
        return (
          <button
            key={val}
            type="button"
            onClick={()=>
              onChange(PatchEvent.from(selected ? unset() : set(val)))
            }
            title={title}
            style={{
              padding:8,
              border: selected ? '2px solid #007aff' : '1px solid #ccc',
              borderRadius:4,
              background: selected ? '#e6f0ff' : 'white',
              cursor:'pointer'
            }}
          >
            <Icon size={24} color="black"/>
          </button>
        )
      })}
    </div>
  )
}