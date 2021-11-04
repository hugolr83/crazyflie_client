/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { DroneService } from './drone.service';

describe('Service: Drone', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DroneService],
        });
    });

    it('should ...', inject([DroneService], (service: DroneService) => {
        expect(service).toBeTruthy();
    }));
});
