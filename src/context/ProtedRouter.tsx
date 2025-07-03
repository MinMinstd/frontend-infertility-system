import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtedRouterProps {
  allowedRoles: string[];
}

//Thực hiện kiểm tra quyền truy cập
const ProtedRouter = ({ allowedRoles }: ProtedRouterProps) => {
  const { isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Đang tải xác thực...</div>; // hoặc spinner
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  //Kiểm tra nếu quyền không hợp lệ chuyển đến trang unauthor
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtedRouter;
