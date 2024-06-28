import { Component, Input, signal } from '@angular/core';
import { Agent } from '../agents.service';
import { ChatService } from '../chat.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO move to messages service
interface Message {
    text: string,
    type: 'AI' | 'USER' | 'LOADING'
}

@Component({
    selector: 'app-chat-window',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './chat-window.component.html',
    styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent {
    @Input() agent?: Agent;
    chatInputMessage = ''
    messages: Message[] = [
        {
            type: "AI",
            text: "Hello, how can i help you?"
        },
    ]

    constructor(private chatService: ChatService) { }
    ngOnInit() {
        this.chatService.sendMessageToChat('hello there');
    }

    async sendMessage() {
        if (this.chatInputMessage) {
           
        }
    }

    clearChat() {
        this.messages = [];
    }
}
