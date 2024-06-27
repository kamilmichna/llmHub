import { Component, Input, OnInit } from '@angular/core';
import { Agent } from '../agents.service';
import { DatePipe } from '@angular/common';
import { FileTreeComponent } from '../file-tree/file-tree.component';
import { RouterModule } from '@angular/router';
import { ChatWindowComponent } from "../chat-window/chat-window.component";

@Component({
    selector: 'app-agent-details-accordion',
    standalone: true,
    templateUrl: './agent-details-accordion.component.html',
    styleUrl: './agent-details-accordion.component.scss',
    imports: [DatePipe, FileTreeComponent, RouterModule, ChatWindowComponent]
})
export class AgentDetailsAccordionComponent implements OnInit {
    @Input('agent') agent?: Agent;

    ngOnInit(){

    }
}
