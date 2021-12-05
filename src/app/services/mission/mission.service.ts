import { Injectable } from '@angular/core';
import { DroneType } from '@backend/api-client';
import { AppService } from '../app/app.service';
import { DroneService } from '../drone/drone.service';
import { LogService } from '../log/log.service';

@Injectable({
    providedIn: 'root',
})
export class MissionService {
    isMissionStarted: boolean;
    returnToBaseActivated: boolean;
    isSimulationSelected: boolean;

    constructor(public logService: LogService, public droneService: DroneService, public appService: AppService) {
        this.returnToBaseActivated = false;
        this.logService.logIsShown = false;
        this.isSimulationSelected = false;
        this.isMissionStarted = false;
    }

    startMission(): void {
        this.appService.isInputShown = false;
        this.isMissionStarted = true;
        this.returnToBaseActivated = false;
        this.droneService.startMission();
    }

    endMission(): void {
        this.isMissionStarted = false;
        this.returnToBaseActivated = true;
        this.logService.logIsShown = false;
        this.droneService.endMission();
    }

    returnToBase(): void {
        this.returnToBaseActivated = true;
        this.isMissionStarted = false;
        this.logService.logIsShown = false;
        this.droneService.returnToBase();
    }

    update(): void {
        console.log('update');
    }

    get isNotConnected(): boolean {
        return this.droneService.isNotConnected;
    }

    get droneType(): DroneType {
        return this.appService.droneType;
    }
}
