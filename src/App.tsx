import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/customer/Home";
import Services from "./pages/customer/Services";
import Doctors from "./pages/customer/Doctor";
import AppointmentForm from "./pages/customer/Appointmenform";
import OnlineConsult from "./components/OnlineResult";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointment" element={<AppointmentForm />} />
        <Route path="/consult" element={<OnlineConsult />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
