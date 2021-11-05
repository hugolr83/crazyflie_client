import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Drone } from '@backend/api-client';
import { Observable, Subject, timer } from 'rxjs';
import { retry, share, switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CommunicationService implements OnDestroy {
    private stopPolling = new Subject();

    constructor(private http: HttpClient) {}

    listenDronePulse(): Observable<Drone[]> {
        return timer(1, 1000).pipe(
            switchMap(() => this.http.get<Drone[]>('http://localhost:8000/drones')),
            retry(),
            share(),
            takeUntil(this.stopPolling),
        );
    }

    ngOnDestroy() {
        this.stopPolling.next();
    }
}
