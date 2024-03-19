import { Component, Input } from '@angular/core';
import { Agent } from '../agents.service';

@Component({
    selector: 'app-chat-window',
    standalone: true,
    imports: [],
    templateUrl: './chat-window.component.html',
    styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent {
    @Input() agent?: Agent;
}
