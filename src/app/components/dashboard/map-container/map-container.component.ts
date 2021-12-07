import { Component, OnDestroy, OnInit } from '@angular/core';
import { DroneState } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';
import { MapService } from 'src/app/services/map/map.service';
import { MissionService } from 'src/app/services/mission/mission.service';

@Component({
    selector: 'app-map-container',
    templateUrl: './map-container.component.html',
    styleUrls: ['./map-container.component.scss'],
})
export class MapContainerComponent implements OnDestroy, OnInit {
    timeout!: any;

    constructor(public appService: AppService, public mapService: MapService, public missionService: MissionService) {
        this.timeout = setInterval(() => {
            for (const drone of Object.values(this.appService.droneRegistry[this.appService.droneType])) {
                if (drone.state === DroneState.NotReady) break;
                if (drone.state !== DroneState.Exploring) {
                    this.mapService.drawPosition({
                        id: drone.id,
                        range: drone.range,
                        position: drone.position,
                        state: drone.state,
                        fillStyle: this.appService.connectedDrones[this.appService.droneType][drone.id].fillStyle,
                    });
                } else {
                    this.mapService.drawMap({
                        id: drone.id,
                        range: drone.range,
                        position: drone.position,
                        state: drone.state,
                        fillStyle: this.appService.connectedDrones[this.appService.droneType][drone.id].fillStyle,
                    });
                }
            }
        }, 1000);
    }

    ngOnInit(): void {
        if (this.appService.activeMission) {
            this.mapService.loadMap(this.appService.activeMission.id, this.appService.activeMission.drone_type);
        }
    }

    get connectedDrones(): number[] {
        return Object.keys(this.appService.connectedDrones[this.appService.droneType]).map(Number);
    }

    get currentMissionID(): number {
        return this.appService.activeMission?.id as number;
    }

    ngOnDestroy(): void {
        clearInterval(this.timeout);
    }
}
