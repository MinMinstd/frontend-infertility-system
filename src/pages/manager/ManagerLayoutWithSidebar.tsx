import React from "react";
import { Layout } from "antd";
import {
  HistoryOutlined,
  DashboardOutlined,
  CalendarOutlined,
  DollarOutlined,
  UserOutlined,
  TeamOutlined,
  BarChartOutlined,
  MessageOutlined,
  FundOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: "", icon: <DashboardOutlined />, label: "Bảng điều khiển" },
  { key: "appointments", icon: <CalendarOutlined />, label: "Quản lý lịch hẹn" },
  { key: "doctors", icon: <UserOutlined />, label: "Quản lý bác sĩ" },
  { key: "orders", icon: <HistoryOutlined />, label: "Quản lý đơn hàng" },
  { key: "customers", icon: <TeamOutlined />, label: "Quản lý người dùng" },
  { key: "services", icon: <FundOutlined />, label: "Quản lý dịch vụ" },
  { key: "feedbacks", icon: <MessageOutlined />, label: "Quản lý phản hồi" },
  { key: "finance", icon: <DollarOutlined />, label: "Quản lý tài chính" },
  { key: "reports", icon: <BarChartOutlined />, label: "Báo cáo thống kê" },
];

const ManagerLayoutWithSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname.split("/").pop() || "";

  // Function to get the label for the current selected key
  const getCurrentPageLabel = () => {
    return menuItems.find((item) => item.key === selectedKey)?.label || "Bảng điều khiển";
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        width={250}
        className="bg-white shadow-lg flex flex-col justify-between"
        breakpoint="lg"
        collapsedWidth="64"
        style={{ minHeight: "100vh" }}
      >
        <div>
          <div className="p-4 border-b border-gray-200 flex items-center gap-2">
            <img src="/public/Images/logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
            <h1 className="text-xl font-bold text-pink-600 hidden lg:block">Quản lý hệ thống</h1>
          </div>
          <nav className="mt-4">
            {menuItems.map((item) => (
              <button
                key={item.key}
                className={`w-full flex items-center gap-3 px-6 py-3 text-base font-medium transition rounded-lg mb-1 hover:bg-pink-50 hover:text-pink-600 focus:outline-none ${
                  selectedKey === item.key
                    ? "bg-pink-100 text-pink-600 shadow"
                    : "text-gray-700"
                }`}
                onClick={() => navigate(`/manager/${item.key}`)}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200 flex items-center gap-2">
          <LogoutOutlined className="text-lg text-gray-500" />
          <span className="text-gray-500 text-base hidden md:inline">Đăng xuất</span>
        </div>
      </Sider>
      <Layout>
        <Header className="bg-white shadow-sm px-6 flex items-center sticky top-0 z-10" style={{ height: 64 }}>
          <div className="flex justify-between items-center w-full">
            <h2 className="text-lg font-semibold text-gray-800">
              {getCurrentPageLabel()}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">Xin chào, Quản lý</span>
              <img src="/public/Images/doctor-avatar.png" alt="avatar" className="h-9 w-9 rounded-full border-2 border-pink-200" />
            </div>
          </div>
        </Header>
        <Content className="bg-gray-50 min-h-[calc(100vh-64px)]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerLayoutWithSidebar; 