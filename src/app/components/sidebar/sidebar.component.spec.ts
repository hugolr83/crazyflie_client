import { Overlay } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
        appService = jasmine.createSpyObj('AppService', ['']);
        logService = jasmine.createSpyObj('LogService', [''], ['logIsShown']);
        missionService = jasmine.createSpyObj('MissionService', ['']);
        modalService = jasmine.createSpyObj('NzModalService', ['']);
        viewContainerRef = jasmine.createSpyObj('ViewContainerRef', ['']);
        overlaySpy = jasmine.createSpyObj('Overlay', ['']);
        droneService = jasmine.createSpyObj('DroneService', ['']);
        const spy = jasmine.createSpyObj('MapService', ['loadMap', 'togglePaths', 'drawMap']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [SidebarComponent],
            providers: [
                { provide: AppService, usevalue: appService },
                { provide: LogService, usevalue: logService },
                { provide: MissionService, usevalue: missionService },
                { provide: NzModalService, usevalue: modalService },
                { provide: DroneService, usevalue: droneService },
                { provide: ViewContainerRef, usevalue: viewContainerRef },
                { provide: Overlay, usevalue: overlaySpy },
                { provide: HttpClient },
                { provide: HttpClientTestingModule },
                { provide: MapService, usevalue: spy },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarComponent);
        mapService = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;

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
});
