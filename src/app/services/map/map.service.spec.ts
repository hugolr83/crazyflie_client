import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommonApiService, DronePositionOrientationRange, DroneState, DroneType } from '@backend/api-client';
import { of } from 'rxjs';
import { AppService } from '../app/app.service';
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, DroneMap, MapService } from './map.service';

describe('MapService', () => {
    let service: MapService;
    const WIDTH = 100;
    const HEIGHT = 100;

    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    let appService: jasmine.SpyObj<AppService>;
    let commonApiService: jasmine.SpyObj<CommonApiService>;
    let contextSpy: jasmine.SpyObj<CanvasRenderingContext2D>;

    beforeEach(() => {
        const appSpy = jasmine.createSpyObj('AppService', [''], {
            droneRegistry: { ARGOS: { 0: { id: 0 } } },
            connectedDrones: { ARGOS: { 0: { fillStyle: 'blue' } } },
        });
        const commSpy = jasmine.createSpyObj('CommonApiService', ['getDronesMetadata']);
        contextSpy = jasmine.createSpyObj(
            'CanvasRenderingContext2D',
            ['clearRect', 'beginPath', 'moveTo', 'lineTo', 'fill', 'closePath', 'fillRect', 'arc'],
            {
                canvas: canvas,
            },
        );

        TestBed.configureTestingModule({
            providers: [
                MapService,
                { provide: AppService, useValue: appSpy },
                { provide: CommonApiService, useValue: commSpy },
            ],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MapService);

        appService = TestBed.inject(AppService) as jasmine.SpyObj<AppService>;
        commonApiService = TestBed.inject(CommonApiService) as jasmine.SpyObj<CommonApiService>;

        const mockDroneMetaData: DronePositionOrientationRange = {
            orientation: { yaw: 123 },
            position: { x: 3, y: 34, z: 0 },
            range: { back: 0, right: 0, left: 0, up: 0, bottom: 9, front: 3 },
        };

        commonApiService.getDronesMetadata.and.returnValue(of<any>({ '0': [mockDroneMetaData] }));
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('clearMap should clearRect on all canvases', () => {
        service.setObstacleContext(contextSpy);
        service.setPathContext(contextSpy, 0);
        service.setPositionContext(contextSpy, 0);
        service.clearMap();

        expect(service.obstacleContext.clearRect).toHaveBeenCalled();
        expect(service.droneToPathContext[0].clearRect).toHaveBeenCalled();
        expect(service.droneToPosContext[0].clearRect).toHaveBeenCalled();
    });

    it('mapToImage should return a base64 image string', () => {
        service.setObstacleContext(contextSpy);
        service.setPathContext(contextSpy, 0);
        service.setPositionContext(contextSpy, 0);

        const mockCanvas = document.createElement('canvas');
        const mockCtx = mockCanvas.getContext('2d');

        mockCanvas.width = DEFAULT_CANVAS_WIDTH;
        mockCanvas.height = DEFAULT_CANVAS_HEIGHT;

        const b64str = service.mapToImage(0, DroneType.Argos);

        expect(b64str).toEqual(mockCanvas.toDataURL());
    });

    it('loadMap should get drones positions and draw to map', () => {
        service.setPathContext(contextSpy, 0);
        service.setPositionContext(contextSpy, 0);
        spyOn<any>(service, 'drawMap');

        service.loadMap(0, DroneType.Argos);

        expect(service.drawMap).toHaveBeenCalled();
    });

    it('togglePaths should hide paths canvas if value true', () => {
        service.setPathContext(contextSpy, 0);

        service.togglePaths(true);

        expect(service.showPaths).toBeTrue();
        expect(contextSpy.canvas.hidden).toBeFalse();
    });

    it('togglePaths should show paths canvas if value false', () => {
        service.setPathContext(contextSpy, 0);

        service.togglePaths(false);

        expect(service.showPaths).toBeFalse();
        expect(contextSpy.canvas.hidden).toBeTrue();
    });

    it('setPositionContext should set context', () => {
        service.setPositionContext(contextSpy, 0);

        expect(service.droneToPosContext[0]).toEqual(contextSpy);
    });

    it('setPositionContext should no set context if null', () => {
        service.setPositionContext(null, 0);

        expect(service.droneToPosContext[0]).toBeUndefined();
    });

    it('setPathContext should set context', () => {
        service.setPathContext(contextSpy, 0);

        expect(service.droneToPathContext[0]).toEqual(contextSpy);
    });

    it('setPathContext should no set context if null', () => {
        service.setPositionContext(null, 0);

        expect(service.droneToPathContext[0]).toBeUndefined();
    });

    it('setObstacleContext should set obstacle and historical context', () => {
        service.setObstacleContext(contextSpy);

        expect(service.obstacleContext).toEqual(contextSpy);
        expect(service.historicalObstacleContext).toEqual(contextSpy);
    });

    it('setObstacleContext should not set obstacle and historical context if null', () => {
        service.setObstacleContext(null);

        expect(service.obstacleContext).toBeUndefined();
        expect(service.historicalObstacleContext).toBeUndefined();
    });

    it('drawMap should draw on positions, obstacles and paths', () => {
        service.setPathContext(contextSpy, 0);
        service.setPositionContext(contextSpy, 0);
        service.setObstacleContext(contextSpy);

        spyOn<any>(service, 'drawPosition');
        spyOn<any>(service, 'drawObstacles');
        spyOn<any>(service, 'drawDronePath');

        const drone: DroneMap = {
            fillStyle: 'blue',
            id: 0,
            position: { x: 0.65, y: 0.67, z: 0 },
            range: { back: 100, right: 100, left: 340, up: 340, bottom: 100, front: 10 },
            state: DroneState.Exploring,
        };

        service.drawMap(drone);

        expect(service['drawPosition']).toHaveBeenCalled();
        expect(service['drawObstacles']).toHaveBeenCalled();
        expect(service['drawDronePath']).toHaveBeenCalled();
        expect(service['drawPosition']).toHaveBeenCalledWith(drone);
        expect(service['drawObstacles']).toHaveBeenCalledWith(drone);
        expect(service['drawDronePath']).toHaveBeenCalledWith(drone);
    });
});
