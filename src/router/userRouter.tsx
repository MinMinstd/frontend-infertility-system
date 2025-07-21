import type { RouteObject } from "react-router-dom";
import Home from "../pages/customer/Home";
import Services from "../pages/customer/Services";
import Doctors from "../pages/customer/Doctor";
import AppointmentForm from "../pages/customer/Appointmenform";
import ServiceDetails from "../pages/customer/serviceDetails";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import Gratefull from "../pages/customer/Gratefull";
import { GratefulDetail } from "../pages/customer/GratefulDetail";
import ProfileCard from "../components/ProfileCard";
import HistoryMedical from "../pages/customer/HistoryMedical";
import FeedbackPage from "../pages/customer/Feedback";
import SupportUser from "../pages/customer/SupportUser";
import RegisterService from "../components/RegisterService";
import Contact from "../components/Contact";
import TreatmentProcess from "../pages/customer/TreatmentProcess";
import MedicalRecord from "../pages/customer/MedicalRecord";
import OnlineConsult from "../components/OnlineResult";
import PaymentPage from "../pages/customer/PaymentPage";
import PaymentHistoryPage from "../pages/customer/PaymentHistory";
import PaymentResult from "../pages/customer/PaymentResult";
import ConfirmEmail from "../pages/auth/ConfirmEmail";

export const userRoutes: RouteObject[] = [
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: <LoginPage />,
    handle: { layout: "none" },
  },
  {
    path: "/confirm-email",
    element: <ConfirmEmail />,
    handle: { layout: "none" },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    handle: { layout: "none" },
  },
  { path: "/services", element: <Services /> },
  { path: "/services/:id", element: <ServiceDetails /> },
  { path: "/doctors", element: <Doctors /> },
  { path: "/appointment", element: <AppointmentForm /> },
  { path: "/gratefull", element: <Gratefull /> },
  { path: "/gratefull/:id", element: <GratefulDetail /> },
  { path: "/support_user", element: <SupportUser /> },
  { path: "/feedback", element: <FeedbackPage /> },
  { path: "/contact", element: <Contact /> },
  { path: "/onlineResult", element: <OnlineConsult /> },
  { path: "/user/register_service", element: <RegisterService /> },
  { path: "/user/profile", element: <ProfileCard /> },
  { path: "/user/history_medical", element: <HistoryMedical /> },
  { path: "/user/treatment_process/:id", element: <TreatmentProcess /> },
  { path: "/user/medical_record", element: <MedicalRecord /> },
  { path: "/user/payment", element: <PaymentPage /> },
  { path: "/payment-result", element: <PaymentResult /> },
  { path: "/user/history_payment", element: <PaymentHistoryPage /> },
];
