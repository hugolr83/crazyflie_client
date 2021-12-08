import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CrazyflieApiService, DroneType } from '@backend/api-client';
import { of } from 'rxjs';
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
    let crService: jasmine.SpyObj<CrazyflieApiService>;
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
        const crSpy = jasmine.createSpyObj('CrazyflieApiService', ['']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                MissionService,
                { provide: LogService, usevalue: logSpy },
                { provide: DroneService, usevalue: droneSpy },
                { provide: AppService, usevalue: appSpy },
                { provide: MapService, usevalue: mapSpy },
                { provide: CrazyflieApiService, usevalue: crSpy },
            ],
        });

        service = TestBed.inject(MissionService);
        mapService = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;
        logService = TestBed.inject(LogService) as jasmine.SpyObj<LogService>;
        droneService = TestBed.inject(DroneService) as jasmine.SpyObj<DroneService>;
        appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
        crService = TestBed.inject(CrazyflieApiService) as jasmine.SpyObj<CrazyflieApiService>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should start mission', () => {
        const spyDrones = spyOn(droneService, 'startMission').and.callThrough();
        spyOn<any>(mapService, 'clearMap');

        service.startMission();

        expect(droneService.inputIsShown).toEqual(false);
        expect(service.isMissionStarted).toEqual(true);
        expect(service.isReturnToBaseDisabled).toEqual(false);
        expect(spyDrones).toHaveBeenCalled();
    });

    it('should end mission', () => {
        const spyDrones = spyOn(droneService, 'endMission').and.callThrough();
        service.endMission();
        expect(service.isMissionStarted).toEqual(false);
        expect(service.isReturnToBaseDisabled).toEqual(true);
        expect(spyDrones).toHaveBeenCalled();
    });

    it('should return to base', () => {
        const spyDrones = spyOn(droneService, 'returnToBase').and.callThrough();
        service.returnToBase();
        expect(service.isMissionStarted).toEqual(false);
        expect(service.isReturnToBaseDisabled).toEqual(true);
        expect(spyDrones).toHaveBeenCalled();
    });

    it('activateP2P should do nothing if no active mission', () => {
        appService.activeMission = undefined;
        spyOn<any>(crService, 'activateP2p');

        service.activateP2P();

        expect(crService.activateP2p).not.toHaveBeenCalled();
    });

    it('activateP2P should call crazyflie api if active mission', () => {
        appService.activeMission = {
            drone_type: DroneType.Argos,
            id: 1,
            starting_time: '',
            total_distance: 10,
            ending_time: '',
        };
        spyOn<any>(crService, 'activateP2p');
        crService.activateP2p.and.returnValue(of());

        service.activateP2P();

        expect(crService.activateP2p).toHaveBeenCalled();
    });

    it('getter isNotConnected should get from droneService', () => {
        Object.defineProperty(droneService, 'isNotConnected', { value: true });

        expect(service.isNotConnected).toBeTrue();
    });

    it('getter droneType should get from appService', () => {
        Object.defineProperty(appService, 'droneType', { value: DroneType.Argos });

        expect(service.droneType).toEqual(DroneType.Argos);
    });
});
