import { Component } from '@angular/core';
import { CommonApiService, Mission } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';

@Component({
    selector: 'app-mission',
    templateUrl: './mission.component.html',
    styleUrls: ['./mission.component.scss'],
})
export class MissionComponent {
    isMission: boolean = false;
    missions: Mission[] = [];
    constructor(public communicationService: CommonApiService, public appService: AppService) {}

    getMissions() {
        this.isMission = true;
        this.communicationService.getMissions().subscribe((misssions: Mission[]) => {
            this.missions = misssions;
        });
    }

    close() {
        this.isMission = false;
        this.appService.isHidden = true;
    }

    call(mission: Mission) {
        this.appService.activeMission = mission;
        this.appService.isHidden = false;
    }
}
