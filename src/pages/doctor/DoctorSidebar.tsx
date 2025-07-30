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
import { useAuth } from "../../context/AuthContext";

const { Sider, Header, Content } = Layout;
const { Title, Text } = Typography;

interface DoctorSidebarProps {
  children: React.ReactNode;
}

export const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    {
      key: "/doctor",
      icon: <DashboardOutlined />,
      label: "Thông kê",
    },
    {
      key: "/doctor/patients",
      icon: <UserOutlined />,
      label: "Bênh nhân điều trị",
    },
    {
      key: "/doctor/appointments",
      icon: <CalendarOutlined />,
      label: "Lịch Khám",
    },
    {
      key: "/doctor/treatment_history",
      icon: <ClockCircleOutlined />,
      label: "Lịch sử điều trị",
    },
    {
      key: "/doctor/schedule",
      icon: <ScheduleOutlined />,
      label: "Lịch làm việc",
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

  const handleUserMenuClick: MenuProps["onClick"] = async ({ key }) => {
    if (key === "logout") {
      await logout();
      navigate("/login");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#FAFAFA" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "linear-gradient(180deg, #E91E63 0%, #D81B60 100%)",
          boxShadow: "2px 0 8px rgba(233, 30, 99, 0.3)",
        }}
      >
        <div
          style={{
            padding: "16px",
            textAlign: "center",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
            background: "rgba(252, 228, 236, 0.1)",
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
            {collapsed ? "FC" : "Hiếm Muộn"}
          </Title>
          {!collapsed && (
            <Text
              style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "12px" }}
            >
              Cổng thông tin bác sĩ
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
        <style>
          {`
            .ant-menu-dark .ant-menu-item:hover {
              background-color: rgba(252, 228, 236, 0.2) !important;
              color: #FCE4EC !important;
            }
            .ant-menu-dark .ant-menu-item-selected {
              background-color: rgba(252, 228, 236, 0.3) !important;
              color: #FCE4EC !important;
              border-right: 3px solid #FCE4EC !important;
            }
            .ant-menu-dark .ant-menu-item-selected::after {
              border-right: 3px solid #FCE4EC !important;
            }
            .ant-menu-dark .ant-menu-item {
              color: rgba(255, 255, 255, 0.9) !important;
            }
          `}
        </style>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: "linear-gradient(90deg, #FCE4EC 0%, #FFE0E6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(233, 30, 99, 0.15)",
            borderBottom: "1px solid #F8BBD9",
          }}
        >
          <Space>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
                style: { fontSize: "18px", color: "#E91E63" },
              }
            )}
            <Title level={4} style={{ margin: 0, color: "#E91E63" }}>
              Chức Năng
            </Title>
          </Space>
          <Dropdown
            menu={{
              items: userMenuItems,
              onClick: handleUserMenuClick,
            }}
            placement="bottomRight"
            dropdownRender={(menu) => (
              <div
                style={{
                  background: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 16px rgba(233, 30, 99, 0.15)",
                  border: "1px solid #FCE4EC",
                  overflow: "hidden",
                }}
              >
                {menu}
              </div>
            )}
          >
            <Space style={{ cursor: "pointer" }}>
              <Avatar
                style={{
                  backgroundColor: "#E91E63",
                  border: "2px solid #FCE4EC",
                }}
                icon={<UserOutlined />}
              />
              <Text strong style={{ color: "#D81B60" }}>
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
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(233, 30, 99, 0.1)",
            minHeight: "calc(100vh - 112px)",
            border: "1px solid #FCE4EC",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
