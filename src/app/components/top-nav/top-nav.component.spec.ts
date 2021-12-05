import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app.module';
import { AppService } from 'src/app/services/app/app.service';
import { LogService } from 'src/app/services/log/log.service';
import { MissionService } from 'src/app/services/mission/mission.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopNavComponent } from './top-nav.component';

describe('TopNavComponent', () => {
    let component: TopNavComponent;
    let fixture: ComponentFixture<TopNavComponent>;
    let appService: jasmine.SpyObj<AppService>;
    let missionService: jasmine.SpyObj<MissionService>;
    let logService: jasmine.SpyObj<LogService>;
    let sidebarComponent: jasmine.SpyObj<SidebarComponent>;
    let appServiceStub: AppService;
    let logServiceStub: LogService;
    let missionServiceStub: MissionService;

    beforeEach(async () => {
        appService = jasmine.createSpyObj('AppService', ['setDroneType']);
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, AppModule],
            declarations: [TopNavComponent],
            providers: [
                { provide: AppService, usevalue: appService },
                { provide: MissionService, usevalue: missionService },
                { provide: LogService, usevalue: logService },
                { provide: SidebarComponent, usevalue: sidebarComponent },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TopNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        appServiceStub = TestBed.inject(AppService);
        logServiceStub = TestBed.inject(LogService);
        missionServiceStub = TestBed.inject(MissionService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('showLogs should trigger logIsShown false to true', () => {
        logServiceStub.logIsShown = false;
        component.showLogs();
        expect(logServiceStub.logIsShown).toEqual(true);
    });

    it('showLogs should trigger isLogsHidden true to false', () => {
        logServiceStub.logIsShown = true;
        component.showLogs();
        expect(logServiceStub.logIsShown).toEqual(false);
    });

    it('should return true if we are in simulation', () => {
        missionServiceStub.isSimulation = true;
        const spy = spyOnProperty(component, 'isSimulation').and.callThrough();
        expect(component.isSimulation).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if we use crazyflie drones', () => {
        missionServiceStub.isSimulation = false;
        const spy = spyOnProperty(component, 'isSimulation').and.callThrough();
        expect(component.isSimulation).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if we can see logs', () => {
        logServiceStub.logIsShown = true;
        const spy = spyOnProperty(component, 'logIsShown').and.callThrough();
        expect(component.logIsShown).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if we do not see logs', () => {
        logServiceStub.logIsShown = false;
        const spy = spyOnProperty(component, 'logIsShown').and.callThrough();
        expect(component.logIsShown).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if there is currently no mission', () => {
        missionServiceStub.missionIsStarted = false;
        const spy = spyOnProperty(component, 'missionIsStarted').and.callThrough();
        expect(component.missionIsStarted).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if a mission is started', () => {
        missionServiceStub.missionIsStarted = true;
        const spy = spyOnProperty(component, 'missionIsStarted').and.callThrough();
        expect(component.missionIsStarted).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return true if drones are returning to base', () => {
        missionServiceStub.returnToBaseActivated = true;
        const spy = spyOnProperty(component, 'returnToBaseActivated').and.callThrough();
        expect(component.returnToBaseActivated).toEqual(true);
        expect(spy).toHaveBeenCalled();
    });

    it('should return false if drone are not returning to base', () => {
        missionServiceStub.returnToBaseActivated = false;
        const spy = spyOnProperty(component, 'returnToBaseActivated').and.callThrough();
        expect(component.returnToBaseActivated).toEqual(false);
        expect(spy).toHaveBeenCalled();
    });
});
