import { Component, OnInit } from '@angular/core';
import { CommonApiService, CrazyflieApiService, DroneType, Drone } from '@backend/api-client';

export type DroneRegistry = { [key in DroneType]: Drone[] };

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    DroneType = DroneType;

    droneRegistry: DroneRegistry = { CRAZYFLIE: [], ARGOS: [] };
    selectedCraziflyDrone!: string;
    droneType: DroneType = DroneType.Crazyflie;

    constructor(public commonApiService: CommonApiService, public crazyflieApiService: CrazyflieApiService) {}

    ngOnInit(): void {
        this.commonApiService.getDrones().subscribe((drones: Drone[]) => {
            drones.forEach((drone: Drone) => {
                this.droneRegistry[drone.type].push(drone);
            });
        });
    }

    startMission(): void {
        const droneType = this.droneType;
        this.commonApiService.startMission(droneType).subscribe((drones: Drone[]) => {
            this.droneRegistry[droneType] = drones;
        });
    }

    endMission(): void {
        const droneType = this.droneType;
        this.commonApiService.endMission(droneType).subscribe((drones: Drone[]) => {
            this.droneRegistry[droneType] = drones;
        });
    }

    returnToBase(): void {
        const droneType = this.droneType;
        this.commonApiService.endMission(droneType).subscribe((drones: Drone[]) => {
            this.droneRegistry[droneType] = drones;
        });
    }

    identifyDrone(uuid: string): void {
        console.log('ident', uuid);
        if (!uuid) return;
        this.crazyflieApiService.identifyCrazyflie(uuid).subscribe((drone: Drone) => {
            console.log('Identified drone success ', drone);
        });
    }

    setDroneType(type: DroneType): void {
        this.droneType = type;
    }
}
