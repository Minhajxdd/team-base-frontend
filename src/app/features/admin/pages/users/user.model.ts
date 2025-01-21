export interface User {
  __v: number;
  _id: string;
  email: string;
  full_name: string;
  isAdmin: boolean;
  isBlocked: boolean;
}

export interface PaginatedResponse {
  users: User[];
  total: number;
}