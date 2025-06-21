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
      title: "Active Patients",
      value: "127",
      change: "+12%",
      icon: UserOutlined,
      color: "text-blue-600",
    },
    {
      title: "Today's Appointments",
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
      title: "Success Rate",
      value: "68%",
      change: "+5%",
      icon: RiseOutlined,
      color: "text-emerald-600",
    },
  ];

  const recentActivities = [
    {
      patient: "Sarah Johnson",
      action: "Egg retrieval completed",
      time: "2 hours ago",
      type: "IVF",
      status: "success",
    },
    {
      patient: "Maria Garcia",
      action: "Ultrasound scheduled",
      time: "4 hours ago",
      type: "IUI",
      status: "pending",
    },
    {
      patient: "Lisa Chen",
      action: "Hormone levels updated",
      time: "6 hours ago",
      type: "IVF",
      status: "normal",
    },
  ];

  const urgentTasks = [
    {
      patient: "Emma Wilson",
      task: "Review fertilization results",
      priority: "high",
      dueTime: "In 30 minutes",
    },
    {
      patient: "Anna Brown",
      task: "Schedule egg transfer",
      priority: "medium",
      dueTime: "Today 3:00 PM",
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider theme="light" width={250}>
        <div className="p-4">
          <Title level={4}>Fertility Clinic</Title>
          <Text type="secondary">Dr. Management Portal</Text>
        </div>
        <Menu defaultSelectedKeys={["dashboard"]}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/doctor">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="patients" icon={<UserOutlined />}>
            <Link to="/doctor/patients">Patients</Link>
          </Menu.Item>
          <Menu.Item key="appointments" icon={<CalendarOutlined />}>
            <Link to="/doctor/appointments">Appointments</Link>
          </Menu.Item>
          <Menu.Item key="history" icon={<ClockCircleOutlined />}>
            <Link to="/doctor/treatment_history">Treatment History</Link>
          </Menu.Item>
          <Menu.Item key="schedule" icon={<ClockCircleOutlined />}>
            <Link to="/doctor/schedule">Schedule</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content className="p-6">
          <Space direction="vertical" size="large" className="w-full">
            <div>
              <Title level={2}>Dashboard</Title>
              <Paragraph>
                Welcome back, Dr. Smith. Here's your overview for today.
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
                      <Text>Urgent Tasks</Text>
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
    case "success":
      return "success";
    case "pending":
      return "warning";
    default:
      return "default";
  }
}

// Helper function for stat icons
function getIconForStat(title: string) {
  switch (title) {
    case "Active Patients":
      return <UserOutlined />;
    case "Today's Appointments":
      return <CalendarOutlined />;
    case "IVF Cycles":
      return <ExperimentOutlined />;
    case "Success Rate":
      return <RiseOutlined />;
    default:
      return null;
  }
}
