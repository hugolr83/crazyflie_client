import { Injectable } from '@angular/core';
import { Drone, DroneType } from '@backend/api-client';
import { SocketService } from '../communication/socket.service';

/*
Service that manages global state of application.
*/

export type DroneRegistry = { [key in DroneType]: Drone[] };

@Injectable({
    providedIn: 'root',
})
export class AppService {
    droneType: DroneType = DroneType.Crazyflie;
    droneRegistry: DroneRegistry = { CRAZYFLIE: [], ARGOS: [] };

    constructor(public socketService: SocketService) {
        this.registerDronePulse();
    }

    setDroneType(type: DroneType): void {
        this.droneType = type;
    }

    registerDronePulse(): void {
        this.socketService.listenDronePulse().subscribe((drones) => {
            drones.forEach((drone: Drone) => {
                this.droneRegistry[drone.type].push(drone);
            });
        });
    }
}
