export interface UsersResponse {
  _id: string;
  email: string;
}

export interface Profile {
  name: string;
  email: string;
  role: string;
}

export interface sentRequest {
  email: string;
  roles: string;
  message: string;
}
