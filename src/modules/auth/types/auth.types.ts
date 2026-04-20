export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
}

export interface AuthSession {
  user: AuthUser;
}
