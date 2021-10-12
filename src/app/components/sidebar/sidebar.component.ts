import { Component } from '@angular/core';
import { CommonApiService, CrazyflieApiService, Drone, DroneType } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    DroneType = DroneType;

    selectedCraziflyDrone!: string;
    droneType: DroneType = DroneType.Crazyflie;

    constructor(
        public commonApiService: CommonApiService,
        public crazyflieApiService: CrazyflieApiService,
        public appService: AppService,
    ) {}

    startMission(): void {
        const droneType = this.droneType;
        this.commonApiService.startMission(droneType).subscribe((drones: Drone[]) => {});
    }

    endMission(): void {
        const droneType = this.droneType;
        this.commonApiService.endMission(droneType).subscribe((drones: Drone[]) => {});
    }

    returnToBase(): void {
        const droneType = this.droneType;
        this.commonApiService.endMission(droneType).subscribe((drones: Drone[]) => {});
    }

    identifyDrone(uuid: string): void {
        console.log('ident', uuid);
        if (!uuid) return;
        this.crazyflieApiService.identifyCrazyflie(uuid).subscribe((drone: Drone) => {
            console.log('Identified drone success ', drone);
        });
    }
}
