import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommonApiService, DroneType } from '@backend/api-client';
import { CommunicationService } from '../communication/communication.service';
import { AppService } from './app.service';

describe('AppService', () => {
    let service: AppService;

    let commonApiService: jasmine.SpyObj<CommonApiService>;
    let communicationService: jasmine.SpyObj<CommunicationService>;

    beforeEach(() => {
        communicationService = { ...jasmine.createSpyObj('CommunicationService', ['']) };
        commonApiService = jasmine.createSpyObj('CommonApiService', ['getMissions']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: CommonApiService, usevalue: commonApiService },
                { provide: CommunicationService, usevalue: communicationService },
            ],
        });

        service = TestBed.inject(AppService);
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
});
