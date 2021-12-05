/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommunicationService } from './communication.service';

describe('Service: communication', () => {
    let communicationService: CommunicationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [],
        });

        communicationService = TestBed.inject(CommunicationService);
    });

    it('should create', () => {
        expect(communicationService).toBeTruthy();
    });
});
