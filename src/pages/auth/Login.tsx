import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { message } from "antd";
import { Heart, Mail, Lock, User, Stethoscope } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AuthApi from "../../servers/auth.api";

interface LoginFormInputs {
  Username: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      rememberMe: false,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const rememberMe = watch("rememberMe");

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      // TODO: Thêm logic gọi API đăng nhập ở đây
      console.log("Login data:", data);

      // Simulate API call
      const respone = await AuthApi.Login({
        Username: data.Username,
        Password: data.password,
      });

      if (!respone.data?.token) {
        console.log("Token không tồn tại", respone.data);
        throw new Error("Token không hợp lệ");
      }

      console.log("Login response:", respone.data);

      login(respone.data.token); // Gọi hàm login từ AuthContext
      message.success("Đăng nhập thành công!");
      navigate("/"); // Chuyển về trang chủ sau khi đăng nhập
    } catch (err) {
      console.error("Login error:", err);
      message.error("Đăng nhập thất bại. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGmailRegister = async () => {
    setIsLoading(true);
    try {
      // TODO: Thêm logic đăng ký bằng Gmail
      console.log("Gmail register triggered");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Đăng ký bằng Gmail thành công!");
    } catch (err) {
      console.error("Gmail register error:", err);
      message.error("Đăng ký bằng Gmail thất bại. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm kiểm tra user/email
  const validateUsername = (value: string) => {
    if (!value) return "Vui lòng nhập user hoặc email";
    // Regex kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.includes("@")) {
      if (!emailRegex.test(value)) return "Email không hợp lệ";
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Medical Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <Heart className="w-8 h-8 text-pink-400" />
        </div>
        <div className="absolute top-20 right-20">
          <Stethoscope className="w-6 h-6 text-pink-400" />
        </div>
        <div className="absolute bottom-20 left-20">
          <Heart className="w-6 h-6 text-pink-400" />
        </div>
        <div className="absolute bottom-10 right-10">
          <Stethoscope className="w-8 h-8 text-pink-400" />
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Chăm Sóc Sức Khỏe
          </h1>
          <p className="text-gray-600">Đăng nhập vào hệ thống y tế</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-pink-100 transition-all duration-300 hover:shadow-3xl hover:scale-[1.01]"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
            <Stethoscope className="w-6 h-6 text-pink-500" />
            Đăng nhập
          </h2>

          {/* User/Email Field */}
          <div className="mb-6">
            <label className=" mb-2 font-medium text-gray-700  items-center gap-2">
              <User className="w-4 h-4 text-pink-500" />
              User hoặc Email
            </label>
            <div className="relative">
              <input
                type="text"
                {...register("Username", { validate: validateUsername })}
                className={`w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                  errors.Username
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-pink-200 hover:border-pink-300"
                }`}
                placeholder="Nhập user hoặc email"
                disabled={isLoading}
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400" />
            </div>
            {errors.Username && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.Username.message as string}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className=" mb-2 font-medium text-gray-700  items-center gap-2">
              <Lock className="w-4 h-4 text-pink-500" />
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type="password"
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                })}
                className={`w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 bg-white/70 backdrop-blur-sm ${
                  errors.password
                    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                    : "border-pink-200 hover:border-pink-300"
                }`}
                placeholder="Nhập mật khẩu"
                disabled={isLoading}
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400" />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.password.message as string}
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="sr-only"
                  disabled={isLoading}
                />
                <div
                  className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                    rememberMe
                      ? "bg-pink-500 border-pink-500"
                      : "border-pink-300 group-hover:border-pink-400"
                  }`}
                  onClick={() => setValue("rememberMe", !rememberMe)}
                >
                  {rememberMe && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-gray-700 text-sm group-hover:text-pink-600 transition-colors duration-200">
                Ghi nhớ đăng nhập
              </span>
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:from-pink-700 active:to-rose-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-3 focus:ring-pink-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Đang đăng nhập...
              </>
            ) : (
              <>
                <Heart className="w-4 h-4" />
                Đăng nhập
              </>
            )}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-pink-200"></div>
            <span className="px-4 text-sm text-gray-500 bg-white rounded-full">
              Hoặc
            </span>
            <div className="flex-1 border-t border-pink-200"></div>
          </div>

          {/* Gmail Register Button */}
          <button
            type="button"
            onClick={handleGmailRegister}
            disabled={isLoading}
            className="w-full bg-white border-2 border-pink-200 hover:border-pink-300 hover:bg-pink-50 text-pink-600 font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-3 focus:ring-pink-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Đăng ký bằng Gmail
          </button>

          {/* Forgot Password */}
          <div className="text-center mt-6">
            <a
              href="/forgot-password"
              className="text-sm text-pink-600 hover:text-pink-700 hover:underline transition-colors duration-200"
            >
              Quên mật khẩu?
            </a>
          </div>

          {/* Register Link */}
          <div className="text-center mt-4 p-4 bg-pink-50 rounded-xl border border-pink-100">
            <span className="text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <a
                href="/register"
                className="text-pink-600 hover:text-pink-700 hover:underline font-semibold transition-colors duration-200"
              >
                Đăng ký ngay
              </a>
            </span>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p className="flex items-center justify-center gap-1">
            <Heart className="w-4 h-4 text-pink-400" />
            Hệ thống chăm sóc sức khỏe an toàn & bảo mật
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
