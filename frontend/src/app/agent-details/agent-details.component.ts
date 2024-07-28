import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from '../dashboard-layout/dashboard-layout.component';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { agentsMock, Agent } from '../agents.service';

@Component({
    selector: 'app-agent-details',
    standalone: true,
    templateUrl: './agent-details.component.html',
    styleUrl: './agent-details.component.scss',
    imports: [RouterModule, DashboardLayoutComponent, ChatWindowComponent],
})
export class AgentDetailsComponent {
    isNewAgentMode = signal(true);
    activeTab = signal('chat');
    agent?: Agent;
    constructor(private route: ActivatedRoute) {
        if (this.route.snapshot.paramMap.get('agentId')) {
            this.agent = agentsMock[0];
            this.isNewAgentMode.set(false);
        }
    }
    changeTab(tab: string) {
        this.activeTab.set(tab);
    }
}
