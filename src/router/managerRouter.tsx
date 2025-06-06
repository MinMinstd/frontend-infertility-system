import type { RouteObject } from "react-router-dom";
import { ManagerLayout } from "../layouts/ManagerLayout";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ManagerAppointments from "../pages/manager/ManagerAppointments";
import ManagerDoctors from "../pages/manager/ManagerDoctors";
import ManagerTreatmentHistory from "../pages/manager/ManagerTreatmentHistory";

const managerRouter: RouteObject[] = [
  {
    path: "/manager",
    element: <ManagerLayout />,
    children: [
      {
        index: true,
        element: <ManagerDashboard />,
      },
      {
        path: "appointments",
        element: <ManagerAppointments />,
      },
      {
        path: "doctors",
        element: <ManagerDoctors />,
      },
      {
        path: "treatment-history",
        element: <ManagerTreatmentHistory />,
      },
    ],
  },
];

export default managerRouter; 