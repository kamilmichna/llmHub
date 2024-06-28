import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
    constructor() {}

    getAgents(): Observable<Agent[]> {
        return of(agentsMock);
    }
}
