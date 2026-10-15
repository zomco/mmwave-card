import { css } from 'lit';

/** MMWave family UI. Shared by every shadow root; HA owns the surrounding theme. */
export const controlStyles = css`
  :host {
    --mmwave-font: var(
      --mmwave-font-family,
      'DM Sans',
      'Noto Sans SC',
      var(--primary-font-family, system-ui),
      sans-serif
    );
    font-family: var(--mmwave-font);
    font-size: 13px;
    line-height: 1.6;
    color: var(--primary-text-color, #16201d);
    --mmwave-primary: var(--mmwave-brand-color, #0b825c);
    --mmwave-primary-soft: color-mix(in srgb, var(--mmwave-primary) 10%, transparent);
    --mmwave-secondary: var(--secondary-text-color, #61796e);
    --mmwave-control-radius: 10px;
    --mmwave-panel-radius: 14px;
    --mmwave-control-border: var(--divider-color, #dbe4df);
    --mmwave-line: var(--mmwave-control-border);
    --mmwave-control-surface: var(--card-background-color, #fff);
    --mmwave-control-muted: var(--secondary-text-color, #61796e);
    --mmwave-surface: color-mix(in srgb, var(--mmwave-control-surface) 96%, var(--mmwave-primary));
    --mmwave-accent: var(--mmwave-primary);
    /* Separate readable ink from the filled action color in dark HA themes. */
    --mmwave-ink: color-mix(in srgb, var(--mmwave-primary) 65%, var(--primary-text-color, #16201d));
    --mmwave-plot-surface: var(--mmwave-surface);
    --mmwave-plot-text: var(--primary-text-color, #16201d);
    --mmwave-plot-muted: var(--mmwave-control-muted);
    --mmwave-plot-line: color-mix(in srgb, var(--mmwave-control-muted) 38%, var(--mmwave-control-surface));
    --mmwave-plot-grid: color-mix(in srgb, var(--mmwave-control-muted) 12%, transparent);
    --mdc-theme-primary: var(--mmwave-primary);
    --ha-textfield-border-radius: var(--mmwave-control-radius);
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  button,
  input,
  select,
  textarea {
    font-family: inherit;
  }
  :host button {
    min-height: 40px;
    border-radius: var(--mmwave-control-radius);
    font-size: 13px;
    font-weight: 600;
    line-height: 1.5;
    -webkit-tap-highlight-color: transparent;
    transition:
      background 120ms,
      border-color 120ms,
      color 120ms;
  }
  button {
    min-height: 40px;
    border: 1px solid var(--mmwave-control-border);
    border-radius: var(--mmwave-control-radius);
    padding: 8px 12px;
    background: var(--mmwave-control-surface);
    color: inherit;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.4;
    cursor: pointer;
  }
  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
  :host button:focus-visible,
  :host input:focus-visible,
  :host select:focus-visible,
  :host textarea:focus-visible,
  :host a:focus-visible,
  :host summary:focus-visible {
    outline: 2px solid var(--mmwave-accent);
    outline-offset: 3px;
  }
  button:not(:disabled):hover {
    filter: brightness(0.96);
  }
  :host input:not([type='range']):not([type='checkbox']):not([type='radio']):not([type='file']),
  :host select,
  :host textarea {
    min-height: 40px;
    min-width: 0;
    padding: 9px 10px;
    border: 1px solid var(--mmwave-control-border);
    border-radius: var(--mmwave-control-radius);
    background: var(--mmwave-control-surface);
    color: var(--primary-text-color, #16201d);
    font-size: 13px;
    line-height: 1.5;
  }
  :host input[type='checkbox'],
  :host input[type='radio'] {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
  }
  :host input[type='range'] {
    min-height: 28px;
  }
  :host input:disabled,
  :host select:disabled,
  :host textarea:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  :host select option {
    color: var(--primary-text-color, #16201d);
    background: var(--mmwave-control-surface);
  }
  :host h2,
  :host h3 {
    font-weight: 600;
    letter-spacing: -0.025em;
    line-height: 1.5;
  }
  :host .panel-heading p,
  :host .section-heading p {
    font-size: 13px;
    line-height: 1.8;
  }
  :host .eyebrow {
    color: var(--mmwave-ink);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
  }
  :host canvas {
    background: var(--mmwave-plot-surface);
    border-radius: var(--mmwave-panel-radius);
  }
  :host .scene,
  :host .scene-shell {
    background: var(--mmwave-plot-surface);
    border-radius: var(--mmwave-panel-radius);
  }
  :host .icon-button,
  :host .remove-button,
  :host .play {
    min-width: 40px;
  }
  :host .secondary-button,
  :host .primary-button {
    min-height: 44px;
  }
  :host .workflow-footer,
  :host .poly-bar {
    flex-wrap: wrap;
    gap: 10px;
  }
  :host .workflow-step.current,
  :host .workflow-step.complete,
  :host .radar-tabs button.active,
  :host .presence-chip.active,
  :host .badge.on,
  :host .boundary-badge.active {
    color: var(--mmwave-ink);
  }
  input[type='range'],
  input[type='checkbox'],
  input[type='radio'] {
    accent-color: var(--mmwave-accent);
  }
  :host details {
    margin: 12px 0;
    padding: 0;
    border: 1px solid var(--mmwave-control-border);
    border-radius: var(--mmwave-panel-radius);
    background: var(--mmwave-control-surface);
  }
  :host details > summary {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    padding: 12px;
    color: var(--primary-text-color, #16201d);
    font-size: 13px;
    font-weight: 600;
    line-height: 1.5;
    cursor: pointer;
    list-style: none;
    user-select: none;
  }
  :host details > summary::-webkit-details-marker {
    display: none;
  }
  :host details > summary::before {
    content: '';
    width: 7px;
    height: 7px;
    flex: 0 0 7px;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(-45deg);
  }
  :host details[open] > summary::before {
    transform: rotate(45deg);
  }
  :host details > summary > small {
    margin-left: auto;
    float: none;
    padding: 2px 6px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--mmwave-control-muted) 10%, transparent);
    color: var(--mmwave-control-muted);
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
  }
  :host details[open] > summary {
    border-bottom: 1px solid var(--mmwave-control-border);
  }
  :host details > :not(summary) {
    margin: 12px;
  }
  :host .hint,
  :host .note,
  :host .need {
    color: var(--mmwave-control-muted);
    line-height: 1.8;
  }
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition: none !important;
      animation: none !important;
      scroll-behavior: auto !important;
    }
  }
  @media (pointer: coarse) {
    :host button {
      min-height: 44px;
    }
    :host input:not([type='range']):not([type='checkbox']):not([type='radio']),
    :host select,
    :host textarea {
      font-size: 16px;
    }
  }
`;
