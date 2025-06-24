import type {
  LoginItem,
  LoginResponse,
  RegisterItem,
  RegisterResponse,
  User,
} from "../types/auth.d";
import axiosClient from "./axiosClient";

const AuthApi = {
  Login: (data: LoginItem) =>
    axiosClient.post<LoginResponse>("/Auth/login", data),

  Register: (data: RegisterItem) =>
    axiosClient.post<RegisterResponse>("/Auth/register", data),

  Me: () => axiosClient.get<User>("/User/GetUserAfterLogin"), // cần backend hỗ trợ, vậy hỗ trợ làm cgi và viết ra sao ?
  // mục đích lấy thông tin đã được tạo trước đó
};

export default AuthApi;
