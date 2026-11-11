// @vitest-environment happy-dom
import { describe, expect, it, vi } from 'vitest';
import type { HomeAssistant } from 'custom-card-helpers';

// Lit element registration happens on import of the card module.
import '../src/mmwave-card';

const tag = 'mmwave-card';

/** Build a hass whose presence entity holds `state`. */
function hassWithPresence(state: string | undefined): HomeAssistant {
  const states: Record<string, unknown> = {
    'binary_sensor.r60abd1_presence':
      state === undefined ? undefined : { entity_id: 'binary_sensor.r60abd1_presence', state, attributes: {} },
    'sensor.r60abd1_x': { entity_id: 'sensor.r60abd1_x', state: '120', attributes: {} },
    'sensor.r60abd1_y': { entity_id: 'sensor.r60abd1_y', state: '150', attributes: {} },
    'sensor.r60abd1_z': { entity_id: 'sensor.r60abd1_z', state: '170', attributes: {} },
  };
  if (state === undefined) delete states['binary_sensor.r60abd1_presence'];
  return { states, language: 'zh-Hans', user: { is_admin: true } } as unknown as HomeAssistant;
}

const config = {
  type: 'custom:mmwave-card',
  radar_model: 'r60abd1',
  presence_entity: 'binary_sensor.r60abd1_presence',
  x_entity: 'sensor.r60abd1_x',
  y_entity: 'sensor.r60abd1_y',
  z_entity: 'sensor.r60abd1_z',
  room_w: 400,
  room_d: 350,
};

async function renderCard(hass: HomeAssistant) {
  const el = document.createElement(tag) as unknown as HTMLElement & {
    hass: unknown;
    setConfig: (c: unknown) => void;
  };
  el.setConfig(config);
  el.hass = hass;
  document.body.appendChild(el);
  // Lit upgrades asynchronously; two rAF plus a macrotask is enough for the
  // first render of this card in happy-dom.
  for (let i = 0; i < 8; i += 1) {
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    await new Promise((r) => setTimeout(r, 30));
    if ((el.shadowRoot?.textContent ?? '').length > 0) break;
  }
  return el;
}

function textOf(el: HTMLElement): string {
  const root = el.shadowRoot;
  if (!root) return '(no shadow root)';
  const own = root.textContent ?? '';
  const nested = [...root.querySelectorAll('*')].map((n) => ((n as HTMLElement).shadowRoot?.textContent ?? '')).join(' ');
  return own + ' ' + nested;
}

describe('presence validity through the real card', () => {

  it('shows data unavailable, not nobody, when the presence entity is missing or unavailable', async () => {
    const missing = await renderCard(hassWithPresence(undefined));
    expect(textOf(missing)).toContain('数据不可用');
    expect(textOf(missing)).not.toContain('无人');
    missing.remove();

    const unavailable = await renderCard(hassWithPresence('unavailable'));
    expect(textOf(unavailable)).toContain('数据不可用');
    expect(textOf(unavailable)).not.toContain('无人');
    unavailable.remove();

    const unknown = await renderCard(hassWithPresence('unknown'));
    expect(textOf(unknown)).toContain('数据不可用');
    expect(textOf(unknown)).not.toContain('无人');
    unknown.remove();
  });

  it('shows a hint to check bindings instead of waiting-for-target when data is unavailable', async () => {
    const el = await renderCard(hassWithPresence('unavailable'));
    const panel = el.shadowRoot?.querySelector('mmwave-live-panel');
    const panelText = (panel as HTMLElement | null)?.shadowRoot?.textContent ?? '';
    expect(panelText).toContain('检查实体绑定');
    expect(panelText).not.toContain('等待雷达检测到目标');
    el.remove();
  });

  it('recovers to a valid off → nobody and valid on → located target without a page reload', async () => {
    const el = await renderCard(hassWithPresence('unavailable'));
    expect(textOf(el)).toContain('数据不可用');

    el.hass = hassWithPresence('off');
    await new Promise((r) => setTimeout(r, 60));
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    expect(textOf(el)).toContain('无人');
    expect(textOf(el)).not.toContain('数据不可用');

    el.hass = hassWithPresence('on');
    await new Promise((r) => setTimeout(r, 60));
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    expect(textOf(el)).toContain('1 个目标');
    expect(textOf(el)).not.toContain('数据不可用');
    el.remove();
  });
});
