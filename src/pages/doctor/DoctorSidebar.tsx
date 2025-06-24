import React, { useState } from "react";
import { Layout, Menu, Typography, Avatar, Dropdown, Space } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuProps } from "antd";

const { Sider, Header, Content } = Layout;
const { Title, Text } = Typography;

interface DoctorSidebarProps {
  children: React.ReactNode;
}

export const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/doctor",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/doctor/patients",
      icon: <UserOutlined />,
      label: "Patients",
    },
    {
      key: "/doctor/appointments",
      icon: <CalendarOutlined />,
      label: "Appointments",
    },
    {
      key: "/doctor/treatment_history",
      icon: <ClockCircleOutlined />,
      label: "Treatment History",
    },
    {
      key: "/doctor/schedule",
      icon: <ScheduleOutlined />,
      label: "Schedule",
    },
  ];

  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleUserMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      // Handle logout
      navigate("/login");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "linear-gradient(180deg, #ff69b4 0%, #ff1493 100%)",
          boxShadow: "2px 0 8px rgba(255, 105, 180, 0.3)",
        }}
      >
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <Title
            level={4}
            style={{
              color: "white",
              margin: 0,
              fontSize: collapsed ? "16px" : "20px",
            }}
          >
            {collapsed ? "FC" : "Fertility Clinic"}
          </Title>
          {!collapsed && (
            <Text
              style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "12px" }}
            >
              Doctor Portal
            </Text>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            background: "transparent",
            borderRight: "none",
          }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Space>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
                style: { fontSize: "18px", color: "#ff69b4" },
              }
            )}
            <Title level={4} style={{ margin: 0, color: "#ff69b4" }}>
              Doctor Dashboard
            </Title>
          </Space>
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: handleUserMenuClick,
            }}
            placement="bottomRight"
          >
            <Space style={{ cursor: "pointer" }}>
              <Avatar
                style={{
                  backgroundColor: "#ff69b4",
                }}
                icon={<UserOutlined />}
              />
              <Text strong style={{ color: "#ff69b4" }}>
                Dr. Smith
              </Text>
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px",
            padding: "24px",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            minHeight: "calc(100vh - 112px)",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
