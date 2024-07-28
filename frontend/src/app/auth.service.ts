import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import {
    HttpClient,
    HttpEvent,
    HttpHandlerFn,
    HttpRequest,
} from '@angular/common/http';
import {
    Observable,
    Subject,
    catchError,
    interval,
    map,
    merge,
    of,
    shareReplay,
    startWith,
    switchMap,
} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiUrl = environment.apiUrl;
    refreshAuthStatus = new Subject();

    checkLoggedIn$ = merge(
        this.refreshAuthStatus,
        interval(100000).pipe(startWith(0))
    ).pipe(
        switchMap(() =>
            this.http
                .get(this.apiUrl + '/check-auth', { withCredentials: true })
                .pipe(
                    catchError(() => of(false)),
                    map((resp: any) => {
                        return resp || false;
                    })
                )
        ),
        shareReplay()
    );

    constructor(private http: HttpClient, private router: Router) {
        this.refreshAuthStatus.next(true);
    }

    async signOut() {
        this.http
            .get(`${this.apiUrl}/logout`, { withCredentials: true })
            .subscribe({
                next: () => {},
                error: (error: any) => {
                    console.error('Logout failed', error);
                },
                complete: () => {
                    this.refreshAuthStatus.next(true);
                    this.router.navigate(['/']);
                },
            });
    }

    async signIn() {
        window.location.href = this.apiUrl + '/login';
    }
}

export function httpInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
    console.log(req.url);
    return next(req);
}
