import { Component, signal } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { environment } from '../../../environments/environment';
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
