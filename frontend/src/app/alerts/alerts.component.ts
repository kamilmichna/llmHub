import { Component } from '@angular/core';
import { NotificationsService, INotification } from '../alerts.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alerts',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './alerts.component.html',
    styleUrl: './alerts.component.scss',
})
export class AlertsComponent {
    currentNotification: INotification | null = null;
    constructor(private alertsService: NotificationsService) {
        this.alertsService.currentNotificationSubject$.subscribe(
            (notification) => {
                this.currentNotification = notification;
            }
        );
    }
}
