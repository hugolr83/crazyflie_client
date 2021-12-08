import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonApiService, DroneType, Log, Mission } from '@backend/api-client';
import { of } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { LogComponent } from './log.component';

describe('LogComponent', () => {
    let component: LogComponent;
    let fixture: ComponentFixture<LogComponent>;

    let droneService: jasmine.SpyObj<DroneService>;
    let appService: jasmine.SpyObj<AppService>;
    let communicationService: jasmine.SpyObj<CommonApiService>;

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

    beforeEach(async () => {
        const droneServiceSpy = jasmine.createSpyObj('DroneService', ['getLogs']);
        const appServiceSpy = jasmine.createSpyObj('AppService', ['getActiveMission']);
        communicationService = jasmine.createSpyObj('CommonApiService', ['getMissions']);

        await TestBed.configureTestingModule({
            declarations: [LogComponent],
            imports: [HttpClientTestingModule],
            providers: [
                { provide: DroneService, usevalue: droneServiceSpy },
                { provide: AppService, usevalue: appServiceSpy },
                { provide: CommonApiService, usevalue: communicationService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LogComponent);
        component = fixture.componentInstance;
        droneService = TestBed.inject(DroneService) as jasmine.SpyObj<DroneService>;
        appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('updateLogs should getLogs if logs are empty', () => {
        component.logs = [];
        spyOn<any>(droneService, 'getLogs').and.returnValues(of(logs));

        component.updateLogs();

        expect(droneService.getLogs).toHaveBeenCalled();
    });

    it('updateLogs should getLogs if mission id is not active mission', () => {
        component.logs = [{ id: 0, mission_id: 0, timestamp: '4535345', message: 'Test' }];
        appService.activeMission = activeMission1;
        spyOn<any>(droneService, 'getLogs').and.returnValues(of(logs));

        component.updateLogs();

        expect(droneService.getLogs).toHaveBeenCalled();
    });

    it('updateLogs should getLogs if mission id is active mission', () => {
        component.logs = [{ id: 12, mission_id: 0, timestamp: '4535345', message: 'Test' }];
        appService.activeMission = activeMission0;
        spyOn<any>(droneService, 'getLogs').and.returnValues(of(logs));

        component.updateLogs();
        expect(droneService.getLogs).toHaveBeenCalled();
    });

    it('updateLogs should not getLogs if mission id is active mission but getlogs returns undefined', () => {
        component.logs = [{ id: 12, mission_id: 0, timestamp: '4535345', message: 'Test' }];
        appService.activeMission = activeMission0;
        spyOn<any>(droneService, 'getLogs').and.returnValues(of(undefined));

        component.updateLogs();
        expect(droneService.getLogs).toHaveBeenCalled();
    });
});
