import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authRoutes } from './core/auth/auth.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { projectRoutes } from './features/project/project.routes';
import { adminRoutes } from './features/admin/admin.routes';
import { MessageService } from 'primeng/api';
import { provideStore } from '@ngrx/store';
import { ProjectReducer } from './features/project/store/project.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([...authRoutes, ...routes, ...projectRoutes, ...adminRoutes]),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    MessageService,
    provideStore({
      project: ProjectReducer,
    }),
  ],
};
