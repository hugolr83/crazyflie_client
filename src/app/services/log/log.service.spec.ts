import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DroneType, Log, Mission } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { MissionTimestamp } from 'src/app/tools/interfaces';
import { LogService } from './log.service';

describe('LogService', () => {
    let service: LogService;
    let stamp: MissionTimestamp = {
        date: '2021-12-5',
        time: '09:19:24',
        date_time: '[2021-12-5]        14:19:24        ',
    };
    let droneService: jasmine.SpyObj<DroneService>;
    let appService: jasmine.SpyObj<AppService>;
    let appServiceStub: AppService;

    let logs: Log[] = [{ id: 12, mission_id: 0, timestamp: '4535345', message: 'Test' }];
    let activeMission0: Mission = {
        id: 0,
        drone_type: DroneType.Argos,
        starting_time: 'time1',
        total_distance: 10,
    };

    let activeMission1: Mission = {
        id: 1,
        drone_type: DroneType.Crazyflie,
        starting_time: 'time2',
        total_distance: 10,
    };
    beforeEach(() => {
        droneService = jasmine.createSpyObj('DroneService', ['getLogs']);
        appService = jasmine.createSpyObj('AppService', ['getActiveMission']);
        TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
        service = TestBed.inject(LogService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should convert ms to time', () => {
        let msTime: number = 51000000;
        service.msToTime(msTime);
        expect(service.msToTime(msTime)).toEqual('14:10:00');
    });

    it('should convert ms to time under 10', () => {
        let msTime: number = 32888000;
        service.msToTime(msTime);
        expect(service.msToTime(msTime)).toEqual('09:08:08');
    });

    it('should format time', () => {
        let date: Date = new Date('Sun, 05 Dec 2021 14:19:24');
        let timestamp: string = date.toLocaleString();
        const result = service.formatTimestamp(timestamp);
        expect(result.date_time).toMatch(/[ ]/);
    });

    it('should format time under 10', () => {
        let date: Date = new Date('Sun, 04 Dec 2021 08:05:02 UTC');
        let timestamp: string = date.toLocaleString();
        const result = service.formatTimestamp(timestamp);
        expect(result.date_time).toMatch(/[ ]/);
    });
});
