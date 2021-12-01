import { Component } from '@angular/core';
import { DroneType } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';
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
    ) {}

    showLogs(): void {
        this.logService.logIsShown = !this.logService.logIsShown;
    }

    toggleDroneType(): void {
        if (this.appService.droneType === DroneType.Crazyflie) {
            this.appService.setDroneType(DroneType.Argos);
            this.missionService.isSimulation = true;
        } else {
            this.appService.setDroneType(DroneType.Crazyflie);
            this.missionService.isSimulation = false;
        }
    }

    get logIsShown(): boolean {
        return this.logService.logIsShown;
    }

    get missionIsStarted(): boolean {
        return this.missionService.missionIsStarted;
    }

    get returnToBaseActivated(): boolean {
        return this.missionService.returnToBaseActivated;
    }

    get isSpinning(): boolean {
        //return Object.keys(this.appService.droneRegistry[this.appService.droneType]).length === 0;
        return false;
    }

    get isSimulation(): boolean {
        return this.missionService.isSimulation;
    }
}
