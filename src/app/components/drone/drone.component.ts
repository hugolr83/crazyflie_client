import { Component, OnInit } from '@angular/core';
import { CommonApiService, CrazyflieApiService, Drone, DroneType } from '@backend/api-client';

export type DroneRegistry = { [key in DroneType]: Drone[] };

@Component({
    selector: 'app-drone',
    templateUrl: './drone.component.html',
    styleUrls: ['./drone.component.scss']
})
export class DroneComponent implements OnInit {

    DroneType = DroneType;
    droneRegistry: DroneRegistry = { CRAZYFLIE: [], ARGOS: [] };
    selectedCrazyFlyDrone!: string;
    droneType: DroneType = DroneType.Crazyflie;

    constructor(public commonApiService: CommonApiService, public crazyflieApiService: CrazyflieApiService) { }

    ngOnInit(): void {
        this.commonApiService.getDrones().subscribe((drones: Drone[]) => {
            drones.forEach((drone: Drone) => {
                this.droneRegistry[drone.type].push(drone);
            });
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
