import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { authGuard } from './auth.guard';
import { AgentDetailsComponent } from './agent-details/agent-details.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent
    },
    {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [authGuard]
    },
    {
        path: 'agents',
        component: AgentDetailsComponent,
        pathMatch: 'full',
        canActivate: [authGuard]
    },
    {
        path: 'agents/:agentId',
        component: AgentDetailsComponent,
        canActivate: [authGuard]
    },
];