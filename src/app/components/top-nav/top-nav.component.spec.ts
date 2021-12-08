import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DroneType } from '@backend/api-client';
import { AppModule } from 'src/app.module';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { LogService } from 'src/app/services/log/log.service';
import { MapService } from 'src/app/services/map/map.service';
import { MissionService } from 'src/app/services/mission/mission.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopNavComponent } from './top-nav.component';

describe('TopNavComponent', () => {
    let component: TopNavComponent;
    let fixture: ComponentFixture<TopNavComponent>;
    let appService: jasmine.SpyObj<AppService>;
    let missionService: jasmine.SpyObj<MissionService>;
    let logService: jasmine.SpyObj<LogService>;
    let sidebarComponent: jasmine.SpyObj<SidebarComponent>;
    let appServiceStub: AppService;
    let logServiceStub: LogService;
    let missionServiceStub: MissionService;
    let mapService: jasmine.SpyObj<MapService>;
    let dorneServiceStub: DroneService;

    beforeEach(async () => {
        appService = jasmine.createSpyObj('AppService', ['setDroneType']);
        const spy = jasmine.createSpyObj('MapService', ['loadMap', 'togglePaths', 'drawMap']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, AppModule],
            declarations: [TopNavComponent],
            providers: [
                { provide: AppService, usevalue: appService },
                { provide: MissionService, usevalue: missionService },
                { provide: LogService, usevalue: logService },
                { provide: SidebarComponent, usevalue: sidebarComponent },
                { provide: MapService, usevalue: spy },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TopNavComponent);
        mapService = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;

        component = fixture.componentInstance;
        fixture.detectChanges();

        appServiceStub = TestBed.inject(AppService);
        logServiceStub = TestBed.inject(LogService);
        missionServiceStub = TestBed.inject(MissionService);
        dorneServiceStub = TestBed.inject(DroneService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('showLogs should trigger logIsShown false to true', () => {
        logServiceStub.logIsShown = false;
        component.showLogs();
        expect(logServiceStub.logIsShown).toEqual(true);
    });

    it('showLogs should trigger isLogsHidden true to false', () => {
        logServiceStub.logIsShown = true;
        component.showLogs();
        expect(logServiceStub.logIsShown).toEqual(false);
    });

    it('should return true if we are in simulation', () => {
        missionServiceStub.isSimulationSelected = true;
        const spy = spyOnProperty(component, 'isSimulationSelected').and.callThrough();
        expect(component.isSimulationSelected).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if we use crazyflie drones', () => {
        missionServiceStub.isSimulationSelected = false;
        const spy = spyOnProperty(component, 'isSimulationSelected').and.callThrough();
        expect(component.isSimulationSelected).toEqual(false);
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
        missionServiceStub.isMissionStarted = false;
        const spy = spyOnProperty(component, 'isMissionStarted').and.callThrough();
        expect(component.isMissionStarted).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if a mission is started', () => {
        missionServiceStub.isMissionStarted = true;
        const spy = spyOnProperty(component, 'isMissionStarted').and.callThrough();
        expect(component.isMissionStarted).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if drones are returning to base', () => {
        missionServiceStub.isReturnToBaseDisabled = true;
        const spy = spyOnProperty(component, 'isReturnToBaseDisabled').and.callThrough();
        expect(component.isReturnToBaseDisabled).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if drone are not returning to base', () => {
        missionServiceStub.isMissionStarted = false;
        const spy = spyOnProperty(component, 'isReturnToBaseDisabled').and.callThrough();
        expect(component.isReturnToBaseDisabled).toEqual(false);
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
        appServiceStub.droneType = DroneType.Crazyflie;
        spyOn<any>(appServiceStub, 'setDroneType');

        component.toggleDroneType();

        expect(appServiceStub.setDroneType).toHaveBeenCalledWith(DroneType.Argos);
    });

    it('toggleDroneType should call service', () => {
        appServiceStub.droneType = DroneType.Argos;
        spyOn<any>(appServiceStub, 'setDroneType');

        component.toggleDroneType();

        expect(appServiceStub.setDroneType).toHaveBeenCalledWith(DroneType.Crazyflie);
    });

    it('p2pIsEnabled should call service', () => {
        const expectedValue = missionServiceStub.p2pIsEnabled;

        const value = component.p2pIsEnabled;

        expect(expectedValue).toBe(value);
    });

    it('stateIsReady should call service', () => {
        const expectedValue = dorneServiceStub.stateIsReady;

        const value = component.stateIsReady;

        expect(expectedValue).toBe(value);
    });
});
