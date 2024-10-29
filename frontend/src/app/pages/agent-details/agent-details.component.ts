import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { finalize, lastValueFrom } from 'rxjs';
import { Agent, AgentsService } from '../../agents.service';
import { NotificationsService } from '../../alerts.service';
import { ChatWindowComponent } from '../../components/chat-window/chat-window.component';
import { DashboardLayoutComponent } from '../../components/dashboard-layout/dashboard-layout.component';

@Component({
    selector: 'app-agent-details',
    standalone: true,
    templateUrl: './agent-details.component.html',
    styleUrl: './agent-details.component.scss',
    imports: [
        RouterModule,
        DashboardLayoutComponent,
        ChatWindowComponent,
        ReactiveFormsModule,
    ],
})
export class AgentDetailsComponent {
    isNewAgentMode = signal(true);
    activeTab = signal('chat');
    agent?: Agent;
    loading = signal(false);

    agentForm = this.fb.group({
        name: '',
        provider: '',
        model: '',
        systemMessage: '',
    });

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private agentsService: AgentsService,
        private notificationsService: NotificationsService
    ) {
        const agentName = this.route.snapshot.paramMap.get('agentName');
        if (agentName) {
            // TODO ADD LOADING HERE
            agentsService
                .getAgentByName(agentName)
                .subscribe((agent) => (this.agent = agent));
            this.isNewAgentMode.set(false);
        }
    }

    changeTab(tab: string) {
        this.activeTab.set(tab);
    }

    createAgent() {
        if (this.agentForm.valid) {
            this.loading.set(true);
            this.agentsService
                .createAgent({ ...this.agentForm.value })
                .pipe(finalize(() => this.loading.set(false)))
                .subscribe({
                    next: () =>
                        this.notificationsService.emitNotification({
                            type: 'SUCCESS',
                            message: 'Agent was added successfully',
                        }),
                    error: () =>
                        this.notificationsService.emitNotification({
                            type: 'ERROR',
                            message:
                                'There was problem with adding this agent. Check if agent with the same name already exists',
                        }),
                });
        }
    }
}
