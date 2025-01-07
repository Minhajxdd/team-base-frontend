import { Routes } from '@angular/router';
import { AuthFormComponentComponent } from './pages/auth-form-component/auth-form-component.component';

export const authRoutes: Routes = [
  {
    path: 'register',
    component: AuthFormComponentComponent,
  },
  {
    path: 'login',
    component: AuthFormComponentComponent,
  },
];
