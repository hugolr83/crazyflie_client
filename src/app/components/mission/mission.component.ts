import { Component } from '@angular/core';
import { CommonApiService, Mission } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';

@Component({
    selector: 'app-mission',
    templateUrl: './mission.component.html',
    styleUrls: ['./mission.component.scss'],
})
export class MissionComponent {
    isVisible: boolean = false;
    missions: Mission[] = [];
    constructor(public communicationService: CommonApiService, public appService: AppService) {}

    getMissions() {
        this.isVisible = true;
        this.communicationService.getMissions().subscribe((misssions: Mission[]) => {
            this.missions = misssions;
        });
    }

    call(mission: Mission) {
        this.appService.activeMission = mission;
    }

    handleClose(): void {
        console.log('Button close clicked!');
        this.isVisible = false;
    }
}
