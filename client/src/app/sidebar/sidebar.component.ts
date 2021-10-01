import { Component, OnInit } from '@angular/core';
import { CommunicationService, Drone, DroneType } from 'src/services/communication/communication.service';

export type DroneRegistry = { [key in DroneType]: Drone[] };

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    droneType: DroneType;
    droneRegistry: DroneRegistry = { CRAZYFLIE: [], ARGOS: [] };
    selectedCraziflyDrone!: string;

    constructor(public communicationService: CommunicationService) {
        this.droneType = 'CRAZYFLIE';
    }

    ngOnInit(): void {}

    startMission(): void {
        this.communicationService.startMission().subscribe((drones: Drone[]) => {
            this.droneRegistry[this.communicationService.droneType] = drones;
        });
    }

    endMission(): void {
        this.communicationService.endMission().subscribe((drones: Drone[]) => {
            this.droneRegistry[this.communicationService.droneType] = drones;
        });
    }

    returnToBase(): void {
        this.communicationService.returnToBase().subscribe((drones: Drone[]) => {
            this.droneRegistry[this.communicationService.droneType] = drones;
        });
    }

    identifyDrone(uuid: string): void {
        console.log('ident', uuid);
        if (!uuid) return;
        this.communicationService.identifyDrone(uuid).subscribe((drone: Drone) => {
            console.log('Identified drone success ', drone);
        });
    }

    setDroneType(type: DroneType): void {
        this.communicationService.droneType = type;
    }
}
