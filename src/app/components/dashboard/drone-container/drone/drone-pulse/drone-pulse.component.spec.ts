import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Drone, DroneState, DroneType } from '@backend/api-client';
import { DronePulseComponent } from './drone-pulse.component';

describe('DronePulseComponent', () => {
    let component: DronePulseComponent;
    let fixture: ComponentFixture<DronePulseComponent>;
    let mockDrone: Drone = {
        state: DroneState.NotReady,
        type: DroneType.Argos,
        uuid: 'test',
        battery: { charge_percentage: 80 },
        orientation: { yaw: 90 },
        position: { x: 50, y: 50, z: 70 },
        range: { front: 1, back: 2, up: 3, left: 4, right: 5, bottom: 6 },
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DronePulseComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DronePulseComponent);
        component = fixture.componentInstance;
        component.drone = mockDrone;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
