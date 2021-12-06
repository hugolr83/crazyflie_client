import { Component } from '@angular/core';
import { DroneType } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { LogService } from 'src/app/services/log/log.service';
import { MissionService } from 'src/app/services/mission/mission.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
    providers: [SidebarComponent],
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
    DroneType = DroneType;

    constructor(
        public appService: AppService,
        public missionService: MissionService,
        public logService: LogService,
        public sidebarComponent: SidebarComponent,
        public droneService: DroneService,
    ) {}

    showLogs(): void {
        this.logService.logIsShown = !this.logService.logIsShown;
    }

    toggleDroneType(): void {
        if (this.appService.droneType === DroneType.Crazyflie) {
            this.appService.setDroneType(DroneType.Argos);
            this.missionService.isSimulationSelected = true;
        } else {
            this.appService.setDroneType(DroneType.Crazyflie);
            this.missionService.isSimulationSelected = false;
        }
    }

    get logIsShown(): boolean {
        return this.logService.logIsShown;
    }

    get isMissionStarted(): boolean {
        return this.missionService.isMissionStarted;
    }

    get isReturnToBaseDisabled(): boolean {
        return this.missionService.isReturnToBaseDisabled;
    }

    get inputIsShown(): boolean {
        return this.droneService.inputIsShown;
    }

    get p2pIsActivated(): boolean {
        return this.droneService.p2pIsActivated;
    }

    get isNotConnected(): boolean {
        return Object.keys(this.appService.droneRegistry[this.appService.droneType]).length === 0;
    }

    get isSimulationSelected(): boolean {
        return this.missionService.isSimulationSelected;
    }
}
