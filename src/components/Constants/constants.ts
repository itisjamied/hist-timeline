
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

export const TIMELINE_ITEMS = [
  {
    id:  1,
    group: 1,
    title: 'French & Indian War',
    startYear: 1754,
    endYear: 1763,
    description: 'A North American theater of the global Seven Years’ War pitting Britain and its colonies against France and their Native American allies, reshaping colonial borders.',
    photo: '/TESTIMG.png'
  },
  {
    id:  2,
    group: 2,
    title: 'Royal Proclamation Line',
    startYear: 1763,
    endYear: 1764,
    description: 'British decree forbidding colonial settlement west of the Appalachian Mountains, intended to stabilize relations with Native Americans and control expansion.',
    photo: '/TESTIMG.png'
    
    
  },
  {
    id:  3,
    group: 2,
    title: 'Sugar Act',
    startYear: 1764,
    endYear: 1764,
    description: 'Revenue-raising measure imposing duties on molasses and sugar imports to the colonies, aimed at offsetting Britain’s war debt and enforcing trade regulations.',
    photo: '/TESTIMG.png'
  },
  {
    id:  4,
    group: 2,
    title: 'Stamp Act',
    startYear: 1765,
    endYear: 1765,
    description: 'Direct tax requiring that many printed materials in the colonies be produced on stamped paper from London, sparking widespread protest under the slogan “no taxation without representation.”',
    photo: '/TESTIMG.png'
  },
  {
    id:  5,
    group: 2,
    title: 'Townshend Duties',
    startYear: 1767,
    endYear: 1768,
    description: 'Series of import taxes on goods like glass, tea, and paper, used to pay colonial governor salaries; led to boycotts and heightened tensions over parliamentary authority.',
    photo: '/TESTIMG.png'
  },
  {
    id:  6,
    group: 3,
    title: 'Boston Massacre',
    startYear: 1770,
    endYear: 1770,
    description: 'Confrontation where British soldiers fired on a crowd in Boston, killing five colonists and fueling anti-British sentiment through colonial propaganda.',
    photo: '/TESTIMG.png'
  },
  {
    id:  7,
    group: 3,
    title: 'Boston Tea Party',
    startYear: 1773,
    endYear: 1773,
    description: 'Political protest in which colonists, disguised as Mohawk Indians, boarded British ships and dumped tea into Boston Harbor to oppose the Tea Act’s monopoly.',
    photo: '/TESTIMG.png'
  },
  {
    id:  8,
    group: 2,
    title: 'Intolerable Acts',
    startYear: 1774,
    endYear: 1774,
    description: 'Punitive measures (Coercive Acts) enacted by Parliament in response to the Tea Party, closing Boston Harbor and altering Massachusetts’ charter to punish colonial resistance.',
    photo: '/TESTIMG.png'
  },
  {
    id:  9,
    group: 3,
    title: 'Military conflict in Boston',
    startYear: 1775,
    endYear: 1775,
    description: 'Clashes at Lexington and Concord and the Siege of Boston marked the outbreak of open warfare between colonial militias and British troops, beginning the Revolutionary War.',
    photo: '/TESTIMG.png'
  },
];

