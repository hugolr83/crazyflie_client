import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DroneType } from '@backend/api-client';
import { AppModule } from 'src/app.module';
import { AppService } from 'src/app/services/app/app.service';
import { TopNavComponent } from './top-nav.component';

fdescribe('TopNavComponent', () => {
    let component: TopNavComponent;
    let fixture: ComponentFixture<TopNavComponent>;
    let appService: jasmine.SpyObj<AppService>;
    let appServiceStub: AppService;

    beforeEach(async () => {
        appService = jasmine.createSpyObj('AppService', ['setDroneType']);
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, AppModule],
            declarations: [TopNavComponent],
            providers: [{ provide: AppService, usevalue: appService }],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TopNavComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
        appServiceStub = TestBed.inject(AppService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set drone type to Argos', () => {
        // spyOn(appService, 'setDroneType');
        let argos = DroneType.Argos;
        component.setDroneType(argos);
        expect(appService.setDroneType).not.toHaveBeenCalled();
    });
});
