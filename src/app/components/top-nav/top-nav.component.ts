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

    setDroneType(type: DroneType): void {
        this.appService.setDroneType(type);
    }

    showLogs(): void {
        this.logService.logIsShown = !this.logService.logIsShown;
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

    get updateActivated(): boolean {
        return this.missionService.updateActivated;
    }

    get isSpinning(): boolean {
        return Object.keys(this.appService.droneRegistry[this.appService.droneType]).length === 0;
    }
}
