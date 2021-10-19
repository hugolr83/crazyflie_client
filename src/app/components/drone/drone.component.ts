import { Component, Input } from '@angular/core';
import { CommonApiService, CrazyflieApiService, Drone, DroneState, DroneType } from '@backend/api-client';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { AppService } from 'src/app/services/app/app.service';
import { SocketService } from 'src/app/services/communication/socket.service';

export type DroneRegistry = { [key in DroneType]: Drone[] };
// state: 'Waiting' | 'Start-Up' | 'Exploring' | 'ReturnToBase' | 'ImmediateLanding' | 'Crashed';

@Component({
    selector: 'app-drone',
    templateUrl: './drone.component.html',
    styleUrls: ['./drone.component.scss'],
})
export class DroneComponent {
    @Input() drone!: Drone;
    DroneType = DroneType;
    selectedDroneUUID!: string;
    DroneState = DroneState;
    size!: NzButtonSize;

    constructor(
        public commonApiService: CommonApiService,
        public crazyflieApiService: CrazyflieApiService,
        public appService: AppService,
        public socketService: SocketService,
    ) {}

    identifyDrone(uuid: string): void {
        if (!uuid) return;
        this.crazyflieApiService.identifyCrazyflie(uuid).subscribe((drone: Drone) => {
            console.log('Identified drone success ', drone);
        });
    }
}
