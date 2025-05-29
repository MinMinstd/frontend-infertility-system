import { useNavigate } from "react-router-dom";

export default function LoginButton({
  className = "",
}: {
  className?: string;
}) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login"); // Điều hướng đến trang login
  };

  return (
    <button
      className={`ml-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-5 py-2 rounded-full shadow transition-all duration-200 ${className}`}
      onClick={handleLogin}
    >
      Đăng nhập
    </button>
  );
}
