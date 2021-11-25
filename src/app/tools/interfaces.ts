import { Log } from '@backend/api-client';

export interface MissionData {
    id: number;
    startingDate: string;
    startingTime: string;
    elapsedTime: string;
    numberRobots: number;
    droneType: string;
    distance: number;
    logs?: Log[];
    expandLog: boolean;
    expandMap: boolean;
}

export interface MissionTimestamp {
    date: string;
    time: string;
    date_time: string;
}
