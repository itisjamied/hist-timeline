// types.ts
export interface Group {
    id: number;
    label: string;
  }
  
  export interface Item {
    id: number;
    group: number;
    title: string;
    startYear: number;
    endYear: number;
  }
  
  export interface PositionedItem extends Item {
    level: number;
  }