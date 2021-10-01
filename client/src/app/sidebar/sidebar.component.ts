import { Component, OnInit } from '@angular/core';
import { CommunicationService, DroneType } from 'src/services/communication/communication.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    droneType: DroneType;

    constructor(public communicationService: CommunicationService) {
        this.droneType = 'CRAZYFLIE';
    }

    ngOnInit(): void {}

    startMission(): void {
        this.communicationService.startMission();
    }

    endMission(): void {
        this.communicationService.endMission();
    }

    returnToBase(): void {
        this.communicationService.returnToBase();
    }

    setDroneType(type: DroneType): void {
        this.communicationService.droneType = type;
    }
}
