import { Component } from '@angular/core';
import { Mission } from '@backend/api-client';

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.scss'],
})
export class InformationComponent {
    missions: Mission[] = [];

    constructor() {}
}
