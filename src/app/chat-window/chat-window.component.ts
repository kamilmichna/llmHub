import { Component, Input, signal } from '@angular/core';
import { Agent } from '../agents.service';
import { SupabaseService } from '../supabase.service';
import { Session } from '@supabase/supabase-js';
import { CommonModule } from '@angular/common';

// TODO move to messages service
interface Message {
    text: string,
    type: 'AI' | 'USER'
}

@Component({
    selector: 'app-chat-window',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chat-window.component.html',
    styleUrl: './chat-window.component.scss',
})
export class ChatWindowComponent {
    @Input() agent?: Agent;

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
            text : "The blue whale is the biggest animal on planet earth."
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
            text : "The blue whale is the biggest animal on planet earth."
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
            text : "The blue whale is the biggest animal on planet earth."
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
            text : "The blue whale is the biggest animal on planet earth."
        },
        {
            type: "USER",
            text: "What is biggest animal on planet Earth?"
        },
        {
            type: "AI",
            text : "The blue whale is the biggest animal on planet earth."
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
            text : "The blue whale is the biggest animal on planet earth."
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
            text : "The blue whale is the biggest animal on planet earth."
        },
    ]
    session = signal<Session | null>(null);

    constructor(private supabase: SupabaseService){}
    ngOnInit() {
        this.supabase.authChanges((_, session) => (this.session.set(session)))
    }
}
