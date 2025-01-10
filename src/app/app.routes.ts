import { Routes } from '@angular/router';
import { HomeComponent } from './core/features/home/home.component';
import { UserAuthGuard } from './core/guards/user.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserAuthGuard],
  },
];
