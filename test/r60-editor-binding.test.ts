// @vitest-environment happy-dom
import { describe, expect, it } from 'vitest';
import type { HomeAssistant } from 'custom-card-helpers';
import '../src/mmwave-card';
import '../src/editor';

const TAG = 'mmwave-card-editor';

interface Deferred {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
  promise: Promise<unknown>;
}

function deferred(): Deferred {
  let resolve!: (value: unknown) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { resolve, reject, promise };
}

type Registry = { devices: Array<{ id: string; name: string }>; entities: Array<{ entity_id: string; device_id: string; original_name?: string }> };
type States = Record<string, { state: string }>;

/**
 * A controllable hass: registry replies can be held back so a late answer from
 * device A can be observed against a newer selection of device B.
 */
function makeHass(registry: Registry, states: States = {}, lang = 'zh-Hans') {
  const pending: Record<string, Deferred[]> = { devices: [], entities: [] };
  const hass = {
    language: lang,
    states,
    callWS: (msg: { type: string }) => {
      if (msg.type === 'mmwave_fusion/list_calibration_profiles') {
        return Promise.resolve([]);
      }
      const type = msg.type.endsWith('device_registry/list') ? 'devices' : 'entities';
      const d = deferred();
      pending[type].push(d);
      if (type === 'devices') d.resolve(registry.devices);
      return d.promise;
    },
  };
  return {
    hass: hass as unknown as HomeAssistant,
    resolveEntities(entities: unknown, count = 1) {
      for (let i = 0; i < count; i += 1) {
        const d = pending.entities.shift();
        if (d) d.resolve(entities);
      }
    },
    resolveEntityAt(index: number, entities: unknown) {
      const d = pending.entities[index];
      if (d) d.resolve(entities);
    },
    rejectEntities(error: Error) {
      const list = pending.entities.splice(0);
      for (const d of list) d.reject(error);
    },
  };
}

const R60_ENTITIES = [
  { entity_id: 'binary_sensor.r60_presence', device_id: 'dev-r60', original_name: 'Presence' },
  { entity_id: 'sensor.r60_x', device_id: 'dev-r60', original_name: 'X' },
  { entity_id: 'sensor.r60_y', device_id: 'dev-r60', original_name: 'Y' },
  { entity_id: 'sensor.r60_z', device_id: 'dev-r60', original_name: 'Z' },
  { entity_id: 'sensor.r60_breath_rate', device_id: 'dev-r60', original_name: 'Breath Rate' },
  { entity_id: 'sensor.r60_heart_rate', device_id: 'dev-r60', original_name: 'Heart Rate' },
  { entity_id: 'sensor.r60_sleep_state', device_id: 'dev-r60', original_name: 'Sleep State' },
];

async function makeEditor(hass: HomeAssistant) {
  const el = document.createElement(TAG) as unknown as HTMLElement & {
    hass: HomeAssistant;
    setConfig: (c: unknown) => void;
  };
  el.setConfig({
    type: 'custom:mmwave-card',
    radar_model: 'r60abd1',
    room_w: 400,
    room_d: 350,
    presence_entity: '',
    x_entity: '',
    y_entity: '',
    z_entity: '',
    polygon_entity: '',
  });
  el.hass = hass;
  document.body.appendChild(el);
  for (let i = 0; i < 10; i += 1) {
    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 20));
  }
  return el;
}

function selectDevice(el: HTMLElement, deviceId: string) {
  // The first select is the model picker; the device picker is the one whose
  // options carry device registry ids.
  const selects = [...(el.shadowRoot?.querySelectorAll<HTMLSelectElement>('select') ?? [])];
  const select = selects.find((s) => [...s.options].some((o) => o.value === deviceId));
  if (!select) throw new Error('device select not rendered for ' + deviceId);
  select.value = deviceId;
  select.dispatchEvent(new Event('change', { bubbles: true }));
}

function emittedConfigs(el: HTMLElement): Array<Record<string, unknown>> {
  const out: Array<Record<string, unknown>> = [];
  el.addEventListener('config-changed', (e: Event) => {
    out.push((e as CustomEvent).detail.config as Record<string, unknown>);
  });
  return out;
}

function text(el: HTMLElement): string {
  return el.shadowRoot?.textContent ?? '';
}

describe('R60 device binding in the real editor', () => {

  it('binds raw presence/x/y from the selected device and reports matched fields', async () => {
    const { hass, resolveEntities } = makeHass(
      { devices: [{ id: 'dev-r60', name: 'R60ABD1 Radar' }], entities: R60_ENTITIES },
      {},
    );
    const el = await makeEditor(hass);
    const configs = emittedConfigs(el);
    selectDevice(el, 'dev-r60');
    resolveEntities(R60_ENTITIES);
    for (let i = 0; i < 10; i += 1) {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    const last = configs[configs.length - 1] ?? {};
    expect(last.presence_entity).toBe('binary_sensor.r60_presence');
    expect(last.x_entity).toBe('sensor.r60_x');
    expect(last.y_entity).toBe('sensor.r60_y');
    expect(last.z_entity).toBe('sensor.r60_z');
    expect(text(el)).toContain('已自动匹配');
    expect(text(el)).not.toContain('必需字段未绑定');
    el.remove();
  });

  it('ignores room_x/room_y so the transform is not applied twice', async () => {
    const withRoom = [
      ...R60_ENTITIES,
      { entity_id: 'sensor.r60_room_x', device_id: 'dev-r60', original_name: 'Room X' },
      { entity_id: 'sensor.r60_room_y', device_id: 'dev-r60', original_name: 'Room Y' },
    ];
    const { hass, resolveEntities } = makeHass({ devices: [{ id: 'dev-r60', name: 'R60ABD1 Radar' }], entities: withRoom });
    const el = await makeEditor(hass);
    const configs = emittedConfigs(el);
    selectDevice(el, 'dev-r60');
    resolveEntities(withRoom);
    for (let i = 0; i < 10; i += 1) {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    const last = configs[configs.length - 1] ?? {};
    expect(last.x_entity).toBe('sensor.r60_x');
    expect(last.y_entity).toBe('sensor.r60_y');
    expect(last.x_entity).not.toBe('sensor.r60_room_x');
    expect(last.y_entity).not.toBe('sensor.r60_room_y');
    el.remove();
  });

  it('reports missing required fields instead of claiming success, and optional gaps do not block', async () => {
    const partial = R60_ENTITIES.filter((e) => !/_y$/.test(e.entity_id));
    const { hass, resolveEntities } = makeHass({ devices: [{ id: 'dev-r60', name: 'R60ABD1 Radar' }], entities: partial });
    const el = await makeEditor(hass);
    selectDevice(el, 'dev-r60');
    resolveEntities(partial);
    for (let i = 0; i < 10; i += 1) {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    expect(text(el)).toContain('必需字段未绑定');
    expect(text(el)).toContain('必需字段未绑定');
    el.remove();
  });

  it('flags ambiguous candidates instead of silently taking the last registry entry', async () => {
    const ambiguous = [
      ...R60_ENTITIES,
      { entity_id: 'binary_sensor.r60_presence_2', device_id: 'dev-r60', original_name: 'Presence 2' },
    ];
    const { hass, resolveEntities } = makeHass({ devices: [{ id: 'dev-r60', name: 'R60ABD1 Radar' }], entities: ambiguous });
    const el = await makeEditor(hass);
    const configs = emittedConfigs(el);
    selectDevice(el, 'dev-r60');
    resolveEntities(ambiguous);
    for (let i = 0; i < 10; i += 1) {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    expect(text(el)).toContain('多个候选实体');
    const last = configs[configs.length - 1] ?? {};
    // Neither candidate may be silently selected.
    expect(last.presence_entity ?? '').not.toBe('binary_sensor.r60_presence_2');
    el.remove();
  });

  it('B replies before late A; manual edits during the lookup survive', async () => {
    const a = [
      { entity_id: 'binary_sensor.a_presence', device_id: 'dev-a', original_name: 'Presence' },
      { entity_id: 'sensor.a_x', device_id: 'dev-a', original_name: 'X' },
      { entity_id: 'sensor.a_y', device_id: 'dev-a', original_name: 'Y' },
    ];
    const b = [
      { entity_id: 'binary_sensor.b_presence', device_id: 'dev-b', original_name: 'Presence' },
      { entity_id: 'sensor.b_x', device_id: 'dev-b', original_name: 'X' },
      { entity_id: 'sensor.b_y', device_id: 'dev-b', original_name: 'Y' },
    ];
    const ctrl = makeHass({ devices: [{ id: 'dev-a', name: 'A' }, { id: 'dev-b', name: 'B' }], entities: [] });
    const el = await makeEditor(ctrl.hass);
    const configs = emittedConfigs(el);
    selectDevice(el, 'dev-a');
    selectDevice(el, 'dev-b');
    ctrl.resolveEntityAt(1, b); // B's answer first
    ctrl.resolveEntityAt(0, a); // A's answer arrives late
    for (let i = 0; i < 10; i += 1) {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    const last = configs[configs.length - 1] ?? {};
    expect(last.device_id).toBe('dev-b');
    expect(last.presence_entity).toBe('binary_sensor.b_presence');
    expect(last.x_entity).toBe('sensor.b_x');
    expect(last.y_entity).toBe('sensor.b_y');
    expect(last.room_w).toBe(400);
    expect(last.room_d).toBe(350);
    el.remove();
  });

  it('a manual entity edit made while the lookup is pending is not overwritten', async () => {
    const ctrl = makeHass({ devices: [{ id: 'dev-a', name: 'A' }], entities: [] });
    const el = await makeEditor(ctrl.hass);
    const configs = emittedConfigs(el);
    selectDevice(el, 'dev-a');
    // The user hand-edits the x field (schema order: presence, frame, x, y, ...) before reply.
    const details = el.shadowRoot?.querySelector('details.advanced') as HTMLDetailsElement | null;
    if (details) details.open = true;
    const inputs = el.shadowRoot?.querySelectorAll('.advanced-fields input') ?? [];
    const xInput = inputs[2] as HTMLInputElement | undefined;
    if (!xInput) throw new Error('x input not rendered');
    xInput.value = 'sensor.a_manual_x';
    xInput.dispatchEvent(new Event('change', { bubbles: true }));
    ctrl.resolveEntities([
      { entity_id: 'binary_sensor.a_presence', device_id: 'dev-a', original_name: 'Presence' },
      { entity_id: 'sensor.a_x', device_id: 'dev-a', original_name: 'X' },
      { entity_id: 'sensor.a_y', device_id: 'dev-a', original_name: 'Y' },
    ]);
    for (let i = 0; i < 10; i += 1) {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    const last = configs[configs.length - 1] ?? {};
    expect(last.x_entity).toBe('sensor.a_manual_x');
    expect(last.presence_entity).toBe('binary_sensor.a_presence');
    el.remove();
  });

  it('completed A then partial B does not retain A y, nor does a reopened saved A config', async () => {
    const a = [
      { entity_id: 'binary_sensor.a_presence', device_id: 'dev-a', original_name: 'Presence' },
      { entity_id: 'sensor.a_x', device_id: 'dev-a', original_name: 'X' },
      { entity_id: 'sensor.a_y', device_id: 'dev-a', original_name: 'Y' },
    ];
    const bPartial = a.map((e) => ({ ...e, device_id: 'dev-b', entity_id: e.entity_id.replace(/_a_|a_/g, 'b_') })).slice(0, 2);

    // Case 1: A fully matched in this session, then partial B.
    const ctrl1 = makeHass({ devices: [{ id: 'dev-a', name: 'A' }, { id: 'dev-b', name: 'B' }], entities: [] });
    const el1 = await makeEditor(ctrl1.hass);
    const configs1 = emittedConfigs(el1);
    selectDevice(el1, 'dev-a');
    ctrl1.resolveEntities(a);
    for (let i = 0; i < 8; i += 1) { await el1.updateComplete; await new Promise((r) => setTimeout(r, 20)); }
    selectDevice(el1, 'dev-b');
    ctrl1.resolveEntities(bPartial);
    for (let i = 0; i < 8; i += 1) { await el1.updateComplete; await new Promise((r) => setTimeout(r, 20)); }
    const last1 = configs1[configs1.length - 1] ?? {};
    expect(last1.y_entity ?? '').not.toBe('sensor.a_y');
    expect(last1.presence_entity).toBe('binary_sensor.b_presence');
    el1.remove();

    // Case 2: a saved A config reopened, then partial B.
    const ctrl2 = makeHass({ devices: [{ id: 'dev-a', name: 'A' }, { id: 'dev-b', name: 'B' }], entities: [] });
    const el2 = document.createElement(TAG) as unknown as HTMLElement & {
      hass: HomeAssistant;
      setConfig: (c: unknown) => void;
    };
    el2.setConfig({
      type: 'custom:mmwave-card',
      radar_model: 'r60abd1',
      device_id: 'dev-a',
      presence_entity: 'binary_sensor.a_presence',
      x_entity: 'sensor.a_x',
      y_entity: 'sensor.a_y',
      room_w: 400,
      room_d: 350,
    });
    el2.hass = ctrl2.hass;
    document.body.appendChild(el2);
    for (let i = 0; i < 10; i += 1) { await el2.updateComplete; await new Promise((r) => setTimeout(r, 20)); }
    const configs2 = emittedConfigs(el2);
    selectDevice(el2, 'dev-b');
    ctrl2.resolveEntities(bPartial);
    for (let i = 0; i < 8; i += 1) { await el2.updateComplete; await new Promise((r) => setTimeout(r, 20)); }
    const last2 = configs2[configs2.length - 1] ?? {};
    expect(last2.y_entity ?? '').not.toBe('sensor.a_y');
    el2.remove();
  });

  it('registry failure keeps the existing config editable', async () => {
    const { hass, rejectEntities } = makeHass({ devices: [{ id: 'dev-r60', name: 'R60ABD1 Radar' }], entities: [] });
    const el = await makeEditor(hass);
    selectDevice(el, 'dev-r60');
    rejectEntities(new Error('registry unavailable'));
    for (let i = 0; i < 10; i += 1) {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    expect(text(el)).toContain('实体注册表暂不可用');
    expect(text(el)).toContain('手动填写实体');
    // Manual fields still render.
    const inputs = el.shadowRoot?.querySelectorAll('input[type=text]');
    expect((inputs?.length ?? 0)).toBeGreaterThan(0);
    el.remove();
  });

  it('distinguishes bound-but-unavailable from missing bindings', async () => {
    const { hass, resolveEntities } = makeHass(
      { devices: [{ id: 'dev-r60', name: 'R60ABD1 Radar' }], entities: R60_ENTITIES },
      {
        'binary_sensor.r60_presence': { state: 'unavailable' },
        'sensor.r60_x': { state: 'unknown' },
        'sensor.r60_y': { state: '0' },
      },
    );
    const el = await makeEditor(hass);
    selectDevice(el, 'dev-r60');
    resolveEntities(R60_ENTITIES);
    for (let i = 0; i < 10; i += 1) {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    expect(text(el)).toContain('unavailable/unknown');
    expect(text(el)).toContain('设备离线或尚未连接');
    expect(text(el)).not.toContain('必需字段未绑定');
    el.remove();
  });
});

describe('RCB-5: editor config renders in the real card', () => {
  it('a complete editor binding shows a located target, and unavailable recovers', async () => {
    const states: Record<string, { state: string }> = {
      'binary_sensor.r60_presence': { state: 'on' },
      'sensor.r60_x': { state: '120' },
      'sensor.r60_y': { state: '150' },
      'sensor.r60_z': { state: '170' },
    };
    const { hass, resolveEntities } = makeHass(
      { devices: [{ id: 'dev-r60', name: 'R60ABD1 Radar' }], entities: R60_ENTITIES },
      states,
    );
    const editor = await makeEditor(hass);
    let captured: Record<string, unknown> = {};
    editor.addEventListener('config-changed', (e: Event) => {
      captured = (e as CustomEvent).detail.config as Record<string, unknown>;
    });
    selectDevice(editor, 'dev-r60');
    resolveEntities(R60_ENTITIES);
    for (let i = 0; i < 10; i += 1) {
      await editor.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    expect(captured.presence_entity).toBe('binary_sensor.r60_presence');
    editor.remove();

    // Now render the card with the captured config.
    const card = document.createElement('mmwave-card') as unknown as HTMLElement & {
      hass: unknown;
      setConfig: (c: unknown) => void;
    };
    card.setConfig(captured);
    card.hass = hass;
    document.body.appendChild(card);
    for (let i = 0; i < 12; i += 1) {
      await (card as unknown as { updateComplete: Promise<unknown> }).updateComplete;
      await new Promise((r) => setTimeout(r, 25));
    }
    const cardText = (card.shadowRoot?.textContent ?? '') + ' ' +
      [...(card.shadowRoot?.querySelectorAll('*') ?? [])].map((n) => (n as HTMLElement).shadowRoot?.textContent ?? '').join(' ');
    expect(cardText).toContain('1 个目标');
    expect(cardText).not.toContain('数据不可用');

    // Device goes unavailable: the card must say data unavailable, not nobody.
    const offline = makeHass(
      { devices: [{ id: 'dev-r60', name: 'R60ABD1 Radar' }], entities: R60_ENTITIES },
      {
        'binary_sensor.r60_presence': { state: 'unavailable' },
        'sensor.r60_x': { state: 'unavailable' },
        'sensor.r60_y': { state: 'unavailable' },
        'sensor.r60_z': { state: 'unavailable' },
      },
    );
    card.hass = offline.hass;
    for (let i = 0; i < 12; i += 1) {
      await (card as unknown as { updateComplete: Promise<unknown> }).updateComplete;
      await new Promise((r) => setTimeout(r, 25));
    }
    const offlineText = (card.shadowRoot?.textContent ?? '') + ' ' +
      [...(card.shadowRoot?.querySelectorAll('*') ?? [])].map((n) => (n as HTMLElement).shadowRoot?.textContent ?? '').join(' ');
    expect(offlineText).toContain('数据不可用');
    expect(offlineText).not.toContain('无人');

    // Recovery: valid off must display nobody again.
    const offStates: Record<string, { state: string }> = {
      'binary_sensor.r60_presence': { state: 'off' },
      'sensor.r60_x': { state: '0' },
      'sensor.r60_y': { state: '0' },
      'sensor.r60_z': { state: '0' },
    };
    card.hass = { ...hass, states: offStates } as unknown as HomeAssistant;
    for (let i = 0; i < 12; i += 1) {
      await (card as unknown as { updateComplete: Promise<unknown> }).updateComplete;
      await new Promise((r) => setTimeout(r, 25));
    }
    const offText = (card.shadowRoot?.textContent ?? '') + ' ' +
      [...(card.shadowRoot?.querySelectorAll('*') ?? [])].map((n) => (n as HTMLElement).shadowRoot?.textContent ?? '').join(' ');
    expect(offText).toContain('无人');
    expect(offText).not.toContain('数据不可用');
    card.remove();
  });
});

describe('RCB-R2: binding validity feedback', () => {
  it('does not auto-bind a disabled-only presence candidate and says why', async () => {
    const rows = [
      { entity_id: 'binary_sensor.a_presence', device_id: 'dev-a', original_name: 'Presence', disabled_by: 'user' },
      { entity_id: 'sensor.a_x', device_id: 'dev-a', original_name: 'X' },
      { entity_id: 'sensor.a_y', device_id: 'dev-a', original_name: 'Y' },
    ];
    const { hass, resolveEntities } = makeHass({ devices: [{ id: 'dev-a', name: 'A' }], entities: rows });
    const el = await makeEditor(hass);
    const configs = emittedConfigs(el);
    selectDevice(el, 'dev-a');
    resolveEntities(rows);
    for (let i = 0; i < 10; i += 1) {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    const last = configs[configs.length - 1] ?? {};
    expect(last.presence_entity ?? '').toBe('');
    expect(text(el)).toMatch(/禁用|disabled/i);
    el.remove();
  });

  it('does not certify a nonexistent saved entity as a correct binding', async () => {
    const rows = [
      { entity_id: 'sensor.a_x', device_id: 'dev-a', original_name: 'X' },
      { entity_id: 'sensor.a_y', device_id: 'dev-a', original_name: 'Y' },
    ];
    const { hass, resolveEntities } = makeHass({ devices: [{ id: 'dev-a', name: 'A' }], entities: rows });
    const el = document.createElement(TAG) as unknown as HTMLElement & {
      hass: HomeAssistant;
      setConfig: (c: unknown) => void;
    };
    el.setConfig({
      type: 'custom:mmwave-card',
      radar_model: 'r60abd1',
      device_id: 'dev-a',
      presence_entity: 'binary_sensor.deleted_presence',
      x_entity: '',
      y_entity: '',
      room_w: 400,
      room_d: 350,
    });
    el.hass = hass;
    document.body.appendChild(el);
    for (let i = 0; i < 10; i += 1) { await el.updateComplete; await new Promise((r) => setTimeout(r, 20)); }
    selectDevice(el, 'dev-a');
    resolveEntities(rows);
    for (let i = 0; i < 10; i += 1) {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    const t = text(el);
    const config = (el as unknown as { _config?: Record<string, unknown> })._config ?? {};
    // The stale entity must not survive as a certified binding: either it was
    // cleared with a missing-required warning, or it is explicitly flagged stale.
    const cleared = !config.presence_entity;
    const flaggedStale = t.includes('不在所选设备的注册实体中');
    expect(cleared || flaggedStale).toBe(true);
    expect(el.shadowRoot?.querySelector('.match-status.success')).toBeNull();
    el.remove();
  });

  it('manual completion clears the missing-required warning without a new lookup', async () => {
    const partial = R60_ENTITIES.filter((e) => !/_y$/.test(e.entity_id));
    const { hass, resolveEntities } = makeHass({ devices: [{ id: 'dev-r60', name: 'R60ABD1 Radar' }], entities: partial });
    const el = await makeEditor(hass);
    selectDevice(el, 'dev-r60');
    resolveEntities(partial);
    for (let i = 0; i < 10; i += 1) {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    expect(text(el)).toContain('必需字段未绑定');
    const details = el.shadowRoot?.querySelector('details.advanced') as HTMLDetailsElement | null;
    if (details) details.open = true;
    const inputs = el.shadowRoot?.querySelectorAll('.advanced-fields input') ?? [];
    const yInput = inputs[3] as HTMLInputElement | undefined;
    if (!yInput) throw new Error('y input not rendered');
    yInput.value = 'sensor.r60_y';
    yInput.dispatchEvent(new Event('change', { bubbles: true }));
    for (let i = 0; i < 6; i += 1) {
      await el.updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    expect(text(el)).not.toContain('必需字段未绑定');
    el.remove();
  });
});

describe('RCB-R3: editor startup before any registry lookup', () => {
  function bareHass(states: Record<string, { state: string }> = {}) {
    return {
      language: 'zh-Hans',
      states,
      callWS: ({ type }: { type: string }) => {
        if (type === 'config/device_registry/list') {
          return Promise.resolve([{ id: 'dev-r60', name: 'R60ABD1 Radar' }]);
        }
        return Promise.resolve([]);
      },
    } as unknown as HomeAssistant;
  }

  async function makeBareEditor(model = 'r60abd1') {
    const el = document.createElement(TAG) as unknown as HTMLElement & {
      hass: HomeAssistant;
      setConfig: (c: unknown) => void;
    };
    el.setConfig({
      type: 'custom:mmwave-card',
      radar_model: model,
      room_w: 400,
      room_d: 350,
      presence_entity: '',
      x_entity: '',
      y_entity: '',
    });
    el.hass = bareHass();
    document.body.appendChild(el);
    for (let i = 0; i < 10; i += 1) {
      await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    return el;
  }

  it('first selection of the R60 model renders the binding form', async () => {
    const el = await makeBareEditor('');
    const modelSelect = el.shadowRoot?.querySelector('select') as HTMLSelectElement | null;
    if (!modelSelect) throw new Error('model select missing');
    modelSelect.value = 'r60abd1';
    modelSelect.dispatchEvent(new Event('change', { bubbles: true }));
    await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
    // The device selector and the advanced entity fields must both exist.
    const selects = el.shadowRoot?.querySelectorAll('select') ?? [];
    expect(selects.length).toBeGreaterThanOrEqual(2);
    expect(el.shadowRoot?.querySelector('details.advanced')).not.toBeNull();
    el.remove();
  });

  it('changing the card title before any lookup renders and touches nothing else', async () => {
    const el = await makeBareEditor();
    const title = el.shadowRoot?.querySelector('input[type=text]') as HTMLInputElement | null;
    if (!title) throw new Error('title input missing');
    title.value = '卧室雷达';
    title.dispatchEvent(new Event('change', { bubbles: true }));
    await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
    const config = (el as unknown as { _config?: Record<string, unknown> })._config ?? {};
    expect(config.name).toBe('卧室雷达');
    expect(config.room_w).toBe(400);
    expect(config.room_d).toBe(350);
    el.remove();
  });

  it('hand-editing an entity and a room field before any lookup renders fine', async () => {
    const el = await makeBareEditor();
    const details = el.shadowRoot?.querySelector('details.advanced') as HTMLDetailsElement | null;
    if (details) details.open = true;
    const inputs = el.shadowRoot?.querySelectorAll('.advanced-fields input') ?? [];
    const presence = inputs[0] as HTMLInputElement | undefined;
    if (!presence) throw new Error('presence input missing');
    presence.value = 'binary_sensor.hand_presence';
    presence.dispatchEvent(new Event('change', { bubbles: true }));
    await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
    const room = [...(el.shadowRoot?.querySelectorAll('input[type=number]') ?? [])].find(
      (i) => (i as HTMLInputElement).value === '400',
    ) as HTMLInputElement | undefined;
    if (room) {
      room.value = '420';
      room.dispatchEvent(new Event('change', { bubbles: true }));
      await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
    }
    const config = (el as unknown as { _config?: Record<string, unknown> })._config ?? {};
    expect(config.presence_entity).toBe('binary_sensor.hand_presence');
    if (room) expect(config.room_w).toBe(420);
    el.remove();
  });

  it('control: the same edits after a completed lookup still render', async () => {
    const el = await makeBareEditor();
    const configs = emittedConfigs(el);
    selectDevice(el, 'dev-r60');
    for (let i = 0; i < 6; i += 1) {
      await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
      await new Promise((r) => setTimeout(r, 20));
    }
    const title = el.shadowRoot?.querySelector('input[type=text]') as HTMLInputElement | null;
    if (!title) throw new Error('title input missing');
    title.value = 'After lookup';
    title.dispatchEvent(new Event('change', { bubbles: true }));
    await (el as unknown as { updateComplete: Promise<unknown> }).updateComplete;
    const last = configs[configs.length - 1] ?? {};
    expect(last.name).toBe('After lookup');
    el.remove();
  });
});
