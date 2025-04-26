import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserInterestsComponent } from './interests/user-interests/user-interests.component';
import { PackagesComponent } from './analog/packages/packages.component';
import { LoadingComponent } from './loading/loading.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
    { path: 'home', component: HomeComponent },
    { path: 'interests', component: UserInterestsComponent },
    { path: 'packages', component: PackagesComponent },
    { path: 'loading', component: LoadingComponent},
    { path: '**', redirectTo: 'home' } // Wildcard route for 404
];
