import { Injectable } from '@angular/core';
import { MissionTimestamp } from 'src/app/tools/interfaces';

@Injectable({
    providedIn: 'root',
})
export class LogService {
    logIsShown: boolean;

    constructor() {
        this.logIsShown = false;
    }

    msToTime(duration: number) {
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        let showHours = hours < 10 ? '0' + hours : hours;
        let showMinutes = minutes < 10 ? '0' + minutes : minutes;
        let showSeconds = seconds < 10 ? '0' + seconds : seconds;

        return showHours + ':' + showMinutes + ':' + showSeconds;
    }

    formatTimestamp(timestamp: string): MissionTimestamp {
        timestamp = new Date(timestamp + 'Z').toLocaleString();

        let year = new Date(timestamp).getFullYear();
        let month = new Date(timestamp).getMonth() + 1;
        let day = new Date(timestamp).getDate();
        let hour = new Date(timestamp).getHours();
        let min = new Date(timestamp).getMinutes();
        let sec = new Date(timestamp).getSeconds();

        let formatHour = hour < 10 ? '0' + hour : hour;
        let formatMin = min < 10 ? '0' + min : min;
        let formatSec = sec < 10 ? '0' + sec : sec;

        let date = year + '-' + month + '-' + day;
        let time = formatHour + ':' + formatMin + ':' + formatSec;

        return {
            date: date,
            time: time,
            date_time: '[' + date + ']        ' + time + '        ',
        };
    }
}
