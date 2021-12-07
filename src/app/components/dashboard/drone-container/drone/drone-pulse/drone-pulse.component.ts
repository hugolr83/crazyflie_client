import { Component, Input } from '@angular/core';
import { Drone, DroneState } from '@backend/api-client';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DroneService } from 'src/app/services/drone/drone.service';
import { MissionService } from 'src/app/services/mission/mission.service';

@Component({
    selector: 'app-drone-pulse',
    templateUrl: './drone-pulse.component.html',
    styleUrls: ['./drone-pulse.component.scss'],
})
export class DronePulseComponent {
    @Input() drone!: Drone;
    size!: NzButtonSize;
    DroneState = DroneState;

    constructor(public droneService: DroneService, public missionService: MissionService) {}

    get stateIsNotReady(): boolean {
        return this.droneService.stateIsNotReady;
    }

    get batteryIsLow(): boolean {
        return this.drone.battery.charge_percentage <= 30 && this.drone.battery.charge_percentage > 0;
    }
    get batteryIsZero(): boolean {
        return this.drone.battery.charge_percentage === 0;
    }
}
