import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type DroneType = 'ARGOS' | 'CRAZYFLIE';

@Injectable({
    providedIn: 'root',
})
export class CommunicationService {
    base_url: string = 'http://0.0.0.0:8000';
    droneType: DroneType = 'CRAZYFLIE';

    constructor(private http: HttpClient) {}

    startMission(): Observable<void> {
        console.log(this.droneType);
        return this.http.get<void>(`${this.base_url}/start_mission?drone_type${this.droneType}`);
    }
    endMission(): Observable<void> {
        return this.http.get<void>(`${this.base_url}/end_mission?drone_type${this.droneType}`);
    }
    returnToBase(): Observable<void> {
        return this.http.get<void>(`${this.base_url}/return_to_base?drone_type${this.droneType}`);
    }

    setDroneType(type: DroneType) {
        this.droneType = type;
    }
}
