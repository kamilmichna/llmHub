import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { from, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    startConversation(agentName: string) {
        return this.http
            .post<string>(`${this.apiUrl}/agents/${agentName}/start`, null, {
                withCredentials: true,
            })
            .pipe(
                tap((res) => {
                    console.log(`Started conversation with id ${res}`);
                })
            );
    }

    async sendMessageToChat(
        message: string,
        agentName: string,
        conversationUUID: string,
        params: {
            temperature: number;
            topP: number;
        }
    ) {
        const resp = await fetch(`${this.apiUrl}/agents/${agentName}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message,
                conversation_uuid: conversationUUID,
                ...params,
            }),
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
