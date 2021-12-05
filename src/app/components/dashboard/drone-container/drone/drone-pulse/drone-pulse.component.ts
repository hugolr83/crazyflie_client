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

    get isStateNotReady(): boolean {
        return this.droneService.isStateNotReady;
    }

    get isBatteryDead(): boolean {
        return this.drone.battery.charge_percentage <= 30;
    }
}
