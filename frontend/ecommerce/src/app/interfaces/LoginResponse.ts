export interface LoginResponse {
  accessToken: string;
  expiresAt: string;
  timeUnit: string;
  role: string;
  error: object;
}
