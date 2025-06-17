export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: "Admin" | "Doctor" | "Customer" | "Manager";
}

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
