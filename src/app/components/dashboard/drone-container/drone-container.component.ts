import { Component } from '@angular/core';
import { CommonApiService, CrazyflieApiService } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';

@Component({
    selector: 'app-drone-container',
    templateUrl: './drone-container.component.html',
    styleUrls: ['./drone-container.component.scss'],
})
export class DroneContainerComponent {
    constructor(
        public commonApiService: CommonApiService,
        public crazyflieApiService: CrazyflieApiService,
        public appService: AppService,
    ) {}
}
