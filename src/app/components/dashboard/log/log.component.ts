import { Component, OnDestroy } from '@angular/core';
import { CommonApiService, Log } from '@backend/api-client';
import { Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { LogService } from 'src/app/services/log/log.service';

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnDestroy {
    logs: Log[] = [];
    stopPolling = new Subject();

    constructor(
        public appService: AppService,
        public communicationService: CommonApiService,
        public logService: LogService,
        public droneService: DroneService,
    ) {
        timer(1, 1000)
            .pipe(
                tap(() => this.updateLogs()),
                takeUntil(this.stopPolling),
            )
            .subscribe(() => {});
    }

    ngOnDestroy() {
        this.stopPolling.next();
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

        const lastLogId: number = this.logs[0].id;
        this.droneService.getLogs(lastLogId + 1).subscribe((logs: Log[]) => {
            if (!logs) return;
            logs.forEach((log: Log) => {
                this.logs.unshift(log);
            });
        });
    }
}
