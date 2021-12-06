import { Injectable } from '@angular/core';
import { CommonApiService, DroneRange, DroneState, DroneType, DroneVec3 } from '@backend/api-client';
import { AppService } from '../app/app.service';

export const DEFAULT_CANVAS_WIDTH = 400;
export const DEFAULT_CANVAS_HEIGHT = 400;
const WIDHT_ARENA = 4;
const HEIGHT_ARENA = 4;
const MAX_RANGE_SCANNER = 2000;
const ARENA_MAX_INTERVAL = WIDHT_ARENA / 2;
const ARENA_MIN_INTERVAL = -WIDHT_ARENA / 2;

export type DroneMap = { id: number; position: DroneVec3; fillStyle: string; range: DroneRange; state: DroneState };

@Injectable({
    providedIn: 'root',
})
export class MapService {
    droneToPosContext: { [key: string]: CanvasRenderingContext2D } = {};
    droneToPathContext: { [key: string]: CanvasRenderingContext2D } = {};
    obstacleContext!: CanvasRenderingContext2D;
    historicalObstacleContext!: CanvasRenderingContext2D;
    droneFillStyle!: string;
    showPaths: boolean = true;
    wallFillStyle = '#7d8a81';
    inMemoryCanvases: { [type: string]: ImageData[] } = {};

    constructor(public appServive: AppService, public commonApiService: CommonApiService) {
        this.droneToPosContext = {};
        this.droneToPathContext = {};
    }

    public clearMap(): void {
        // clear positions
        for (const posCtx of Object.values(this.droneToPosContext)) {
            posCtx.clearRect(0, 0, posCtx.canvas.width, posCtx.canvas.height);
        }

        // clear paths
        for (const pathCtx of Object.values(this.droneToPathContext)) {
            pathCtx.clearRect(0, 0, pathCtx.canvas.width, pathCtx.canvas.height);
        }
        // clear obstacles
        this.obstacleContext.clearRect(0, 0, this.obstacleContext.canvas.width, this.obstacleContext.canvas.height);
    }

    public mapToImage(missionId: number, droneType: DroneType): string {
        this.loadMap(missionId, droneType);

        const mergedCanvas = document.createElement('canvas');
        const mergedCtx = mergedCanvas.getContext('2d');

        mergedCanvas.width = DEFAULT_CANVAS_WIDTH;
        mergedCanvas.height = DEFAULT_CANVAS_HEIGHT;

        if (!mergedCtx) return '';

        for (const ctx of Object.values(this.droneToPosContext)) {
            mergedCtx.drawImage(ctx.canvas, 0, 0);
        }

        for (const ctx of Object.values(this.droneToPathContext)) {
            mergedCtx.drawImage(ctx.canvas, 0, 0);
        }

        mergedCtx.drawImage(this.historicalObstacleContext.canvas, 0, 0);

        return mergedCanvas.toDataURL();
    }

    public loadMap(missionId: number, droneType: DroneType): void {
        this.commonApiService.getDronesMetadata(missionId).subscribe((droneData) => {
            for (const [droneID, datas] of Object.entries(droneData)) {
                const drone = this.appServive.droneRegistry[droneType][parseInt(droneID)];
                const fillStyle = this.appServive.connectedDrones[droneType][parseInt(droneID)].fillStyle;
                for (const data of datas) {
                    const droneMap: DroneMap = {
                        id: drone.id,
                        fillStyle,
                        position: data.position,
                        range: data.range,
                        state: drone.state,
                    };
                    this.drawMap(droneMap);
                }
            }
        });
    }

    public togglePaths(value: boolean): void {
        this.showPaths = value;
        for (const ctx of Object.values(this.droneToPathContext)) {
            ctx.canvas.hidden = !value;
        }
    }

    public setPositionContext(context: CanvasRenderingContext2D | null, uuid: number): void {
        if (!context) return;
        this.droneToPosContext[uuid] = context;
    }

    public setPathContext(context: CanvasRenderingContext2D | null, uuid: number): void {
        if (!context) return;
        this.droneToPathContext[uuid] = context;
    }

    public setObstacleContext(context: CanvasRenderingContext2D | null): void {
        if (!context) return;
        this.obstacleContext = context;
        this.historicalObstacleContext = context;
    }

    public drawMap(drone: DroneMap): void {
        this.drawPosition(drone);
        this.drawObstacles(drone);
        this.drawDronePath(drone);
    }

    private computePosition(drone: DroneMap, ctx: CanvasRenderingContext2D): { shiftx: number; shifty: number } {
        const x = drone.position.x;
        const y = drone.position.y;

        const shiftx = this.shift(y, ARENA_MIN_INTERVAL, ARENA_MAX_INTERVAL, 0, ctx.canvas.width);
        const shifty = this.shift(x, ARENA_MIN_INTERVAL, ARENA_MAX_INTERVAL, 0, ctx.canvas.height);

        return { shiftx, shifty };
    }

    private drawPosition(drone: DroneMap): void {
        const ctx = this.droneToPosContext[drone.id];
        const { shiftx, shifty } = this.computePosition(drone, ctx);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.drawCursor(ctx, shiftx, shifty, drone.fillStyle);
    }

    private drawDronePath(drone: DroneMap): void {
        const ctx = this.droneToPathContext[drone.id];

        const { shiftx, shifty } = this.computePosition(drone, ctx);

        this.drawPath(ctx, shiftx, shifty, drone.fillStyle);
    }

    private drawPath(ctx: CanvasRenderingContext2D, x: number, y: number, fillStyle: string): void {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, 3, 3);
    }

    private drawCursor(ctx: CanvasRenderingContext2D, x: number, y: number, fillStyle: string): void {
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 5, y + 14);
        ctx.lineTo(x - 5, y + 14);
        ctx.closePath();
        ctx.fill();
    }

    private shift(value: number, a: number, b: number, c: number, d: number): number {
        const old = value - a;
        const newr = d - c;
        const oldr = b - a;
        return c + (old * newr) / oldr;
    }

    private drawObstacles(drone: DroneMap): void {
        const ctx = this.historicalObstacleContext;
        ctx.fillStyle = this.wallFillStyle;

        const { shiftx, shifty } = this.computePosition(drone, ctx);

        if (drone.range.back > 0) {
            const backy = shifty + this.shift(drone.range.back, 0, MAX_RANGE_SCANNER, 0, ctx.canvas.height / 2);
            this.drawCircle(ctx, shiftx, backy);
        }

        if (drone.range.front > 0) {
            const fronty = shifty - this.shift(drone.range.front, 0, MAX_RANGE_SCANNER, 0, ctx.canvas.height / 2);
            this.drawCircle(ctx, shiftx, fronty);
        }

        if (drone.range.left > 0) {
            const leftx = shiftx - this.shift(drone.range.left, 0, MAX_RANGE_SCANNER, 0, ctx.canvas.height / 2);
            this.drawCircle(ctx, leftx, shifty);
        }

        if (drone.range.right > 0) {
            const rightx = shiftx + this.shift(drone.range.right, 0, MAX_RANGE_SCANNER, 0, ctx.canvas.height / 2);
            this.drawCircle(ctx, rightx, shifty);
        }
    }

    private drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number): void {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}
