import { Injectable, OnDestroy } from '@angular/core';
import { CommonApiService, Drone } from '@backend/api-client';
import { Observable, Subject, timer } from 'rxjs';
import { delay, retryWhen, share, switchMap, takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CommunicationService implements OnDestroy {
    private stopPolling = new Subject();

    constructor(public commonApiService: CommonApiService) {}

    listenDronePulse(): Observable<Drone[]> {
        return timer(1, 1000).pipe(
            switchMap(() => this.commonApiService.getDrones()),
            retryWhen((errors) => errors.pipe(delay(3000))),
            share(),
            takeUntil(this.stopPolling),
        );
    }

    ngOnDestroy() {
        this.stopPolling.next();
    }
}
