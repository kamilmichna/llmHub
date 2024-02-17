import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn =  (route, state) => {
    const router = inject(Router);
    return inject(SupabaseService).getSession().then(data=> data.session ? true : router.parseUrl('/'))
};
