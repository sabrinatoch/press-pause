import { Component } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  template: '<button (click)="auth.loginWithRedirect()">Log in</button>',
  standalone: true 
})
export class LoginComponent {
    // Inject the authentication service into your component through the constructor
  constructor(public auth: AuthService) {}
}
