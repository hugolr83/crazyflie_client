import { Component, ViewContainerRef } from '@angular/core';
import { DroneType } from '@backend/api-client';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { LogService } from 'src/app/services/log/log.service';
import { MissionService } from 'src/app/services/mission/mission.service';
import { HelpComponent } from '../dialog-boxes/help/help.component';
import { HistoryComponent } from '../dialog-boxes/history/history.component';
import { InformationComponent } from '../dialog-boxes/information/information.component';

@Component({
    selector: 'app-sidebar, nz-demo-radio-solid',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    constructor(
        public appService: AppService,
        public logService: LogService,
        public missionService: MissionService,
        public droneService: DroneService,
        private modal: NzModalService,
        private viewContainerRef: ViewContainerRef,
    ) {}

    showHistory(): void {
        const modal: NzModalRef = this.modal.create({
            nzClosable: false,
            nzWidth: 1500,
            nzTitle: 'Historique',
            nzContent: HistoryComponent,
            nzCentered: true,
            nzFooter: [
                {
                    label: 'Fermer',
                    shape: 'round',
                    onClick: () => modal.destroy(),
                },
            ],
            nzViewContainerRef: this.viewContainerRef,
        });
    }

    showInformation(): void {
        const modal: NzModalRef = this.modal.create({
            nzClosable: false,
            nzTitle: 'Information',
            nzContent: InformationComponent,
            nzFooter: [
                {
                    label: 'Fermer',
                    shape: 'round',
                    onClick: () => modal.destroy(),
                },
            ],
            nzViewContainerRef: this.viewContainerRef,
        });
    }

    showHelp(): void {
        const modal: NzModalRef = this.modal.create({
            nzClosable: false,
            nzTitle: 'Aide',
            nzWidth: 1000,
            nzContent: HelpComponent,
            nzFooter: [
                {
                    label: 'Fermer',
                    shape: 'round',
                    onClick: () => modal.destroy(),
                },
            ],
            nzViewContainerRef: this.viewContainerRef,
        });
    }

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

    get isSimulation(): boolean {
        return this.missionService.isSimulation;
    }

    get logIsShown(): boolean {
        return this.logService.logIsShown;
    }

    get isMissionStarted(): boolean {
        return this.missionService.isMissionStarted;
    }

    get returnToBaseActivated(): boolean {
        return this.missionService.returnToBaseActivated;
    }

    get isSpinning(): boolean {
        return this.droneService.isSpinning;
    }

    get isStateReady(): boolean {
        return this.droneService.isStateReady;
    }
}
