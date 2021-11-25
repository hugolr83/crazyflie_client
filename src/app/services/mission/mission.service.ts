import { Injectable } from '@angular/core';
import { DroneService } from '../drone/drone.service';
import { LogService } from '../log/log.service';

@Injectable({
    providedIn: 'root',
})
export class MissionService {
    missionIsStarted: boolean;
    returnToBaseActivated: boolean;
    updateActivated: boolean;

    constructor(public logService: LogService, public droneService: DroneService) {
        this.missionIsStarted = false;
        this.returnToBaseActivated = false;
        this.updateActivated = false;
        this.logService.logIsShown = false;
    }

    startMission(): void {
        this.missionIsStarted = true;
        this.returnToBaseActivated = false;
        this.updateActivated = false;
        this.droneService.startMission();
    }

    endMission(): void {
        this.missionIsStarted = false;
        this.returnToBaseActivated = true;
        this.updateActivated = false;
        this.logService.logIsShown = false;
        this.droneService.endMission();
    }

    returnToBase(): void {
        //this.missionService.returnToBaseActivated = true;
        this.returnToBaseActivated = false;
        this.droneService.returnToBase();
    }

    update(): void {
        this.updateActivated = true;
    }
}
