import { Overlay } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DroneType } from '@backend/api-client';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { LogService } from 'src/app/services/log/log.service';
import { MapService } from 'src/app/services/map/map.service';
import { MissionService } from 'src/app/services/mission/mission.service';
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
    let component: SidebarComponent;
    let fixture: ComponentFixture<SidebarComponent>;

    let mapService: jasmine.SpyObj<MapService>;
    let appService: jasmine.SpyObj<AppService>;
    let logService: jasmine.SpyObj<LogService>;
    let missionService: jasmine.SpyObj<MissionService>;
    let modalService: jasmine.SpyObj<NzModalService>;
    let viewContainerRef: jasmine.SpyObj<ViewContainerRef>;
    let droneService: jasmine.SpyObj<DroneService>;
    let overlaySpy: jasmine.SpyObj<Overlay>;

    beforeEach(async () => {
        const appServiceS = jasmine.createSpyObj('AppService', ['']);
        const logServiceS = jasmine.createSpyObj('LogService', [''], ['logIsShown']);
        const missionServiceS = jasmine.createSpyObj('MissionService', ['']);
        const modalServiceS = jasmine.createSpyObj('NzModalService', ['']);
        const viewContainerRefSpy = jasmine.createSpyObj('ViewContainerRef', ['']);
        const overlaySpyS = jasmine.createSpyObj('Overlay', ['']);
        const droneServiceS = jasmine.createSpyObj('DroneService', ['']);
        const spy = jasmine.createSpyObj('MapService', ['loadMap', 'togglePaths', 'drawMap']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [SidebarComponent],
            providers: [
                { provide: AppService, usevalue: appServiceS },
                { provide: LogService, usevalue: logServiceS },
                { provide: MissionService, usevalue: missionServiceS },
                { provide: NzModalService, usevalue: modalServiceS },
                { provide: DroneService, usevalue: droneServiceS },
                { provide: ViewContainerRef, usevalue: viewContainerRefSpy },
                { provide: Overlay, usevalue: overlaySpyS },
                { provide: HttpClient },
                { provide: HttpClientTestingModule },
                { provide: MapService, usevalue: spy },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarComponent);
        mapService = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;
        appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
        droneService = TestBed.inject(DroneService) as jasmine.SpyObj<DroneService>;
        logService = TestBed.inject(LogService) as jasmine.SpyObj<LogService>;
        missionService = TestBed.inject(MissionService) as jasmine.SpyObj<MissionService>;
        modalService = TestBed.inject(NzModalService) as jasmine.SpyObj<NzModalService>;
        overlaySpy = TestBed.inject(Overlay) as jasmine.SpyObj<Overlay>;
        viewContainerRef = TestBed.inject(ViewContainerRef) as jasmine.SpyObj<ViewContainerRef>;

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return true if we are in simulation', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.isSimulationSelected = true;
        const spy = spyOnProperty(component, 'isSimulationSelected').and.callThrough();
        expect(component.isSimulationSelected).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if we use crazyflie drones', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.isSimulationSelected = false;
        const spy = spyOnProperty(component, 'isSimulationSelected').and.callThrough();
        expect(component.isSimulationSelected).toEqual(false);
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

    it('showLogs should trigger inputIsShown to true', () => {
        const droneServiceStub = TestBed.inject(DroneService);
        droneServiceStub.inputIsShown = true;
        const spy = spyOnProperty(component, 'inputIsShown').and.callThrough();
        expect(component.inputIsShown).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('showLogs should trigger inputIsShown to false', () => {
        const droneServiceStub = TestBed.inject(DroneService);
        droneServiceStub.inputIsShown = false;
        const spy = spyOnProperty(component, 'inputIsShown').and.callThrough();
        expect(component.inputIsShown).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if there is currently no mission', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.isReturnToBaseDisabled = false;
        const spy = spyOnProperty(component, 'isReturnToBaseDisabled').and.callThrough();
        expect(component.isReturnToBaseDisabled).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if a mission is started', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.isReturnToBaseDisabled = true;
        const spy = spyOnProperty(component, 'isReturnToBaseDisabled').and.callThrough();
        expect(component.isReturnToBaseDisabled).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if drones are returning to base', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.isReturnToBaseDisabled = true;
        const spy = spyOnProperty(component, 'isReturnToBaseDisabled').and.callThrough();
        expect(component.isReturnToBaseDisabled).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if drone are not returning to base', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.isReturnToBaseDisabled = false;
        const spy = spyOnProperty(component, 'isReturnToBaseDisabled').and.callThrough();
        expect(component.isReturnToBaseDisabled).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('p2p should trigger p2pIsEnabled to false', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.p2pIsEnabled = false;
        const spy = spyOnProperty(component, 'p2pIsEnabled').and.callThrough();
        expect(component.p2pIsEnabled).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('p2p should trigger p2pIsEnabled to true', () => {
        const missionServiceStub = TestBed.inject(MissionService);
        missionServiceStub.p2pIsEnabled = true;
        const spy = spyOnProperty(component, 'p2pIsEnabled').and.callThrough();
        expect(component.p2pIsEnabled).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('togglepath should call service with false', () => {
        spyOn<any>(mapService, 'togglePaths');

        component.togglePaths(false);

        expect(mapService.togglePaths).toHaveBeenCalledWith(false);
    });

    it('togglepath should call service', () => {
        spyOn<any>(mapService, 'togglePaths');

        component.togglePaths(true);

        expect(mapService.togglePaths).toHaveBeenCalledWith(true);
    });

    it('toggleDroneType should call service', () => {
        appService.droneType = DroneType.Crazyflie;
        spyOn<any>(appService, 'setDroneType');

        component.toggleDroneType();

        expect(appService.setDroneType).toHaveBeenCalledWith(DroneType.Argos);
    });

    it('toggleDroneType should call service', () => {
        appService.droneType = DroneType.Argos;
        spyOn<any>(appService, 'setDroneType');

        component.toggleDroneType();

        expect(appService.setDroneType).toHaveBeenCalledWith(DroneType.Crazyflie);
    });

    it('showLogs should toggle value', () => {
        logService.logIsShown = true;

        component.showLogs();

        expect(logService.logIsShown).toBeFalse();
    });

    it('stateIsReady should toggle value', () => {
        const expectedValue = droneService.stateIsReady;

        const value = component.stateIsReady;

        expect(expectedValue).toBe(value);
    });

    it('showHelp should show help', () => {
        spyOn<any>(modalService, 'create');

        component.showHelp();

        expect(modalService.create).toHaveBeenCalled();
    });

    it('showInformation should show info', () => {
        spyOn<any>(modalService, 'create');

        component.showInformation();

        expect(modalService.create).toHaveBeenCalled();
    });

    it('showHistory should show history', () => {
        spyOn<any>(modalService, 'create');

        component.showHistory();

        expect(modalService.create).toHaveBeenCalled();
    });

    it('droneType should get type of drone', () => {
        const expectedValue = appService.droneType;

        const value = component.droneType;

        expect(expectedValue).toBe(value);
    });
});
