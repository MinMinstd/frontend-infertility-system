
import type { RouteObject } from "react-router-dom";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ManagerAppointments from "../pages/manager/ManagerAppointments";
import ManagerDoctors from "../pages/manager/ManagerDoctors";
import ManagerOrder from "../pages/manager/ManagerOrder";
import ManagerServices from "../pages/manager/ManagerServices";
import ManagerFeedbacks from "../pages/manager/ManagerFeedbacks";
import ManagerFinance from "../pages/manager/ManagerFinance";
import ManagerReport from "../pages/manager/ManagerReport";
import ManagerLayoutWithSidebar from "../pages/manager/ManagerLayoutWithSidebar";
import ManagerAccount from "../pages/manager/ManagerAccount";

const managerRouter: RouteObject[] = [
  {
    path: "/manager",
    element: <ManagerLayoutWithSidebar />,
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
        path: "orders",
        element: <ManagerOrder />,
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
      {
        path: "customers",
        element: <ManagerAccount />,
      },
      

    ],
  },
];

export default managerRouter; 