import { Injectable } from '@angular/core';
import { DroneService } from '../drone/drone.service';
import { LogService } from '../log/log.service';

@Injectable({
    providedIn: 'root',
})
export class MissionService {
    isMissionStarted: boolean;
    returnToBaseActivated: boolean;
    isSimulation: boolean;
    appService: any;

    constructor(public logService: LogService, public droneService: DroneService) {
        this.isMissionStarted = false;
        this.returnToBaseActivated = false;
        this.logService.logIsShown = false;
        this.isSimulation = false;
    }

    startMission(): void {
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
        this.droneService.returnToBase();
    }

    update(): void {
        console.log('update');
    }
}
