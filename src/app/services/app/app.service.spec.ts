import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommonApiService, DroneType } from '@backend/api-client';
import { of } from 'rxjs';
import { CommunicationService } from '../communication/communication.service';
import { AppService } from './app.service';

describe('AppService', () => {
    let service: AppService;

    let commonApiService: jasmine.SpyObj<CommonApiService>;
    let communicationService: jasmine.SpyObj<CommunicationService>;

    beforeEach(() => {
        const communicationServiceS = { ...jasmine.createSpyObj('CommunicationService', ['']) };
        const commonApiServiceS = jasmine.createSpyObj('CommonApiService', ['getMissions']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: CommonApiService, usevalue: commonApiServiceS },
                { provide: CommunicationService, usevalue: communicationServiceS },
            ],
        });

        service = TestBed.inject(AppService);
        commonApiService = TestBed.inject(CommonApiService) as jasmine.SpyObj<CommonApiService>;
        communicationService = TestBed.inject(CommunicationService) as jasmine.SpyObj<CommunicationService>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set drone type to Argos', () => {
        let argos = DroneType.Argos;
        service.setDroneType(argos);
        expect(service.droneType).toEqual(argos);
    });

    it('should set drone type to Crazyflie', () => {
        let crazyflie = DroneType.Crazyflie;
        service.setDroneType(crazyflie);
        expect(service.droneType).toEqual(crazyflie);
    });

    it('registerDronePulse should register pulse of drone', () => {
        const drones = [{ id: 1, type: DroneType.Crazyflie } as any];
        spyOn<any>(communicationService, 'listenDronePulse').and.returnValues(of(drones));

        service.registerDronePulse();

        expect(communicationService.listenDronePulse).toHaveBeenCalled();
    });

    it('getActiveMission should get active mission', () => {
        service.activeMission = {} as any;

        service.getActiveMission().subscribe((mission) => {
            expect(mission).not.toBeNull();
        });
    });
});
