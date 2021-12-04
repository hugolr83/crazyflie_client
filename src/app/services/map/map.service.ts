import { Injectable } from '@angular/core';
import { Drone, DroneState } from '@backend/api-client';
import { AppService } from '../app/app.service';

const WIDHT_ARENA = 4;
const HEIGHT_ARENA = 4;
const MAX_RANGE_SCANNER = 2000;
const ARGOS_ARENA_MAX_INTERVAL = 2;
const ARGOS_ARENA_MIN_INTERVAL = -2;

@Injectable({
    providedIn: 'root',
})
export class MapService {
    droneToPosContext: { [key: string]: CanvasRenderingContext2D } = {};
    droneToPathContext: { [key: string]: CanvasRenderingContext2D } = {};
    obstacleContext!: CanvasRenderingContext2D;
    droneFillStyle!: string;
    showPaths: boolean = true;
    wallFillStyle = 'blue';
    inMemoryCanvases: { [type: string]: ImageData[] } = {};

    constructor(private appServive: AppService) {
        this.droneToPosContext = {};
        this.droneToPathContext = {};
    }

    togglePaths(value: boolean): void {
        this.showPaths = value;
        for (const ctx of Object.values(this.droneToPathContext)) {
            ctx.canvas.hidden = !value;
        }
    }

    setPositionContext(context: CanvasRenderingContext2D | null, uuid: string): void {
        if (!context) return;
        this.droneToPosContext[uuid] = context;
    }

    setPathContext(context: CanvasRenderingContext2D | null, uuid: string): void {
        if (!context) return;
        this.droneToPathContext[uuid] = context;
    }

    setObstacleContext(context: CanvasRenderingContext2D | null): void {
        if (!context) return;
        this.obstacleContext = context;
    }

    computePosition(drone: Drone, ctx: CanvasRenderingContext2D): { shiftx: number; shifty: number } {
        const x = drone.position.x;
        const y = drone.position.y;
        // ARGOS x and y are switched
        const shiftx = this.shift(y, ARGOS_ARENA_MIN_INTERVAL, ARGOS_ARENA_MAX_INTERVAL, 0, ctx.canvas.width);
        const shifty = this.shift(x, ARGOS_ARENA_MIN_INTERVAL, ARGOS_ARENA_MAX_INTERVAL, 0, ctx.canvas.height);

        return { shiftx, shifty };
    }

    drawMap(drone: Drone, fillStyle: string): void {
        if (!drone) return;
        if (drone.state !== DroneState.Exploring) return;

        this.drawPosition(drone, fillStyle);
        this.drawObstacles(drone);
        this.drawDronePath(drone, fillStyle);
    }

    private drawPosition(drone: Drone, fillStyle: string): void {
        const ctx = this.droneToPosContext[drone.id];
        const { shiftx, shifty } = this.computePosition(drone, ctx);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.drawCursor(ctx, shiftx, shifty, fillStyle);
    }

    private drawDronePath(drone: Drone, fillStyle: string): void {
        const ctx = this.droneToPathContext[drone.id];
        const { shiftx, shifty } = this.computePosition(drone, ctx);

        this.drawPath(ctx, shiftx, shifty, fillStyle);
    }

    private drawPath(ctx: CanvasRenderingContext2D, x: number, y: number, fillStyle: string): void {
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, 3, 3);
    }
    private drawCursor(ctx: CanvasRenderingContext2D, x: number, y: number, fillStyle: string): void {
        // const image = new Image();
        // image.src = 'assets/svg/red_cursor.svg';
        // image.onload = () => {
        //     ctx.save();
        //     ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        //     ctx.scale(0.05, 0.06);
        //     ctx.drawImage(image, x, y);
        //     ctx.restore();
        // };
        // image.crossOrigin = 'Anonymous';

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

    private drawObstacles(drone: Drone): void {
        const ctx = this.obstacleContext;
        ctx.fillStyle = this.wallFillStyle;

        const { shiftx, shifty } = this.computePosition(drone, ctx);

        if (drone.range.back > 0) {
            const backy = shifty + this.shift(drone.range.back, 0, MAX_RANGE_SCANNER, 0, ctx.canvas.height / 2);
            ctx.fillRect(shiftx, backy, 5, 5);
        }

        if (drone.range.front > 0) {
            const fronty = shifty - this.shift(drone.range.front, 0, MAX_RANGE_SCANNER, 0, ctx.canvas.height / 2);
            ctx.fillRect(shiftx, fronty, 5, 5);
        }

        if (drone.range.left > 0) {
            const leftx = shiftx - this.shift(drone.range.left, 0, MAX_RANGE_SCANNER, 0, ctx.canvas.height / 2);
            ctx.fillRect(leftx, shifty, 5, 5);
        }

        if (drone.range.right > 0) {
            const rightx = shiftx + this.shift(drone.range.right, 0, MAX_RANGE_SCANNER, 0, ctx.canvas.height / 2);
            ctx.fillRect(rightx, shifty, 5, 5);
        }
    }
}
