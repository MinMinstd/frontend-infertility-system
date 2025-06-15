import type { LoginItem, LoginResponse, RegisterItem } from "../types/auth.d";
import axiosClient from "./axiosClient";

const AuthApi = {
  Login: (data: LoginItem) =>
    axiosClient.post<LoginResponse>("/Auth/login", data),

  Register: (data: RegisterItem) => axiosClient.post("/Auth/register", data),
};

export default AuthApi;
