import { Card, Typography, Space, Badge, Row, Col, Statistic } from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  RiseOutlined,
  ExperimentOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { DoctorSidebar } from "./DoctorSidebar";

const { Title, Text, Paragraph } = Typography;

export default function Dashboard() {
  const stats = [
    {
      title: "Active Patients",
      value: "127",
      change: "+12%",
      icon: UserOutlined,
      color: "#ff69b4",
    },
    {
      title: "Today's Appointments",
      value: "8",
      change: "2 pending",
      icon: CalendarOutlined,
      color: "#ff1493",
    },
    {
      title: "IVF Cycles",
      value: "23",
      change: "5 in progress",
      icon: ExperimentOutlined,
      color: "#ff69b4",
    },
    {
      title: "Success Rate",
      value: "68%",
      change: "+5%",
      icon: RiseOutlined,
      color: "#ff1493",
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

  const DashboardContent = () => (
    <div>
      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Title level={2} style={{ color: "#ff69b4" }}>
            Dashboard
          </Title>
          <Paragraph style={{ color: "#666" }}>
            Welcome back, Dr. Smith. Here's your overview for today.
          </Paragraph>
        </div>

        <Row gutter={[16, 16]}>
          {stats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                style={{
                  borderColor: stat.color,
                  boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
                }}
              >
                <Statistic
                  title={
                    <span style={{ color: stat.color }}>{stat.title}</span>
                  }
                  value={stat.value}
                  valueStyle={{ color: stat.color }}
                  prefix={getIconForStat(stat.title)}
                  suffix={<Text type="secondary">{stat.change}</Text>}
                />
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <span style={{ color: "#ff69b4" }}>Recent Activities</span>
              }
              bordered={false}
              style={{
                borderColor: "#ff69b4",
                boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
              }}
            >
              <Space direction="vertical" className="w-full">
                {recentActivities.map((activity, index) => (
                  <Card
                    key={index}
                    size="small"
                    className="w-full"
                    style={{
                      borderColor: "#ffb6c1",
                      backgroundColor: "#fff5f7",
                    }}
                  >
                    <Space direction="vertical">
                      <Space className="w-full justify-between">
                        <Text strong style={{ color: "#ff69b4" }}>
                          {activity.patient}
                        </Text>
                        <Space>
                          <Badge color="#ff69b4" text={activity.type} />
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
                  <WarningOutlined style={{ color: "#ff69b4" }} />
                  <Text style={{ color: "#ff69b4" }}>Urgent Tasks</Text>
                </Space>
              }
              bordered={false}
              style={{
                borderColor: "#ff69b4",
                boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
              }}
            >
              <Space direction="vertical" className="w-full">
                {urgentTasks.map((task, index) => (
                  <Card
                    key={index}
                    size="small"
                    className="w-full"
                    style={{
                      borderColor: "#ffb6c1",
                      backgroundColor: "#fff5f7",
                    }}
                  >
                    <Space direction="vertical">
                      <Space className="w-full justify-between">
                        <Text strong style={{ color: "#ff69b4" }}>
                          {task.patient}
                        </Text>
                        <Badge
                          color={
                            task.priority === "high" ? "#ff1493" : "#ff69b4"
                          }
                          text={task.priority}
                        />
                      </Space>
                      <Text>{task.task}</Text>
                      <Text style={{ color: "#ff1493" }}>{task.dueTime}</Text>
                    </Space>
                  </Card>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  );

  return (
    <DoctorSidebar>
      <DashboardContent />
    </DoctorSidebar>
  );
}

function getStatusBadge(status: string) {
  switch (status) {
    case "success":
      return "success";
    case "pending":
      return "processing";
    case "normal":
      return "default";
    default:
      return "default";
  }
}

function getIconForStat(title: string) {
  switch (title) {
    case "Active Patients":
      return <UserOutlined style={{ color: "#ff69b4" }} />;
    case "Today's Appointments":
      return <CalendarOutlined style={{ color: "#ff1493" }} />;
    case "IVF Cycles":
      return <ExperimentOutlined style={{ color: "#ff69b4" }} />;
    case "Success Rate":
      return <RiseOutlined style={{ color: "#ff1493" }} />;
    default:
      return null;
  }
}
