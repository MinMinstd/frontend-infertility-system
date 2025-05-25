import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/customer/Home";
import Services from "./pages/customer/Services";
import Doctors from "./pages/customer/Doctor";
import AppointmentForm from "./pages/customer/Appointmenform";
import OnlineConsult from "./components/OnlineResult";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ServiceDetails from "./pages/customer/serviceDetails";
import FloatingNav from "./components/FloatingNav";
import RegisterService from "./components/RegisterService";
import SupportUser from "./pages/customer/SupportUser";
import Profile from "./pages/customer/Profile";
import LoginPage from "./pages/customer/Login";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <FloatingNav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointment" element={<AppointmentForm />} />
            <Route path="/consult" element={<OnlineConsult />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/user/register_service"
              element={<RegisterService />}
            />

            <Route path="/support_user" element={<SupportUser />} />
            {/* Thêm các route khác nếu cần */}
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
