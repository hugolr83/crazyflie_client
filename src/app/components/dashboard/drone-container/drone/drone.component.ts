import { Component, Input } from '@angular/core';
import {
    CommonApiService,
    CrazyflieApiService,
    Drone,
    DroneOrientation,
    DroneType,
    DroneVec3,
} from '@backend/api-client';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { MissionService } from 'src/app/services/mission/mission.service';

@Component({
    selector: 'app-drone',
    templateUrl: './drone.component.html',
    styleUrls: ['./drone.component.scss'],
})
export class DroneComponent {
    @Input() droneID!: number;
    DroneType = DroneType;
    size!: NzButtonSize;
    position: DroneVec3;
    orientation: DroneOrientation;

    constructor(
        public commonApiService: CommonApiService,
        public crazyflieApiService: CrazyflieApiService,
        public appService: AppService,
        public droneService: DroneService,
        public missionService: MissionService,
    ) {
        this.position = { x: 0, y: 0, z: 0 };
        this.orientation = { yaw: 0 };
    }

    identifyDrone(id: number): void {
        if (!id) return;
        this.crazyflieApiService.identifyCrazyflie(id).subscribe((_) => {});
    }

    get isMissionStarted(): boolean {
        return this.missionService.isMissionStarted;
    }

    get droneType(): DroneType {
        return this.appService.droneType;
    }

    get drone(): Drone {
        return this.appService.droneRegistry[this.droneType][this.droneID];
    }

    get droneFillStyle(): string {
        return this.appService.connectedDrones[this.droneType][this.droneID].fillStyle;
    }

    get stateIsNotReady(): boolean {
        return this.droneService.stateIsNotReady;
    }

    get inputIsShown(): boolean {
        return this.droneService.inputIsShown;
    }
}
