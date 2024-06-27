import { Component, signal } from '@angular/core';
import { DashboardLayoutComponent } from '../dashboard-layout/dashboard-layout.component';
import { AgentDetailsAccordionComponent } from '../agent-details-accordion/agent-details-accordion.component';
import { AgentsService } from '../agents.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AgentsViewComponent } from '../agents-view/agents-view.component';
import { FilesViewComponent } from '../files-view/files-view.component';
@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [DashboardLayoutComponent, AgentsViewComponent, FilesViewComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
    activeTab = signal<'agents' | 'files'>('agents');

    changeTab(tab: 'agents' | 'files') {
        this.activeTab.set(tab);
    }
}
