/**
 * RadarModelAdapter
 *
 * Every supported radar model must export a singleton that implements
 * this interface and register it in src/models/index.ts.
 *
 * The card core (mmwave-card.ts) and all panels interact exclusively
 * through this interface, so new models can be added without touching
 * any shared code.
 */

import type { HomeAssistant } from 'custom-card-helpers';
import type { RadarModelInfo, EntitySchemaField, RadarReading, MMWaveCardConfig, CalibrationConfig } from '../types';

export interface RadarModelAdapter {
  /** Static information about this model. */
  readonly info: RadarModelInfo;

  /**
   * Describe which entity fields this model expects in the card config.
   * Used by the editor to render the correct entity pickers.
   */
  getEntitySchema(): EntitySchemaField[];

  /**
   * Validate that all required entities exist in the card config.
   * Returns an array of human-readable error strings (empty = valid).
   */
  validateConfig(config: MMWaveCardConfig): string[];

  /**
   * Read the current sensor state from hass and return a model-agnostic
   * RadarReading.  Raw coordinates must be in the radar's local coordinate
   * system (cm, Y = forward, X = right, Z = away from antenna face).
   */
  readFromHass(hass: HomeAssistant, config: MMWaveCardConfig): RadarReading;

  /**
   * Return sensible default calibration values for this specific model
   * (e.g. typical installation height, FOV-based polygon).
   */
  getDefaultCalibration(): CalibrationConfig;
}
