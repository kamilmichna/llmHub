import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Agent {
    id?: number;
    name: string;
    model: string;
    created: Date;
    system_message: string;
}

@Injectable({
    providedIn: 'root',
})
export class AgentsService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getAgents(): Observable<Agent[]> {
        return this.http.get<Agent[]>(`${this.apiUrl}/agents`, {
            withCredentials: true,
        });
    }

    getAgentByName(agentName: string): Observable<Agent> {
        return this.http.get<Agent>(`${this.apiUrl}/agents/${agentName}`, {
            withCredentials: true,
        });
    }

    deleteAgent(agentName: string): Observable<Agent> {
        return this.http.delete<Agent>(`${this.apiUrl}/agents/${agentName}`, {
            withCredentials: true,
        });
    }

    createAgent({ name, systemMessage }: Record<string, string | null>) {
        return this.http.post(
            `${this.apiUrl}/agents`,
            {
                name: name,
                system_message: systemMessage,
            },
            { withCredentials: true }
        );
    }

    getApiKeys() {
        return this.http.get<any>(`${this.apiUrl}/api-keys`, {
            withCredentials: true,
        });
    }

    addApiKey(agentName: string, apiKey: string): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/api-keys`,
            { api_key: apiKey },
            { withCredentials: true }
        );
    }
}
