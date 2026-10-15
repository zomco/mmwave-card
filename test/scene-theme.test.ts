import { describe, it, expect } from 'vitest';
import { DEFAULT_SCENE_THEME, SERIES_COLORS, sceneTheme, updateSceneTheme } from '../src/styles/scene';

describe('scene theme', () => {
  it('uses the flasher palette without a DOM', () => {
    expect(sceneTheme({} as CanvasRenderingContext2D)).toEqual(DEFAULT_SCENE_THEME);
    expect(SERIES_COLORS[0]).toBe('#0b825c');
    expect(new Set(SERIES_COLORS).size).toBe(SERIES_COLORS.length);
  });
  it('reads themed labels and refreshes per context without leaking across cards', () => {
    const dark = {} as CanvasRenderingContext2D;
    const light = {} as CanvasRenderingContext2D;
    updateSceneTheme(dark, { getPropertyValue: (key) => key === '--mmwave-plot-text' ? ' #eef7f3 ' : '' });
    expect(sceneTheme(dark).text).toBe('#eef7f3');
    expect(sceneTheme(light).text).toBe('#16201d');
    expect(sceneTheme(dark).surface).toBe(DEFAULT_SCENE_THEME.surface);
    updateSceneTheme(dark, { getPropertyValue: () => '' });
    expect(sceneTheme(dark)).toEqual(DEFAULT_SCENE_THEME);
  });
});
