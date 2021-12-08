import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PercentageBarComponent } from './percentage-bar.component';

describe('PercentageBarComponent', () => {
    let component: PercentageBarComponent;
    let fixture: ComponentFixture<PercentageBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PercentageBarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PercentageBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit should call renderArrayColor', () => {
        spyOn(component, 'renderArrayColor').and.callThrough();
        component.ngOnChanges();
        expect(component.renderArrayColor).toHaveBeenCalled();
    });

    it('renderArrayColor should set red color', () => {
        component.percentage = 10;
        component.renderArrayColor();
        expect(component.color).toBe('#ff0000');
    });

    it('renderArrayColor should set yellow color', () => {
        component.percentage = 40;
        component.renderArrayColor();
        expect(component.color).toBe('#e79600');
    });
});
