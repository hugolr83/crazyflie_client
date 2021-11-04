/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Drone, DroneState, DroneType } from '@backend/api-client';
import { DroneComponent } from './drone.component';

describe('DroneComponent', () => {
    let droneComponent: DroneComponent;
    let fixture: ComponentFixture<DroneComponent>;

    let mockDrone: Drone = {
        state: DroneState.Waiting,
        type: DroneType.Argos,
        uuid: 'test',
        battery: { charge_percentage: 80, voltage: 5 },
        position: { x: 50, y: 50, z: 70 },
        range: { front: 1, back: 2, up: 3, left: 4, right: 5, bottom: 6 },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [DroneComponent],
            providers: [{ provide: DroneComponent, usevalue: {} }],
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
});
