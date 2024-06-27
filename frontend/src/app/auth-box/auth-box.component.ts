import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-auth-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth-box.component.html',
  styleUrl: './auth-box.component.scss'
})
export class AuthBoxComponent {
  loading = false
  userEmail: string | undefined;

  constructor(
    private readonly supabase: SupabaseService,
  ) {}

  async onSubmit(): Promise<void> {
    try {
      this.loading = true
      const email = this.userEmail as string
      if (!email) {
        throw Error('please provide your email')
      }
      const { error } = await this.supabase.signIn(email)
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      this.loading = false;
    }
  }
}
