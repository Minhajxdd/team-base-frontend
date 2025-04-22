import { Routes } from '@angular/router';
import { UserAuthGuard } from './core/guards/user.guard';
import { HomeComponent } from './features/home/home-page/home.component';
import { ProfileEditComponent } from './features/home/profile-edit/profile-edit.component';
import { MainPageComponent } from './features/home/main-page/main-page.component';
import { UserUnauthorizedAuthGuard } from './core/guards/user-unauthorized.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [UserUnauthorizedAuthGuard],
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'dashboard/profile',
    component: ProfileEditComponent,
    canActivate: [UserAuthGuard],
  },
];
