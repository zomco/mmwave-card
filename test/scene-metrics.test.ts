import { describe, it, expect } from 'vitest';
import type { HomeAssistant } from 'custom-card-helpers';
import type { MMWaveCardConfig } from '../src/types';
import { getAdapter } from '../src/models';
import { readSceneMetrics } from '../src/utils/scene-metrics';
const config={heart_entity:'sensor.heart',breath_entity:'sensor.breath',gesture_entity:'sensor.gesture'} as MMWaveCardConfig;
const hass=(heart:string,breath:string,gesture='None')=>({states:{'sensor.heart':{state:heart},'sensor.breath':{state:breath},'sensor.gesture':{state:gesture}}}) as unknown as HomeAssistant;
describe('scene metrics',()=>{
 it('shows model capabilities and current rates',()=>{
  for(const model of ['ld6002','r60abd1']) expect(readSceneMetrics(hass('72','16'),config,getAdapter(model)!,'en').map(m=>m.value)).toEqual(['72','16']);
  expect(readSceneMetrics(hass('72','16'),config,getAdapter('ld2450')!,'en')).toEqual([]);
 });
 it('keeps unavailable or invalid rates distinct from a measurement',()=>{
  for(const value of ['unknown','unavailable','','NaN','Infinity','0','-1','72x']) expect(readSceneMetrics(hass(value,value),config,getAdapter('ld6002')!,'en').map(m=>m.value)).toEqual(['—','—']);
  expect(readSceneMetrics(undefined,undefined,getAdapter('r60abd1')!,'en').map(m=>m.value)).toEqual(['—','—']);
 });
 it('translates gestures without inventing a result for unavailable data',()=>{
  expect(readSceneMetrics(hass('0','0','Wave Right'),config,getAdapter('ld2450a')!,'zh-Hans')[0].value).toBe('向右挥手');
  expect(readSceneMetrics(hass('0','0','Wave Left'),config,getAdapter('ld2450a')!,'en')[0].value).toBe('Wave left');
  expect(readSceneMetrics(hass('0','0','unavailable'),config,getAdapter('ld2450a')!,'en')[0].value).toBe('—');
 });
});
