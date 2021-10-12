/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Drone, DroneState, DroneType } from '@backend/api-client';
import { DroneComponent } from './drone.component';

describe('DroneComponent', () => {
    let component: DroneComponent;
    let fixture: ComponentFixture<DroneComponent>;

    let mockDrone: Drone = {
        state: DroneState.Waiting,
        type: DroneType.Argos,
        uuid: 'test',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [DroneComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DroneComponent);
        component = fixture.componentInstance;
        component.drone = mockDrone;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
