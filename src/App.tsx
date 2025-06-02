import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import Home from "./pages/customer/Home";
// import Services from "./pages/customer/Services";
// import Doctors from "./pages/customer/Doctor";
// import AppointmentForm from "./pages/customer/Appointmenform";
// import OnlineConsult from "./components/OnlineResult";
// import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
// import ServiceDetails from "./pages/customer/serviceDetails";
import FloatingNav from "./components/FloatingNav";
// import RegisterService from "./components/RegisterService";
// import SupportUser from "./pages/customer/SupportUser";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import LoginPage from "./pages/customer/Login";
// import Gratefull from "./pages/customer/Gratefull";
// import { GratefulDetail } from "./pages/customer/GratefulDetail";
// import ProfileCard from "./components/ProfileCard";
// import HistoryMedical from "./pages/customer/HistoryMedical";
// import FeedbackPage from "./pages/customer/Feedback";
// import RegisterPage from "./pages/customer/Register";
import { userRoutes } from "./router/userRouter";
import AdminDashboard from "./pages/admin/AdminDashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <FloatingNav />
            <Routes>
              {userRoutes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
