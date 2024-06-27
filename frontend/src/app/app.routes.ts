import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { authGuard } from './auth.guard';
import { AgentDetailsComponent } from './agent-details/agent-details.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent
    }, 
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