import React from "react";
import { Layout, Menu } from "antd";
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
} from "@ant-design/icons";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: "", icon: <DashboardOutlined />, label: "Bảng điều khiển" },
  { key: "appointments", icon: <CalendarOutlined />, label: "Quản lý lịch hẹn" },
  { key: "doctors", icon: <UserOutlined />, label: "Quản lý bác sĩ" },
  { key: "treatment-history", icon: <HistoryOutlined />, label: "Quản lý lịch sử điều trị" },
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
      <Sider width={250} className="bg-white shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-pink-600">Quản lý hệ thống</h1>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(`/manager/${key}`)}
          className="border-r-0"
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header className="bg-white shadow-sm px-6 flex items-center">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-lg font-semibold text-gray-800">
              {getCurrentPageLabel()}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Xin chào, Quản lý</span>
            </div>
          </div>
        </Header>
        <Content className="bg-gray-50">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerLayoutWithSidebar; 