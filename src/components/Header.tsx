import LoginButton from "./LoginButton";
import Notification from "./Notification";
import Search from "./Search";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Profile from "../pages/customer/InfoAccount";

const rightNavLinks = [
  { name: "Đặt lịch hẹn", href: "/appointment" },
  { name: "Liên hệ hỗ trợ", href: "/contact" },
];

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Left nav */}
        <nav className="flex gap-6 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="../public/Images/Logo.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="font-bold text-xl text-pink-600">
              Thiên thần nhỏ
            </span>
          </div>

          {/* Trang chủ */}
          <a
            href="/"
            className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors"
          >
            Trang chủ
          </a>

          {/* Dropdown Giới Thiệu */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button
              className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors font-medium"
              type="button"
            >
              Giới Thiệu
              <svg
                className="w-2.5 h-2.5 ml-1"
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
              <div className="absolute left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <Link
                      to="/doctors"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Doctor
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/services"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Services
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Góc Tri Ân */}
          <Link
            to="/gratefull"
            className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors"
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
              className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {/* Thêm thanh tìm kiếm */}

          <Search />
          <Notification />

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
