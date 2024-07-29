import { Component, Input, OnInit } from '@angular/core';
import { Agent } from '../agents.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { FileTreeComponent } from '../components/file-tree/file-tree.component';
@Component({
    selector: 'app-agent-details-accordion',
    standalone: true,
    templateUrl: './agent-details-accordion.component.html',
    styleUrl: './agent-details-accordion.component.scss',
    imports: [DatePipe, FileTreeComponent, RouterModule, ChatWindowComponent],
})
export class AgentDetailsAccordionComponent implements OnInit {
    @Input('agent') agent?: Agent;

    ngOnInit() {}
}
