import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type DroneType = "ARGOS" | "CRAZYFLIE";


@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  base_url: string = "http://0.0.0.0:8000";

  constructor(private http: HttpClient) { }

  startMission(type: DroneType): Observable<void> {
    return this.http.get<void>(`${this.base_url}/start_mission?drone_type${type}`);
  };
  endMission(type: DroneType): Observable<void> {
    return this.http.get<void>(`${this.base_url}/end_mission?drone_type${type}`);
  };
  returnToBase(type: DroneType): Observable<void> {
    return this.http.get<void>(`${this.base_url}/return_to_base?drone_type${type}`);
  };

}
