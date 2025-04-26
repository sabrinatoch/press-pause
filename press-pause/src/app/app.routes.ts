import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserInterestsComponent } from './interests/user-interests/user-interests.component';
import { PackagesComponent } from './analog/packages/packages.component';
import { LoadingComponent } from './loading/loading.component';

export const routes: Routes = [
    { path: 'home', component: AppComponent },
    { path: 'interests', component: UserInterestsComponent },
    { path: 'packages', component: PackagesComponent },
    { path: 'loading', component: LoadingComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
