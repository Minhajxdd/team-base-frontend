import { Profile } from "./project-members.model";

export const roles = [
  { label: 'Project Manager', value: 'project_manager' },
  { label: 'Team Lead', value: 'team_lead' },
  { label: 'Developer', value: 'developer' },
];

export const profiles: Profile[] = [
    {
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      role: 'Product Designer',
    },
    {
      name: 'Michael Chen',
      email: 'michael.c@company.com',
      role: 'Frontend Developer',
    },
    {
      name: 'Emma Wilson',
      email: 'emma.w@company.com',
      role: 'Project Manager',
    },
  ];