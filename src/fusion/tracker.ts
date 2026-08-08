import type { FusionSettings, FusionTarget } from '../types';

export interface FusionObservation {
  radarId: string;
  slot: number;
  timestamp: number;
  x: number;
  y: number;
  weight: number;
}

interface Cluster {
  observations: FusionObservation[];
  x: number;
  y: number;
  timestamp: number;
  sources: string[];
}

interface MutableTrack extends FusionTarget {
  updated_at: number;
  hits: number;
  confirmed: boolean;
  seenSources: Set<string>;
}

const uuid = () =>
  globalThis.crypto?.randomUUID?.().replaceAll('-', '') ??
  `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;

function minimumCostAssignment(costs: number[][]): Array<[number, number]> {
  if (!costs.length || !costs[0]?.length) return [];
  let matrix = costs.map((row) => [...row]);
  let rowCount = matrix.length;
  let columnCount = matrix[0].length;
  const transposed = rowCount > columnCount;
  if (transposed) {
    matrix = Array.from({ length: columnCount }, (_, column) => matrix.map((row) => row[column]));
    [rowCount, columnCount] = [columnCount, rowCount];
  }
  const rowPotential = Array(rowCount + 1).fill(0) as number[];
  const columnPotential = Array(columnCount + 1).fill(0) as number[];
  const columnMatch = Array(columnCount + 1).fill(0) as number[];
  const previousColumn = Array(columnCount + 1).fill(0) as number[];
  for (let row = 1; row <= rowCount; row++) {
    columnMatch[0] = row;
    let currentColumn = 0;
    const minimum = Array(columnCount + 1).fill(Number.POSITIVE_INFINITY) as number[];
    const used = Array(columnCount + 1).fill(false) as boolean[];
    do {
      used[currentColumn] = true;
      const currentRow = columnMatch[currentColumn];
      let delta = Number.POSITIVE_INFINITY;
      let nextColumn = 0;
      for (let column = 1; column <= columnCount; column++) {
        if (used[column]) continue;
        const reduced = matrix[currentRow - 1][column - 1] - rowPotential[currentRow] - columnPotential[column];
        if (reduced < minimum[column]) {
          minimum[column] = reduced;
          previousColumn[column] = currentColumn;
        }
        if (minimum[column] < delta) {
          delta = minimum[column];
          nextColumn = column;
        }
      }
      for (let column = 0; column <= columnCount; column++) {
        if (used[column]) {
          rowPotential[columnMatch[column]] += delta;
          columnPotential[column] -= delta;
        } else minimum[column] -= delta;
      }
      currentColumn = nextColumn;
    } while (columnMatch[currentColumn] !== 0);
    do {
      const nextColumn = previousColumn[currentColumn];
      columnMatch[currentColumn] = columnMatch[nextColumn];
      currentColumn = nextColumn;
    } while (currentColumn !== 0);
  }
  const result = columnMatch
    .map((matchedRow, column) => [matchedRow - 1, column - 1] as [number, number])
    .filter(([row], column) => column > 0 && row >= 0);
  return transposed ? result.map(([row, column]) => [column, row]) : result;
}

export class LocalFusionTracker {
  private tracks = new Map<string, MutableTrack>();
  private readonly associationGate: number;
  private readonly mergeGate: number;
  private readonly ttlMs: number;
  private readonly confirmHits: number;
  private readonly minConfirmSources: number;

  constructor(settings: FusionSettings = {}) {
    this.associationGate = Math.max(settings.association_gate_cm ?? 90, 10);
    this.mergeGate = Math.max(settings.merge_gate_cm ?? 70, 10);
    this.ttlMs = Math.max(settings.track_ttl_s ?? 1.2, 0.2) * 1000;
    this.confirmHits = Math.max(settings.confirm_hits ?? 2, 1);
    this.minConfirmSources = Math.max(settings.min_confirm_sources ?? 1, 1);
  }

  public reset() {
    this.tracks.clear();
  }

  public step(observations: FusionObservation[], now = Date.now()): FusionTarget[] {
    const predictionDt = new Map<string, number>();
    for (const track of this.tracks.values()) {
      const dt = Math.min(Math.max((now - track.updated_at) / 1000, 0), 0.5);
      track.x += track.vx * dt;
      track.y += track.vy * dt;
      track.updated_at = now;
      predictionDt.set(track.track_id, dt);
    }

    const clusters = this.cluster(observations);
    const tracks = [...this.tracks.values()];
    const trackCount = tracks.length;
    const clusterCount = clusters.length;
    const size = trackCount + clusterCount;
    const costs = Array.from({ length: size }, () => Array(size).fill(0) as number[]);
    for (let trackIndex = 0; trackIndex < trackCount; trackIndex++) {
      const track = tracks[trackIndex];
      const speed = Math.hypot(track.vx, track.vy);
      const gate = this.associationGate + speed * (predictionDt.get(track.track_id) ?? 0);
      clusters.forEach((cluster, clusterIndex) => {
        const distance = Math.hypot(track.x - cluster.x, track.y - cluster.y);
        costs[trackIndex][clusterIndex] = distance <= gate ? distance / gate : 4;
      });
      for (let column = clusterCount; column < size; column++) costs[trackIndex][column] = 1.05;
    }
    for (let row = trackCount; row < size; row++)
      for (let column = 0; column < clusterCount; column++) costs[row][column] = 1.05;

    const usedTracks = new Set<string>();
    const usedClusters = new Set<number>();
    for (const [trackIndex, clusterIndex] of minimumCostAssignment(costs)) {
      if (trackIndex >= trackCount || clusterIndex >= clusterCount || costs[trackIndex][clusterIndex] > 1) continue;
      const track = tracks[trackIndex];
      usedTracks.add(track.track_id);
      usedClusters.add(clusterIndex);
      const cluster = clusters[clusterIndex];
      const dt = Math.max(predictionDt.get(track.track_id) ?? 0.1, 0.05);
      const residualX = cluster.x - track.x;
      const residualY = cluster.y - track.y;
      const sourceBonus = Math.min(cluster.sources.length - 1, 3);
      const alpha = 0.56 + sourceBonus * 0.06;
      const beta = 0.1 + sourceBonus * 0.02;
      track.x += alpha * residualX;
      track.y += alpha * residualY;
      track.vx += (beta * residualX) / dt;
      track.vy += (beta * residualY) / dt;
      track.last_seen = cluster.timestamp;
      track.sources = cluster.sources;
      cluster.sources.forEach((source) => track.seenSources.add(source));
      track.hits += Math.max(cluster.sources.length, 1);
      track.confirmed = track.hits >= this.confirmHits && track.seenSources.size >= this.minConfirmSources;
      const confidenceCeiling = track.seenSources.size >= this.minConfirmSources ? 1 : 0.74;
      track.confidence = Math.min(confidenceCeiling, track.confidence + 0.1 + sourceBonus * 0.08);
    }

    for (const track of this.tracks.values()) {
      if (!usedTracks.has(track.track_id)) {
        track.sources = [];
        track.confidence = Math.max(0, track.confidence - 0.08);
      }
    }

    clusters.forEach((cluster, index) => {
      if (usedClusters.has(index)) return;
      const hits = Math.max(cluster.sources.length, 1);
      const track: MutableTrack = {
        track_id: uuid(),
        x: cluster.x,
        y: cluster.y,
        vx: 0,
        vy: 0,
        confidence: Math.min(0.9, 0.35 + cluster.sources.length * 0.18),
        sources: cluster.sources,
        started_at: cluster.timestamp,
        last_seen: cluster.timestamp,
        updated_at: now,
        hits,
        confirmed: hits >= this.confirmHits && cluster.sources.length >= this.minConfirmSources,
        seenSources: new Set(cluster.sources),
      };
      this.tracks.set(track.track_id, track);
    });

    for (const [trackId, track] of this.tracks) {
      if (now - track.last_seen > this.ttlMs) this.tracks.delete(trackId);
    }
    return [...this.tracks.values()]
      .filter((track) => track.confirmed)
      .map(({ updated_at: _u, hits: _h, confirmed: _c, seenSources, ...track }) => ({
        ...track,
        source_count: seenSources.size,
      }));
  }

  private cluster(observations: FusionObservation[]): Cluster[] {
    const clusters: Cluster[] = [];
    for (const observation of [...observations].sort((a, b) => b.weight - a.weight)) {
      let best: Cluster | undefined;
      let bestDistance = this.mergeGate;
      for (const cluster of clusters) {
        if (cluster.sources.includes(observation.radarId)) continue;
        const distance = Math.hypot(observation.x - cluster.x, observation.y - cluster.y);
        if (distance <= bestDistance) {
          best = cluster;
          bestDistance = distance;
        }
      }
      if (best) {
        best.observations.push(observation);
        this.recalculate(best);
      } else {
        clusters.push({
          observations: [observation],
          x: observation.x,
          y: observation.y,
          timestamp: observation.timestamp,
          sources: [observation.radarId],
        });
      }
    }
    return clusters;
  }

  private recalculate(cluster: Cluster) {
    const total = cluster.observations.reduce((sum, item) => sum + Math.max(item.weight, 0.01), 0);
    cluster.x = cluster.observations.reduce((sum, item) => sum + item.x * Math.max(item.weight, 0.01), 0) / total;
    cluster.y = cluster.observations.reduce((sum, item) => sum + item.y * Math.max(item.weight, 0.01), 0) / total;
    cluster.timestamp = Math.max(...cluster.observations.map((item) => item.timestamp));
    cluster.sources = [...new Set(cluster.observations.map((item) => item.radarId))];
  }
}
