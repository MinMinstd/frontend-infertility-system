import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

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
      {/* Hotspot nhỏ bên phải với ký tự nhận biết */}
      <div
        style={{
          position: "fixed",
          top: "45%",
          right: 0,
          width: 18,
          height: 60,
          zIndex: 999,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#d81b60",
          fontSize: "18px",
          userSelect: "none",
        }}
        onMouseEnter={showNav}
        onMouseLeave={hideNav}
      >
        ❓
      </div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "4px 0",
          background: "pink",
          borderRadius: "8px 0 0 8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #eee",
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
        onMouseEnter={showNav}
        onMouseLeave={hideNav}
      >
        <NavLink
          to="/contact"
          style={({ isActive }) => ({
            display: "block",
            padding: "8px 12px",
            fontSize: "13px",
            color: isActive ? "#d81b60" : "#333",
            textDecoration: "none",
            fontWeight: 500,
            borderRadius: "8px 0 0 8px",
            background: isActive ? "#fff0f6" : "transparent",
            transition: "background 0.2s, color 0.2s",
          })}
        >
          Hỗ trợ khách hàng
        </NavLink>
        <NavLink
          to="/consult"
          style={({ isActive }) => ({
            display: "block",
            padding: "8px 12px",
            fontSize: "13px",
            color: isActive ? "#d81b60" : "#333",
            textDecoration: "none",
            fontWeight: 500,
            borderRadius: "8px 0 0 8px",
            background: isActive ? "#fff0f6" : "transparent",
            transition: "background 0.2s, color 0.2s",
          })}
        >
          Tra cứu kết quả
        </NavLink>
      </div>
    </>
  );
}
