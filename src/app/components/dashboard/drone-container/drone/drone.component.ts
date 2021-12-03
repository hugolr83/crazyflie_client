import { Component, Input } from '@angular/core';
import { CommonApiService, CrazyflieApiService, Drone, DroneType, DroneVec3, Orientation } from '@backend/api-client';
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
    @Input() droneUUID!: string;
    DroneType = DroneType;
    size!: NzButtonSize;
    position: DroneVec3;
    orientation: Orientation;

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

    identifyDrone(uuid: string): void {
        if (!uuid) return;
        this.crazyflieApiService.identifyCrazyflie(uuid).subscribe((drone: Drone) => {});
    }

    get isMissionStarted(): boolean {
        return this.missionService.missionIsStarted;
    }

    get droneType(): DroneType {
        return this.appService.droneType;
    }

    get drone(): Drone {
        return this.appService.droneRegistry[this.droneType][this.droneUUID];
    }

    showPos(): void {
        this.appService.isPosOriHidden = !this.appService.isPosOriHidden;
    }
}
