import { Component } from '@angular/core';
import { AuthBoxComponent } from '../auth-box/auth-box.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthBoxComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
