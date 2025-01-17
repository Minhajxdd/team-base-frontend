import { Routes } from '@angular/router';
import { AdminAuthGuard } from '../../core/guards/admin.guard';

export const adminRoutes: Routes = [
  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [AdminAuthGuard],
  },
  {
    path: 'admin/users',
    loadComponent: () => 
      import('./pages/users/users.component').then(
        (m) => m.UsersComponent
      ),
    canActivate: [AdminAuthGuard],
  },
];
