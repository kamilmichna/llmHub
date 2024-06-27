import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    constructor(
        private supabaseService: SupabaseService,
    ) {
    }

    async sendMessageToChat(message: string) {
        if (!message) return;
        const resp = await this.supabaseService.invokeFunction('chat', {
            userMessage: message
        })
        return resp || null;
    }
}
