import { Injectable } from '@angular/core';
import { CommonApiService, CrazyflieApiService, Drone, DroneState, DroneType, Log, Mission } from '@backend/api-client';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AppService } from '../app/app.service';

export type Func = (id: number) => Observable<any[]>;

@Injectable({
    providedIn: 'root',
})
export class DroneService {
    inputIsShown: boolean;
    p2pIsActivated: boolean;

    constructor(
        public commonApiService: CommonApiService,
        public crazyflieApiService: CrazyflieApiService,
        public appService: AppService,
    ) {
        this.inputIsShown = false;
        this.p2pIsActivated = false;
    }

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

    showInput(): void {
        this.inputIsShown = !this.inputIsShown;
    }

    activateP2P(): void {
        this.p2pIsActivated = true;
        console.log('P2P');
    }

    private callApi(func: Func): void {
        this.appService.getActiveMission().subscribe((activeMission: Mission) => {
            this.appService.activeMission = activeMission;
            func(this.appService.activeMission.id).subscribe((drones: Drone[]) => {});
        });
    }

    get isNotConnected(): boolean {
        return Object.keys(this.appService.droneRegistry[this.appService.droneType]).length === 0;
    }

    get droneType(): DroneType {
        return this.appService.droneType;
    }

    get stateIsNotReady(): boolean {
        if (!this.isNotConnected)
            return Object.values(this.appService.droneRegistry[this.droneType]).every(
                (drone) => drone.state === DroneState.NotReady,
            );
        else return true;
    }

    get stateIsReady(): boolean {
        if (!this.isNotConnected)
            return Object.values(this.appService.droneRegistry[this.droneType]).every(
                (drone) => drone.state === DroneState.Ready,
            );
        else return false;
    }
}
