/** Categorical series stay distinct; never turn warning/error signals into brand green. */
export const SERIES_COLORS = ['#0b825c', '#477db3', '#ad648b', '#b88736', '#8071b1', '#488b91'] as const;
export const SCENE_FONT = '"DM Sans", "Noto Sans SC", system-ui, sans-serif';

export const DEFAULT_SCENE_THEME = {
  surface: '#f4f8f5',
  text: '#16201d',
  muted: '#61796e',
  line: '#bacfc3',
  grid: '#2b6b4510',
  accent: '#0b825c',
};
type SceneTheme = typeof DEFAULT_SCENE_THEME;
const themes = new WeakMap<CanvasRenderingContext2D, SceneTheme>();

/** Called once per redraw, not once per target. Reads the actual HA theme. */
export function updateSceneTheme(
  ctx: CanvasRenderingContext2D,
  styles: Pick<CSSStyleDeclaration, 'getPropertyValue'>,
): void {
  const read = (token: string, fallback: string) => styles.getPropertyValue(token).trim() || fallback;
  themes.set(ctx, {
    surface: read('--mmwave-plot-surface', DEFAULT_SCENE_THEME.surface),
    text: read('--mmwave-plot-text', DEFAULT_SCENE_THEME.text),
    muted: read('--mmwave-plot-muted', DEFAULT_SCENE_THEME.muted),
    line: read('--mmwave-plot-line', DEFAULT_SCENE_THEME.line),
    grid: read('--mmwave-plot-grid', DEFAULT_SCENE_THEME.grid),
    accent: read('--mmwave-ink', DEFAULT_SCENE_THEME.accent),
  });
}

export function sceneTheme(ctx: CanvasRenderingContext2D): SceneTheme {
  return themes.get(ctx) ?? DEFAULT_SCENE_THEME;
}
