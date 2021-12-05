import { Component, Input, OnInit } from '@angular/core';
import { Drone, DroneState } from '@backend/api-client';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
    selector: 'app-drone-pulse',
    templateUrl: './drone-pulse.component.html',
    styleUrls: ['./drone-pulse.component.scss'],
})
export class DronePulseComponent implements OnInit {
    @Input() drone!: Drone;
    size!: NzButtonSize;
    DroneState = DroneState;
    color: string = '#3DCC93';

    constructor() {}

    ngOnInit() {
        console.log('pulese init');
    }
}
