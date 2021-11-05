import { Component } from '@angular/core';
export interface Log {
    date: number;
    message: string;
}

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.scss'],
})
export class LogComponent {
    logs: Log[] = [];

    constructor() {
        setInterval(() => {
            this.update();
        }, 3000);
    }

    generateRandomLog(): Log {
        return {
            date: Date.now(),
            message: 'hdgvhefwhefhoiefwhiofjjfjfjfjjfjfjfjhhhhhhhhhhhhhhhhhhhhhhhhh',
        };
    }

    update(): void {
        for (let index = 0; index < Math.floor(Math.random() * 2) + 1; index++) {
            this.logs.push(this.generateRandomLog());
        }
    }
}
