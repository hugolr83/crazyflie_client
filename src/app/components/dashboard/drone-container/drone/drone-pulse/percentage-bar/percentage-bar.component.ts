import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-percentage-bar',
    templateUrl: './percentage-bar.component.html',
    styleUrls: ['./percentage-bar.component.scss'],
})
export class PercentageBarComponent implements OnChanges {
    @Input() public percentage!: number;
    arrayColor = [] as any;
    pinColor = '#efefed';
    greenColor: string = '#00b32d';
    yellowColor: string = '#e79600';
    redColor: string = '#ff0000';
    color: string;

    constructor() {
        this.color = this.greenColor;
    }

    ngOnChanges() {
        this.renderArrayColor();
    }

    renderArrayColor() {
        if (this.percentage <= 30 && this.percentage >= 0) this.color = this.redColor;
        else if (this.percentage <= 60 && this.percentage > 30) this.color = this.yellowColor;
        else this.color = this.greenColor;

        this.arrayColor = [];
        const totalPin = 5;
        const part = 100 / totalPin;
        let currentLevel = 0 + part;
        for (let i = 0; i < totalPin; i++) {
            if (this.percentage >= currentLevel) {
                this.arrayColor.push({ full: true, color: this.color, width: '10px' });
                currentLevel += part;
            } else {
                const newWidth = ((this.percentage - currentLevel + part) * 10) / 20;
                this.arrayColor.push({ full: false, color: this.pinColor, width: newWidth + 'px' });
                for (let j = i + 1; j < totalPin; j++) {
                    this.arrayColor.push({ full: true, color: this.pinColor, width: '10px' });
                }
                break;
            }
        }
    }
}
