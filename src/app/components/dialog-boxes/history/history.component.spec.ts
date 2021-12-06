import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonApiService } from '@backend/api-client';
import { MissionData } from 'src/app/tools/interfaces';
import { HistoryComponent } from './history.component';

describe('HistoryComponent', () => {
    let component: HistoryComponent;
    let commonApiService: CommonApiService;
    let fixture: ComponentFixture<HistoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [HistoryComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit should call getMissions', () => {
        spyOn(component, 'getMissions').and.callThrough();
        component.ngOnInit();
        expect(component.isLoading).toBeTrue();
        expect(component.getMissions).toHaveBeenCalled();
    });

    // it('getMissions should build missions data', () => {
    //     spyOn(component, 'buildMissionsData').and.callThrough();
    //     spyOn(commonApiService, 'getMissions').and.callThrough();
    //     component.getMissions();
    //     expect(commonApiService.getMissions).toHaveBeenCalled();
    //     expect(component.buildMissionsData).toHaveBeenCalled();
    // });

    it('sortNumber should sort missions id', () => {
        let mission1: MissionData = {
            id: 10,
            startingDate: '',
            startingTime: '',
            elapsedTime: '',
            numberRobots: 0,
            droneType: '',
            distance: '0',
            expandLog: false,
            expandMap: false,
        };

        let mission2: MissionData = {
            id: 5,
            startingDate: '',
            startingTime: '',
            elapsedTime: '',
            numberRobots: 0,
            droneType: '',
            distance: '0',
            expandLog: false,
            expandMap: false,
        };
        component.sortNumber(mission1, mission2);
        expect(component.sortNumber(mission1, mission2)).toEqual(5);
    });
});
