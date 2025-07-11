export interface User {
  userId: number;
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

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface RegisterItem {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  birthday: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}
