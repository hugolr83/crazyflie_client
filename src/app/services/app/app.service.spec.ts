import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommonApiService } from '@backend/api-client';
import { CommunicationService } from '../communication/communication.service';
import { AppService } from './app.service';

describe('AppService', () => {
    let service: AppService;

    let commonS: jasmine.SpyObj<CommonApiService>;
    let communicationS: jasmine.SpyObj<CommunicationService>;

    beforeEach(() => {
        communicationS = { ...jasmine.createSpyObj('CommunicationService', ['']) };
        commonS = jasmine.createSpyObj('CommonApiService', ['getMissions']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: CommonApiService, usevalue: { commonS } },
                { provide: CommunicationService, usevalue: { communicationS } },
            ],
        });

        service = TestBed.inject(AppService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
