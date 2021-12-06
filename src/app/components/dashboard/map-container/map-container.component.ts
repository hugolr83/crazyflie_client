import { Component, OnDestroy, OnInit } from '@angular/core';
import { DroneState } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';
import { MapService } from 'src/app/services/map/map.service';

@Component({
    selector: 'app-map-container',
    templateUrl: './map-container.component.html',
    styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnDestroy, OnInit {
    timeout!: any;
    constructor(public appService: AppService, public mapService: MapService) {
        this.timeout = setInterval(() => {
            for (const drone of Object.values(this.appService.droneRegistry[this.appService.droneType])) {
                if (drone.state !== DroneState.Exploring) break;
                this.mapService.drawMap({
                    id: drone.id,
                    range: drone.range,
                    position: drone.position,
                    state: drone.state,
                    fillStyle: this.appService.connectedDrones[this.appService.droneType][drone.id].fillStyle,
                });
            }
        }, 1000);
    }

    ngOnInit(): void {
        if (this.appService.activeMission) {
            this.mapService.loadMap(this.appService.activeMission.id, this.appService.activeMission.drone_type);
        }
    }

    togglePaths(value: boolean): void {
        this.mapService.togglePaths(value);
    }

    get pathIsShow(): boolean {
        return this.mapService.showPaths;
    }

    get connectedDrones(): number[] {
        return Object.keys(this.appService.connectedDrones[this.appService.droneType]).map(Number);
    }

    ngOnDestroy(): void {
        clearInterval(this.timeout);
    }
}
