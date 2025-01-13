import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminAuthGuard } from '../../core/guards/admin.guard';
import { UsersComponent } from './pages/users/users.component';

export const adminRoutes: Routes = [
  {
    path: 'admin/dashboard',
    component: DashboardComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [AdminAuthGuard],
  },
];
