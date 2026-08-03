import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { CalibrationConfig } from '../types';
import type { RadarModelAdapter } from '../models';
import { eventToCanvasCssPt, setupCanvas } from '../utils/canvas';

interface Point2 {
  x: number;
  y: number;
}

interface Point3 {
  x: number;
  y: number;
  z: number;
}

interface SceneMetrics {
  W: number;
  H: number;
  floorW: number;
  floorH: number;
  floorTop: number;
  verticalH: number;
  roomW: number;
  roomD: number;
  zMax: number;
}

type DragMode = 'position' | 'height' | 'yaw' | 'pitch' | 'roll';

interface DragState {
  mode: DragMode;
  startX: number;
  startY: number;
  startValue: number;
}

const HANDLE_COLORS: Record<DragMode, string> = {
  position: '#03a9f4',
  height: '#00a878',
  yaw: '#ff9800',
  pitch: '#7e57c2',
  roll: '#ec407a',
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const radians = (degrees: number) => (degrees * Math.PI) / 180;
const degrees = (angle: number) => (angle * 180) / Math.PI;
const snap = (value: number, step: number) => Math.round(value / step) * step;

@customElement('mmwave-installation-3d')
export class Installation3D extends LitElement {
  @property({ attribute: false }) adapter!: RadarModelAdapter;
  @property({ attribute: false }) calibration!: CalibrationConfig;
  @property({ attribute: false }) lang = 'en';
  @property({ type: Number }) roomW = 400;
  @property({ type: Number }) roomD = 350;
  @property({ type: Number }) maxRangeM?: number;

  @query('#installation-cv') private _cv?: HTMLCanvasElement;
  private _handles = new Map<DragMode, Point2>();
  private _drag?: DragState;
  private _resizeObserver?: ResizeObserver;
  private _drawRaf = 0;

  private get _isZh() {
    return this.lang.toLowerCase().startsWith('zh');
  }

  private _label(zh: string, en: string) {
    return this._isZh ? zh : en;
  }

  protected firstUpdated() {
    if (this._cv) {
      this._resizeObserver = new ResizeObserver(() => this._scheduleDraw());
      this._resizeObserver.observe(this._cv);
    }
    this._scheduleDraw();
  }

  protected updated() {
    this._scheduleDraw();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    cancelAnimationFrame(this._drawRaf);
  }

  private _scheduleDraw() {
    cancelAnimationFrame(this._drawRaf);
    this._drawRaf = requestAnimationFrame(() => this._draw());
  }

  private _scene(): SceneMetrics {
    const W = this._cv?.offsetWidth || 420;
    const H = clamp(Math.round(W * 0.7), 260, 330);
    return {
      W,
      H,
      floorW: Math.max(180, W - 72),
      floorH: Math.min(104, H * 0.32),
      floorTop: H * 0.48,
      verticalH: H * 0.36,
      roomW: this.calibration?.room_w ?? this.roomW,
      roomD: this.calibration?.room_d ?? this.roomD,
      zMax: 400,
    };
  }

  private _project(point: Point3, scene: SceneMetrics): Point2 {
    const nx = point.x / scene.roomW;
    const ny = point.y / scene.roomD;
    const nz = point.z / scene.zMax;
    return {
      x: scene.W / 2 + (nx - ny) * (scene.floorW / 2),
      y: scene.floorTop + (nx + ny) * (scene.floorH / 2) - nz * scene.verticalH,
    };
  }

  private _unproject(point: Point2, z: number, scene: SceneMetrics): Point2 {
    const horizontal = (point.x - scene.W / 2) / (scene.floorW / 2);
    const depth = (point.y + (z / scene.zMax) * scene.verticalH - scene.floorTop) / (scene.floorH / 2);
    return {
      x: ((horizontal + depth) / 2) * scene.roomW,
      y: ((depth - horizontal) / 2) * scene.roomD,
    };
  }

  private _polygon(ctx: CanvasRenderingContext2D, points: Point2[]) {
    ctx.beginPath();
    points.forEach((point, index) => (index === 0 ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y)));
    ctx.closePath();
  }

  private _line(ctx: CanvasRenderingContext2D, from: Point2, to: Point2) {
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }

  private _drawHandle(ctx: CanvasRenderingContext2D, mode: DragMode, point: Point2, label: string) {
    this._handles.set(mode, point);
    ctx.save();
    ctx.shadowColor = HANDLE_COLORS[mode];
    ctx.shadowBlur = this._drag?.mode === mode ? 14 : 7;
    ctx.beginPath();
    ctx.arc(point.x, point.y, this._drag?.mode === mode ? 9 : 7, 0, Math.PI * 2);
    ctx.fillStyle = HANDLE_COLORS[mode];
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.font = 'bold 9px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = HANDLE_COLORS[mode];
    ctx.fillText(label, point.x, point.y - 11);
    ctx.restore();
  }

  private _draw() {
    const cv = this._cv;
    if (!cv || !this.calibration || cv.offsetWidth === 0) return;

    const scene = this._scene();
    const ctx = setupCanvas(cv, scene.H);
    const styles = getComputedStyle(this);
    const textColor = styles.getPropertyValue('--primary-text-color').trim() || '#374151';
    const secondaryColor = styles.getPropertyValue('--secondary-text-color').trim() || '#6b7280';
    const c = this.calibration;
    const floor = [
      this._project({ x: 0, y: 0, z: 0 }, scene),
      this._project({ x: scene.roomW, y: 0, z: 0 }, scene),
      this._project({ x: scene.roomW, y: scene.roomD, z: 0 }, scene),
      this._project({ x: 0, y: scene.roomD, z: 0 }, scene),
    ];
    const ceilingBack = [
      this._project({ x: 0, y: 0, z: scene.zMax }, scene),
      this._project({ x: scene.roomW, y: 0, z: scene.zMax }, scene),
    ];

    ctx.clearRect(0, 0, scene.W, scene.H);
    this._handles.clear();

    // Back walls provide depth while keeping the floor unobstructed for dragging.
    ctx.save();
    this._polygon(ctx, [floor[0], floor[1], ceilingBack[1], ceilingBack[0]]);
    ctx.fillStyle = 'rgba(3,169,244,.035)';
    ctx.fill();
    this._polygon(ctx, [
      floor[0],
      floor[3],
      this._project({ x: 0, y: scene.roomD, z: scene.zMax }, scene),
      ceilingBack[0],
    ]);
    ctx.fillStyle = 'rgba(11,130,92,.035)';
    ctx.fill();
    ctx.restore();

    this._polygon(ctx, floor);
    ctx.fillStyle = 'rgba(11,130,92,.09)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(11,130,92,.55)';
    ctx.lineWidth = 1.4;
    ctx.stroke();

    ctx.save();
    ctx.strokeStyle = secondaryColor;
    ctx.globalAlpha = 0.14;
    ctx.lineWidth = 0.8;
    for (let step = 0.25; step < 1; step += 0.25) {
      this._line(
        ctx,
        this._project({ x: scene.roomW * step, y: 0, z: 0 }, scene),
        this._project({ x: scene.roomW * step, y: scene.roomD, z: 0 }, scene),
      );
      this._line(
        ctx,
        this._project({ x: 0, y: scene.roomD * step, z: 0 }, scene),
        this._project({ x: scene.roomW, y: scene.roomD * step, z: 0 }, scene),
      );
    }
    ctx.restore();

    // Room verticals and axis labels.
    ctx.save();
    ctx.strokeStyle = secondaryColor;
    ctx.globalAlpha = 0.25;
    ctx.setLineDash([3, 4]);
    for (const corner of [
      { x: 0, y: 0 },
      { x: scene.roomW, y: 0 },
      { x: 0, y: scene.roomD },
    ]) {
      this._line(ctx, this._project({ ...corner, z: 0 }, scene), this._project({ ...corner, z: scene.zMax }, scene));
    }
    ctx.restore();
    ctx.font = 'bold 10px system-ui';
    ctx.fillStyle = secondaryColor;
    ctx.fillText('X', floor[1].x + 8, floor[1].y + 2);
    ctx.fillText('Y', floor[3].x - 14, floor[3].y + 2);
    ctx.fillText('Z', ceilingBack[0].x - 13, ceilingBack[0].y - 2);

    const base = this._project({ x: c.radar_x, y: c.radar_y, z: 0 }, scene);
    const radar = this._project({ x: c.radar_x, y: c.radar_y, z: c.radar_z }, scene);
    const yaw = radians(c.yaw);
    const pitch = radians(c.pitch);
    const roll = radians(c.roll);
    const rightBase: Point3 = { x: Math.cos(yaw), y: -Math.sin(yaw), z: 0 };
    const upBase: Point3 = {
      x: -Math.sin(yaw) * Math.sin(pitch),
      y: -Math.cos(yaw) * Math.sin(pitch),
      z: -Math.cos(pitch),
    };
    const right: Point3 = {
      x: rightBase.x * Math.cos(roll) + upBase.x * Math.sin(roll),
      y: rightBase.y * Math.cos(roll) + upBase.y * Math.sin(roll),
      z: rightBase.z * Math.cos(roll) + upBase.z * Math.sin(roll),
    };
    const up: Point3 = {
      x: upBase.x * Math.cos(roll) - rightBase.x * Math.sin(roll),
      y: upBase.y * Math.cos(roll) - rightBase.y * Math.sin(roll),
      z: upBase.z * Math.cos(roll) - rightBase.z * Math.sin(roll),
    };

    // Radar height and floor shadow.
    ctx.save();
    ctx.strokeStyle = HANDLE_COLORS.height;
    ctx.globalAlpha = 0.55;
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    this._line(ctx, base, radar);
    ctx.restore();
    ctx.save();
    ctx.translate(base.x, base.y);
    ctx.scale(1, 0.42);
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(3,169,244,.14)';
    ctx.fill();
    ctx.restore();

    // Projected 3D FOV cone.
    const fovLength = Math.min(
      (this.maxRangeM ?? this.adapter?.info.maxRangeM ?? 3) * 100,
      Math.max(scene.roomW, scene.roomD) * 0.58,
    );
    const halfFov = radians((this.adapter?.info.fovDegrees ?? 60) / 2);
    const coneEnd = (angle: number) => {
      const directionYaw = yaw + angle;
      return this._project(
        {
          x: c.radar_x + Math.sin(directionYaw) * Math.cos(pitch) * fovLength,
          y: c.radar_y + Math.cos(directionYaw) * Math.cos(pitch) * fovLength,
          z: clamp(c.radar_z - Math.sin(pitch) * fovLength, 0, scene.zMax),
        },
        scene,
      );
    };
    const coneLeft = coneEnd(-halfFov);
    const coneCenter = coneEnd(0);
    const coneRight = coneEnd(halfFov);
    this._polygon(ctx, [radar, coneLeft, coneCenter, coneRight]);
    ctx.fillStyle = 'rgba(11,130,92,.14)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(11,130,92,.6)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Radar body reflects yaw, pitch and roll.
    const devicePoint = (rightScale: number, upScale: number) =>
      this._project(
        {
          x: c.radar_x + right.x * rightScale + up.x * upScale,
          y: c.radar_y + right.y * rightScale + up.y * upScale,
          z: c.radar_z + right.z * rightScale + up.z * upScale,
        },
        scene,
      );
    const device = [devicePoint(-22, -10), devicePoint(22, -10), devicePoint(22, 10), devicePoint(-22, 10)];
    this._polygon(ctx, device);
    ctx.fillStyle = '#13212b';
    ctx.fill();
    ctx.strokeStyle = '#6ee7c1';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(radar.x, radar.y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#0b825c';
    ctx.fill();

    // Direct-manipulation handles.
    const yawWorld = Math.min(scene.roomW, scene.roomD) * 0.18;
    const keepHandleVisible = (point: Point2): Point2 => ({
      x: clamp(point.x, 18, scene.W - 18),
      y: clamp(point.y, 52, scene.H - 18),
    });
    const yawHandle = keepHandleVisible(
      this._project(
        {
          x: c.radar_x + Math.sin(yaw) * yawWorld,
          y: c.radar_y + Math.cos(yaw) * yawWorld,
          z: c.radar_z,
        },
        scene,
      ),
    );
    ctx.strokeStyle = HANDLE_COLORS.yaw;
    ctx.lineWidth = 2;
    this._line(ctx, radar, yawHandle);
    const heightHandle = keepHandleVisible({ x: radar.x - 28, y: radar.y });
    ctx.strokeStyle = HANDLE_COLORS.height;
    ctx.lineWidth = 1;
    this._line(ctx, { x: heightHandle.x + 8, y: heightHandle.y }, radar);
    const pitchHandle = keepHandleVisible({ x: yawHandle.x, y: yawHandle.y - 30 - (c.pitch / 90) * 20 });
    ctx.strokeStyle = HANDLE_COLORS.pitch;
    ctx.setLineDash([2, 3]);
    this._line(ctx, yawHandle, pitchHandle);
    ctx.setLineDash([]);
    const rollAnchor = devicePoint(38, 0);
    const rollHandle = keepHandleVisible({ x: rollAnchor.x + (c.roll / 90) * 10, y: rollAnchor.y });

    this._drawHandle(ctx, 'position', base, 'XY');
    this._drawHandle(ctx, 'height', heightHandle, 'Z');
    this._drawHandle(ctx, 'yaw', yawHandle, this._label('偏航', 'Yaw'));
    this._drawHandle(ctx, 'pitch', pitchHandle, this._label('俯仰', 'Pitch'));
    this._drawHandle(ctx, 'roll', rollHandle, this._label('横滚', 'Roll'));

    ctx.save();
    ctx.fillStyle = textColor;
    ctx.globalAlpha = 0.72;
    ctx.font = '10px system-ui';
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.round(scene.roomW)} × ${Math.round(scene.roomD)} cm`, scene.W - 10, scene.H - 10);
    ctx.restore();
  }

  private _hitTest(point: Point2): DragMode | undefined {
    let nearest: { mode: DragMode; distance: number } | undefined;
    for (const [mode, handle] of this._handles) {
      const distance = Math.hypot(point.x - handle.x, point.y - handle.y);
      if (distance <= 18 && (!nearest || distance < nearest.distance)) nearest = { mode, distance };
    }
    return nearest?.mode;
  }

  private _onPointerDown(e: PointerEvent) {
    const cv = this._cv;
    if (!cv) return;
    const point = eventToCanvasCssPt(e, cv);
    const mode = this._hitTest(point);
    if (!mode) return;

    e.preventDefault();
    cv.setPointerCapture(e.pointerId);
    const startValue =
      mode === 'height'
        ? this.calibration.radar_z
        : mode === 'yaw'
          ? this.calibration.yaw
          : mode === 'pitch'
            ? this.calibration.pitch
            : mode === 'roll'
              ? this.calibration.roll
              : 0;
    this._drag = { mode, startX: point.x, startY: point.y, startValue };
    this._scheduleDraw();
  }

  private _onPointerMove(e: PointerEvent) {
    const cv = this._cv;
    if (!cv) return;
    const point = eventToCanvasCssPt(e, cv);
    if (!this._drag) {
      cv.style.cursor = this._hitTest(point) ? 'grab' : 'default';
      return;
    }

    e.preventDefault();
    const scene = this._scene();
    const drag = this._drag;
    if (drag.mode === 'position') {
      const room = this._unproject(point, 0, scene);
      this._emit({
        radar_x: snap(clamp(room.x, 0, scene.roomW), 1),
        radar_y: snap(clamp(room.y, 0, scene.roomD), 1),
      });
    } else if (drag.mode === 'height') {
      const value = drag.startValue - ((point.y - drag.startY) / scene.verticalH) * scene.zMax;
      this._emit({ radar_z: snap(clamp(value, 0, scene.zMax), 1) });
    } else if (drag.mode === 'yaw') {
      const room = this._unproject(point, this.calibration.radar_z, scene);
      const value = degrees(Math.atan2(room.x - this.calibration.radar_x, room.y - this.calibration.radar_y));
      this._emit({ yaw: snap(value, 0.5) });
    } else if (drag.mode === 'pitch') {
      const value = drag.startValue - (point.y - drag.startY) * 0.6;
      this._emit({ pitch: snap(clamp(value, -90, 90), 0.5) });
    } else {
      const value = drag.startValue + (point.x - drag.startX) * 0.6;
      this._emit({ roll: snap(clamp(value, -90, 90), 0.5) });
    }
  }

  private _onPointerUp(e: PointerEvent) {
    const cv = this._cv;
    if (cv?.hasPointerCapture(e.pointerId)) cv.releasePointerCapture(e.pointerId);
    this._drag = undefined;
    this._scheduleDraw();
  }

  private _emit(patch: Partial<CalibrationConfig>) {
    this.dispatchEvent(
      new CustomEvent('calibration-changed', {
        detail: { ...this.calibration, ...patch },
        bubbles: true,
        composed: true,
      }),
    );
  }

  protected render() {
    if (!this.calibration) return html``;
    const c = this.calibration;
    return html`
      <div class="scene-shell">
        <canvas
          id="installation-cv"
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerUp}
        ></canvas>
        <div class="values">
          <span>X ${Math.round(c.radar_x)}</span>
          <span>Y ${Math.round(c.radar_y)}</span>
          <span>Z ${Math.round(c.radar_z)} cm</span>
          <span
            >${Math.round(c.yaw * 10) / 10}° / ${Math.round(c.pitch * 10) / 10}° /
            ${Math.round(c.roll * 10) / 10}°</span
          >
        </div>
      </div>
      <div class="hint">
        ${this._label(
          '拖拽彩色控制柄直接调整安装位置与姿态',
          'Drag the colored handles to position and orient the radar',
        )}
      </div>
      <div class="legend">
        ${this._legend('position', this._label('位置 X/Y', 'Position X/Y'))}
        ${this._legend('height', this._label('高度', 'Height'))} ${this._legend('yaw', this._label('偏航', 'Yaw'))}
        ${this._legend('pitch', this._label('俯仰', 'Pitch'))} ${this._legend('roll', this._label('横滚', 'Roll'))}
      </div>
    `;
  }

  private _legend(mode: DragMode, label: string) {
    return html`<span><i style="background:${HANDLE_COLORS[mode]}"></i>${label}</span>`;
  }

  static styles = css`
    :host {
      display: block;
    }
    .scene-shell {
      position: relative;
      overflow: hidden;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.2));
      border-radius: 12px;
      background:
        radial-gradient(circle at 50% 25%, rgba(3, 169, 244, 0.08), transparent 48%),
        var(--ha-card-background, var(--card-background-color, #fff));
    }
    canvas {
      display: block;
      width: 100%;
      touch-action: none;
      user-select: none;
    }
    .values {
      position: absolute;
      top: 8px;
      left: 8px;
      right: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      pointer-events: none;
    }
    .values span {
      padding: 3px 7px;
      border: 1px solid var(--divider-color, rgba(128, 128, 128, 0.18));
      border-radius: 10px;
      background: color-mix(in srgb, var(--card-background-color, #fff) 82%, transparent);
      color: var(--secondary-text-color);
      font: 600 10px/1.2 system-ui;
      backdrop-filter: blur(5px);
    }
    .hint {
      margin: 7px 2px 5px;
      color: var(--secondary-text-color);
      font-size: 11px;
      text-align: center;
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 5px 12px;
      margin-bottom: 10px;
      color: var(--secondary-text-color);
      font-size: 10px;
    }
    .legend span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .legend i {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      box-shadow: 0 0 5px currentColor;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'mmwave-installation-3d': Installation3D;
  }
}
