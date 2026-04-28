export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR'
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  user: User;
}
