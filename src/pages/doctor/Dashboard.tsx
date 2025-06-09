import {
  Layout,
  Menu,
  Card,
  Typography,
  Space,
  Badge,
  Row,
  Col,
  Statistic,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  DashboardOutlined,
  ClockCircleOutlined,
  RiseOutlined,
  ExperimentOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

export default function Dashboard() {
  const stats = [
    {
      title: "Bệnh nhân điều trị",
      value: "127",
      change: "+12%",
      icon: UserOutlined,
      color: "text-blue-600",
    },
    {
      title: "Lịch đăng kí hôm nay",
      value: "8",
      change: "2 pending",
      icon: CalendarOutlined,
      color: "text-green-600",
    },
    {
      title: "IVF Cycles",
      value: "23",
      change: "5 in progress",
      icon: ExperimentOutlined,
      color: "text-purple-600",
    },
    {
      title: "Tỉ lệ thành công",
      value: "68%",
      change: "+5%",
      icon: RiseOutlined,
      color: "text-emerald-600",
    },
  ];

  const recentActivities = [
    {
      patient: "Sarah Johnson",
      action: "Hoàn thành lấy trứng",
      time: "2 giờ trước",
      type: "IVF",
      status: "thành công",
    },
    {
      patient: "Maria Garcia",
      action: "Lịch siêu âm đã được lên",
      time: "4 giờ trước",
      type: "IUI",
      status: "đang chờ",
    },
    {
      patient: "Lisa Chen",
      action: "Cập nhật mức hormone",
      time: "6 giờ trước",
      type: "IVF",
      status: "bình thường",
    },
  ];

  const urgentTasks = [
    {
      patient: "Emma Wilson",
      task: "Xem xét kết quả thụ tinh",
      priority: "cao",
      dueTime: "Trong 30 phút",
    },
    {
      patient: "Anna Brown",
      task: "Lên lịch chuyển phôi",
      priority: "trung bình",
      dueTime: "Hôm nay 3:00 PM",
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider theme="light" width={250}>
        <div className="p-4">
          <Title level={4}>CỔNG THÔNG TIN</Title>
          <Text type="secondary">Trang bác sĩ quản lí thông tin</Text>
        </div>
        <Menu defaultSelectedKeys={["dashboard"]}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/doctor">Thông kê</Link>
          </Menu.Item>
          <Menu.Item key="patients" icon={<UserOutlined />}>
            <Link to="/doctor/patients">Bệnh nhân</Link>
          </Menu.Item>
          <Menu.Item key="appointments" icon={<CalendarOutlined />}>
            <Link to="/doctor/appointments">Dịch vụ</Link>
          </Menu.Item>
          <Menu.Item key="history" icon={<ClockCircleOutlined />}>
            <Link to="/doctor/treatment_history">Lịch sử điều trị</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content className="p-6">
          <Space direction="vertical" size="large" className="w-full">
            <div>
              <Title level={2}>Thông kê</Title>
              <Paragraph>
                Chào mừng bạn đến với trang quản lí thông tin
              </Paragraph>
            </div>

            <Row gutter={[16, 16]}>
              {stats.map((stat, index) => (
                <Col xs={24} sm={12} lg={6} key={index}>
                  <Card>
                    <Statistic
                      title={stat.title}
                      value={stat.value}
                      prefix={getIconForStat(stat.title)}
                      suffix={<Text type="secondary">{stat.change}</Text>}
                    />
                  </Card>
                </Col>
              ))}
            </Row>

            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card title="Recent Activities" bordered={false}>
                  <Space direction="vertical" className="w-full">
                    {recentActivities.map((activity, index) => (
                      <Card key={index} size="small" className="w-full">
                        <Space direction="vertical">
                          <Space className="w-full justify-between">
                            <Text strong>{activity.patient}</Text>
                            <Space>
                              <Badge
                                color={
                                  activity.type === "IVF" ? "blue" : "cyan"
                                }
                                text={activity.type}
                              />
                              <Badge
                                status={getStatusBadge(activity.status)}
                                text={activity.status}
                              />
                            </Space>
                          </Space>
                          <Text>{activity.action}</Text>
                          <Text type="secondary">{activity.time}</Text>
                        </Space>
                      </Card>
                    ))}
                  </Space>
                </Card>
              </Col>

              <Col xs={24} lg={12}>
                <Card
                  title={
                    <Space>
                      <WarningOutlined style={{ color: "#ff4d4f" }} />
                      <Text>Công việc khẩn cấp</Text>
                    </Space>
                  }
                  bordered={false}
                >
                  <Space direction="vertical" className="w-full">
                    {urgentTasks.map((task, index) => (
                      <Card key={index} size="small" className="w-full">
                        <Space direction="vertical">
                          <Space className="w-full justify-between">
                            <Text strong>{task.patient}</Text>
                            <Badge
                              color={
                                task.priority === "high" ? "red" : "orange"
                              }
                              text={task.priority}
                            />
                          </Space>
                          <Text>{task.task}</Text>
                          <Text type="danger">{task.dueTime}</Text>
                        </Space>
                      </Card>
                    ))}
                  </Space>
                </Card>
              </Col>
            </Row>
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
}

// Helper function for status badges
function getStatusBadge(status: string) {
  switch (status) {
    case "thành công":
      return "success";
    case "đang chờ":
      return "warning";
    default:
      return "default";
  }
}

// Helper function for stat icons
function getIconForStat(title: string) {
  switch (title) {
    case "Bệnh nhân đang điều trị":
      return <UserOutlined />;
    case "Lịch hẹn hôm nay":
      return <CalendarOutlined />;
    case "Chu trình IVF":
      return <ExperimentOutlined />;
    case "Tỷ lệ thành công":
      return <RiseOutlined />;
    default:
      return null;
  }
}
