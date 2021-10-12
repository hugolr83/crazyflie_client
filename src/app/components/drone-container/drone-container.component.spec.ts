import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneContainerComponent } from './drone-container.component';

describe('DroneContainerComponent', () => {
    let component: DroneContainerComponent;
    let fixture: ComponentFixture<DroneContainerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DroneContainerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DroneContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
