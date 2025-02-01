import { Routes } from '@angular/router';
import { ProjectRolesGuard } from '../../core/guards/project.guard';
import { UserAuthGuard } from '../../core/guards/user.guard';

export const projectRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../app.component').then((m) => m.AppComponent),
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
        ],
      },
    ],
  },
];
