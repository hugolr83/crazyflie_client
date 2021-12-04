import { Component, OnDestroy } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
import { MapService } from 'src/app/services/map/map.service';

@Component({
    selector: 'app-map-container',
    templateUrl: './map-container.component.html',
    styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnDestroy {
    timeout!: any;
    constructor(public appService: AppService, public mapService: MapService) {
        console.log('init map container');
        this.timeout = setInterval(() => {
            console.log('drawing map');
            for (const drone of Object.values(this.appService.droneRegistry[this.appService.droneType])) {
                this.mapService.drawMap(
                    drone,
                    this.appService.connectedDrones[this.appService.droneType][drone.uuid].fillStyle,
                );
            }
        }, 1000);
    }

    togglePaths(value: boolean): void {
        this.mapService.togglePaths(value);
    }

    get pathIsShow(): boolean {
        return this.mapService.showPaths;
    }
    get connectedDrones(): string[] {
        return Array.from(Object.keys(this.appService.connectedDrones[this.appService.droneType]));
    }

    ngOnDestroy(): void {
        clearInterval(this.timeout);
    }
}
