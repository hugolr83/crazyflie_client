import { Injectable } from '@angular/core';
import { Drone, DroneState } from '@backend/api-client';
import { AppService } from '../app/app.service';

const WIDHT_ARENA = 4;
const HEIGHT_ARENA = 4;
const MAX_RANGE_SCANNER = 2000;

@Injectable({
    providedIn: 'root',
})
export class MapService {
    droneToContext: { [key: string]: CanvasRenderingContext2D } = {};

    constructor(private appServive: AppService) {
        this.droneToContext = {};
    }

    setContext(context: CanvasRenderingContext2D | null): void {
        if (!context) return;
        for (const drone of Object.values(this.appServive.droneRegistry[this.appServive.droneType])) {
            if (!this.droneToContext[drone.uuid]) {
                this.droneToContext[drone.uuid] = context;
                break;
            }
        }
    }

    drawPos(drone: Drone): void {
        if (!drone) return;
        if (drone.state !== DroneState.Exploring) return;

        const ctx = this.droneToContext[drone.uuid];

        const x = drone.position.x;
        const y = drone.position.y;
        // ARGOS x and y are switched
        const shiftx = this.shift(y, -2, 2, 0, ctx.canvas.width);
        const shifty = this.shift(x, -2, 2, 0, ctx.canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(shiftx, shifty, 5, 5);

        this.drawRange(shiftx, shifty, drone);
    }

    private shift(value: number, a: number, b: number, c: number, d: number): number {
        const old = value - a;
        const newr = d - c;
        const oldr = b - a;
        return c + (old * newr) / oldr;
    }

    private drawRange(x: number, y: number, drone: Drone): void {
        const ctx = this.droneToContext[drone.uuid];
        if (drone.range.back > 0) {
            const backy = y + this.shift(drone.range.back, 0, MAX_RANGE_SCANNER, 0, ctx.canvas.height / 2);
            ctx.fillStyle = 'blue';
            ctx.fillRect(x, backy, 5, 5);
        }

        if (drone.range.front > 0) {
            const fronty = y - this.shift(drone.range.front, 0, MAX_RANGE_SCANNER, 0, ctx.canvas.height / 2);
            ctx.fillStyle = 'blue';
            ctx.fillRect(x, fronty, 5, 5);
        }

        if (drone.range.left > 0) {
            const leftx = x - this.shift(drone.range.left, 0, MAX_RANGE_SCANNER, 0, ctx.canvas.height / 2);
            ctx.fillStyle = 'blue';
            ctx.fillRect(leftx, y, 5, 5);
        }

        if (drone.range.right > 0) {
            const rightx = x + this.shift(drone.range.right, 0, MAX_RANGE_SCANNER, 0, ctx.canvas.height / 2);
            ctx.fillStyle = 'blue';
            ctx.fillRect(rightx, y, 5, 5);
        }
    }
}
