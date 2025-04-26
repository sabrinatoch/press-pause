import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserInterestsComponent } from './interests/user-interests/user-interests.component';

export const routes: Routes = [
    { path: 'home', component: AppComponent },
    {path:'interests', component: UserInterestsComponent }
];
