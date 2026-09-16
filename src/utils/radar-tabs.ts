import type { RadarSourceConfig } from '../types';

/** Return the first conventional radar_N id that is not already in use. */
export function nextRadarTabId(radars: Pick<RadarSourceConfig, 'id'>[]): string {
  const ids = new Set(radars.map((radar) => radar.id));
  let suffix = 1;
  while (ids.has(`radar_${suffix}`)) suffix += 1;
  return `radar_${suffix}`;
}

/** Preserve the same selected radar when another tab is removed. */
export function selectedRadarIndexAfterRemoval(
  selectedIndex: number,
  removedIndex: number,
  nextLength: number,
): number {
  if (nextLength <= 0) return 0;
  if (selectedIndex > removedIndex) return selectedIndex - 1;
  if (selectedIndex === removedIndex) return Math.min(removedIndex, nextLength - 1);
  return Math.min(selectedIndex, nextLength - 1);
}
