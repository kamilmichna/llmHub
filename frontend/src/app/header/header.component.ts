import { Component, signal } from '@angular/core';
import { SupabaseService } from '../supabase.service';
import { Session } from '@supabase/supabase-js';
import { JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [JsonPipe, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    session = signal<Session | null>(null);
    constructor(private supabase: SupabaseService) {
    }
   
    ngOnInit() {
      this.supabase.authChanges((_, session) => (this.session.set(session)))
    }   

    signOut() {
      this.supabase.signOut();
    }
}
