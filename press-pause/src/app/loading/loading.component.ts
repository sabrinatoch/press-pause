import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
  standalone: true,
})
export class LoadingComponent {

  constructor(private auth: AuthService, private router: Router) {}

  //not needed
  // ngOnInit(): void {
  //   // When the LoadingComponent is loaded, we check if we are returning from Auth0
  //   this.auth.handleRedirectCallback().subscribe({
  //     next: () => {
  //       console.log('✅ Login Callback handled successfully');
  //       this.router.navigate(['/home']); // Redirect to homepage after login is finalized
  //     },
  //     error: (err) => {
  //       console.error('❌ Error handling redirect callback', err);
  //       this.router.navigate(['/home']); // Redirect even if error (optional)
  //     }
  //   });
  // }
  
}
