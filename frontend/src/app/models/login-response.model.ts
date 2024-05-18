export interface User {
  createdAt: string,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  professional: boolean,
  updatedAt: string,
  userId: string,
  verified: boolean,
}

// login-response.model.ts
export interface LoginResponse {
  message: string;
  user: User;
}
