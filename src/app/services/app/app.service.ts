import { Injectable } from '@angular/core';
import { CommonApiService, Drone, DroneType, DroneVec3, Mission, Orientation } from '@backend/api-client';
import { Observable, of } from 'rxjs';
import { CommunicationService } from '../communication/communication.service';

/*
Service that manages global state of application.
*/

export type DroneRegistry = { [key in DroneType]: { [id: number]: Drone } };

export type Drones = { [key in DroneType]: { [id: number]: { fillStyle: string } } };

export type DroneControl = {
    [key in DroneType]: {
        [id: string]: {
            position: DroneVec3;
            orientation: Orientation;
        };
    };
};

@Injectable({
    providedIn: 'root',
})
export class AppService {
    droneType: DroneType = DroneType.Crazyflie;
    droneRegistry: DroneRegistry = { CRAZYFLIE: {}, ARGOS: {} };
    connectedDrones: Drones = { CRAZYFLIE: {}, ARGOS: {} };

    activeMission?: Mission = undefined;

    // boolean to display drones orientation and position before starting a mission
    isPosOriHidden: boolean = false;

    constructor(public communicationService: CommunicationService, public commonApiService: CommonApiService) {
        this.registerDronePulse();
    }

    setDroneType(type: DroneType): void {
        this.droneType = type;
    }

    registerDronePulse(): void {
        this.communicationService.listenDronePulse().subscribe((drones: Drone[]) => {
            drones.forEach((drone: Drone) => {
                // Drone pulse state info
                this.droneRegistry[drone.type][drone.id] = drone;

                // Connected drones
                if (!this.connectedDrones[drone.type][drone.id]) {
                    this.connectedDrones[drone.type][drone.id] = { fillStyle: this.generateRandomColor() };
                }
            });
        });
    }

    getActiveMission(): Observable<Mission> {
        if (!this.activeMission) {
            return this.commonApiService.getActiveMission(this.droneType);
        }
        return of(this.activeMission);
    }

    private generateRandomColor(): string {
        return '#' + Math.floor(Math.random() * 2 ** 24).toString(16);
    }
}
