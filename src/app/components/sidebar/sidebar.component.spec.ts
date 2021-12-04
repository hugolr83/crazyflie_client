import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DroneType } from '@backend/api-client';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppService } from 'src/app/services/app/app.service';
import { LogService } from 'src/app/services/log/log.service';
import { MissionService } from 'src/app/services/mission/mission.service';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;

    let appService: jasmine.SpyObj<AppService>;
    let logService: jasmine.SpyObj<LogService>;
    let missionService: jasmine.SpyObj<MissionService>;
    let modalService: jasmine.SpyObj<NzModalService>;
    let viewContainerRef: jasmine.SpyObj<ViewContainerRef>;

    let logServiceStub: LogService;
    let appServiceStub: AppService;
    let missionServiceStub: MissionService;

    beforeEach(async () => {
        appService = jasmine.createSpyObj('AppService', ['']);
        logService = jasmine.createSpyObj('LogService', ['']);
        missionService = jasmine.createSpyObj('MissionService', ['']);
        modalService = jasmine.createSpyObj('NzModalService', ['']);
        viewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['']);

        logServiceStub = TestBed.inject(LogService);
        appServiceStub = TestBed.inject(AppService);
        missionServiceStub = TestBed.inject(MissionService);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [SidebarComponent],
            providers: [
                { provide: AppService, usevalue: appService },
                { provide: LogService, usevalue: logService },
                { provide: MissionService, usevalue: missionService },
                { provide: NzModalService, usevalue: modalService },
                { provide: ViewContainerRef, usevalue: viewContainerRef },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show logs', () => {
        logServiceStub.logIsShown = false;
        component.showLogs();
        expect(logServiceStub.logIsShown).toBeTrue();
    });

    it('should hide logs', () => {
        logServiceStub.logIsShown = true;
        component.showLogs();
        expect(logServiceStub.logIsShown).toBeFalse();
    });

    it('toggleDroneType should set drone type to argos', () => {
        appServiceStub.droneType = DroneType.Crazyflie;
        expect(appService.droneType).toBe(DroneType.Argos);
        expect(component.isSimulation).toEqual(true);
    });

    it('toggleDroneType should set drone type to crazyflie', () => {
        appServiceStub.droneType = DroneType.Argos;
        expect(appService.droneType).toBe(DroneType.Crazyflie);
        expect(component.isSimulation).toEqual(false);
    });

    it('should return true if we are in simulation', () => {
        appService.droneType = DroneType.Crazyflie;
        const spy = spyOnProperty(component, 'isSimulation').and.callThrough();
        expect(component.isSimulation).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if we use crazyflie drones', () => {
        appService.droneType != DroneType.Crazyflie;
        const spy = spyOnProperty(component, 'isSimulation').and.callThrough();
        expect(component.isSimulation).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if we can see logs', () => {
        logServiceStub.logIsShown = true;
        const spy = spyOnProperty(component, 'logIsShown').and.callThrough();
        expect(component.logIsShown).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if we do not see logs', () => {
        logServiceStub.logIsShown = false;
        const spy = spyOnProperty(component, 'logIsShown').and.callThrough();
        expect(component.logIsShown).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if there is currently no mission', () => {
        missionServiceStub.missionIsStarted = false;
        const spy = spyOnProperty(component, 'missionIsStarted').and.callThrough();
        expect(component.missionIsStarted).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if a mission is started', () => {
        missionServiceStub.missionIsStarted = true;
        const spy = spyOnProperty(component, 'missionIsStarted').and.callThrough();
        expect(component.missionIsStarted).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if drones are returning to base', () => {
        missionServiceStub.returnToBaseActivated = true;
        const spy = spyOnProperty(component, 'returnToBaseActivated').and.callThrough();
        expect(component.returnToBaseActivated).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if drone are not returning to base', () => {
        missionServiceStub.returnToBaseActivated = false;
        const spy = spyOnProperty(component, 'returnToBaseActivated').and.callThrough();
        expect(component.returnToBaseActivated).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });
});
