import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LoginComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'press-pause';
}