import { Injectable } from '@angular/core';
import { Drone, DroneState, DroneVec3 } from '@backend/api-client';
import { AppService } from '../app/app.service';

// Mocking input data
interface Kalman {
    kalman_state_x: number;
    kalman_state_y: number;
    kalman_state_z6?: number;
    pm_vbat?: number;
    drone_battery_level?: number;
}

interface RangeLogMessage {
    range_front: number;
    range_back: number;
    range_left: number;
    range_right: number;
    range_up?: number;
    range_zrange?: number;
}

interface Vec2 {
    x: number;
    y: number;
}

@Injectable({
    providedIn: 'root',
})
export class MapService {
    private fillStyle = ['blue', 'red'];
    droneToContext: { [key: string]: CanvasRenderingContext2D } = {};

    randomIntFromInterval(min: number, max: number): number {
        return Math.random() * (max - min + 1) + min;
    }

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
        const shiftx = this.shift(y, -2, 2, 0, 400);
        const shifty = this.shift(x, -2, 2, 0, 400);
        ctx.fillStyle = 'black';
        ctx.fillRect(shiftx, shifty, 5, 5);
        this.drawRange(drone.position, drone);
    }

    private shift(value: number, a: number, b: number, c: number, d: number): number {
        const old = value - a;
        const newr = d - c;
        const oldr = b - a;
        return c + (old * newr) / oldr;
    }

    drawRange(position: DroneVec3, drone: Drone): void {
        const ctx = this.droneToContext[drone.uuid];
        if (drone.range.back > 0) {
            const x = position.x + drone.range.back / 1000;
            ctx.fillStyle = 'blue';
            ctx.fillRect(x, position.y, 5, 5);
        }
    }
}
