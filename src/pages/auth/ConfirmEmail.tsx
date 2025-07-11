import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { message } from "antd";
import { CheckCircle, XCircle } from "lucide-react";
import AuthApi from "../../servers/auth.api";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"pending" | "success" | "error">("pending");
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const token = searchParams.get("token");
      if (token) {
        AuthApi.confirmEmail(token)
          .then((res) => {
            setStatus("success");
            message.success(res.data?.message || "Xác nhận email thành công! Đang chuyển về trang đăng nhập...");
            setTimeout(() => navigate("/login"), 3000);
          })
          .catch((err) => {
            setStatus("error");
            const msg = err?.response?.data?.message || "Xác nhận email thất bại hoặc liên kết không hợp lệ.";
            message.error(msg);
          });
      } else {
        setStatus("error");
      }

      return () => {
        effectRan.current = true;
      };
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <div className="bg-white/90 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border border-pink-100">
        {status === "pending" && <div>Đang xác nhận email...</div>}
        {status === "success" && (
          <>
            <CheckCircle className="mx-auto text-green-500" size={48} />
            <h2 className="text-2xl font-bold mt-4 mb-2">Xác nhận email thành công!</h2>
            <p className="mb-4">Bạn sẽ được chuyển về trang đăng nhập.</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-2 px-6 py-2 bg-pink-500 text-white rounded-lg"
            >
              Đăng nhập ngay
            </button>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle className="mx-auto text-red-500" size={48} />
            <h2 className="text-2xl font-bold mt-4 mb-2">Xác nhận thất bại!</h2>
            <p className="mb-4">Liên kết xác nhận không hợp lệ hoặc đã hết hạn.</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-2 px-6 py-2 bg-pink-500 text-white rounded-lg"
            >
              Về trang đăng nhập
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail; 