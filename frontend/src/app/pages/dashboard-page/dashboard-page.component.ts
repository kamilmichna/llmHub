import { Component, signal } from '@angular/core';
import { AgentsViewComponent } from '../../components/agents-view/agents-view.component';
import { DashboardLayoutComponent } from '../../components/dashboard-layout/dashboard-layout.component';
import { FilesViewComponent } from '../../components/files-view/files-view.component';

@Component({
    selector: 'app-dashboard-page',
    standalone: true,
    imports: [
        DashboardLayoutComponent,
        AgentsViewComponent,
        FilesViewComponent,
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
