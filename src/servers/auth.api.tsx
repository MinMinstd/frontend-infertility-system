import type {
  LoginItem,
  LoginResponse,
  RegisterItem,
  User,
} from "../types/auth.d";
import axiosClient from "./axiosClient";

const AuthApi = {
  Login: (data: LoginItem) =>
    axiosClient.post<LoginResponse>("/Auth/login", data),

  Register: (data: RegisterItem) => axiosClient.post("/Auth/register", data),

  Me: () => axiosClient.get<User>("/customer"), // cần backend hỗ trợ, vậy hỗ trợ làm cgi và viết ra sao ?
  // mục đích lấy thông tin đã được tạo trước đó
};

export default AuthApi;
