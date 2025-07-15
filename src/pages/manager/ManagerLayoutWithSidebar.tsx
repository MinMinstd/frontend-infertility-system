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
} from "@ant-design/icons";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, LogOut } from "lucide-react";

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: "", icon: <DashboardOutlined />, label: "Bảng điều khiển" },
  {
    key: "appointments",
    icon: <CalendarOutlined />,
    label: "Quản lý lịch hẹn",
  },
  { key: "doctors", icon: <UserOutlined />, label: "Quản lý bác sĩ" },

  { key: "orders", icon: <HistoryOutlined />, label: "Quản lý lịch sử điều trị" },


 

 
  { key: "customers", icon: <TeamOutlined />, label: "Quản lý người dùng" },
  { key: "services", icon: <FundOutlined />, label: "Quản lý dịch vụ" },
  { key: "feedbacks", icon: <MessageOutlined />, label: "Quản lý phản hồi" },
  { key: "finance", icon: <DollarOutlined />, label: "Quản lý tài chính" },
  { key: "reports", icon: <BarChartOutlined />, label: "Báo cáo thống kê" },
];

const sidebarVariants = {
  hidden: { x: -250, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 200, damping: 30 } },
};

const ManagerLayoutWithSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const selectedKey = location.pathname.split("/").pop() || "";

  // Function to get the label for the current selected key
  const getCurrentPageLabel = () => {
    return (
      menuItems.find((item) => item.key === selectedKey)?.label ||
      "Bảng điều khiển"
    );
  };

  return (
    <Layout className="min-h-screen">
      <AnimatePresence>
        <motion.div
          key="sidebar"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={sidebarVariants}
          className="h-full"
        >
          <Sider
            width={250}
            className="bg-white shadow-2xl flex flex-col justify-between rounded-tr-3xl rounded-br-3xl border-r border-gray-100"
            breakpoint="lg"
            collapsedWidth="64"
            style={{ minHeight: "100vh" }}
          >
            <div>
              <div className="p-4 border-b border-gray-200 flex items-center gap-2">
                <img src="/public/Images/logo.png" alt="Logo" className="h-10 w-10 rounded-full shadow-lg" />
                <h1 className="text-xl font-bold text-pink-600 hidden lg:block tracking-wide">Quản lý hệ thống</h1>
              </div>
              <nav className="mt-4">
                {menuItems.map((item) => (
                  <motion.button
                    key={item.key}
                    whileHover={{ scale: 1.04, backgroundColor: "#fce7f3" }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 px-6 py-3 text-base font-medium transition rounded-lg mb-1 focus:outline-none border-l-4 ${
                      selectedKey === item.key
                        ? "bg-pink-100 text-pink-600 shadow border-pink-500"
                        : "text-gray-700 border-transparent hover:bg-pink-50 hover:text-pink-600"
                    }`}
                    onClick={() => navigate(`/manager/${item.key}`)}
                  >
                    {item.icon}
                    <span className="hidden md:inline">{item.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 border-t border-gray-200 flex items-center gap-2 hover:bg-pink-50 rounded-b-2xl cursor-pointer"
              onClick={async () => {
                await logout();
                navigate("/");
              }}
            >
              <LogOut className="text-lg text-gray-500" />
              <span className="text-gray-500 text-base hidden md:inline">Đăng xuất</span>
            </motion.div>
          </Sider>
        </motion.div>
      </AnimatePresence>
      <Layout>
        <Header className="bg-white shadow-sm px-6 flex items-center sticky top-0 z-10 rounded-bl-3xl" style={{ height: 64 }}>
          <div className="flex justify-between items-center w-full">
            <motion.h2
              className="text-lg font-semibold text-gray-800 tracking-wide"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {getCurrentPageLabel()}
            </motion.h2>
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-gray-600 font-medium">Xin chào, Quản lý</span>
              <UserCircle className="h-9 w-9 text-pink-400" />
            </motion.div>
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
