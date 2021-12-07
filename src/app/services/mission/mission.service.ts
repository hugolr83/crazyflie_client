import { Injectable } from '@angular/core';
import { CommonApiService, CrazyflieApiService, DroneType } from '@backend/api-client';
import { AppService } from '../app/app.service';
import { DroneService } from '../drone/drone.service';
import { LogService } from '../log/log.service';
import { MapService } from '../map/map.service';

@Injectable({
    providedIn: 'root',
})
export class MissionService {
    isMissionStarted: boolean;
    isReturnToBaseDisabled: boolean;
    isSimulationSelected: boolean;
    p2pIsEnabled: boolean;
    missionID?: number;

    constructor(
        public logService: LogService,
        public droneService: DroneService,
        public appService: AppService,
        public mapService: MapService,
        public crazyflieApiService: CrazyflieApiService,
        public communicationService: CommonApiService,
    ) {
        this.isReturnToBaseDisabled = false;
        this.logService.logIsShown = false;
        this.isSimulationSelected = false;
        this.isMissionStarted = false;
        this.p2pIsEnabled = true;
    }

    startMission(): void {
        this.p2pIsEnabled = false;
        this.droneService.inputIsShown = false;
        this.isMissionStarted = true;
        this.isReturnToBaseDisabled = false;
        this.droneService.startMission();
        this.mapService.clearMap();
    }

    endMission(): void {
        this.p2pIsEnabled = true;
        this.isMissionStarted = false;
        this.isReturnToBaseDisabled = true;
        this.droneService.endMission();
    }

    returnToBase(): void {
        this.isReturnToBaseDisabled = true;
        this.isMissionStarted = false;
        this.droneService.returnToBase();
    }

    activateP2P(): void {
        if (!this.appService.activeMission) return;
        this.p2pIsEnabled = true;
        console.log(this.appService.activeMission.id);
        this.crazyflieApiService.activateP2p(this.appService.activeMission.id).subscribe((_) => {});
    }

    get isNotConnected(): boolean {
        return this.droneService.isNotConnected;
    }

    get droneType(): DroneType {
        return this.appService.droneType;
    }
}
