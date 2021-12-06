import { Component, OnInit } from '@angular/core';
import { CommonApiService, DroneType, Log, Mission } from '@backend/api-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from 'src/app/services/app/app.service';
import { DroneService } from 'src/app/services/drone/drone.service';
import { HistoryService } from 'src/app/services/history/history.service';
import { LogService } from 'src/app/services/log/log.service';
import { MissionData } from 'src/app/tools/interfaces';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
    missionsData: MissionData[] = [];
    filter: string[] = ['ascend', 'descend'];
    isLoading: boolean;

    constructor(
        public appService: AppService,
        public communicationService: CommonApiService,
        public historyService: HistoryService,
        public droneService: DroneService,
        public logService: LogService,
    ) {
        this.isLoading = true;
    }

    ngOnInit() {
        this.isLoading = true;
        this.getMissions().subscribe((missionsData: MissionData[]) => {
            this.missionsData = missionsData;
        });
    }

    getMissions(): Observable<MissionData[]> {
        return this.communicationService
            .getMissions()
            .pipe(map((missions: Mission[]) => this.buildMissionsData(missions)));
    }

    buildMissionsData(missions: Mission[]): MissionData[] {
        const missionsData: MissionData[] = [];

        for (let mission of missions) {
            let data: MissionData = {
                id: mission.id,
                startingDate: this.logService.formatTimestamp(mission.starting_time).date,
                startingTime: this.logService.formatTimestamp(mission.starting_time).time,
                elapsedTime: this.historyService.getElapsedTime(mission.starting_time, mission.ending_time as string),
                numberRobots: 2,
                droneType: mission.drone_type,
                distance: mission.total_distance.toFixed(2),
                expandLog: false,
                expandMap: false,
            };

            this.communicationService.getLogs(mission.id).subscribe((logs: Log[]) => {
                data.logs = logs;
            });

            missionsData.push(data);
        }
        this.isLoading = false;
        return missionsData;
    }

    sortNumber = (a: MissionData, b: MissionData): number => a.id - b.id;

    sortDistance = (a: MissionData, b: MissionData): number => parseFloat(a.distance) - parseFloat(b.distance);

    sortCreated = (a: MissionData, b: MissionData): number =>
        +new Date(a.startingDate + ' ' + a.startingTime) - +new Date(b.startingDate + ' ' + b.startingTime);

    sortElapsedTime = (a: MissionData, b: MissionData): number => {
        return parseInt(a.elapsedTime.split(':').join(''), 10) - parseInt(b.elapsedTime.split(':').join(''), 10);
    };

    filterType = [
        { text: DroneType.Crazyflie, value: DroneType.Crazyflie },
        { text: DroneType.Argos, value: DroneType.Argos },
    ];

    filterTypeFn = (list: string[], item: MissionData): boolean =>
        list.some((name) => item.droneType.indexOf(name) !== -1);
}
