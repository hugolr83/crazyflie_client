/* tslint:disable:no-unused-variable */

import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommonApiService, DroneType, Mission } from '@backend/api-client';
import { of } from 'rxjs';
import { AppService } from '../app/app.service';
import { DroneService } from './drone.service';

describe('DroneService', () => {
    let service: DroneService;
    let commonApiService: jasmine.SpyObj<CommonApiService>;
    let appService: jasmine.SpyObj<AppService>;

    let activeMission0: Mission = {
        id: 0,
        drone_type: DroneType.Argos,
        total_distance: 10,
        starting_time: 'time0',
    };

    beforeEach(() => {
        appService = { ...jasmine.createSpyObj('AppService', ['']) };
        commonApiService = jasmine.createSpyObj('CommonApiService', ['createMission']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: CommonApiService, usevalue: { commonApiService } },
                { provide: AppService, usevalue: { appService } },
            ],
        });

        service = TestBed.inject(DroneService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should startMission', () => {
        commonApiService.createMission.and.returnValue(of(new HttpResponse()));
        service.startMission();
        expect(service['callApi']).toHaveBeenCalled;
    });

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
});
