import { css } from 'lit';

/** Shared controls for every shadow root. Geometry/series colors stay panel-specific. */
export const controlStyles = css`
  :host {
    font-family: var(--primary-font-family, system-ui, sans-serif);
    color: var(--primary-text-color, #18232b);
    --mmwave-control-radius: 10px;
    --mmwave-panel-radius: 12px;
    --mmwave-control-border: var(--divider-color, rgba(128, 128, 128, 0.22));
    --mmwave-control-surface: var(--card-background-color, #fff);
    --mmwave-control-muted: var(--secondary-text-color, #64748b);
    --mmwave-accent: var(--mmwave-primary, #0b825c);
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
  button {
    min-height: 36px;
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
    cursor: default;
  }
  button:focus-visible,
  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible,
  summary:focus-visible {
    outline: 2px solid var(--mmwave-accent);
    outline-offset: 3px;
  }
  button:not(:disabled):hover {
    filter: brightness(0.96);
  }
  input:not([type='range']):not([type='checkbox']):not([type='radio']):not([type='file']),
  select,
  textarea {
    min-width: 0;
    border: 1px solid var(--mmwave-control-border);
    border-radius: var(--mmwave-control-radius);
    background: var(--mmwave-control-surface);
    color: var(--primary-text-color, #18232b);
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
    color: var(--primary-text-color, #18232b);
    font-size: 12px;
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
    font-size: 10px;
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
    line-height: 1.5;
  }
  @media (pointer: coarse) {
    button {
      min-height: 44px;
    }
    input[type='number'],
    input[type='text'],
    input[type='url'],
    select,
    textarea {
      font-size: 16px;
    }
  }
`;
