import { Component, OnInit } from '@angular/core';
import { CommonApiService, Drone } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(public commonApiService: CommonApiService, public appService: AppService) {}

    ngOnInit(): void {
        this.commonApiService.getDrones().subscribe((drones: Drone[]) => {
            drones.forEach((drone: Drone) => {
                this.appService.droneRegistry[drone.type].push(drone);
            });
        });
    }
}
