/* tslint:disable:no-unused-variable */

import { HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { CommunicationService } from './communication.service';

describe('Service: communication', () => {
    let communicationService: CommunicationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [HttpTestingController],
        });

        httpMock = TestBed.inject(HttpTestingController);
        communicationService = TestBed.inject(CommunicationService);
    });

    it('should ...', inject([CommunicationService], (Communicationservice: CommunicationService) => {
        expect(Communicationservice).toBeTruthy();
    }));
});
