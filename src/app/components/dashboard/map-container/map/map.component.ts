import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
import { MapService } from 'src/app/services/map/map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
    totalProgress?: number;
    @ViewChild('mapCanvas') canvas!: ElementRef;
    @Input() name!: string;
    @Input() type!: 'path' | 'position' | 'obstacle';
    @Input() zindex!: string;
    @Input() droneUUID!: string;

    constructor(private mapService: MapService, public appService: AppService, public elementRef: ElementRef) {
        this.totalProgress = 80;
    }

    ngAfterViewInit(): void {
        const ctx = (document.getElementById(this.name) as HTMLCanvasElement).getContext('2d');

        switch (this.type) {
            case 'position':
                this.mapService.setPositionContext(ctx, this.droneUUID);
                break;
            case 'obstacle':
                this.mapService.setObstacleContext(ctx);
                break;

            case 'path':
                this.mapService.setPathContext(ctx, this.droneUUID);
                break;
        }
    }
}
