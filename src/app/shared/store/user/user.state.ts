import { UserState } from './user.model';

export const initialState: UserState = {
  id: null,
  fullName: null,
  email: null,
  profile: null,
  loading: false,
  error: null,
};
