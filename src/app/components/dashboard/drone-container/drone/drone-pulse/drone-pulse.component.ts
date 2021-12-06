import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Drone, DroneState } from '@backend/api-client';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { DroneService } from 'src/app/services/drone/drone.service';
import { MissionService } from 'src/app/services/mission/mission.service';

@Component({
    selector: 'app-drone-pulse',
    templateUrl: './drone-pulse.component.html',
    styleUrls: ['./drone-pulse.component.scss'],
})
export class DronePulseComponent implements OnChanges {
    @Input() drone!: Drone;
    size!: NzButtonSize;
    DroneState = DroneState;

    constructor(public droneService: DroneService, public missionService: MissionService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.drone.state === DroneState.NotReady && this.missionService.isMissionStarted)
            this.missionService.endMission();
    }

    get stateIsNotReady(): boolean {
        return this.droneService.stateIsNotReady;
    }

    get batteryIsLow(): boolean {
        return this.drone.battery.charge_percentage < 30 && this.drone.battery.charge_percentage > 1;
    }
    get batteryIsZero(): boolean {
        return this.drone.battery.charge_percentage === 0;
    }
}
