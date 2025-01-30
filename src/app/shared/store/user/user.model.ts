export interface UserState {
  id: string | null;
  fullName: string | null;
  email: string | null;
  profile: string | null;
  loading: boolean;
  error: string | null;
}
