import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonApiService, DroneType, Mission, MissionState } from '@backend/api-client';
import { of } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { HistoryService } from 'src/app/services/history/history.service';
import { LogService } from 'src/app/services/log/log.service';
import { MapService } from 'src/app/services/map/map.service';
import { MissionData } from 'src/app/tools/interfaces';
import { HistoryComponent } from './history.component';

describe('HistoryComponent', () => {
    let component: HistoryComponent;
    let fixture: ComponentFixture<HistoryComponent>;

    let appService: jasmine.SpyObj<AppService>;
    let communicationService: jasmine.SpyObj<CommonApiService>;
    let historyService: jasmine.SpyObj<HistoryService>;
    let droneService: jasmine.SpyObj<DroneService>;
    let logService: jasmine.SpyObj<LogService>;
    let mapService: jasmine.SpyObj<MapService>;

    beforeEach(async () => {
        appService = jasmine.createSpyObj('AppService', [''], {
            connectedDrones: { ARGOS: {}, CRAZYFLIE: {} },
        });
        communicationService = jasmine.createSpyObj('CommonApiService', ['getLogs', 'getMap']);
        historyService = jasmine.createSpyObj('HistoryService', ['']);
        droneService = jasmine.createSpyObj('DroneService', ['']);
        logService = jasmine.createSpyObj('LogService', ['']);
        mapService = jasmine.createSpyObj('MapService', ['']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [HistoryComponent],
            providers: [
                { provide: AppService, usevalue: appService },
                { provide: CommonApiService, usevalue: communicationService },
                { provide: HistoryService, usevalue: historyService },
                { provide: DroneService, usevalue: droneService },
                { provide: LogService, usevalue: logService },
                { provide: MapService, usevalue: mapService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit should call getMissions', () => {
        spyOn(component, 'getMissions').and.callThrough();
        component.ngOnInit();
        expect(component.isLoading).toBeTrue();
        expect(component.getMissions).toHaveBeenCalled();
    });

    it('buildMissionData create mission', () => {
        communicationService.getLogs.and.returnValue(of());
        const missions: Mission[] = [
            {
                id: 0,
                drone_type: DroneType.Argos,
                state: MissionState.Created,
                total_distance: 10,
                starting_time: 'test',
            },
        ];

        component.buildMissionsData(missions);

        expect(component.isLoading).toBeFalse();
    });

    it('onMapExpand should load map if expanded', () => {
        const map: any = {
            mission_id: 0,
            map: 'srcstring',
        };
        communicationService.getMap.and.returnValue(of<any>(map));

        const missions: MissionData[] = [
            {
                id: 0,
                startingDate: '',
                startingTime: '',
                elapsedTime: '',
                numberRobots: 0,
                droneType: DroneType.Argos,
                distance: '0',
                expandLog: false,
                expandMap: false,
                mapSrc: '',
            },
        ];

        component.missionsData = missions;

        component.onMapExpand(true, 0);
    });

    it('onMapExpand should not load map if currentMission does not exist', () => {
        const map: any = {
            mission_id: 0,
            map: 'srcstring',
        };
        communicationService.getMap.and.returnValue(of<any>(map));

        component.onMapExpand(true, 0);
    });

    it('onMapExpand should not load map if expand is false', () => {
        const map: any = {
            mission_id: 0,
            map: 'srcstring',
        };
        communicationService.getMap.and.returnValue(of<any>(map));

        component.onMapExpand(false, 0);
    });

    it('connectedDrones should return an empty array of drone ids', () => {
        const ids = component.connectedDrones(DroneType.Argos);

        expect(ids.length).toEqual(0);
    });

    it('sortNumber should sort missions id', () => {
        let mission1: MissionData = {
            id: 10,
            startingDate: '',
            startingTime: '',
            elapsedTime: '',
            numberRobots: 0,
            droneType: DroneType.Argos,
            distance: '0',
            expandLog: false,
            expandMap: false,
            mapSrc: '',
        };

        let mission2: MissionData = {
            id: 5,
            startingDate: '',
            startingTime: '',
            elapsedTime: '',
            numberRobots: 0,
            droneType: DroneType.Argos,
            distance: '0',
            expandLog: false,
            expandMap: false,
            mapSrc: '',
        };
        component.sortNumber(mission1, mission2);
        expect(component.sortNumber(mission1, mission2)).toEqual(5);
    });
});
