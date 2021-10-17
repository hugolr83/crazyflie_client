import { Component } from '@angular/core';
import { DroneType } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';


@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
    DroneType = DroneType;

    constructor(public appService: AppService) { }

    setDroneType(type: DroneType): void {
        this.appService.setDroneType(type);
    }
}
