/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommonApiService, CrazyflieApiService, DroneType, Mission, MissionState } from '@backend/api-client';
import { AppService } from '../app/app.service';
import { DroneService } from './drone.service';

describe('DroneService', () => {
    let service: DroneService;
    let commonApiService: jasmine.SpyObj<CommonApiService>;
    let appService: jasmine.SpyObj<AppService>;
    let crazyflieApiService: jasmine.SpyObj<CrazyflieApiService>;

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

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                DroneService,
                { provide: CommonApiService, usevalue: commSpy },
                { provide: AppService, usevalue: appSpy },
                { provide: CrazyflieApiService, usevalue: crSpy },
            ],
        });

        service = TestBed.inject(DroneService);

        commonApiService = TestBed.inject(CommonApiService) as jasmine.SpyObj<CommonApiService>;
        crazyflieApiService = TestBed.inject(CrazyflieApiService) as jasmine.SpyObj<CrazyflieApiService>;
        appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;

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

    // it('should startMission', () => {
    //     commonApiService.createMission.and.returnValue(of());

    //     service.startMission();

    //     expect(service['callApi']).toHaveBeenCalled;
    // });

    it('should end mission', () => {
        const spy = spyOn(service, 'endMission').and.callThrough();
        service.endMission();
        expect(spy).toHaveBeenCalled();
    });

    it('should return to base', () => {
        const spy = spyOn(service, 'returnToBase').and.callThrough();
        service.returnToBase();
        expect(spy).toHaveBeenCalled();
    });

    it('should set p2pIsActivated to true', () => {
        service.activateP2P();
        expect(service.p2pIsActivated).toEqual(true);
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
});
