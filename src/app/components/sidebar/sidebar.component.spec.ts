import { Overlay } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    let overlaySpy: jasmine.SpyObj<Overlay>;

    beforeEach(async () => {
        appService = jasmine.createSpyObj('AppService', ['']);
        logService = jasmine.createSpyObj('LogService', [''], ['logIsShown']);
        missionService = jasmine.createSpyObj('MissionService', [''], ['isSimulation', 'missionIsStarted']);
        modalService = jasmine.createSpyObj('NzModalService', ['']);
        viewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['']);
        overlaySpy = jasmine.createSpyObj('Overlay', ['']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [SidebarComponent],
            providers: [
                { provide: AppService, usevalue: appService },
                { provide: LogService, usevalue: logService },
                { provide: MissionService, usevalue: missionService },
                { provide: NzModalService, usevalue: modalService },
                { provide: ViewContainerRef, usevalue: viewContainerRef },
                { provide: Overlay, usevalue: overlaySpy },
                { provide: HttpClient },
                { provide: HttpClientTestingModule },
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

    it('showLogs should trigger logIsShown false to true', () => {
        const logServiceStub = TestBed.inject(LogService);
        logServiceStub.logIsShown = false;
        component.showLogs();
        expect(logServiceStub.logIsShown).toEqual(true);
    });

    it('showLogs should trigger isLogsHidden true to false', () => {
        const logServiceStub = TestBed.inject(LogService);
        logServiceStub.logIsShown = true;
        component.showLogs();
        expect(logServiceStub.logIsShown).toEqual(false);
    });

    it('should return true if we are in simulation', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.isSimulation = true;
        const spy = spyOnProperty(component, 'isSimulation').and.callThrough();
        expect(component.isSimulation).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if we use crazyflie drones', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.isSimulation = false;
        const spy = spyOnProperty(component, 'isSimulation').and.callThrough();
        expect(component.isSimulation).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if we can see logs', () => {
        const logServiceStub = TestBed.inject(LogService);
        logServiceStub.logIsShown = true;
        const spy = spyOnProperty(component, 'logIsShown').and.callThrough();
        expect(component.logIsShown).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if we do not see logs', () => {
        const logServiceStub = TestBed.inject(LogService);
        logServiceStub.logIsShown = false;
        const spy = spyOnProperty(component, 'logIsShown').and.callThrough();
        expect(component.logIsShown).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if there is currently no mission', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.missionIsStarted = false;
        const spy = spyOnProperty(component, 'missionIsStarted').and.callThrough();
        expect(component.missionIsStarted).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if a mission is started', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.missionIsStarted = true;
        const spy = spyOnProperty(component, 'missionIsStarted').and.callThrough();
        expect(component.missionIsStarted).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if drones are returning to base', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.returnToBaseActivated = true;
        const spy = spyOnProperty(component, 'returnToBaseActivated').and.callThrough();
        expect(component.returnToBaseActivated).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if drone are not returning to base', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.returnToBaseActivated = false;
        const spy = spyOnProperty(component, 'returnToBaseActivated').and.callThrough();
        expect(component.returnToBaseActivated).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });
});
