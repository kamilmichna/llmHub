import { Component, signal } from '@angular/core';
import { AgentsViewComponent } from '../../agents-view/agents-view.component';
import { DashboardLayoutComponent } from '../dashboard-layout/dashboard-layout.component';
import { FilesViewComponent } from '../files-view/files-view.component';
import { KeysViewComponent } from '../keys-view/keys-view.component';

@Component({
    selector: 'app-dashboard-page',
    standalone: true,
    imports: [
        DashboardLayoutComponent,
        AgentsViewComponent,
        FilesViewComponent,
        KeysViewComponent,
    ],
    templateUrl: './dashboard-page.component.html',
    styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
    activeTab = signal<'agents' | 'files' | 'keys'>('agents');

    changeTab(tab: 'agents' | 'files' | 'keys') {
        this.activeTab.set(tab);
    }
}
