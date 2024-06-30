import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { first, lastValueFrom, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.checkLoggedIn$.pipe(
        first(),
        map((isLoggedIn) => {
            if (isLoggedIn) return true;
            router.navigate(['/']);
            return false;
        })
    );
};
