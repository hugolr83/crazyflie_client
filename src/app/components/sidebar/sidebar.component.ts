import { Component } from '@angular/core';
import { CommonApiService, CrazyflieApiService, Drone } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
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
        this.commonApiService.endMission(this.appService.droneType).subscribe((drones: Drone[]) => {});
    }
}
