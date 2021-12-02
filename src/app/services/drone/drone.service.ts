import { Injectable } from '@angular/core';
import {
    CommonApiService,
    CrazyflieApiService,
    Drone,
    DroneType,
    DroneVec3,
    Log,
    Mission,
    Orientation,
} from '@backend/api-client';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AppService } from '../app/app.service';

export type Func = (id: number) => Observable<any[]>;

@Injectable({
    providedIn: 'root',
})
export class DroneService {
    constructor(
        public commonApiService: CommonApiService,
        public crazyflieApiService: CrazyflieApiService,
        public appService: AppService,
    ) {}

    startMission(): void {
        this.commonApiService.createMission(this.appService.droneType).subscribe((mission: Mission) => {
            this.appService.activeMission = mission;
            this.callApi(this.commonApiService.startMission.bind(this.commonApiService));
        });
    }

    endMission(): void {
        this.callApi(this.commonApiService.endMission.bind(this.commonApiService));
    }

    returnToBase(): void {
        this.callApi(this.commonApiService.returnToBase.bind(this.commonApiService));
    }

    getLogs(idLog?: number): Observable<Log[]> {
        return this.appService.getActiveMission().pipe(
            tap((activeMission: Mission) => {
                this.appService.activeMission = activeMission;
            }),
            switchMap((activeMission: Mission) => {
                if (!activeMission) {
                    return of([]);
                }
                return this.commonApiService.getLogs(activeMission.id, idLog);
            }),
        );
    }

    private callApi(func: Func): void {
        this.appService.getActiveMission().subscribe((activeMission: Mission) => {
            this.appService.activeMission = activeMission;
            func(this.appService.activeMission.id).subscribe((drones: Drone[]) => {});
        });
    }
}
