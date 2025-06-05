import type { RouteObject } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";

export const adminRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AdminDashboard />,
  },
];
