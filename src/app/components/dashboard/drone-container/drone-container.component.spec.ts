import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppService } from 'src/app/services/app/app.service';
import { DroneContainerComponent } from './drone-container.component';

describe('DroneContainerComponent', () => {
    let component: DroneContainerComponent;
    let fixture: ComponentFixture<DroneContainerComponent>;
    let appService: jasmine.SpyObj<AppService>;
    let appServiceStub: AppService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [DroneContainerComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DroneContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        appServiceStub = TestBed.inject(AppService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
