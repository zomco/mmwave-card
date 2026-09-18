import type { HomeAssistant } from 'custom-card-helpers';
import type { RadarModelAdapter } from '../models';
import type { MMWaveCardConfig } from '../types';
import { localize } from '../localize/localize';

export interface SceneMetric {
  key: string;
  label: string;
  value: string;
  unit: string;
  icon: string;
}
export function readSceneMetrics(
  hass: HomeAssistant | undefined,
  config: MMWaveCardConfig | undefined,
  adapter: RadarModelAdapter,
  lang: string,
): SceneMetric[] {
  const t = (key: string) => localize('metrics.' + key, lang);
  const state = (key: string) => {
    const id = config?.[key];
    return typeof id === 'string' ? hass?.states[id] : undefined;
  };
  const metrics: SceneMetric[] = [];
  for (const [supported, key, label, icon] of [
    [adapter.info.hasHeartRate, 'heart_entity', 'heart', 'mdi:heart-pulse'],
    [adapter.info.hasBreathing, 'breath_entity', 'breath', 'mdi:lungs'],
  ] as const) {
    if (!supported) continue;
    const sensor = state(key),
      raw = sensor?.state?.trim();
    const value = raw ? Number(raw) : NaN;
    metrics.push({
      key,
      label: t(label),
      value: Number.isFinite(value) && value > 0 ? String(Math.round(value * 10) / 10) : '—',
      unit: t('per_minute'),
      icon,
    });
  }
  if (adapter.getEntitySchema().some((field) => field.key === 'gesture_entity')) {
    const raw = state('gesture_entity')?.state;
    const known: Record<string, string> = { None: 'none', 'Wave Right': 'right', 'Wave Left': 'left' };
    const value = !raw || ['unknown', 'unavailable'].includes(raw) ? '—' : known[raw] ? t(known[raw]) : raw;
    metrics.push({ key: 'gesture_entity', label: t('gesture'), value, unit: '', icon: 'mdi:hand-wave' });
  }
  return metrics;
}
