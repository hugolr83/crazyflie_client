import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AppService } from '../app/app.service';
import { DroneService } from '../drone/drone.service';
import { LogService } from '../log/log.service';
import { MissionService } from './mission.service';

describe('MissionService', () => {
    let service: MissionService;

    let droneService: jasmine.SpyObj<DroneService>;
    let appService: jasmine.SpyObj<AppService>;
    let logService: jasmine.SpyObj<LogService>;

    beforeEach(() => {
        droneService = jasmine.createSpyObj('DroneService', ['startMission', 'endMission', 'returnToBase']);
        appService = jasmine.createSpyObj('AppService', ['']);
        logService = jasmine.createSpyObj('LogService', ['startGettingLogs']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: DroneService, usevalue: { droneService } },
                { provide: AppService, usevalue: { appService } },
                { provide: LogService, usevalue: { logService } },
            ],
        });

        service = TestBed.inject(MissionService);
        droneService = TestBed.inject(DroneService) as jasmine.SpyObj<DroneService>;
        logService = TestBed.inject(LogService) as jasmine.SpyObj<LogService>;
        appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should start mission', () => {
        const spyLogs = spyOn(logService, 'startGettingLogs').and.callThrough();
        const spyDrones = spyOn(droneService, 'startMission').and.callThrough();
        service.startMission();
        expect(droneService.inputIsShown).toEqual(false);
        expect(service.isMissionStarted).toEqual(true);
        expect(service.isReturnToBaseDisabled).toEqual(false);
        expect(logService.loggingIsStopped).toEqual(false);
        expect(spyLogs).toHaveBeenCalled();
        expect(spyDrones).toHaveBeenCalled();
    });

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
