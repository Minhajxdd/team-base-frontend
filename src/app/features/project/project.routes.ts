import { Routes } from '@angular/router';
import { ProjectDashboardComponent } from './pages/project-dashboard/project-dashboard.component';
import { ProjectRolesGuard } from '../../core/guards/project.guard';
import { UserAuthGuard } from '../../core/guards/user.guard';
import { ProjectMembersComponent } from './pages/project-members/project-members.component';

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
    ],
  },
];
