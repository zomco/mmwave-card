import type { RadarModelAdapter } from '../models/base';
import type { MMWaveCardConfig } from '../types';

/**
 * Derive the device's entity prefix, e.g. `predny_radar` or `ld2460_living_room`,
 * so calibration entities like `number.<prefix>_mount_yaw` can be located.
 */
export function resolveDevicePrefix(
  adapter: RadarModelAdapter | undefined,
  config: MMWaveCardConfig | undefined,
): string {
  if (!config) return '';
  const schema = adapter?.getEntitySchema?.() ?? [];
  const usesTarget1X = schema.some((f) => f.key === 'target_1_x_entity');
  const usesX = schema.some((f) => f.key === 'x_entity');

  // 1. If this adapter uses multi-target (target_1_x_entity), prioritize target_1_x
  if (usesTarget1X) {
    const targetEntity = (config.target_1_x_entity as string) || '';
    const targetMatch = targetEntity.match(/^sensor\.(.+?)_target_\d+_x$/);
    if (targetMatch) return targetMatch[1];
  }

  // 2. If this adapter uses x_entity (e.g. r60abd1, ld6002), prioritize x_entity
  if (usesX) {
    const xEntity = (config.x_entity as string) || '';
    if (xEntity) {
      const match = xEntity.match(/^sensor\.(.+?)(_radar_x|_x)$/);
      if (match) return match[1];
      const parts = xEntity.split('.')[1]?.split('_') || [];
      return parts.slice(0, parts.length - 1).join('_');
    }
  }

  // 3. If 1-D ranging, use presence_entity
  if (adapter?.info?.is1DRanging) {
    const entity = config.presence_entity as string | undefined;
    const match = entity?.match(/^binary_sensor\.(.+)_presence$/);
    if (match) return match[1];
  }

  // 4. Try target_1_x_entity
  const targetEntity = (config.target_1_x_entity as string) || '';
  if (targetEntity) {
    const targetMatch = targetEntity.match(/^sensor\.(.+?)_target_\d+_x$/);
    if (targetMatch) return targetMatch[1];
  }

  // 5. Try frame_entity
  const frameEntity = (config.frame_entity as string) || '';
  if (frameEntity) {
    const frameMatch = frameEntity.match(/^sensor\.(.+?)_target_frame$/);
    if (frameMatch) return frameMatch[1];
  }

  // 6. Try presence_entity (skip if it is the r60abd1 default stub on a non-r60 model)
  const presenceEntity = (config.presence_entity as string) || '';
  const presenceMatch = presenceEntity.match(/^(?:binary_)?sensor\.(.+?)_presence$/);
  if (presenceMatch && (adapter?.info?.id === 'r60abd1' || presenceMatch[1] !== 'r60abd1')) {
    return presenceMatch[1];
  }

  // 7. Try x_entity (skip if it is the r60abd1 default stub on a non-r60 model)
  const xEntity = (config.x_entity as string) || '';
  if (xEntity && (adapter?.info?.id === 'r60abd1' || !xEntity.includes('r60abd1'))) {
    const match = xEntity.match(/^sensor\.(.+?)(_radar_x|_x)$/);
    if (match) return match[1];
    const parts = xEntity.split('.')[1]?.split('_') || [];
    return parts.slice(0, parts.length - 1).join('_');
  }

  if (presenceMatch) return presenceMatch[1];

  return '';
}
