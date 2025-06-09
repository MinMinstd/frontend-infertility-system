import type { RouteObject } from "react-router-dom";
import { ManagerLayout } from "../layouts/ManagerLayout";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ManagerAppointments from "../pages/manager/ManagerAppointments";
import ManagerDoctors from "../pages/manager/ManagerDoctors";
import ManagerTreatmentHistory from "../pages/manager/ManagerTreatmentHistory";
import ManagerServices from "../pages/manager/ManagerServices";
import ManagerFeedbacks from "../pages/manager/ManagerFeedbacks";
import ManagerFinance from "../pages/manager/ManagerFinance";
import ManagerReport from "../pages/manager/ManagerReport";

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
      {
        path: "services",
        element: <ManagerServices />,
      },
      {
        path : "feedbacks",
        element: <ManagerFeedbacks/>,
      },
      {
        path : "finance",
        element: <ManagerFinance/>,
      },
      {
        path : "reports",
        element: <ManagerReport/>,
      },
      

    ],
  },
];

export default managerRouter; 