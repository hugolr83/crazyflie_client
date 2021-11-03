import { Component } from '@angular/core';
import { DroneService } from './../../services/drone.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    constructor(public droneService: DroneService) {}
}
