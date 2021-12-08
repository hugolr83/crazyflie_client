/* tslint:disable:no-unused-variable */

import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
    CommonApiService,
    CrazyflieApiService,
    DroneState,
    DroneType,
    Mission,
    MissionState,
} from '@backend/api-client';
import { of } from 'rxjs';
import { AppService } from '../app/app.service';
import { MapService } from '../map/map.service';
import { DroneService } from './drone.service';

describe('DroneService', () => {
    let service: DroneService;
    let commonApiService: jasmine.SpyObj<CommonApiService>;
    let appService: jasmine.SpyObj<AppService>;
    let crazyflieApiService: jasmine.SpyObj<CrazyflieApiService>;
    let mapService: jasmine.SpyObj<MapService>;

    let activeMission0: Mission = {
        id: 0,
        drone_type: DroneType.Argos,
        total_distance: 10,
        starting_time: 'time0',
    };

    beforeEach(() => {
        const commSpy = jasmine.createSpyObj('CommonApiService', ['createMission']);
        const appSpy = jasmine.createSpyObj('AppService', ['getActiveMission'], { droneType: DroneType.Argos });
        const crSpy = jasmine.createSpyObj('CrazyflieApiService', ['']);
        const mapSpy = jasmine.createSpyObj('MapService', ['']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                DroneService,
                { provide: CommonApiService, usevalue: commSpy },
                { provide: AppService, usevalue: appSpy },
                { provide: CrazyflieApiService, usevalue: crSpy },
                { provide: MapService, usevalue: mapSpy },
            ],
        });

        service = TestBed.inject(DroneService);

        commonApiService = TestBed.inject(CommonApiService) as jasmine.SpyObj<CommonApiService>;
        crazyflieApiService = TestBed.inject(CrazyflieApiService) as jasmine.SpyObj<CrazyflieApiService>;
        appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
        mapService = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;

        appService.droneRegistry = {
            ARGOS: {
                0: {
                    state: DroneState.Ready,
                    total_distance: 10,
                    id: 0,
                    battery: { charge_percentage: 10 },
                    orientation: { yaw: 1 },
                    position: { x: 0, y: 0, z: 1 },
                    range: { back: 0, bottom: 0, front: 0, left: 0, right: 0, up: 0 },
                    type: DroneType.Argos,
                },
            },
            CRAZYFLIE: {},
        };

        const mockMission: Mission = {
            drone_type: DroneType.Argos,
            id: 0,
            starting_time: '',
            ending_time: '',
            total_distance: 10,
            state: MissionState.Created,
        };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should start mission and call api', () => {
        // test subscribe
        spyOn<any>(commonApiService, 'createMission').and.returnValue(of());
        // spyOn<any>(service, 'callApi');

        service.startMission();

        // expect(service['callApi']).toHaveBeenCalled();
    });

    it('should end mission should save map and call api', () => {
        spyOn<any>(commonApiService, 'endMission').and.returnValue(of(new HttpResponse()));
        spyOn<any>(service, 'saveMap');

        service.endMission();

        expect(service['saveMap']).toHaveBeenCalled();
    });

    it('should return to base', () => {
        spyOn<any>(service, 'saveMap');
        spyOn<any>(service, 'callApi');

        service.returnToBase();

        expect(service['saveMap']).toHaveBeenCalled();
        expect(service['callApi']).toHaveBeenCalled();
    });

    it('showInputs should trigger inputIsShown to false', () => {
        service.inputIsShown = true;
        service.showInput();
        expect(service.inputIsShown).toEqual(false);
    });

    it('showInputs should trigger inputIsShown to true', () => {
        service.inputIsShown = false;
        service.showInput();
        expect(service.inputIsShown).toEqual(true);
    });

    it('should get Argos as drone type', () => {
        appService.droneType = DroneType.Argos;
        expect(service.droneType).toEqual(DroneType.Argos);
    });

    it('should get Crazyflie as drone type', () => {
        appService.droneType = DroneType.Crazyflie;
        expect(service.droneType).toEqual(DroneType.Crazyflie);
    });

    it('stateIsReady should return false is not connected', () => {
        Object.defineProperty(service, 'isNotConnected', { value: true });

        expect(service.stateIsReady).toBeFalse();
    });

    it('stateIsReady should return true if all state read', () => {
        Object.defineProperty(service, 'isNotConnected', { value: false });
        Object.defineProperty(service, 'droneType', { value: DroneType.Argos });
        Object.defineProperty(appService, 'droneRegistry', {
            value: {
                ARGOS: {
                    0: {
                        state: DroneState.Ready,
                        total_distance: 10,
                        id: 0,
                        battery: { charge_percentage: 10 },
                        orientation: { yaw: 1 },
                        position: { x: 0, y: 0, z: 1 },
                        range: { back: 0, bottom: 0, front: 0, left: 0, right: 0, up: 0 },
                        type: DroneType.Argos,
                    },
                },
                CRAZYFLIE: {},
            },
        });

        expect(service.stateIsReady).toBeTrue();
    });

    it('stateIsNotReady should return true if all state not ready', () => {
        Object.defineProperty(service, 'isNotConnected', { value: false });
        Object.defineProperty(service, 'droneType', { value: DroneType.Argos });
        Object.defineProperty(appService, 'droneRegistry', {
            value: {
                ARGOS: {
                    0: {
                        state: DroneState.NotReady,
                        total_distance: 10,
                        id: 0,
                        battery: { charge_percentage: 10 },
                        orientation: { yaw: 1 },
                        position: { x: 0, y: 0, z: 1 },
                        range: { back: 0, bottom: 0, front: 0, left: 0, right: 0, up: 0 },
                        type: DroneType.Argos,
                    },
                },
                CRAZYFLIE: {},
            },
        });

        expect(service.stateIsNotReady).toBeTrue();
    });

    it('saveMap should do not create map if no active mission', () => {
        spyOn<any>(commonApiService, 'createMap').and.returnValue(of());
        appService.activeMission = undefined;

        service.saveMap();

        expect(commonApiService.createMap).not.toHaveBeenCalled();
    });

    it('saveMap should create map if active mission', () => {
        spyOn<any>(commonApiService, 'createMap').and.returnValue(of());
        spyOn<any>(mapService, 'mapToImage').and.returnValue({});

        appService.activeMission = {
            drone_type: DroneType.Argos,
            id: 0,
            starting_time: '',
            ending_time: '',
            total_distance: 10,
            state: MissionState.Created,
        };

        service.saveMap();

        expect(commonApiService.createMap).toHaveBeenCalled();
    });
});
