export type NavBarTypeModel = null | 'user' | 'admin' | 'project';

export interface User {
  id: string | null;
  fullName: string | null;
  email: string | null;
  profile: string | null;
  loading: boolean;
  error: string | null;
}
