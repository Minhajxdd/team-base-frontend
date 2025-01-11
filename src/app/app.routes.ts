import { Routes } from '@angular/router';
import { UserAuthGuard } from './core/guards/user.guard';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [UserAuthGuard],
  },
];
