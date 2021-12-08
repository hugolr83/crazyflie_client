import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DroneState, DroneType } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';
import { MapService } from 'src/app/services/map/map.service';
import { MissionService } from 'src/app/services/mission/mission.service';
import { MapContainerComponent } from './map-container.component';

describe('MapContainerComponent', () => {
    let component: MapContainerComponent;
    let fixture: ComponentFixture<MapContainerComponent>;

    let appService: jasmine.SpyObj<AppService>;
    let mapService: jasmine.SpyObj<MapService>;
    let missionService: jasmine.SpyObj<MissionService>;

    beforeEach(async () => {
        const appSpy = jasmine.createSpyObj('AppService', [''], {
            connectedDrones: { ARGOS: {}, CRAZYFLIE: {} },
        });
        const spy = jasmine.createSpyObj('MapService', ['loadMap', 'togglePaths', 'drawMap']);
        jasmine.clock().install();
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [MapContainerComponent],
            providers: [
                { provide: AppService, usevalue: appSpy },
                { provide: MapService, usevalue: spy },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MapContainerComponent);
        mapService = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;
        appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
        missionService = TestBed.inject(MissionService) as jasmine.SpyObj<MissionService>;
        
        component = fixture.componentInstance;
        
        fixture.detectChanges();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should drawPosition not exploring', () => {
        spyOn<any>(mapService, 'drawPosition');

        Object.defineProperty(appService, 'connectedDrones', {
            value: {
                ARGOS: {},
                CRAZYFLIE: {
                    0: {
                    fillStyle: 'fill1'
                },},
            },
        });
        Object.defineProperty(appService, 'droneRegistry', {
            value: {
                ARGOS: {},
                CRAZYFLIE: {
                    0: {
                    state: DroneState.Ready,
                    total_distance: 10,
                    id: 0,
                    battery: { charge_percentage: 10 },
                    orientation: { yaw: 1 },
                    position: { x: 0, y: 0, z: 1 },
                    range: { back: 0, bottom: 0, front: 0, left: 0, right: 0, up: 0 },
                    type: DroneType.Argos,
                },},
            },
        });
                
        jasmine.clock().tick(1001);
        
        expect(mapService.drawPosition).toHaveBeenCalled();
    });

    it('should drawMap when exploring', () => {
        spyOn<any>(mapService, 'drawMap');

        Object.defineProperty(appService, 'connectedDrones', {
            value: {
                ARGOS: {},
                CRAZYFLIE: {
                    0: {
                    fillStyle: 'fill1'
                },},
            },
        });
        Object.defineProperty(appService, 'droneRegistry', {
            value: {
                ARGOS: {},
                CRAZYFLIE: {
                    0: {
                    state: DroneState.Exploring,
                    total_distance: 10,
                    id: 0,
                    battery: { charge_percentage: 10 },
                    orientation: { yaw: 1 },
                    position: { x: 0, y: 0, z: 1 },
                    range: { back: 0, bottom: 0, front: 0, left: 0, right: 0, up: 0 },
                    type: DroneType.Argos,
                },},
            },
        });
                
        jasmine.clock().tick(1001);
        
        expect(mapService.drawMap).toHaveBeenCalled();
    });

    it('should do no op when not ready', () => {
        spyOn<any>(mapService, 'drawMap');

        Object.defineProperty(appService, 'connectedDrones', {
            value: {
                ARGOS: {},
                CRAZYFLIE: {
                    0: {
                    fillStyle: 'fill1'
                },},
            },
        });
        Object.defineProperty(appService, 'droneRegistry', {
            value: {
                ARGOS: {},
                CRAZYFLIE: {
                    0: {
                    state: DroneState.NotReady,
                    total_distance: 10,
                    id: 0,
                    battery: { charge_percentage: 10 },
                    orientation: { yaw: 1 },
                    position: { x: 0, y: 0, z: 1 },
                    range: { back: 0, bottom: 0, front: 0, left: 0, right: 0, up: 0 },
                    type: DroneType.Argos,
                },},
            },
        });
                
        jasmine.clock().tick(1001);
        
        expect(mapService.drawMap).not.toHaveBeenCalled();
        expect(mapService.drawMap).not.toHaveBeenCalled();
    });

    it('ngOninit should call loadMap', () => {
        spyOn<any>(mapService, 'loadMap');
        appService.activeMission = {} as any;
        mapService.loadMap.and.returnValue();

        component.ngOnInit();
        fixture.detectChanges();

        expect(mapService.loadMap).toHaveBeenCalled();
    });

    it('currentMissionID should get current mission id', () => {
        appService.activeMission = {id: 1} as any;

        const value = component.currentMissionID;

        expect(value).toBe(1);
    });

    it('currentMissionID should get no mission id', () => {
        appService.activeMission = undefined;

        const value = component.currentMissionID;

        expect(value).toBeUndefined();
    });
});
