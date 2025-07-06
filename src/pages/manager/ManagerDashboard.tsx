import { Card, Row, Col, Statistic, Typography, Space } from "antd";
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
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ManagerDashboard = () => {
  const navigate = useNavigate();
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
      icon: <Calendar className="w-6 h-6 text-white" />,
      description: "Xem và quản lý tất cả lịch hẹn",
      link: "/manager/appointments",
      bgColor: "bg-blue-500",
    },
    {
      title: "Quản lý bác sĩ",
      icon: <User className="w-6 h-6 text-white" />,
      description: "Quản lý thông tin và lịch làm việc của bác sĩ",
      link: "/manager/doctors",
      bgColor: "bg-green-500",
    },
    {
      title: "Quản lý lịch sử điều trị",
      icon: <NotebookPen className="w-6 h-6 text-white" />,
      description: "Xem và quản lý lịch sử điều trị",
      link: "/manager/treatment-history",
      bgColor: "bg-red-500",
    },
    {
      title: "Quản lý người dùng",
      icon: <Users className="w-6 h-6 text-white" />,
      description: "Xem và quản lý hồ sơ bệnh nhân",
      link: "/manager/customers",
      bgColor: "bg-purple-500",
    },
    {
      title: "Báo cáo thống kê",
      icon: <BarChart className="w-6 h-6 text-white" />,
      description: "Xem báo cáo và thống kê",
      link: "/manager/reports",
      bgColor: "bg-orange-500",
    },
    {
      title: "Quản lý dịch vụ",
      icon: <FileText className="w-6 h-6 text-white" />,
      description: "Quản lý các dịch vụ khám chữa bệnh",
      link: "/manager/services",
      bgColor: "bg-pink-500",
    },
    {
      title: "Quản lý tài chính",
      icon: <DollarSign className="w-6 h-6 text-white" />,
      description: "Theo dõi doanh thu và chi phí",
      link: "/manager/finance",
      bgColor: "bg-emerald-500",
    },
    {
      title: "Quản lý phản hồi",
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      description: "Xem và phản hồi ý kiến khách hàng",
      link: "/manager/feedbacks",
      bgColor: "bg-indigo-500",
    },
  ];

  return (
    <div className="p-6">
      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Title level={2} className="text-pink-600 !mb-0">
            Bảng điều khiển
          </Title>
          <Text type="secondary">Tổng quan về hoạt động của hệ thống</Text>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600">Tổng số lịch hẹn</span>}
                value={stats.totalAppointments}
                prefix={
                  <div className="p-3 rounded-lg bg-blue-500 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                }
                valueStyle={{ color: "#3b82f6" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600">Tổng số bệnh nhân</span>}
                value={stats.totalPatients}
                prefix={
                  <div className="p-3 rounded-lg bg-purple-500 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                }
                valueStyle={{ color: "#a855f7" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600">Tổng số bác sĩ</span>}
                value={stats.totalDoctors}
                prefix={
                  <div className="p-3 rounded-lg bg-green-500 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                }
                valueStyle={{ color: "#22c55e" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600">Doanh thu</span>}
                value={stats.totalRevenue}
                prefix={
                  <div className="p-3 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                }
                valueStyle={{ color: "#10b981" }}
                suffix="VNĐ"
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          {managementSections.map((section, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                className="shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(section.link)}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-lg ${section.bgColor} flex items-center justify-center`}
                  >
                    {section.icon}
                  </div>
                  <div>
                    <Title level={5} className="!mb-1">
                      {section.title}
                    </Title>
                    <Text type="secondary" className="text-sm">
                      {section.description}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </div>
  );
};

export default ManagerDashboard;
