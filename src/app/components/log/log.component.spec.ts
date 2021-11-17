import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DroneType, Log, Mission } from '@backend/api-client';
import { of } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { LogComponent } from './log.component';

describe('LogComponent', () => {
    let component: LogComponent;
    let fixture: ComponentFixture<LogComponent>;

    let droneService: jasmine.SpyObj<DroneService>;
    let appService: jasmine.SpyObj<AppService>;
    let appServiceStub: AppService;

    let logs: Log[] = [{ id: 12, mission_id: 0, timestamp: '4535345', message: 'Test' }];
    let activeMission0: Mission = {
        id: 0,
        drone_type: DroneType.Argos,
        starting_time: 'time1',
    };

    let activeMission1: Mission = {
        id: 1,
        drone_type: DroneType.Crazyflie,
        starting_time: 'time2',
    };

    beforeEach(async () => {
        droneService = jasmine.createSpyObj('DroneService', ['getLogs']);
        appService = jasmine.createSpyObj('AppService', ['getActiveMission']);

        await TestBed.configureTestingModule({
            declarations: [LogComponent],
            imports: [HttpClientTestingModule],
            providers: [
                { provide: DroneService, usevalue: droneService },
                { provide: AppService, usevalue: appService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        appServiceStub = TestBed.inject(AppService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('updateLogs should getLogs if logs are empty', () => {
        component.logs = [];
        droneService.getLogs.and.returnValue(of(logs));

        component.updateLogs();

        expect(droneService.getLogs).not.toHaveBeenCalled();
    });

    it('updateLogs should getLogs if mission id is not active mission', () => {
        component.logs = [{ id: 0, mission_id: 0, timestamp: '4535345', message: 'Test' }];
        appService.activeMission = activeMission1;
        droneService.getLogs.and.returnValue(of(logs));

        component.updateLogs();

        expect(droneService.getLogs).not.toHaveBeenCalled();
    });

    it('updateLogs should not getLogs if mission id is not active mission', () => {
        component.logs = [{ id: 12, mission_id: 0, timestamp: '4535345', message: 'Test' }];
        appService.activeMission = activeMission1;
        droneService.getLogs.and.returnValue(of(logs));

        component.updateLogs();
        expect(droneService.getLogs).not.toHaveBeenCalled();
    });

    it('showLogs should trigger isLogsHidden false to true', () => {
        appServiceStub.isLogsHidden = false;
        component.showLogs();
        expect(appServiceStub.isLogsHidden).toEqual(true);
    });

    it('showLogs should trigger isLogsHidden true to false', () => {
        appServiceStub.isLogsHidden = true;
        component.showLogs();
        expect(appServiceStub.isLogsHidden).toEqual(false);
    });

    it('call should set activeMission to the chosen mission', () => {
        let currentMission: Mission = {
            id: 2,
            drone_type: DroneType.Crazyflie,
            starting_time: 'time3',
        };
        component.call(currentMission);
        expect(appServiceStub.activeMission).toEqual(currentMission);
        expect(appServiceStub.isLogsHidden).toBeFalse();
    });
});
