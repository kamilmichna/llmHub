import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { from, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    apiUrl = environment.apiUrl;

    constructor() {}

    async sendMessageToChat(
        message: string,
        agentName: string,
        params: {
            temperature: number;
            topP: number;
        }
    ) {
        //TODO
        const resp = await fetch(`${this.apiUrl}/agents/${agentName}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, ...params }),
        });

        const decoder = new TextDecoder('utf-8');
        const reader = resp.body?.getReader();
        const res = [];
        if (!reader) throw 'No reader!';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            res.push(chunk);
        }

        return from(res);
    }
}
