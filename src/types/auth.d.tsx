export interface LoginItem {
  Username: string;
  Password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
}

export interface RegisterItem {
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}
