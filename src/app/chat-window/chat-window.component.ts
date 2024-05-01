import { Component, Input, signal } from '@angular/core';
import { Agent } from '../agents.service';
import { SupabaseService } from '../supabase.service';
import { ChatService } from '../chat.service'
import { Session } from '@supabase/supabase-js';
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
    session = signal<Session | null>(null);

    constructor(private supabase: SupabaseService, private chatService: ChatService) { }
    ngOnInit() {
        this.supabase.authChanges((_, session) => (this.session.set(session)))
        this.chatService.sendMessageToChat('hello there');
    }

    async sendMessage() {
        if (this.chatInputMessage) {
            this.messages.push({
                type: "USER",
                text: this.chatInputMessage
            });
            this.messages.push({
                type: "LOADING",
                text: ""
            });
            const resp = await this.chatService.sendMessageToChat(this.chatInputMessage);
            const answer = resp?.data
            if (resp?.error || !answer) {
                console.error("no message returned from api endpoint");
                this.messages.push({
                    type: "AI",
                    text: "Sorry, I can`t currently respons to Your message. Please try again later"
                })
                return;
            }
            this.messages.pop();
            this.messages.push({
                type: "AI",
                text: answer
            });
            this.chatInputMessage = '';
        }
    }

    clearChat() {
        this.messages = [];
    }
}
