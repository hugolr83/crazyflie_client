import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonApiService, Mission } from '@backend/api-client';
import { of } from 'rxjs';
import { AppService } from 'src/app/services/app/app.service';
import { MissionComponent } from './mission.component';

describe('MissionComponent', () => {
    let component: MissionComponent;
    let fixture: ComponentFixture<MissionComponent>;

    let commS: jasmine.SpyObj<CommonApiService>;
    let appS: jasmine.SpyObj<AppService>;

    beforeEach(async () => {
        appS = { ...jasmine.createSpyObj('AppService', ['']), activeMission: undefined };
        commS = jasmine.createSpyObj('CommonApiService', ['getMissions']);
        commS.getMissions.and.returnValue(of(new HttpResponse()));

        await TestBed.configureTestingModule({
            declarations: [MissionComponent],
            imports: [HttpClientTestingModule],
            providers: [
                { provide: CommonApiService, usevalue: { commS } },
                { provide: AppService, usevalue: { appS } },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MissionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('getMission should call commService', () => {
        component.getMissions();
        expect(component.isMission).toBeTrue();
        expect(commS.getMissions).toHaveBeenCalled();
    });

    it('close should hide', () => {
        component.close();
        expect(component.isMission).toBeFalse();
        expect(appS.isHidden).toBeFalse();
    });

    it('call should make active mission', () => {
        let activeMission: Mission = {} as Mission;
        component.call(activeMission);
        expect(appS.activeMission).toEqual(activeMission);
        expect(appS.isHidden).toBeFalse();
    });
});
