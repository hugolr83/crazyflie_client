/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunicationComponent } from './communication.component';


describe('ConnectionComponent', () => {
    let component: CommunicationComponent;
    let fixture: ComponentFixture<CommunicationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommunicationComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommunicationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
