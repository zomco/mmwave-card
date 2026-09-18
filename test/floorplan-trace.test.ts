import { describe, it, expect } from 'vitest';
import { buildEdges, nearestEdge } from '../src/utils/floorplan-trace';
describe('wall tracing', () => {
  it('snaps to a contrasting wall, leaves distant points alone', () => {
    const data = new Uint8ClampedArray(40 * 40 * 4).fill(255);
    for (let y=0;y<40;y++) for(let x=18;x<=21;x++) {
      const i=(y*40+x)*4; data[i]=data[i+1]=data[i+2]=0;
    }
    const map=buildEdges(data,40,40);
    expect(nearestEdge(map,{x:15,y:20},5)).toEqual({x:17,y:20});
    expect(nearestEdge(map,{x:5,y:20},5)).toBeUndefined();
  });
  it('does not treat transparent pixels or a blank image as walls', () => {
    const data=new Uint8ClampedArray(20*20*4);
    expect(nearestEdge(buildEdges(data,20,20),{x:10,y:10},8)).toBeUndefined();
    data.fill(255);
    expect(nearestEdge(buildEdges(data,20,20),{x:10,y:10},8)).toBeUndefined();
  });
});
