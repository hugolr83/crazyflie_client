import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppService } from 'src/app/services/app/app.service';
import { MapService } from 'src/app/services/map/map.service';
import { MapContainerComponent } from './map-container.component';

describe('MapContainerComponent', () => {
    let component: MapContainerComponent;
    let fixture: ComponentFixture<MapContainerComponent>;

    let appService: jasmine.SpyObj<AppService>;
    let mapService: jasmine.SpyObj<MapService>;

    beforeEach(async () => {
        const appSpy = jasmine.createSpyObj('AppService', [''], {
            connectedDrones: { ARGOS: {}, CRAZYFLIE: {} },
        });
        const spy = jasmine.createSpyObj('MapService', ['loadMap', 'togglePaths', 'drawMap']);

        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [MapContainerComponent],
            providers: [
                { provide: AppService, usevalue: appSpy },
                { provide: MapService, usevalue: spy },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MapContainerComponent);
        mapService = TestBed.inject(MapService) as jasmine.SpyObj<MapService>;
        appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOninit should call loadMap', () => {
        spyOn<any>(mapService, 'loadMap');
        appService.activeMission = {} as any;
        mapService.loadMap.and.returnValue();

        component.ngOnInit();
        fixture.detectChanges();

        expect(mapService.loadMap).toHaveBeenCalled();
    });

    it('togglepath should call service', () => {
        spyOn<any>(mapService, 'togglePaths');

        component.togglePaths(true);

        expect(mapService.togglePaths).toHaveBeenCalledWith(true);
    });

    it('togglepath should call service with false', () => {
        spyOn<any>(mapService, 'togglePaths');

        component.togglePaths(false);

        expect(mapService.togglePaths).toHaveBeenCalledWith(false);
    });
});
