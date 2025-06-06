import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import "../components/Style/FloatingNav.css";

const chatIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#d81b60"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const hideTimeout = useRef<number | null>(null);

  // Hiện nav khi hover vào hotspot hoặc nav
  const showNav = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setVisible(true);
  };

  // Ẩn nav sau 1.2s khi rời chuột
  const hideNav = () => {
    hideTimeout.current = window.setTimeout(() => setVisible(false), 1200);
  };

  return (
    <>
      {/* CSS cho media query ẩn trên mobile */}
      <style>{`
        @media (max-width: 767px) {
          .floating-nav-hotspot, .floating-nav-panel { display: none !important; }
        }
      `}</style>
      {/* Hotspot nhỏ bên phải với icon chat */}
      <div
        className="floating-nav-hotspot"
        onMouseEnter={showNav}
        onMouseLeave={hideNav}
      >
        {chatIcon}
      </div>
      <div
        className={`floating-nav-panel${visible ? " visible" : ""}`}
        onMouseEnter={showNav}
        onMouseLeave={hideNav}
      >
        <NavLink
          to="/support_user"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Hỗ trợ khách hàng
        </NavLink>
        <NavLink
          to="/onlineResult"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Tra cứu kết quả
        </NavLink>
        <NavLink
          to="/feedback"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Feedback
        </NavLink>
      </div>
    </>
  );
}
