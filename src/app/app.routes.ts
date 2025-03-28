import { Routes } from '@angular/router';
import { UserAuthGuard } from './core/guards/user.guard';
import { HomeComponent } from './features/home/home-page/home.component';
import { ProfileEditComponent } from './features/home/profile-edit/profile-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'profile',
    component: ProfileEditComponent,
    canActivate: [UserAuthGuard],
  },
];
