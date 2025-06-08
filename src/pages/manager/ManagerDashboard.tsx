import React from "react";
import { Layout, Menu, Card, Row, Col, Statistic } from "antd";
import {
  Calendar,
  Users,
  User,
  FileText,
  NotebookPen,
  BarChart,
  DollarSign,
  MessageCircle,
} from "lucide-react";
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
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: "", icon: <DashboardOutlined />, label: "Bảng điều khiển" },
  { key: "appointments", icon: <CalendarOutlined />, label: "Quản lý lịch hẹn" },
  { key: "doctors", icon: <UserOutlined />, label: "Quản lý bác sĩ" },
  { key: "treatment-history", icon: <HistoryOutlined />, label: "Quản lý lịch sử điều trị" },
  { key: "customers", icon: <TeamOutlined />, label: "Quản lý Người Dùng" },
  { key: "services", icon: <FundOutlined />, label: "Quản lý dịch vụ" },
  { key: "feedbacks", icon: <MessageOutlined />, label: "Quản lí các phản hồi" },
  { key: "finance", icon: <DollarOutlined />, label: "Quản lý tài chính" },
  { key: "reports", icon: <BarChartOutlined />, label: "Báo cáo thống kê" },
];

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedKey = location.pathname.split("/").pop() || "";

  // Mock data - replace with actual API calls
  const stats = {
    totalAppointments: 156,
    totalPatients: 89,
    totalDoctors: 12,
    totalRevenue: 25000000,
  };

  const managementSections = [
    {
      title: "Quản lý lịch hẹn",
      icon: <Calendar className="w-6 h-6 text-blue-500" />,
      description: "Xem và quản lý tất cả lịch hẹn",
      link: "/manager/appointments",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Quản lý bác sĩ",
      icon: <User className="w-6 h-6 text-green-500" />,
      description: "Quản lý thông tin và lịch làm việc của bác sĩ",
      link: "/manager/doctors",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Quản lý lịch sử điều trị",
      icon: <NotebookPen className="w-6 h-6 text-red-500" />,
      description: "Xem và quản lý lịch sử điều trị",
      link: "/manager/treatment-history",
      color: "from-red-500 to-red-600",
    },
    {
      title: "Quản lý người dùng",
      icon: <Users className="w-6 h-6 text-purple-500" />,
      description: "Xem và quản lý hồ sơ bệnh nhân",
      link: "/manager/customers",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Báo cáo thống kê",
      icon: <BarChart className="w-6 h-6 text-orange-500" />,
      description: "Xem báo cáo và thống kê",
      link: "/manager/reports",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Quản lý dịch vụ",
      icon: <FileText className="w-6 h-6 text-pink-500" />,
      description: "Quản lý các dịch vụ khám chữa bệnh",
      link: "/manager/services",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Quản lí các phản hồi",
      icon: <MessageCircle className="w-6 h-6 text-blue-500" />,
      description: "Quản lí các phản hồi từ khách hàng",
      link: "/manager/feedbacks",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Quản lý tài chính",
      icon: <DollarSign className="w-6 h-6 text-yellow-500" />,
      description: "Theo dõi doanh thu và chi phí",
      link: "/manager/finance",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider width={250} className="bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-pink-600">Quản lý hệ thống</h1>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(`/manager/${key}`)}
          className="border-r-0"
        />
      </Sider>
      <Layout>
        <Header className="bg-white shadow-sm px-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              {menuItems.find((item) => item.key === selectedKey)?.label || "Bảng điều khiển"}
            </h2>
          </div>
        </Header>
        <Content className="m-6">
          {/* Statistics Cards */}
          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} sm={12} lg={6}>
              <Card className="hover:shadow-lg transition-shadow">
                <Statistic
                  title="Tổng số lịch hẹn"
                  value={stats.totalAppointments}
                  prefix={<Calendar className="w-4 h-4 text-blue-500 mr-2" />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="hover:shadow-lg transition-shadow">
                <Statistic
                  title="Tổng số bệnh nhân"
                  value={stats.totalPatients}
                  prefix={<Users className="w-4 h-4 text-purple-500 mr-2" />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="hover:shadow-lg transition-shadow">
                <Statistic
                  title="Tổng số bác sĩ"
                  value={stats.totalDoctors}
                  prefix={<User className="w-4 h-4 text-green-500 mr-2" />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card className="hover:shadow-lg transition-shadow">
                <Statistic
                  title="Doanh thu tháng"
                  value={stats.totalRevenue}
                  prefix={<DollarSign className="w-4 h-4 text-yellow-500 mr-2" />}
                  formatter={(value) => `${value.toLocaleString('vi-VN')} VNĐ`}
                />
              </Card>
            </Col>
          </Row>

          {/* Management Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementSections.map((section, index) => (
              <Card
                key={index}
                hoverable
                className="h-full transition-all duration-300 hover:scale-105"
                onClick={() => navigate(section.link)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${section.color}`}>
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-600">{section.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ManagerDashboard;
