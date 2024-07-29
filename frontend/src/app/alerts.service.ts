import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, timer } from 'rxjs';

export interface INotification {
    type: 'ERROR' | 'INFO' | 'SUCCESS';
    message: string;
}

@Injectable({
    providedIn: 'root',
})
export class NotificationsService {
    currentNotificationSubject$ = new BehaviorSubject<INotification | null>(
        null
    );
    private currentNotification$ =
        this.currentNotificationSubject$.asObservable();

    constructor() {}

    emitNotification(notification: INotification) {
        this.currentNotificationSubject$.next(notification);

        this.currentNotification$
            .pipe(switchMap(() => timer(5000)))
            .subscribe(() => {
                console.log('emitted new');
                this.currentNotificationSubject$.next(null);
            });
    }
}
