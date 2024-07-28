import { Component, Input, signal } from '@angular/core';
import { Agent } from '../agents.service';
import { ChatService } from '../chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO move to messages service
interface Message {
    text: string;
    type: 'AI' | 'USER' | 'LOADING';
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
    chatInputMessage = '';
    messages: Message[] = [
        {
            type: 'AI',
            text: 'Hello, how can i help you?',
        },
    ];

    constructor(private chatService: ChatService) {}
    ngOnInit() {}

    async sendMessage() {
        console.log(this.agent);
        if (this.chatInputMessage && this.agent?.name) {
            this.messages.push({
                type: 'USER',
                text: this.chatInputMessage,
            });
            this.messages.push({
                type: 'LOADING',
                text: '',
            });
            (
                await this.chatService.sendMessageToChat(
                    this.chatInputMessage,
                    this.agent.name
                )
            ).subscribe({
                next: (resp) => {
                    this.messages.pop();
                    this.messages.push({
                        type: 'AI',
                        text: resp as string,
                    });
                },
                error: () => {
                    this.messages.pop();
                    this.messages.push({
                        type: 'AI',
                        text: 'There was an error with response from llm model',
                    });
                },
            });
        }
    }

    clearChat() {
        this.messages = [];
    }
}
