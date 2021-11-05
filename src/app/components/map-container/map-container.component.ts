import { Component, OnInit } from '@angular/core';
import { Drone } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';
import { CommunicationService } from 'src/app/services/communication/communication.service';
import { MapService } from 'src/app/services/map/map.service';

@Component({
    selector: 'app-map-container',
    templateUrl: './map-container.component.html',
    styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnInit {
    constructor(
        public appService: AppService,
        public mapService: MapService,
        public commService: CommunicationService,
    ) {}

    ngOnInit(): void {
        this.commService.listenDronePulse().subscribe((drones: Drone[]) => {
            for (const drone of drones) {
                this.mapService.drawPos(drone);
            }
        });
    }

    get isSpinning(): boolean {
        return Object.keys(this.appService.droneRegistry[this.appService.droneType]).length === 0;
    }
}
