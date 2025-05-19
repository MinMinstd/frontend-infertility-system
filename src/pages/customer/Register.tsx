import { useForm } from "react-hook-form";
import { useState } from "react";

interface RegisterFormInputs {
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const [isRegistered, setIsRegistered] = useState(false);

  const onSubmit = (data: RegisterFormInputs) => {
    setIsRegistered(true);
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      {isRegistered ? (
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Đăng ký thành công
          </h2>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition-transform duration-200 hover:scale-[1.01]"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Đăng ký tài khoản
          </h2>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              {...register("username", { required: "Vui lòng nhập username" })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nhập username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message as string}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email không hợp lệ",
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nhập email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Số điện thoại</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Vui lòng nhập số điện thoại",
                pattern: {
                  value: /^\d{10,11}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nhập số điện thoại"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message as string}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Địa chỉ</label>
            <input
              type="text"
              {...register("address", { required: "Vui lòng nhập địa chỉ" })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nhập địa chỉ"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message as string}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Mật khẩu</label>
            <input
              type="password"
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 6,
                  message: "Mật khẩu phải có ít nhất 6 ký tự",
                },
              })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nhập mật khẩu"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Xác nhận mật khẩu</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Vui lòng xác nhận mật khẩu",
                validate: (value) =>
                  value === watch("password") || "Mật khẩu xác nhận không khớp",
              })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Nhập lại mật khẩu"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 active:bg-blue-600 focus:ring-2 focus:ring-green-400 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-200"
          >
            Đăng ký
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
