import { describe, it, expect } from 'vitest';
import { standingAreaFits } from '../src/utils/guided-regions';
const rectangle = [{x:50,y:50},{x:350,y:50},{x:350,y:350},{x:50,y:350}];
describe('guided standing area containment', () => {
 it('requires the whole circle inside room dimensions even without a polygon',()=>{
  expect(standingAreaFits({x:20,y:200},32,400,400,[])).toBe(false);
  expect(standingAreaFits({x:200,y:200},32,400,400,[])).toBe(true);
 });
 it('rejects outside centers and circles that cross a wall',()=>{
  expect(standingAreaFits({x:40,y:200},32,400,400,[rectangle])).toBe(false);
  expect(standingAreaFits({x:70,y:200},32,400,400,[rectangle])).toBe(false);
  expect(standingAreaFits({x:100,y:200},32,400,400,[rectangle])).toBe(true);
 });
 it('handles concave rooms, not just their bounding boxes',()=>{
  const l=[{x:0,y:0},{x:400,y:0},{x:400,y:150},{x:150,y:150},{x:150,y:400},{x:0,y:400}];
  expect(standingAreaFits({x:250,y:250},32,400,400,[l])).toBe(false);
  expect(standingAreaFits({x:130,y:160},32,400,400,[l])).toBe(false);
  expect(standingAreaFits({x:75,y:250},32,400,400,[l])).toBe(true);
 });
 it('allows separate radar boundaries, without an unconfigured radar bypassing them',()=>{
  const other=rectangle.map(p=>({x:p.x+400,y:p.y}));
  expect(standingAreaFits({x:600,y:200},32,800,400,[rectangle,other])).toBe(true);
  expect(standingAreaFits({x:400,y:200},32,800,400,[rectangle,[],other])).toBe(false);
 });
});
