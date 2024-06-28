import { Component, signal } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [JsonPipe, RouterModule, AsyncPipe],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    apiUrl;
    isAuthorized$: any;
    constructor(private auth: AuthService) {
        this.apiUrl = environment.apiUrl;
        this.isAuthorized$ = auth.checkLoggedIn$;
    }

    ngOnInit() {}

    async signOut() {
        await this.auth.signOut();
    }

    async signIn() {
        await this.auth.signIn();
    }
}
