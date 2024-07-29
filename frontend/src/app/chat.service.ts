import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ChatService {
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    sendMessageToChat(message: string, agentName: string) {
        return this.http.post(
            `${this.apiUrl}/agents/${agentName}`,
            {
                message,
            },
            { withCredentials: true }
        );
    }
}
