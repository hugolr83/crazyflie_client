import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommonApiService } from '@backend/api-client';
import { AppService } from '../app/app.service';
import { DroneService } from '../drone/drone.service';
import { LogService } from '../log/log.service';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
    let service: HistoryService;
    let communicationService: jasmine.SpyObj<CommonApiService>;
    let logService: jasmine.SpyObj<LogService>;
    let appService: jasmine.SpyObj<AppService>;
    let droneService: jasmine.SpyObj<DroneService>;

    let startingTimeTest: string = '11/5/2021';
    let endTimeTest: string = '12/8/2021';

    beforeEach(async () => {
        droneService = jasmine.createSpyObj('DroneService', ['']);
        appService = jasmine.createSpyObj('AppService', ['']);
        communicationService = jasmine.createSpyObj('CommonApiService', ['']);
        logService = jasmine.createSpyObj('LogService', ['']);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: DroneService, usevalue: droneService },
                { provide: AppService, usevalue: appService },
                { provide: LogService, usevalue: logService },
                { provide: CommonApiService, usevalue: communicationService },
            ],
        });

        service = TestBed.inject(HistoryService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
