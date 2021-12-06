import { Injectable } from '@angular/core';
import { CommonApiService, Log } from '@backend/api-client';
import { AppService } from '../app/app.service';
import { DroneService } from '../drone/drone.service';
import { LogService } from '../log/log.service';

@Injectable({
    providedIn: 'root',
})
export class HistoryService {
    missionLogs: Log[] = [];

    constructor(
        public communicationService: CommonApiService,
        public droneService: DroneService,
        public appService: AppService,
        public logService: LogService,
    ) {}

    getElapsedTime(startingTime: string, endTime: string): string {
        let startDate = new Date(startingTime).valueOf();
        let endDate = new Date(endTime).valueOf();
        let elapsedTime = endDate - startDate;

        return this.logService.msToTime(elapsedTime);
    }
}
