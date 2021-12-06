import { Component, OnDestroy } from '@angular/core';
import { CommonApiService, Log } from '@backend/api-client';
import { AppService } from 'src/app/services/app/app.service';
import { LogService } from 'src/app/services/log/log.service';

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnDestroy {
    constructor(
        public appService: AppService,
        public communicationService: CommonApiService,
        public logService: LogService,
    ) { }

    get logs(): Log[] {
        return this.logService.logs;
    }

    ngOnDestroy() {
        this.logService.stopPolling.next();
    }
}
