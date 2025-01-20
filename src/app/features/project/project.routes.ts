import { Routes } from '@angular/router';
import { ProjectTasksComponent } from './pages/project-tasks/project-tasks.component';
import { ProjectRolesGuard } from '../../core/guards/project.guard';
import { UserAuthGuard } from '../../core/guards/user.guard';
import { ProjectMembersComponent } from './pages/project-members/project-members.component';
import { ProjectRequestAcceptComponent } from './pages/project-request-accept/project-request-accept.component';
import { ProjectDashboardComponent } from './pages/project-dashboard/project-dashboard.component';

export const projectRoutes: Routes = [
  {
    path: 'project',
    children: [
      {
        path: ':projectId/dashboard',
        component: ProjectDashboardComponent,
        canActivate: [UserAuthGuard, ProjectRolesGuard],
      },
      {
        path: ':projectId/members',
        component: ProjectMembersComponent,
        canActivate: [UserAuthGuard, ProjectRolesGuard],
      },
      {
        path: ':projectId/members/accept-request',
        component: ProjectRequestAcceptComponent,
        canActivate: [UserAuthGuard],
      },
      {
        path: ':projectId/tasks',
        component: ProjectTasksComponent,
        canActivate: [UserAuthGuard, ProjectRolesGuard],
      },
    ],
  },
];
