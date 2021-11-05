import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app/app.service';
import { CommunicationService } from 'src/app/services/communication/communication.service';
import { MapService } from 'src/app/services/map/map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit, OnInit {
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
    ngOnInit(): void {
        console.log('init type', this.appService.droneType);
    }

    ngAfterViewInit(): void {
        console.log(
            'setting canvas ',
            this.name,
            (document.getElementById(this.name) as HTMLCanvasElement).getContext('2d'),
        );
        const ctx = (document.getElementById(this.name) as HTMLCanvasElement).getContext('2d');

        this.mapService.setContext(ctx);
    }

    get isSpinning(): boolean {
        return Object.keys(this.appService.droneRegistry[this.appService.droneType]).length === 0;
    }
}
