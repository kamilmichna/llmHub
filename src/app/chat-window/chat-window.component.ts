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
    type: 'AI' | 'USER'
}

@Component({
    selector: 'app-chat-window',
    standalone: true,
    imports: [CommonModule,FormsModule],
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
        {
            type: "USER",
            text: "What is biggest animal on planet Earth?"
        },
        {
            type: "AI",
            text: "The blue whale is the biggest animal on planet earth."
        },
        {
            type: "AI",
            text: "Hello, how can i help you?"
        },
        {
            type: "USER",
            text: "What is biggest animal on planet Earth?"
        },
        {
            type: "AI",
            text: "The blue whale is the biggest animal on planet earth."
        },
        {
            type: "AI",
            text: "Hello, how can i help you?"
        },
        {
            type: "USER",
            text: "What is biggest animal on planet Earth?"
        },
        {
            type: "AI",
            text: "The blue whale is the biggest animal on planet earth."
        },
        {
            type: "AI",
            text: "Hello, how can i help you?"
        },
        {
            type: "USER",
            text: "What is biggest animal on planet Earth?"
        },
        {
            type: "AI",
            text: "The blue whale is the biggest animal on planet earth."
        },
        {
            type: "USER",
            text: "What is biggest animal on planet Earth?"
        },
        {
            type: "AI",
            text: "The blue whale is the biggest animal on planet earth."
        },
        {
            type: "AI",
            text: "Hello, how can i help you?"
        },
        {
            type: "USER",
            text: "What is biggest animal on planet Earth?"
        },
        {
            type: "AI",
            text: "The blue whale is the biggest animal on planet earth."
        },
        {
            type: "AI",
            text: "Hello, how can i help you?"
        },
        {
            type: "USER",
            text: "What is biggest animal on planet Earth?"
        },
        {
            type: "AI",
            text: "The blue whale is the biggest animal on planet earth."
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
            const resp = await this.chatService.sendMessageToChat(this.chatInputMessage);
            const answer = resp?.data
            if (resp?.error || !answer) {
                console.error("no message returned from api endpoint");
                return;
            }
            alert(answer)
            this.chatInputMessage = '';
        } 
    }
}
