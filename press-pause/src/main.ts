import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-an87aiswf0l0oac8.us.auth0.com',
      clientId: '9JtXGmaS9pahKp6D4DhnrnVbVajwluug',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ]
})
  .catch((err) => console.error(err));
