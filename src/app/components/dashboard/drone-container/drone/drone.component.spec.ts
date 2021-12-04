/* tslint:disable:no-unused-variable */
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonApiService, CrazyflieApiService, DroneType } from '@backend/api-client';
import { of } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';
import { MissionService } from 'src/app/services/mission/mission.service';
import { DroneComponent } from './drone.component';

describe('DroneComponent', () => {
    let droneComponent: DroneComponent;
    let fixture: ComponentFixture<DroneComponent>;

    let commonService: jasmine.SpyObj<CommonApiService>;
    let appService: jasmine.SpyObj<AppService>;
    let crService: jasmine.SpyObj<CrazyflieApiService>;
    let missionService: jasmine.SpyObj<MissionService>;

    beforeEach(async () => {
        crService = jasmine.createSpyObj('CrazyflieApiService', ['identifyCrazyflie']);
        appService = jasmine.createSpyObj('AppService', ['']);
        commonService = jasmine.createSpyObj('CommonApiService', ['']);
        missionService = jasmine.createSpyObj('MissionService', ['']);
        crService.identifyCrazyflie.and.returnValue(of(new HttpResponse()));

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [DroneComponent],
            providers: [
                { provide: DroneComponent, usevalue: {} },
                { provide: CrazyflieApiService, usevalue: crService },
                { provide: AppService, usevalue: appService },
                { provide: CommonApiService, usevalue: commonService },
                { provide: MissionService, usevalue: missionService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DroneComponent);
        droneComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(droneComponent).toBeTruthy();
    });

    // it('identify drone should call crazyflie service identifyCrazyflie', () => {
    //     const uuid = mockDrone.uuid;
    //     droneComponent.identifyDrone(uuid);
    //     expect(crService.identifyCrazyflie).toHaveBeenCalled();
    // });

    // it('identify drone should not call crazyflie service if uuid is empty', () => {
    //     let uuid = '';
    //     droneComponent.identifyDrone(uuid);
    //     expect(crService.identifyCrazyflie).not.toHaveBeenCalled();
    // });

    it('isMissionStarted should be false if there is no mission started', () => {
        const spy = spyOnProperty(droneComponent, 'isMissionStarted').and.callThrough();
        expect(droneComponent.isMissionStarted).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('isMissionStarted should be true if a mission is started', () => {
        droneComponent.missionService.startMission();
        const spy = spyOnProperty(droneComponent, 'isMissionStarted').and.callThrough();
        expect(droneComponent.isMissionStarted).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('getDroneType should return Crazyflie if we are using Crazyflie drones', () => {
        droneComponent.appService.droneType = DroneType.Crazyflie;
        const spy = spyOnProperty(droneComponent, 'droneType').and.callThrough();
        expect(droneComponent.droneType).toEqual(DroneType.Crazyflie);
        expect(spy).toHaveBeenCalled();
    });

    it('getDroneType should return Argos if we are in simulation', () => {
        droneComponent.appService.droneType = DroneType.Argos;
        const spy = spyOnProperty(droneComponent, 'droneType').and.callThrough();
        expect(droneComponent.droneType).toEqual(DroneType.Argos);
        expect(spy).toHaveBeenCalled();
    });
});
