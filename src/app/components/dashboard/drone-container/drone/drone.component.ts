import { Component, Input } from '@angular/core';
import {
    CommonApiService,
    CrazyflieApiService,
    Drone,
    DroneState,
    DroneType,
    DroneVec3,
    Orientation,
} from '@backend/api-client';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AppService } from 'src/app/services/app/app.service';

export type DroneRegistry = { [key in DroneType]: Drone[] };
// state: 'Waiting' | 'Start-Up' | 'Exploring' | 'ReturnToBase' | 'ImmediateLanding' | 'Crashed';

@Component({
    selector: 'app-drone',
    templateUrl: './drone.component.html',
    styleUrls: ['./drone.component.scss'],
})
export class DroneComponent {
    @Input() drone!: Drone;
    DroneType = DroneType;
    selectedDroneUUID!: string;
    DroneState = DroneState;
    size!: NzButtonSize;
    color: string = '#3DCC93';
    isVisible: boolean = false;
    value: number = 0;

    constructor(
        public commonApiService: CommonApiService,
        public crazyflieApiService: CrazyflieApiService,
        public appService: AppService,
    ) {}

    identifyDrone(uuid: string): void {
        if (!uuid) return;
        this.crazyflieApiService.identifyCrazyflie(uuid).subscribe((drone: Drone) => {});
    }

    roundValue(value: number, precision: number): number {
        return Number.parseFloat(value.toFixed(precision));
    }

    get position(): DroneVec3 {
        this.drone.position.x = this.roundValue(this.drone.position.x, 3);
        this.drone.position.y = this.roundValue(this.drone.position.y, 3);
        this.drone.position.z = this.roundValue(this.drone.position.z, 3);
        return this.drone.position;
    }

    get orientation(): Orientation {
        this.drone.orientation.yaw = this.roundValue(this.drone.orientation.yaw, 3);
        return this.drone.orientation;
    }

    showPos(): void {
        this.appService.isPosOriHidden = !this.appService.isPosOriHidden;
    }
}
