import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, MapService } from 'src/app/services/map/map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
    @ViewChild('mapCanvas') canvas!: ElementRef;
    @Input() name!: string;
    @Input() type!: 'path' | 'position' | 'obstacle';
    @Input() zindex!: string;
    @Input() droneID!: number;

    DEFAULT_CANVAS_WIDTH = DEFAULT_CANVAS_WIDTH;
    DEFAULT_CANVAS_HEIGHT = DEFAULT_CANVAS_HEIGHT;

    constructor(private mapService: MapService, public appService: AppService, public elementRef: ElementRef) {}

    ngAfterViewInit(): void {
        const ctx = (document.getElementById(this.name) as HTMLCanvasElement).getContext('2d');
        console.log('ng after view init', this.type);
        switch (this.type) {
            case 'position':
                this.mapService.setPositionContext(ctx, this.droneID);
                break;
            case 'obstacle':
                console.log('excute taht shit');
                this.mapService.setObstacleContext(ctx);
                break;

            case 'path':
                this.mapService.setPathContext(ctx, this.droneID);
                break;
        }
    }
}
