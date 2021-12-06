import { Injectable } from '@angular/core';
import { CommonApiService, Drone, DroneOrientation, DroneType, DroneVec3, Mission } from '@backend/api-client';
import { Observable, of } from 'rxjs';
import { CommunicationService } from '../communication/communication.service';

export type DroneRegistry = { [key in DroneType]: { [id: string]: Drone } };

export type Drones = { [key in DroneType]: { [id: number]: { fillStyle: string } } };

export type DroneControl = {
    [key in DroneType]: {
        [id: string]: {
            position: DroneVec3;
            orientation: DroneOrientation;
        };
    };
};

const DRONE_COLORS = ['#2652a4', '#d20010'];

@Injectable({
    providedIn: 'root',
})
export class AppService {
    droneType: DroneType = DroneType.Crazyflie;
    droneRegistry: DroneRegistry = { CRAZYFLIE: {}, ARGOS: {} };
    connectedDrones: Drones = { CRAZYFLIE: {}, ARGOS: {} };

    activeMission?: Mission = undefined;

    constructor(public communicationService: CommunicationService, public commonApiService: CommonApiService) {
        this.registerDronePulse();
    }

    setDroneType(type: DroneType): void {
        this.droneType = type;
    }

    registerDronePulse(): void {
        this.communicationService.listenDronePulse().subscribe((drones: Drone[]) => {
            drones.forEach((drone: Drone) => {
                this.droneRegistry[drone.type][drone.id] = drone;

                // Connected drones
                if (!this.connectedDrones[drone.type][drone.id]) {
                    this.connectedDrones[drone.type][drone.id] = { fillStyle: this.getColor(drone.id) };
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

    private getColor(id: number): string {
        return DRONE_COLORS[id % DRONE_COLORS.length];
    }
}
