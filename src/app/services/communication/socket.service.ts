import { Injectable } from '@angular/core';
import { Drone } from '@backend/api-client';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    isConnected: boolean = false;
    readonly uri: string = 'ws://localhost:8000';
    readonly DRONE_PULSE_EVENT = 'drone_pulses';

    constructor() {
        this.socket = io(this.uri);
    }

    socket: any;

    listenDronePulse(): Observable<Drone[]> {
        return new Observable((subscriber) => {
            this.socket.on(this.DRONE_PULSE_EVENT, (data: Drone[]) => {
                subscriber.next(data);
            });

            return () => {
                this.socket.disconnect();
            };
        });
    }

    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }
}
