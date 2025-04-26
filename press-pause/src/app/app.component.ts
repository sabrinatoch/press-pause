import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'press-pause';
}