import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserInterestsComponent } from './interests/user-interests/user-interests.component';
import { PackagesComponent } from './analog/packages/packages.component';
import { LoadingComponent } from './loading/loading.component';
import { HomeComponent } from './home/home.component';
import { DevicesComponent } from './analog/devices/devices.component';
import { AuthGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent },
    { path: 'interests', component: UserInterestsComponent,  canActivate: [AuthGuard] },
    { path: 'packages', component: PackagesComponent, canActivate: [AuthGuard] },
    { path: 'loading', component: LoadingComponent, canActivate: [AuthGuard]},
    {path: 'devices', component: DevicesComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: 'home' } // Wildcard route for 404
];
