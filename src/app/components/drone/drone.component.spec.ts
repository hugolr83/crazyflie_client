/* tslint:disable:no-unused-variable */
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonApiService, CrazyflieApiService, Drone, DroneState, DroneType } from '@backend/api-client';
import { of } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';
import { DroneComponent } from './drone.component';

describe('DroneComponent', () => {
    let droneComponent: DroneComponent;
    let fixture: ComponentFixture<DroneComponent>;

    let mockDrone: Drone = {
        state: DroneState.NotReady,
        type: DroneType.Argos,
        uuid: 'test',
        battery: { charge_percentage: 80 },
        orientation: { yaw: 90 },
        position: { x: 50, y: 50, z: 70 },
        range: { front: 1, back: 2, up: 3, left: 4, right: 5, bottom: 6 },
    };

    let commonService: jasmine.SpyObj<CommonApiService>;
    let appService: jasmine.SpyObj<AppService>;
    let crService: jasmine.SpyObj<CrazyflieApiService>;

    beforeEach(async () => {
        crService = jasmine.createSpyObj('CrazyflieApiService', ['identifyCrazyflie']);
        appService = jasmine.createSpyObj('AppService', ['']);
        commonService = jasmine.createSpyObj('CommonApiService', ['']);
        crService.identifyCrazyflie.and.returnValue(of(new HttpResponse()));

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [DroneComponent],
            providers: [
                { provide: DroneComponent, usevalue: {} },
                { provide: CrazyflieApiService, useValue: crService },
                { provide: AppService, useValue: appService },
                { provide: CommonApiService, useValue: commonService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DroneComponent);
        droneComponent = fixture.componentInstance;
        droneComponent.drone = mockDrone;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(droneComponent).toBeTruthy();
    });

    it('identify drone should call crazyflie service identifyCrazyflie', () => {
        const uuid = 'test';
        droneComponent.identifyDrone(uuid);
        expect(crService.identifyCrazyflie).toHaveBeenCalled();
    });

    it('identify drone should not call crazyflie service if uuid is empty', () => {
        const uuid = '';
        droneComponent.identifyDrone(uuid);
        expect(crService.identifyCrazyflie).not.toHaveBeenCalled();
    });

    it('roundValue should round value', () => {
        const expectedRound = Number.parseFloat((123.34534345).toFixed(2));
        const ret = droneComponent.roundValue(123.34534345, 2);

        expect(ret).toEqual(expectedRound);
    });

    it('position should return rounded drone positions', () => {
        const expectedPosition = droneComponent.position;
        const pos = droneComponent.position;
        expect(pos).toEqual(expectedPosition);
    });

    it('orientation should return rounded drone orientation', () => {
        const expectedOr = droneComponent.orientation;
        const or = droneComponent.orientation;
        expect(or).toEqual(expectedOr);
    });

    it('showPos should show inputs for position and orientation', () => {
        appService.isPosOriHidden = false;
        droneComponent.showPos();
        expect(appService.isPosOriHidden).toEqual(true);
    });

    it('showPos should hide inputs for position and orientation', () => {
        appService.isPosOriHidden = true;
        droneComponent.showPos();
        expect(appService.isPosOriHidden).toEqual(false);
    });
});
