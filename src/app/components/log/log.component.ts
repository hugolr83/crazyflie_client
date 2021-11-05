import { Component, OnDestroy } from '@angular/core';
import { Log } from '@backend/api-client';
import { Subject, timer } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { DroneService } from 'src/app/services/drone/drone.service';

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnDestroy {
    logs: Log[] = [];
    private stopPolling = new Subject();

    constructor(public droneService: DroneService) {
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

        const lastLogId: number = this.logs[len - 1].id;
        this.droneService.getLogs(lastLogId + 1).subscribe((logs: Log[]) => {
            logs.forEach((log: Log) => {
                this.logs.push(log);
            });
        });
    }

    ngOnDestroy() {
        this.stopPolling.next();
    }
}
