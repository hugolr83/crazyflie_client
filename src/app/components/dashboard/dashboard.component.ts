import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
import { LogService } from 'src/app/services/log/log.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
    constructor(public appService: AppService, public logService: LogService) {}

    get isSpinning(): boolean {
        return Object.keys(this.appService.droneRegistry[this.appService.droneType]).length === 0;
    }
}
