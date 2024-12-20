import { Component } from '@angular/core';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { AgentDetailsAccordionComponent } from '../agent-details-accordion/agent-details-accordion.component';
import { RouterModule } from '@angular/router';
import { AgentsService } from '../../agents.service';

@Component({
    selector: 'app-agents-view',
    standalone: true,
    imports: [
        JsonPipe,
        AsyncPipe,
        AgentDetailsAccordionComponent,
        RouterModule,
    ],
    templateUrl: './agents-view.component.html',
    styleUrl: './agents-view.component.scss',
})
export class AgentsViewComponent {
    agents$ = this.agentsService.getAgents();
    constructor(private agentsService: AgentsService) {}
}
