import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

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
        component: DashboardPageComponent
    },
];