import { Component, OnInit } from '@angular/core';
import { CommonApiService, CrazyflieApiService, DroneState, DroneType } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';

@Component({
    selector: 'app-drone-container',
    templateUrl: './drone-container.component.html',
    styleUrls: ['./drone-container.component.scss'],
})
export class DroneContainerComponent implements OnInit {
    constructor(
        public commonApiService: CommonApiService,
        public crazyflieApiService: CrazyflieApiService,
        public appService: AppService,
    ) {}

    ngOnInit(): void {
        this.appService.droneRegistry = {
            ARGOS: [{ state: DroneState.Crashed, type: DroneType.Argos, uuid: '123' }],
            CRAZYFLIE: [],
        };
    }
}
