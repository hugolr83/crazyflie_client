import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CommunicationService } from '../communication/communication.service';
import { AppService } from './app.service';

describe('AppService', () => {
    let service: AppService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [CommunicationService, HttpClient] });
        service = TestBed.inject(AppService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
