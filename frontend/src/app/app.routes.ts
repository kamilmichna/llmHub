import { Routes } from '@angular/router';
import { AgentDetailsComponent } from './agent-details/agent-details.component';
import { authGuard } from './auth.guard';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
    },
    {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [authGuard],
    },
    {
        path: 'agents',
        component: AgentDetailsComponent,
        pathMatch: 'full',
        canActivate: [authGuard],
    },
    {
        path: 'agents/:agentName',
        component: AgentDetailsComponent,
        canActivate: [authGuard],
    },
];
