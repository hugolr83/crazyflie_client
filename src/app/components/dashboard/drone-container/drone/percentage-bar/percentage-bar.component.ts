import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-percentage-bar',
    templateUrl: './percentage-bar.component.html',
    styleUrls: ['./percentage-bar.component.scss'],
})
export class PercentageBarComponent implements OnInit {
    @Input() public color!: string;
    @Input() public percentage!: number;
    arrayColor = [] as any;
    totalPin: number = 5;
    pinColor: string = '#efefed';

    constructor() {}

    ngOnInit() {
        this.renderArrayColor();
    }

    renderArrayColor() {
        const part = 100 / this.totalPin;
        let currentLevel = 0 + part;
        for (let i = 0; i < this.totalPin; i++) {
            if (this.percentage >= currentLevel) {
                this.arrayColor.push({ full: true, color: this.color, width: '7px' });
                currentLevel += part;
            } else {
                const newWidth = ((this.percentage - currentLevel + part) * 7) / 20;
                this.arrayColor.push({ full: false, color: this.pinColor, width: newWidth + 'px' });
                for (let j = i + 1; j < this.totalPin; j++) {
                    this.arrayColor.push({ full: true, color: this.pinColor, width: '7px' });
                }
                break;
            }
        }
    }
}
