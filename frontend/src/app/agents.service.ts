import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Agent {
    name: string;
    created: Date;
    model: string;
    systemMessage?: string;
}

export const agentsMock: Agent[] = [
    {
        name: 'test agent',
        created: new Date(),
        model: 'gpt-4',
    },
    {
        name: 'new agent',
        created: new Date(),
        model: 'gpt-4',
    },
    {
        name: 'agent',
        created: new Date(),
        model: 'gpt-4',
        systemMessage: `You are a helpfull shopping assistant
      Always help user with making good shopping decisions`,
    },
];

@Injectable({
    providedIn: 'root',
})
export class AgentsService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getAgents(): Observable<Agent[]> {
        return of(agentsMock);
    }

    createAgent() {
        this.http.post(`${this.apiUrl}/agents`, {
            name: 'test from frontend',
            provider: 'OpenAi',
        });
    }
}
