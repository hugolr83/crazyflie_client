/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DroneService } from './drone.service';

describe('Service: Drone', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DroneService],
        });
    });

    it('should ...', inject([DroneService], (service: DroneService) => {
        expect(service).toBeTruthy();
    }));
});
