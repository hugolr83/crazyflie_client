import { Injectable } from '@angular/core';
import { CommonApiService, CrazyflieApiService, Drone } from '@backend/api-client';
import { AppService } from '../app/app.service';
@Injectable({
    providedIn: 'root',
})
export class DroneService {
    constructor(
        public commonApiService: CommonApiService,
        public crazyflieApiService: CrazyflieApiService,
        public appService: AppService,
    ) {}

    startMission(): void {
        this.commonApiService.startMission(this.appService.droneType).subscribe((drones: Drone[]) => {});
    }

    endMission(): void {
        this.commonApiService.endMission(this.appService.droneType).subscribe((drones: Drone[]) => {});
    }

    returnToBase(): void {
        this.commonApiService.returnToBase(this.appService.droneType).subscribe((drones: Drone[]) => {});
    }
}
