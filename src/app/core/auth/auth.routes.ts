import { Routes } from '@angular/router';
import { AuthFormComponentComponent } from './pages/auth-form-component/auth-form-component.component';
import { AuthOtpPageComponent } from './pages/auth-otp-page/auth-otp-page.component';
import { UserUnauthorizedAuthGuard } from '../guards/user-unauthorized.guard';
import { authAdminFormTemplate } from './pages/auth-admin-login-page/auth-admin-login.template';
import { AuthAdminLoginPageComponent } from './pages/auth-admin-login-page/auth-admin-login-page.component';

export const authRoutes: Routes = [
  {
    path: 'register',
    component: AuthFormComponentComponent,
    canActivate: [UserUnauthorizedAuthGuard],
  },
  {
    path: 'register/verify',
    component: AuthOtpPageComponent,
    canActivate: [UserUnauthorizedAuthGuard],
  },
  {
    path: 'login',
    component: AuthFormComponentComponent,
    canActivate: [UserUnauthorizedAuthGuard],
  },
  {
    path: 'admin/login',
    component: AuthAdminLoginPageComponent,
  },
];
