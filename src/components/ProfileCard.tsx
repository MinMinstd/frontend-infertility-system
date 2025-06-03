import { useForm } from "react-hook-form";
import { useState } from "react";
import { message } from "antd";
import { Heart, Stethoscope } from "lucide-react";

interface ProfileFormInputs {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const ProfileCard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileFormInputs>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ProfileFormInputs) => {
    setIsLoading(true);
    try {
      console.log("Profile data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      message.success("Cập nhật thông tin thành công!");
    } catch (err) {
      console.error("Profile update error:", err);
      message.error("Cập nhật thất bại. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
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

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mb-4 shadow-lg">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Thông Tin Cá Nhân
          </h1>
          <p className="text-gray-600">Cập nhật thông tin hồ sơ y tế của bạn</p>
        </div>

        {/* Profile Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-pink-100 transition-all duration-300 hover:shadow-3xl"
        >
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center gap-2">
            <Stethoscope className="w-6 h-6 text-pink-500" />
            Hồ Sơ Bệnh Nhân
          </h2>

          {/* Full Name */}
          <div className="relative z-0 w-full mb-8 group">
            <input
              type="text"
              {...register("fullName", {
                required: "Vui lòng nhập họ và tên",
                minLength: {
                  value: 2,
                  message: "Họ và tên phải có ít nhất 2 ký tự",
                },
              })}
              className={`block py-3 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-all duration-300 ${
                errors.fullName
                  ? "text-red-600 border-red-500 focus:border-red-600"
                  : "text-gray-900 border-pink-300 focus:border-pink-500"
              }`}
              placeholder=" "
              disabled={isLoading}
            />
            <label
              className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                errors.fullName
                  ? "text-red-500 peer-focus:text-red-600"
                  : "text-pink-600 peer-focus:text-pink-500"
              }`}
            >
              Họ và tên *
            </label>
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.fullName.message as string}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="relative z-0 w-full mb-8 group">
            <input
              type="email"
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email không hợp lệ",
                },
              })}
              className={`block py-3 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-all duration-300 ${
                errors.email
                  ? "text-red-600 border-red-500 focus:border-red-600"
                  : "text-gray-900 border-pink-300 focus:border-pink-500"
              }`}
              placeholder=" "
              disabled={isLoading}
            />
            <label
              className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                errors.email
                  ? "text-red-500 peer-focus:text-red-600"
                  : "text-pink-600 peer-focus:text-pink-500"
              }`}
            >
              Địa chỉ email *
            </label>
            {errors.email && (
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* Phone and Date of Birth */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-8 group">
              <input
                type="tel"
                {...register("phone", {
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: /^[0-9]{10,11}$/,
                    message: "Số điện thoại không hợp lệ (10-11 số)",
                  },
                })}
                className={`block py-3 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-all duration-300 ${
                  errors.phone
                    ? "text-red-600 border-red-500 focus:border-red-600"
                    : "text-gray-900 border-pink-300 focus:border-pink-500"
                }`}
                placeholder=" "
                disabled={isLoading}
              />
              <label
                className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  errors.phone
                    ? "text-red-500 peer-focus:text-red-600"
                    : "text-pink-600 peer-focus:text-pink-500"
                }`}
              >
                Số điện thoại *
              </label>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.phone.message as string}
                </p>
              )}
            </div>

            <div className="relative z-0 w-full mb-8 group">
              <input
                type="date"
                {...register("dateOfBirth", {
                  required: "Vui lòng nhập ngày sinh",
                  validate: (value) => {
                    const today = new Date();
                    const birthDate = new Date(value);
                    const age = today.getFullYear() - birthDate.getFullYear();
                    if (age < 0 || age > 120) {
                      return "Ngày sinh không hợp lệ";
                    }
                    return true;
                  },
                })}
                className={`block py-3 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-all duration-300 ${
                  errors.dateOfBirth
                    ? "text-red-600 border-red-500 focus:border-red-600"
                    : "text-gray-900 border-pink-300 focus:border-pink-500"
                }`}
                placeholder=" "
                disabled={isLoading}
              />
              <label
                className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  errors.dateOfBirth
                    ? "text-red-500 peer-focus:text-red-600"
                    : "text-pink-600 peer-focus:text-pink-500"
                }`}
              >
                Ngày sinh *
              </label>
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.dateOfBirth.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="relative z-0 w-full mb-8 group">
            <input
              type="text"
              {...register("address", {
                required: "Vui lòng nhập địa chỉ",
                minLength: {
                  value: 5,
                  message: "Địa chỉ phải có ít nhất 5 ký tự",
                },
              })}
              className={`block py-3 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-all duration-300 ${
                errors.address
                  ? "text-red-600 border-red-500 focus:border-red-600"
                  : "text-gray-900 border-pink-300 focus:border-pink-500"
              }`}
              placeholder=" "
              disabled={isLoading}
            />
            <label
              className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                errors.address
                  ? "text-red-500 peer-focus:text-red-600"
                  : "text-pink-600 peer-focus:text-pink-500"
              }`}
            >
              Địa chỉ *
            </label>
            {errors.address && (
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.address.message as string}
              </p>
            )}
          </div>

          {/* Password and Confirm Password */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-8 group">
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
                className={`block py-3 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-all duration-300 ${
                  errors.password
                    ? "text-red-600 border-red-500 focus:border-red-600"
                    : "text-gray-900 border-pink-300 focus:border-pink-500"
                }`}
                placeholder=" "
                disabled={isLoading}
              />
              <label
                className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  errors.password
                    ? "text-red-500 peer-focus:text-red-600"
                    : "text-pink-600 peer-focus:text-pink-500"
                }`}
              >
                Mật khẩu *
              </label>
              {errors.password && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.password.message as string}
                </p>
              )}
            </div>

            <div className="relative z-0 w-full mb-8 group">
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Vui lòng xác nhận mật khẩu",
                  validate: (value) =>
                    value === watch("password") ||
                    "Mật khẩu xác nhận không khớp",
                })}
                className={`block py-3 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-all duration-300 ${
                  errors.confirmPassword
                    ? "text-red-600 border-red-500 focus:border-red-600"
                    : "text-gray-900 border-pink-300 focus:border-pink-500"
                }`}
                placeholder=" "
                disabled={isLoading}
              />
              <label
                className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                  errors.confirmPassword
                    ? "text-red-500 peer-focus:text-red-600"
                    : "text-pink-600 peer-focus:text-pink-500"
                }`}
              >
                Xác nhận mật khẩu *
              </label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.confirmPassword.message as string}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:from-pink-700 active:to-rose-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:ring-3 focus:ring-pink-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[200px]"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang cập nhật...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4" />
                  Cập nhật thông tin
                </>
              )}
            </button>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-6 p-4 bg-pink-50 rounded-xl border border-pink-100">
            <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
              <Heart className="w-4 h-4 text-pink-400" />
              Thông tin của bạn được bảo mật và chỉ dùng cho mục đích y tế
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileCard;
