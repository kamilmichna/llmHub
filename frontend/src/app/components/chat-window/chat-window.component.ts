import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Agent, AgentsService } from '../../agents.service';
import { NotificationsService } from '../../alerts.service';
import { ChatService } from '../../chat.service';

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
    temperatureValue = 1;
    topPValue = 1;

    constructor(
        private chatService: ChatService,
        private agentsService: AgentsService,
        private notificationsService: NotificationsService,
        private router: Router
    ) {}

    ngOnInit() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
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
                    this.agent.name,
                    {
                        temperature: this.temperatureValue || 1,
                        topP: this.topPValue || 1,
                    }
                )
            ).subscribe({
                next: (resp) => {
                    console.log(resp);
                    this.messages = this.messages.filter(
                        (item) => item.type !== 'LOADING'
                    );
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
                complete: () => {
                    this.chatInputMessage = '';
                },
            });
        }
    }

    clearChat() {
        this.messages = [];
    }

    async deleteAgent() {
        if (!this.agent?.name) return;
        const result = await Swal.fire({
            background: '#2a323c',
            color: '#a6adbb',
            title: 'Delete Agent',
            text: 'Are you sure that you want to delete this agent?',
            icon: 'error',
            confirmButtonText: 'Confirm',
        });

        if (!result.isConfirmed) return;
        this.agentsService.deleteAgent(this.agent.name).subscribe(() => {
            this.notificationsService.emitNotification({
                type: 'SUCCESS',
                message: 'Agent was deleted',
            });
            this.router.navigate(['/dashboard']);
        });
    }
}
