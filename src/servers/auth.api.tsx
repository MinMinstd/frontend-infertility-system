import type {
  LoginItem,
  LoginResponse,
  RegisterItem,
  RegisterResponse,
  User,
} from "../types/auth.d";
import axiosClient from "./axiosClient";

// Thêm interface cho response của check-email API
// interface CheckEmailResponse {
//   exists: boolean;
//   message: string;
//   userRole: string | null;
// }

// Thêm interface cho Google login
interface GoogleLoginRequest {
  credential: string;
}

const AuthApi = {
  Login: (data: LoginItem) =>
    axiosClient.post<LoginResponse>("/Auth/login", data),

  Register: (data: RegisterItem) =>
    axiosClient.post<RegisterResponse>("/Auth/register", data),

  Me: () => axiosClient.get<User>("/User/GetUserAfterLogin"), // cần backend hỗ trợ, vậy hỗ trợ làm cgi và viết ra sao ?
  // mục đích lấy thông tin đã được tạo trước đó

  // API đăng nhập bằng Google token
  GoogleLogin: (data: GoogleLoginRequest) =>
    axiosClient.post<LoginResponse>("/Auth/google-login", data),

  // API xác nhận email
  confirmEmail: (token: string) =>
    axiosClient.get("/Auth/confirm-email", { params: { token } }),
};

export default AuthApi;
