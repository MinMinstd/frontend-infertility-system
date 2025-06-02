import type { RouteObject } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CustomerList from "../pages/admin/CustomerList";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/customers",
    element: <CustomerList />,
  },
  // Add more admin routes here
];
