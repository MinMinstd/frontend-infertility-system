import type { RouteObject } from "react-router-dom";
import { DoctorLayout } from "../layouts/DoctorLayout";
import AppointmentsPage from "../pages/doctor/AppointmentPage";
import Dashboard from "../pages/doctor/Dashboard";
import PatientsPage from "../pages/doctor/Patient";
import TreatmentHistoryPage from "../pages/doctor/TreatmentHistory";
import PatientDetailPage from "../pages/doctor/PatientDetail";
import DoctorSchedule from "../pages/doctor/SchedulDoctor";

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
        path: "patients/:customerId",
        element: <PatientDetailPage />,
      },
      {
        path: "treatment_history",
        element: <TreatmentHistoryPage />,
      },
      {
        path: "schedule",
        element: <DoctorSchedule />,
      },
    ],
  },
];
