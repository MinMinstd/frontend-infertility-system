import type { RouteObject } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";

import CustomerList from "../pages/admin/CustomerList";
import Dashboard from "../pages/admin/Dashboard";
import AppointmentList from "../pages/admin/AppointmentList";
import DoctorWorkList from "../pages/admin/DoctorWorkList";
import Profile from "../pages/admin/Profile";
import CreateAccount from "../pages/admin/CreateAccount";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminDashboard />,

    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "customers",
        element: <CustomerList />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "appointments",
        element: <AppointmentList />,
      },
      {
        path: "doctors",
        element: <DoctorWorkList />,
      },
      {
        path: "create-account",
        element: <CreateAccount />,
      },
    ],
  },
];
