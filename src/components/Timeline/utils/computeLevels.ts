import { Item, PositionedItem } from '../types';

export function computeLevels(items: Item[]): PositionedItem[] {
  const byGroup: Record<number, Item[]> = {};
  items.forEach(item => {
    (byGroup[item.group] ||= []).push(item);
  });

  const result: PositionedItem[] = [];

  Object.values(byGroup).forEach(groupItems => {
    groupItems.sort((a, b) => a.startYear - b.startYear);
    const levelEndYears: number[] = [];

    groupItems.forEach(item => {
      let level = 0;
      while (level < levelEndYears.length && item.startYear <= levelEndYears[level]) {
        level++;
      }
      levelEndYears[level] = Math.max(levelEndYears[level] || 0, item.endYear);
      result.push({ ...item, level });
    });
  });

  return result;
}