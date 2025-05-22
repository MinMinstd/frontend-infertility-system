import LoginButton from "./LoginButton";
import Search from "./Search";
import { useState } from "react";
import { Link } from "react-router-dom";

const rightNavLinks = [
  { name: "Đặt lịch hẹn", href: "/appointment" },
  { name: "Liên hệ hỗ trợ", href: "/contact" },
];

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Left nav */}
        <nav className="flex gap-6 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src="../public/Images/logo.png"
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
                    <a
                      href="/services"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Services
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Góc Tri Ân */}
          <a
            href="/"
            className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors"
          >
            Góc Tri Ân
          </a>
        </nav>

        {/* Right nav + Login + Profile */}
        <nav className="flex gap-6 items-center">
          {rightNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          {/* Thêm thanh tìm kiếm */}
          <Search />
          {/* Nút Profile */}
          <Link
            to="/profile"
            className="flex items-center gap-1 text-gray-700 hover:text-pink-500 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Profile
          </Link>
          <LoginButton />
        </nav>
      </div>
    </header>
  );
}