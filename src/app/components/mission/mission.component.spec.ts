import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonApiService, DroneType, Mission } from '@backend/api-client';
import { of } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';
import { MissionComponent } from './mission.component';

fdescribe('MissionComponent', () => {
    let component: MissionComponent;
    let fixture: ComponentFixture<MissionComponent>;

    let commService: jasmine.SpyObj<CommonApiService>;
    let appService: jasmine.SpyObj<AppService>;
    let appServiceStub: AppService;
    let commonApiServiceStub: CommonApiService;

    beforeEach(async () => {
        appService = { ...jasmine.createSpyObj('AppService', ['']), activeMission: undefined };
        commService = jasmine.createSpyObj('CommonApiService', ['getMissions']);

        await TestBed.configureTestingModule({
            declarations: [MissionComponent],
            imports: [HttpClientTestingModule],
            providers: [
                { provide: CommonApiService, usevalue: commService },
                { provide: AppService, usevalue: appService },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MissionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        CommonApiService;
        appServiceStub = TestBed.inject(AppService);
        commonApiServiceStub = TestBed.inject(CommonApiService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('getMission should call communicationService', () => {
        component.getMissions();
        expect(component.isVisible).toBeTrue();
        commService.getMissions.and.returnValue(of(new HttpResponse()));
        expect(commService.getMissions).toHaveBeenCalled();
    });

    it('close should hide', () => {
        component.handleClose();
        expect(component.isVisible).toBeFalse();
        expect(appServiceStub.isLogsHidden).toEqual(true);
    });

    it('call should set activeMission to the chosen mission', () => {
        let currentMission: Mission = {
            id: 2,
            drone_type: DroneType.Crazyflie,
            starting_time: 'time3',
        };
        component.call(currentMission);
        expect(appServiceStub.activeMission).toEqual(currentMission);
    });
});
