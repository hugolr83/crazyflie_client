import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonApiService } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { LogComponent } from './log.component';

describe('LogComponent', () => {
    let component: LogComponent;
    let fixture: ComponentFixture<LogComponent>;

    let droneService: jasmine.SpyObj<DroneService>;
    let appService: jasmine.SpyObj<AppService>;
    let communicationService: jasmine.SpyObj<CommonApiService>;

    beforeEach(async () => {
        droneService = jasmine.createSpyObj('DroneService', ['getLogs']);
        appService = jasmine.createSpyObj('AppService', ['getActiveMission']);
        communicationService = jasmine.createSpyObj('CommonApiService', ['getMissions']);

        await TestBed.configureTestingModule({
            declarations: [LogComponent],
            imports: [HttpClientTestingModule],
            providers: [
                { provide: DroneService, usevalue: droneService },
                { provide: AppService, usevalue: appService },
                { provide: CommonApiService, usevalue: communicationService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
