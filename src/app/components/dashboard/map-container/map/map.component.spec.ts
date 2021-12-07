import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppService } from 'src/app/services/app/app.service';
import { MapService } from 'src/app/services/map/map.service';
import { MapComponent } from './map.component';

describe('MapComponent', () => {
    let component: MapComponent;
    let fixture: ComponentFixture<MapComponent>;
    let appService: jasmine.SpyObj<AppService>;
    let mapService: jasmine.SpyObj<MapService>;

    beforeEach(async () => {
        appService = jasmine.createSpyObj('AppService', [''], {
            connectedDrones: { ARGOS: {}, CRAZYFLIE: {} },
        });
        const spy = jasmine.createSpyObj('MapService', ['setPositionContext', 'setObstacleContext', 'setPathContext']);

        await TestBed.configureTestingModule({
            declarations: [MapComponent],
            imports: [HttpClientTestingModule],
            providers: [
                { provide: AppService, usevalue: appService },
                { provide: MapService, usevalue: spy },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MapComponent);
        mapService = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('ngAfterViewInit should set correct canvas context', () => {
        console.log('this test');
        component.type = 'obstacle';
        spyOn<any>(mapService, 'setObstacleContext');

        component.ngAfterViewInit();
        fixture.detectChanges();

        expect(mapService.setObstacleContext).toHaveBeenCalled();
    });

    it('ngAfterViewInit should set correct canvas context', () => {
        console.log('this test');
        component.type = 'path';
        spyOn<any>(mapService, 'setPathContext');

        component.ngAfterViewInit();
        fixture.detectChanges();

        expect(mapService.setPathContext).toHaveBeenCalled();
    });

    it('ngAfterViewInit should set correct canvas context', () => {
        console.log('this test');
        component.type = 'position';
        spyOn<any>(mapService, 'setPositionContext');

        component.ngAfterViewInit();
        fixture.detectChanges();

        expect(mapService.setPositionContext).toHaveBeenCalled();
    });
});
