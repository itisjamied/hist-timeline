
export const COLUMN_WIDTH_VW = 10;
export const COLUMN_WIDTH = `${COLUMN_WIDTH_VW}vw`;

export const TIMELINE_BG_CLASSES = [
  'bg-orange-100', // #FFEDD5 — very light, text-gray-900
  'bg-orange-200', // #FED7AA — light, text-gray-900
  'bg-orange-300', // #FDBA74 — mid-tone, text-gray-900
  'bg-orange-400', // #FB923C — richer, text-white
  'bg-yellow-500', // #F59E0B — vibrant, text-white
  'bg-yellow-700', // #B45309 — deep, text-white
];

/** Year span for the timeline */
export const START_YEAR = 1700;
export const END_YEAR   = 1877;

/** Group definitions */
export const TIMELINE_GROUPS = [
  { id: 1, label: 'Wars'                         },
  { id: 2, label: 'Imperial Legislation'        },
  { id: 3, label: 'Colonial Protest & Conflict' },
  { id: 4, label: 'Test'                         },
  { id: 5, label: 'Test'                         },
  { id: 6, label: 'Test'                         },
];

/** Event items on the timeline */
export const TIMELINE_ITEMS = [
  { id:  1, group: 1, title: 'French & Indian War',      startYear: 1754, endYear: 1763 },
  { id:  2, group: 2, title: 'Royal Proclamation Line',  startYear: 1763, endYear: 1764 },
  { id:  3, group: 2, title: 'Sugar Act',               startYear: 1764, endYear: 1764 },
  { id:  4, group: 2, title: 'Stamp Act',               startYear: 1765, endYear: 1765 },
  { id:  5, group: 2, title: 'Townshend Duties',        startYear: 1767, endYear: 1768 },
  { id:  6, group: 3, title: 'Boston Massacre',         startYear: 1770, endYear: 1770 },
  { id:  7, group: 3, title: 'Boston Tea Party',        startYear: 1773, endYear: 1773 },
  { id:  8, group: 2, title: 'Intolerable Acts',        startYear: 1774, endYear: 1774 },
  { id:  9, group: 3, title: 'Military conflict in Boston', startYear: 1775, endYear: 1775 },
];

