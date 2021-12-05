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

    pinColor = '#efefed';

    constructor() {}

    ngOnInit() {
        this.renderArrayColor();
    }

    renderArrayColor() {
        const totalPin = 5;
        const part = 100 / totalPin;
        let currentLevel = 0 + part;
        for (let i = 0; i < totalPin; i++) {
            console.log(this.percentage);
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
