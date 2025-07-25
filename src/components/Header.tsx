import LoginButton from "./LoginButton";
import Notification from "./Notification";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Profile from "../pages/customer/InfoAccount";

const rightNavLinks = [
  { name: "Đặt lịch hẹn", href: "/appointment" },
  { name: "Liên hệ hỗ trợ", href: "/contact" },
];

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn } = useAuth();

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="relative shadow-md sticky top-0 z-50" style={{ backgroundImage: 'none', backgroundColor: '#faf6ff' }}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6 relative z-10">
        {/* Left nav */}
        <nav className="flex gap-8 items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="../public/Images/logo.png"
              alt="Logo"
              className="h-12 w-12 rounded-full border-2 border-pastelPink shadow-sm bg-white object-cover"
            />
            <span className="font-bold text-3xl text-pink-500 drop-shadow-sm tracking-wide select-none font-sans" style={{fontFamily: 'Quicksand, Poppins, Arial, sans-serif'}}>
              Thiên thần nhỏ
            </span>
          </div>

          {/* Trang chủ */}
          <a
            href="/"
            className="flex items-center gap-1 text-pink-500 font-medium text-base px-3 py-2 rounded-full hover:bg-pastelPink-light hover:text-pastelPink-dark transition-colors duration-200"
          >
            Trang chủ
          </a>

          {/* Dropdown Giới Thiệu */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-1 text-pink-500 font-medium text-base px-3 py-2 rounded-full hover:bg-pastelPink-light hover:text-pastelPink-dark transition-colors duration-200"
              type="button"
              onClick={() => setShowDropdown((v) => !v)}
            >
              Giới Thiệu
              <svg
                className="w-3 h-3 ml-1"
                aria-hidden="true"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            {showDropdown && (
              <div className="absolute left-0 z-10 bg-white rounded-xl shadow-lg w-48 mt-2 border border-pastelPink-light animate-fade-in">
                <ul
                  className="py-2 text-base text-pink-500"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <Link
                      to="/doctors"
                      className="block px-5 py-2 rounded-lg hover:bg-pastelPink-light hover:text-pastelPink-dark transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      Đội ngũ bác sĩ
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="block px-5 py-2 rounded-lg hover:bg-pastelPink-light hover:text-pastelPink-dark transition-colors"
                      onClick={() => setShowDropdown(false)}
                    >
                      Dịch vụ
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Góc Tri Ân */}
          <Link
            to="/gratefull"
            className="flex items-center gap-1 text-pink-500 font-medium text-base px-3 py-2 rounded-full hover:bg-pastelPink-light hover:text-pastelPink-dark transition-colors duration-200"
          >
            Góc Tri Ân
          </Link>
        </nav>

        {/* Right nav + Login/Profile */}
        <nav className="flex gap-6 items-center">
          {rightNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="flex items-center gap-1 text-pink-500 font-medium text-base px-3 py-2 rounded-full hover:bg-pastelPink-light hover:text-pastelPink-dark transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          {/* Thông báo */}
          <div className="rounded-full bg-[#EDE7F6] p-2 flex items-center shadow-sm hover:bg-pastelPink-light transition-colors duration-200">
            <Notification />
          </div>
          {isLoggedIn ? (
            <div className="relative">
              <Profile />
            </div>
          ) : (
            <LoginButton />
          )}
        </nav>
      </div>
    </header>
  );
}
