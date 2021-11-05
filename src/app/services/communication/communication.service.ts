import { Injectable, OnDestroy } from '@angular/core';
import { CommonApiService, Drone } from '@backend/api-client';
import { Observable, Subject, timer } from 'rxjs';
import { retry, share, switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CommunicationService implements OnDestroy {
    private stopPolling = new Subject();

    constructor(public commonApiService: CommonApiService) {}

    listenDronePulse(): Observable<Drone[]> {
        return timer(1, 1000).pipe(
            switchMap(() => this.commonApiService.getDrones()),
            retry(),
            share(),
            takeUntil(this.stopPolling),
        );
    }

    ngOnDestroy() {
        this.stopPolling.next();
    }
}
