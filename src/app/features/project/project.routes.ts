import { Routes } from '@angular/router';
import { ProjectRolesGuard } from '../../core/guards/project.guard';
import { UserAuthGuard } from '../../core/guards/user.guard';
import { AppComponent } from '../../app.component';
import { ProjectVideoCallComponent } from './pages/project-video-call/project-video-call.component';

export const projectRoutes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'project',
        children: [
          {
            path: ':projectId/dashboard',
            loadComponent: () =>
              import(
                './pages/project-dashboard/project-dashboard.component'
              ).then((m) => m.ProjectDashboardComponent),
            canActivate: [UserAuthGuard, ProjectRolesGuard],
          },
          {
            path: ':projectId/members',
            loadComponent: () =>
              import('./pages/project-members/project-members.component').then(
                (m) => m.ProjectMembersComponent
              ),
            canActivate: [UserAuthGuard, ProjectRolesGuard],
          },
          {
            path: ':projectId/members/accept-request',
            loadComponent: () =>
              import(
                './pages/project-request-accept/project-request-accept.component'
              ).then((m) => m.ProjectRequestAcceptComponent),
            canActivate: [UserAuthGuard],
          },
          {
            path: ':projectId/tasks',
            loadComponent: () =>
              import('./pages/project-tasks/project-tasks.component').then(
                (m) => m.ProjectTasksComponent
              ),
            canActivate: [UserAuthGuard, ProjectRolesGuard],
          },
          {
            path: ':projectId/chats',
            loadComponent: () =>
              import('./pages/project-chat/project-chat.component').then(
                (m) => m.ProjectChatComponent
              ),
            canActivate: [UserAuthGuard, ProjectRolesGuard],
          },
          {
            path: ':projectId/v-call',
            component: ProjectVideoCallComponent,
            canActivate: [UserAuthGuard, ProjectRolesGuard],
          }
        ],
      },
    ],
  },
];
