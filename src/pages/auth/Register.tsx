import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { message } from "antd";
import {
  Heart,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Stethoscope,
  CheckCircle,
  ArrowLeft,
  Calendar,
  Users,
} from "lucide-react";
import AuthApi from "../../servers/auth.api";
import type { RegisterItem } from "../../types/auth.d";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<RegisterItem>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const agreeTerms = watch("agreeTerms");

  const onSubmit = async (data: RegisterItem) => {
    setIsLoading(true);
    try {
      console.log("Dữ liệu được gửi đi nè: ", data);

      const res = await AuthApi.Register(data);

      console.log("Phản hồi từ server nè : ", res);

      // const formattedData = {
      //   ...data,
      //   // birthday: new Date(data.birthday).toISOString(),
      // };

      // await AuthApi.Register(formattedData);

      setIsRegistered(true);
      message.success("Đăng ký tài khoản thành công!");
    } catch (err) {
      console.error("Register error:", err);
      message.error("Đăng ký thất bại. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border border-pink-100">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Đăng ký thành công!
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Chào mừng bạn đến với hệ thống chăm sóc sức khỏe. Tài khoản của bạn
            đã được tạo thành công.
          </p>

          <div className="bg-pink-50 border border-pink-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-pink-700 flex items-center justify-center gap-2">
              <Heart className="w-4 h-4" />
              Vui lòng kiểm tra email để xác thực tài khoản
            </p>
          </div>

          <button
            onClick={handleBackToLogin}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    );
  }

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

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Tham Gia Hệ Thống
          </h1>
          <p className="text-gray-600">Đăng ký tài khoản chăm sóc sức khỏe</p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-pink-100 transition-all duration-300 hover:shadow-3xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-pink-500" />
              Đăng ký tài khoản
            </h2>
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-pink-600 hover:text-pink-700 transition-colors duration-200 flex items-center gap-1 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Đăng nhập
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Full Name Field */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-pink-500" />
                  Họ và tên
                </div>
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("fullName", {
                    required: "Vui lòng nhập họ và tên",
                    minLength: {
                      value: 2,
                      message: "Họ và tên phải có ít nhất 2 ký tự",
                    },
                  })}
                  className={`w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 bg-white/70 backdrop-blur-sm ${errors.fullName
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-pink-200 hover:border-pink-300"
                    }`}
                  placeholder="Nhập họ và tên"
                  disabled={isLoading}
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400" />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.fullName.message as string}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-pink-500" />
                  Email
                </div>
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email không hợp lệ",
                    },
                  })}
                  className={`w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 bg-white/70 backdrop-blur-sm ${errors.email
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-pink-200 hover:border-pink-300"
                    }`}
                  placeholder="Nhập email"
                  disabled={isLoading}
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400" />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.email.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Phone Field */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-pink-500" />
                  Số điện thoại
                </div>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  {...register("phone", {
                    required: "Vui lòng nhập số điện thoại",
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "Số điện thoại không hợp lệ (10-11 số)",
                    },
                  })}
                  className={`w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 bg-white/70 backdrop-blur-sm ${errors.phone
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-pink-200 hover:border-pink-300"
                    }`}
                  placeholder="Nhập số điện thoại"
                  disabled={isLoading}
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400" />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.phone.message as string}
                </p>
              )}
            </div>

            {/* Gender Field */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-500" />
                  Giới tính
                </div>
              </label>
              <div className="relative">
                <select
                  {...register("gender", {
                    required: "Vui lòng chọn giới tính",
                  })}
                  className={`w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 bg-white/70 backdrop-blur-sm ${errors.gender
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-pink-200 hover:border-pink-300"
                    }`}
                  disabled={isLoading}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  {/* <option value="Khác">Khác</option> */}
                </select>
                <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400" />
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.gender.message as string}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Birthday Field */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-pink-500" />
                  Ngày sinh
                </div>
              </label>
              <div className="relative">
                <input
                  type="date"
                  {...register("birthday", {
                    required: "Vui lòng chọn ngày sinh",
                    validate: (value) => {
                      const today = new Date();
                      const birthDate = new Date(value);
                      const age = today.getFullYear() - birthDate.getFullYear();
                      return age >= 13 || "Bạn phải từ 13 tuổi trở lên";
                    },
                  })}
                  className={`w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 bg-white/70 backdrop-blur-sm ${errors.birthday
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-pink-200 hover:border-pink-300"
                    }`}
                  disabled={isLoading}
                />
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400" />
              </div>
              {errors.birthday && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.birthday.message as string}
                </p>
              )}
            </div>

            {/* Address Field */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-pink-500" />
                  Địa chỉ
                </div>
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("address", {
                    required: "Vui lòng nhập địa chỉ",
                  })}
                  className={`w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 bg-white/70 backdrop-blur-sm ${errors.address
                      ? "border-red-400 focus:border-red-500 focus:ring-red-200"
                      : "border-pink-200 hover:border-pink-300"
                    }`}
                  placeholder="Nhập địa chỉ"
                  disabled={isLoading}
                />
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-400" />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.address.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-pink-500" />
                Mật khẩu
              </div>
            </label>
            <div className="relative">
              <input
                type="password"
                {...register("password", {
                  required: "Vui lòng nhập mật khẩu",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message: "Mật khẩu phải có chữ hoa, chữ thường và số",
                  },
                })}
                className={`w-full px-4 py-3 pl-12 border rounded-xl focus:outline-none focus:ring-3 focus:ring-pink-300 focus:border-pink-400 transition-all duration-200 bg-white/70 backdrop-blur-sm ${errors.password
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

          {/* Terms Agreement */}
          <div className="mb-6">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-1">
                <input
                  type="checkbox"
                  {...register("agreeTerms", {
                    required: "Vui lòng đồng ý với điều khoản",
                  })}
                  className="sr-only"
                  disabled={isLoading}
                />
                <div
                  className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${agreeTerms
                      ? "bg-pink-500 border-pink-500"
                      : "border-pink-300 group-hover:border-pink-400"
                    }`}
                  onClick={() => setValue("agreeTerms", !agreeTerms)}
                >
                  {agreeTerms && (
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
              <span className="text-sm text-gray-700 leading-relaxed">
                Tôi đồng ý với{" "}
                <a
                  href="/terms"
                  className="text-pink-600 hover:text-pink-700 hover:underline font-medium"
                >
                  Điều khoản sử dụng
                </a>{" "}
                và{" "}
                <a
                  href="/privacy"
                  className="text-pink-600 hover:text-pink-700 hover:underline font-medium"
                >
                  Chính sách bảo mật
                </a>{" "}
                của hệ thống chăm sóc sức khỏe
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.agreeTerms.message as string}
              </p>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading || !agreeTerms}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:from-pink-700 active:to-rose-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-3 focus:ring-pink-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Đang đăng ký...
              </>
            ) : (
              <>
                <Heart className="w-4 h-4" />
                Đăng ký tài khoản
              </>
            )}
          </button>

          {/* Login Link */}
          <div className="text-center mt-6 p-4 bg-pink-50 rounded-xl border border-pink-100">
            <span className="text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-pink-600 hover:text-pink-700 hover:underline font-semibold transition-colors duration-200"
              >
                Đăng nhập ngay
              </button>
            </span>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p className="flex items-center justify-center gap-1">
            <Heart className="w-4 h-4 text-pink-400" />
            Tham gia hệ thống chăm sóc sức khỏe an toàn & bảo mật
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
