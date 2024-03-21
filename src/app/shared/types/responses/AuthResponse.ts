export type AuthResponse = {
  clientId: string;
  userId: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};
