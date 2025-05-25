import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useAuth } from "../../context/AuthContext";

interface LoginFormInputs {
  userOrEmail: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // TODO: Thêm logic gọi API đăng nhập ở đây
      console.log("Login data:", data); // Log dữ liệu đăng nhập

      // Đánh dấu đã đăng nhập
      login();

      // Hiển thị thông báo thành công
      message.success("Đăng nhập thành công!");

      // Đợi 1 giây để người dùng thấy thông báo
      setTimeout(() => {
        // Điều hướng về trang chủ
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Login error:", err);
      message.error("Đăng nhập thất bại. Vui lòng thử lại!");
    }
  };

  // Hàm kiểm tra user/email
  const validateUserOrEmail = (value: string) => {
    if (!value) return "Vui lòng nhập user hoặc email";
    // Regex kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.includes("@")) {
      if (!emailRegex.test(value)) return "Email không hợp lệ";
    }
    return true;
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md transition-transform duration-200 hover:scale-[1.01]"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">User hoặc Email</label>
          <input
            type="text"
            {...register("userOrEmail", { validate: validateUserOrEmail })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 active:ring-2 active:ring-purple-400 ${
              errors.userOrEmail ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Nhập user hoặc email"
          />
          {errors.userOrEmail && (
            <p className="text-red-500 text-sm mt-1">
              {errors.userOrEmail.message as string}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Mật khẩu</label>
          <input
            type="password"
            {...register("password", { required: "Vui lòng nhập mật khẩu" })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 active:ring-2 active:ring-purple-400 ${
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
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 active:bg-purple-600 focus:ring-2 focus:ring-blue-400 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-all duration-200"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
