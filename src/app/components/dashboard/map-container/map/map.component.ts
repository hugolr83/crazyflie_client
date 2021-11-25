import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
import { CommunicationService } from 'src/app/services/communication/communication.service';
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

    constructor(
        private mapService: MapService,
        private commService: CommunicationService,
        public appService: AppService,
        public elementRef: ElementRef,
    ) {
        this.totalProgress = 80;
    }

    ngAfterViewInit(): void {
        const ctx = (document.getElementById(this.name) as HTMLCanvasElement).getContext('2d');
        this.mapService.setContext(ctx);
    }
}
