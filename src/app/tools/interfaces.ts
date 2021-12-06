import { DroneType, Log } from '@backend/api-client';

export interface MissionData {
    id: number;
    startingDate: string;
    startingTime: string;
    elapsedTime: string;
    numberRobots: number;
    droneType: DroneType;
    distance: string;
    logs?: Log[];
    expandLog: boolean;
    expandMap: boolean;
    mapSrc: string;
}

export interface MissionTimestamp {
    date: string;
    time: string;
    date_time: string;
}
