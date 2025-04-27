import { Component, Inject } from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {DOCUMENT} from '@angular/common';
import { NgIf, AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <button (click)="logout()">
        Log out
      </button>
    </ng-container>
    
    <ng-template #loggedOut>
      <button (click)="login()">Log in</button>
    </ng-template>
  `,
  standalone: true,
  imports: [NgIf, AsyncPipe]
})
export class LoginComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document, 
    public auth: AuthService
  ) {}

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    // Simplify the logout process
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      },
      openUrl: (url) => {
        window.location.assign(url);
      }
    });
  }
}