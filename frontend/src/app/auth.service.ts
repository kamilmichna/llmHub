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

type HTTP_METHODS = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    apiUrl = environment.apiUrl;
    refreshAuthStatus = new Subject();

    checkLoggedIn$ = merge(
        this.refreshAuthStatus,
        interval(10000).pipe(startWith(0))
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

    constructor(private http: HttpClient) {
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
                complete: () => this.refreshAuthStatus.next(true),
            });
    }

    async signIn() {
        window.location.href = this.apiUrl + '/login';
    }

    private clearCookies() {
        document.cookie.split(';').forEach((cookie) => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie =
                name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        });
    }
}

export function httpInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
    console.log(req.url);
    return next(req);
}
