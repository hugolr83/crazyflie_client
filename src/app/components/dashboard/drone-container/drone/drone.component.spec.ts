/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonApiService, CrazyflieApiService, DroneType } from '@backend/api-client';
import { of } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { MissionService } from 'src/app/services/mission/mission.service';
import { DroneComponent } from './drone.component';

describe('DroneComponent', () => {
    let droneComponent: DroneComponent;
    let fixture: ComponentFixture<DroneComponent>;

    let commonService: jasmine.SpyObj<CommonApiService>;
    let appService: jasmine.SpyObj<AppService>;
    let crService: jasmine.SpyObj<CrazyflieApiService>;
    let missionService: jasmine.SpyObj<MissionService>;
    let droneService: jasmine.SpyObj<DroneService>;

    beforeEach(async () => {
        const csSpy = jasmine.createSpyObj('CrazyflieApiService', ['identifyCrazyflie']);
        const appSpy = jasmine.createSpyObj('AppService', ['']);
        const commSpy = jasmine.createSpyObj('CommonApiService', ['setDronePosition']);
        const missSpy = jasmine.createSpyObj('MissionService', ['startMission']);

        const drSpy = jasmine.createSpyObj('DroneService', ['']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [DroneComponent],
            providers: [
                { provide: CommonApiService, usevalue: commSpy },
                { provide: CrazyflieApiService, usevalue: csSpy },
                { provide: AppService, usevalue: appSpy },
                { provide: MissionService, usevalue: missSpy },
                { provide: DroneService, usevalue: drSpy },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DroneComponent);

        missionService = TestBed.inject(MissionService) as jasmine.SpyObj<MissionService>;
        appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;

        appService.connectedDrones = { ARGOS: { 0: { fillStyle: 'blue' } }, CRAZYFLIE: { 0: { fillStyle: 'blue' } } };

        commonService = TestBed.inject(CommonApiService) as jasmine.SpyObj<CommonApiService>;

        crService = TestBed.inject(CrazyflieApiService) as jasmine.SpyObj<CrazyflieApiService>;

        droneService = TestBed.inject(DroneService) as jasmine.SpyObj<DroneService>;

        droneComponent = fixture.componentInstance;

        droneComponent.droneID = 0;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(droneComponent).toBeTruthy();
    });

    it('identify drone should not call crazyflie service if id is empty', () => {
        let id = undefined as any;
        spyOn(crService, 'identifyCrazyflie');

        droneComponent.identifyDrone(id);

        expect(crService.identifyCrazyflie).not.toHaveBeenCalled();
    });

    it('onSetInitialConfig should call backend', () => {
        let id = undefined as any;
        spyOn(commonService, 'setDronePosition');
        commonService.setDronePosition.and.returnValue(of());

        droneComponent.onSetInitialConfig();

        expect(commonService.setDronePosition).toHaveBeenCalled();
    });

    it('isMissionStarted should be false if there is no mission started', () => {
        const spy = spyOnProperty(droneComponent, 'isMissionStarted').and.callThrough();
        expect(droneComponent.isMissionStarted).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('DroneType should return Crazyflie if we are using Crazyflie drones', () => {
        droneComponent.appService.droneType = DroneType.Crazyflie;
        const spy = spyOnProperty(droneComponent, 'droneType').and.callThrough();
        expect(droneComponent.droneType).toEqual(DroneType.Crazyflie);
        expect(spy).toHaveBeenCalled();
    });

    it('DroneType should return Argos if we are in simulation', () => {
        droneComponent.appService.droneType = DroneType.Argos;
        const spy = spyOnProperty(droneComponent, 'droneType').and.callThrough();
        expect(droneComponent.droneType).toEqual(DroneType.Argos);
        expect(spy).toHaveBeenCalled();
    });
});
