export interface Project {
  _id: string;
  created_by: string;
  name: string;
  description: string;
  status: string;
}

export interface Pagination {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProjectResponse {
  status: string;
  message: string;
  data: {
    projects: Project[];
    pagination: Pagination;
  };
}

export interface CreateProjectResponse {
  status: string;
  message: string;
  data: Project;
}
