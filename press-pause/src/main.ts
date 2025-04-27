import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideRouter, Routes } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule, RouterLink } from '@angular/router';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    RouterModule,
    RouterLink,
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-an87aiswf0l0oac8.us.auth0.com',
      clientId: 'JM0NQ5PWHjtrdSUDPQfTgPg5Y1Y7L0R9',
      authorizationParams: {
        redirect_uri: window.location.origin,
      }
    }),
    provideHttpClient()  
  ]
})
.catch((err) => console.error(err));


