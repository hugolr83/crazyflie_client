import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppService } from 'src/app/services/app/app.service';
import { DroneContainerComponent } from './drone-container.component';

describe('DroneContainerComponent', () => {
    let component: DroneContainerComponent;
    let fixture: ComponentFixture<DroneContainerComponent>;
    let appService: jasmine.SpyObj<AppService>;
    let appServiceStub: AppService;
    // let mockDroneRegistry: DroneRegistry = {
    //     ARGOS: [
    //         {
    //             battery: { charge_percentage: 0 },
    //             orientation: { yaw: 0 },
    //             position: { x: 0, y: 0, z: 0 },
    //             range: {} as DroneRange,
    //             state: DroneState.Exploring,
    //             type: 'ARGOS' as DroneType,
    //             uuid: 'id1',
    //         }
    //     ],
    //     CRAZYFLIE: [],
    // };

    beforeEach(async () => {
        // appService = {
        //     ...jasmine.createSpyObj('AppService', ['']),
        //     droneRegistry: mockDroneRegistry,
        //     droneType: DroneType.Argos,
        // };
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [DroneContainerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DroneContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        appServiceStub = TestBed.inject(AppService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('isSpinning should be true if there is no drone to display', () => {
    //     expect(component.isSpinning).toEqual(true);
    // });

    // it('isSpinning should be false if there is at least one drone to display', () => {
    //     expect(component.isSpinning).toEqual(false);
    // });
});
