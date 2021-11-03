import { Component } from '@angular/core';
import { DroneType } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from './../../services/drone.service';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
    DroneType = DroneType;

    constructor(public appService: AppService, public droneService: DroneService) {}

    setDroneType(type: DroneType): void {
        this.appService.setDroneType(type);
    }
}
