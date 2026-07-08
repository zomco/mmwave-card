import { html } from 'lit';

export const logoSvg = html`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
  <path d="M 256 256 L 256 26 A 230 230 0 0 1 418.6 418.6 Z" fill="var(--mmwave-primary)" opacity="0.2" />
  <circle cx="256" cy="256" r="85" fill="none" stroke="var(--mmwave-primary)" stroke-width="24" />
  <circle cx="256" cy="256" r="145" fill="none" stroke="var(--mmwave-primary)" stroke-width="24" />
  <circle cx="256" cy="256" r="205" fill="none" stroke="var(--mmwave-primary)" stroke-width="24" />
  <line x1="256" y1="256" x2="358.5" y2="153.5" stroke="var(--mmwave-secondary)" stroke-width="12" stroke-linecap="round" />
  <path d="M 272.5 162.5 A 95 95 0 0 1 349.5 239.5" fill="none" stroke="var(--mmwave-secondary)" stroke-width="12" stroke-linecap="round" />
  <path d="M 279.4 123.1 A 135 135 0 0 1 388.9 232.6" fill="none" stroke="var(--mmwave-secondary)" stroke-width="12" stroke-linecap="round" />
  <circle cx="256" cy="256" r="45" fill="var(--mmwave-secondary)" />
  <circle cx="337.3" cy="174.7" r="16" fill="var(--mmwave-secondary)" />
</svg>
`;
