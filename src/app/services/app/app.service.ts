import { Injectable } from '@angular/core';
import { Drone, DroneType } from '@backend/api-client';
import { CommunicationService } from '../communication/communication.service';

/*
Service that manages global state of application.
*/

export type DroneRegistry = { [key in DroneType]: { [id: string]: Drone } };

@Injectable({
    providedIn: 'root',
})
export class AppService {
    droneType: DroneType = DroneType.Crazyflie;
    droneRegistry: DroneRegistry = { CRAZYFLIE: {}, ARGOS: {} };

    constructor(public communicationService: CommunicationService) {
        this.registerDronePulse();
    }

    setDroneType(type: DroneType): void {
        this.droneType = type;
    }

    registerDronePulse(): void {
        this.communicationService.listenDronePulse().subscribe((drones: Drone[]) => {
            drones.forEach((drone: Drone) => {
                this.droneRegistry[drone.type][drone.uuid] = drone;
            });
        });
    }
}
