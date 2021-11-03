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
            ARGOS: [
                {
                    state: DroneState.Crashed,
                    type: DroneType.Argos,
                    uuid: '123',
                    battery: { charge_percentage: 80, voltage: 5 },
                    position: { x: 50, y: 50, z: 70 },
                    range: { front: 1, back: 2, up: 3, left: 4, right: 5, bottom: 6 },
                },
            ],
            CRAZYFLIE: [],
        };
    }
}
