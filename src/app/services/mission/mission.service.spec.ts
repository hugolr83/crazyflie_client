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

    it('should start mission', () => {
        const spyLogs = spyOn(logService, 'startGettingLogs').and.callThrough();
        const spyDrones = spyOn(droneService, 'startMission').and.callThrough();
        spyOn<any>(mapService, 'clearMap');

        service.startMission();

        expect(droneService.inputIsShown).toEqual(false);
        expect(service.isMissionStarted).toEqual(true);
        expect(service.isReturnToBaseDisabled).toEqual(false);
        expect(logService.loggingIsStopped).toEqual(false);
        expect(spyLogs).toHaveBeenCalled();
        expect(spyDrones).toHaveBeenCalled();
    });

    /*
    startMission(): void {
        this.droneService.inputIsShown = false;
        this.isMissionStarted = true;
        this.isReturnToBaseDisabled = false;
        this.logService.loggingIsStopped = false;
        this.logService.startGettingLogs();
        this.droneService.startMission();
        this.mapService.clearMap();
    }
    */

    it('should end mission', () => {
        const spyDrones = spyOn(droneService, 'endMission').and.callThrough();
        service.endMission();
        expect(service.isMissionStarted).toEqual(false);
        expect(service.isReturnToBaseDisabled).toEqual(true);
        expect(logService.loggingIsStopped).toEqual(true);
        expect(spyDrones).toHaveBeenCalled();
    });

    it('should return to base', () => {
        const spyDrones = spyOn(droneService, 'returnToBase').and.callThrough();
        service.returnToBase();
        expect(service.isMissionStarted).toEqual(false);
        expect(service.isReturnToBaseDisabled).toEqual(true);
        expect(spyDrones).toHaveBeenCalled();
    });
});
