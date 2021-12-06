import { Injectable } from '@angular/core';
import { Log } from '@backend/api-client';
import { Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MissionTimestamp } from 'src/app/tools/interfaces';
import { AppService } from '../app/app.service';
import { DroneService } from '../drone/drone.service';

@Injectable({
    providedIn: 'root',
})
export class LogService {
    logIsShown: boolean;
    logs: Log[] = [];
    stopPolling = new Subject();
    loggingIsStopped: boolean;

    constructor(public droneService: DroneService, public appService: AppService) {
        this.logIsShown = false;
        this.loggingIsStopped = true;
    }

    msToTime(duration: number): string {
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

    startGettingLogs(): void {
        timer(1, 500)
            .pipe(
                tap(() => this.updateLogs()),
                takeUntil(this.stopPolling),
            )
            .subscribe(() => {});
    }

    updateLogs(): void {
        const len = this.logs.length;
        if (len === 0) {
            this.droneService.getLogs().subscribe((logs: Log[]) => {
                this.logs = logs;
            });
            return;
        }
        const missionId: number = this.logs[0].mission_id;

        if (missionId != this.appService.activeMission?.id) {
            this.droneService.getLogs().subscribe((logs: Log[]) => {
                this.logs = logs;
            });
            return;
        }

        const lastLogId: number = this.logs[len - 1].id;
        this.droneService.getLogs(lastLogId + 1).subscribe((logs: Log[]) => {
            if (!logs) return;
            logs.forEach((log: Log) => {
                this.logs.unshift(log);
            });
        });

        if ((this.droneService.stateIsReady || this.droneService.stateIsNotReady) && this.loggingIsStopped) {
            this.stopPolling.next();
        }
    }
}
