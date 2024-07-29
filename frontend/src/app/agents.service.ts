import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export enum PROVIDERS {
    OpenAi,
    Groq,
}

export interface Agent {
    id?: number;
    name: string;
    model: string;
    provider: PROVIDERS;
    created: Date;
}

export const agentsMock: Agent[] = [
    {
        name: 'SYSTEM MESS2',
        model: 'gpt-4',
        provider: PROVIDERS.OpenAi,
        created: new Date(),
    },
];

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

    createAgent({ name, provider }: Record<string, string | null>) {
        return this.http.post(
            `${this.apiUrl}/agents`,
            {
                name: name,
                provider: provider,
                system_message: 'Your name is John',
            },
            { withCredentials: true }
        );
    }
}
