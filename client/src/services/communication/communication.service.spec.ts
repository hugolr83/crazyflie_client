/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommunicationService } from './communication.service';

describe('Service: Communication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommunicationService]
    });
  });

  it('should ...', inject([CommunicationService], (service: CommunicationService) => {
    expect(service).toBeTruthy();
  }));
});
