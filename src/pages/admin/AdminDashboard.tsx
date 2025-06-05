import React from "react";
import { Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  { key: "dashboard", label: "Bảng điều khiển", icon: <BarChartOutlined />, path: "dashboard" },
  { key: "profile", label: "Hồ sơ cá nhân", icon: <UserOutlined />, path: "profile" },
  { key: "customers", label: "Danh sách khách hàng", icon: <TeamOutlined />, path: "customers" },
  { key: "doctors", label: "Danh sách lịch làm việc", icon: <CalendarOutlined />, path: "doctors" },
  { key: "appointments", label: "Danh sách lịch hẹn", icon: <CalendarOutlined />, path: "appointments" },
  { key: "create-account", label: "Cấp tài khoản", icon: <UserOutlined />, path: "create-account" },
];

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedKey = menuItems.find(item => location.pathname.includes(item.path))?.key || "dashboard";

  const handleMenuClick = (path: string) => {
    navigate(`/admin/${path}`);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-pink-50 to-blue-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-pink-200 to-blue-100 rounded-xl shadow-xl m-4 flex flex-col">
        <div className="flex items-center justify-center py-8">
          <img src="/logo.png" alt="Logo" className="h-12 w-12 rounded-full shadow" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          className="bg-transparent border-none flex-1"
          onClick={({ key }) => {
            const item = menuItems.find(item => item.key === key);
            if (item) handleMenuClick(item.path);
          }}
        >
          {menuItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon} className="!rounded-lg hover:!bg-pink-100 transition">
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col m-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <Breadcrumb className="mb-2">
            <Breadcrumb.Item className="text-pink-600 font-semibold">Admin</Breadcrumb.Item>
            <Breadcrumb.Item className="font-semibold">
              {menuItems.find(item => item.key === selectedKey)?.label}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="border-b border-gray-100 mb-4" />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;