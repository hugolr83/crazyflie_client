import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type DroneType = 'ARGOS' | 'CRAZYFLIE';

export interface Drone {
    uuid: string;
    state: string;
    type: DroneType;
}

@Injectable({
    providedIn: 'root',
})
export class CommunicationService {
    base_url: string = 'http://localhost:8000';
    droneType: DroneType = 'CRAZYFLIE';

    constructor(private http: HttpClient) {}

    getDrones(): Observable<Drone[]> {
      return this.http.get<Drone[]>(`${this.base_url}/drones?drone_type=${this.droneType}`, {});
    }

    startMission(): Observable<Drone[]> {
        console.log(this.droneType);
        return this.http.post<Drone[]>(`${this.base_url}/start_mission?drone_type=${this.droneType}`, {});
    }

    endMission(): Observable<Drone[]> {
        return this.http.post<Drone[]>(`${this.base_url}/end_mission?drone_type=${this.droneType}`, {});
    }

    returnToBase(): Observable<Drone[]> {
        return this.http.post<Drone[]>(`${this.base_url}/return_to_base?drone_type=${this.droneType}`, {});
    }

    identifyDrone(uuid: string): Observable<Drone> {
        return this.http.post<Drone>(`${this.base_url}/crazyflie/identify?uuid=${uuid}`, {});
    }

    setDroneType(type: DroneType) {
        this.droneType = type;
    }
}
