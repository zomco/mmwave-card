import { html } from 'lit';

/** Shared outlined radar mark. No SVG filters or document-global IDs. */
export const logoSvg = html`
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="var(--mmwave-ink)"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M20.3 8.5A9 9 0 1 1 15.5 3.7M16.6 10A5 5 0 1 1 14 7.4M12 12l8-8" />
    <circle cx="12" cy="12" r="1" fill="var(--mmwave-ink)" stroke="none" />
  </svg>
`;
