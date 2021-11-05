import { Component } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
import { MapService } from 'src/app/services/map/map.service';

@Component({
    selector: 'app-map-container',
    templateUrl: './map-container.component.html',
    styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent {
    timeout!: any;
    constructor(public appService: AppService, public mapService: MapService) {
        this.timeout = setInterval(() => {
            for (const drone of Object.values(this.appService.droneRegistry[this.appService.droneType])) {
                this.mapService.drawPos(drone);
            }
        }, 1000);
    }

    get isSpinning(): boolean {
        return Object.keys(this.appService.droneRegistry[this.appService.droneType]).length === 0;
    }
}
