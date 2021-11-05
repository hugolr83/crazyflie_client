import { Injectable } from '@angular/core';
import { CommonApiService, Drone, DroneType, Mission } from '@backend/api-client';
import { Observable, of } from 'rxjs';
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
                this.droneRegistry[drone.type][drone.uuid] = drone;
            });
        });
    }

    getActiveMission(): Observable<Mission> {
        if(!this.activeMission){
            return this.commonApiService.getActiveMission(this.droneType);
        }
        return of(this.activeMission);
    }
}
