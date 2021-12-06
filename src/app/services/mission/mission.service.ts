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
    isReturnToBaseDisabled: boolean;
    isSimulationSelected: boolean;

    constructor(public logService: LogService, public droneService: DroneService, public appService: AppService) {
        this.isReturnToBaseDisabled = false;
        this.logService.logIsShown = false;
        this.isSimulationSelected = false;
        this.isMissionStarted = false;
    }

    startMission(): void {
        this.droneService.inputIsShown = false;
        this.isMissionStarted = true;
        this.isReturnToBaseDisabled = false;
        this.logService.loggingIsStopped = false;
        this.logService.startGettingLogs();
        this.droneService.startMission();
    }

    endMission(): void {
        this.isMissionStarted = false;
        this.logService.loggingIsStopped = true;
        this.isReturnToBaseDisabled = true;
        this.droneService.endMission();
    }

    returnToBase(): void {
        this.isReturnToBaseDisabled = true;
        this.isMissionStarted = false;
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
