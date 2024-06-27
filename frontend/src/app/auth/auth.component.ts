import { Component } from '@angular/core';
import { AuthBoxComponent } from '../auth-box/auth-box.component';
import { SupabaseService } from '../supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthBoxComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
    constructor(private supabase: SupabaseService, private router: Router) {
        supabase.getSession().then(data => data?.session ? router.navigate(['dashboard']) : null)
    }
}
