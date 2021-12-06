import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DroneRange, DroneState, DroneType } from '@backend/api-client';
import { AppService, DroneRegistry } from '../app/app.service';
import { MapService } from './map.service';

describe('MapService', () => {
    let service: MapService;
    const WIDTH = 100;
    const HEIGHT = 100;

    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    let appService: jasmine.SpyObj<AppService>;
    let CommonApiService;
    let contextSpy: CanvasRenderingContext2D;
    let mockDroneRegistry: DroneRegistry = {
        ARGOS: {
            0: {
                battery: { charge_percentage: 0 },
                orientation: { yaw: 0 },
                position: { x: 0, y: 0, z: 0 },
                range: {} as DroneRange,
                state: DroneState.Exploring,
                type: 'ARGOS' as DroneType,
                id: 0,
                total_distance: 10,
            },
        },
        CRAZYFLIE: {},
    };

    beforeEach(() => {
        appService = {
            ...jasmine.createSpyObj('AppService', ['']),
            droneRegistry: mockDroneRegistry,
            droneType: DroneType.Argos,
        };
        contextSpy = { ...jasmine.createSpyObj('CanvasRenderingContext2D', ['fillStyle, fillRect']), canvas: canvas };

        TestBed.configureTestingModule({
            providers: [
                MapService,
                { provide: AppService, useValue: appService },
                { provide: AppService, useValue: appService },
            ],
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(MapService);
        service.setObstacleContext(contextSpy);
        service.obstacleContext = contextSpy;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
