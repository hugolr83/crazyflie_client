import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppService } from '../app/app.service';
import { DroneService } from '../drone/drone.service';
import { LogService } from '../log/log.service';
import { MapService } from '../map/map.service';
import { MissionService } from './mission.service';

describe('MissionService', () => {
    let logService: jasmine.SpyObj<LogService>;
    let droneService: jasmine.SpyObj<DroneService>;
    let appService: jasmine.SpyObj<AppService>;
    let mapService: jasmine.SpyObj<MapService>;
    let context: CanvasRenderingContext2D;

    let canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;

    let service: MissionService;

    beforeEach(() => {
        context = canvas.getContext('2d') as CanvasRenderingContext2D;

        const mapSpy = jasmine.createSpyObj('MapService', ['clearMap']);
        const logSpy = jasmine.createSpyObj('LogService', ['']);
        const droneSpy = jasmine.createSpyObj('DroneService', ['']);
        const appSpy = jasmine.createSpyObj('AppService', ['']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                MissionService,
                { provide: LogService, usevalue: logSpy },
                { provide: DroneService, usevalue: droneSpy },
                { provide: AppService, usevalue: appSpy },
                { provide: MapService, usevalue: mapSpy },
            ],
        });
        service = TestBed.inject(MissionService);
        mapService = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;
        logService = TestBed.inject(LogService) as jasmine.SpyObj<LogService>;
        droneService = TestBed.inject(DroneService) as jasmine.SpyObj<DroneService>;
        appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
