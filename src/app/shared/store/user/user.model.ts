export interface UserState {
  id: string | null;
  fullName: string | null;
  email: string | null;
  profile: string | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  profile: string;
}
