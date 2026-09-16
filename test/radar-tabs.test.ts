import { describe, expect, it } from 'vitest';

import { nextRadarTabId, selectedRadarIndexAfterRemoval } from '../src/utils/radar-tabs';

describe('nextRadarTabId', () => {
  it('fills the first missing conventional tab id without duplicating an existing radar', () => {
    expect(nextRadarTabId([{ id: 'radar_1' }, { id: 'radar_3' }, { id: 'radar_4' }])).toBe('radar_2');
  });

  it('does not collide with custom radar ids', () => {
    expect(nextRadarTabId([{ id: 'ceiling' }, { id: 'radar_1' }])).toBe('radar_2');
  });
});

describe('selectedRadarIndexAfterRemoval', () => {
  it('keeps the same radar selected when an earlier tab is removed', () => {
    expect(selectedRadarIndexAfterRemoval(3, 1, 3)).toBe(2);
  });

  it('selects the adjacent remaining tab when the active tab is removed', () => {
    expect(selectedRadarIndexAfterRemoval(2, 2, 3)).toBe(2);
    expect(selectedRadarIndexAfterRemoval(3, 3, 3)).toBe(2);
  });
});
