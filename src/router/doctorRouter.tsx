import type { RouteObject } from "react-router-dom";
import { DoctorLayout } from "../layouts/DoctorLayout";
import AppointmentsPage from "../pages/doctor/AppointmentPage";
import Dashboard from "../pages/doctor/Dashboard";
import PatientsPage from "../pages/doctor/Patient";
import TreatmentHistoryPage from "../pages/doctor/TreatmentHistory";

export const doctorRoutes: RouteObject[] = [
  {
    path: "/doctor",
    element: <DoctorLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "appointments",
        element: <AppointmentsPage />,
      },
      {
        path: "patients",
        element: <PatientsPage />,
      },
      {
        path: "treatment_history",
        element: <TreatmentHistoryPage />,
      },
    ],
  },
];
