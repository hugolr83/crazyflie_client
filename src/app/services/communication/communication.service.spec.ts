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
        jasmine.clock().install();

        communicationService = TestBed.inject(CommunicationService);
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('should create', () => {
        expect(communicationService).toBeTruthy();
    });

    it('listenDronePulse should listen to pulse of drone', () => {
        let drones: any[] = [];

        communicationService.listenDronePulse().subscribe((dronesP) => {
            drones = dronesP;
        });

        jasmine.clock().tick(1001);

        expect(drones.length).toBe(0);
    });
});
