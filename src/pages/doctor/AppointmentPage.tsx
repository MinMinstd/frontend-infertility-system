import {
  Card,
  Layout,
  Menu,
  Typography,
  Row,
  Col,
  Input,
  Select,
  Button,
  Tag,
  Avatar,
  Space,
  List,
  Statistic,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  DashboardOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

export default function AppointmentsPage() {
  const appointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      time: "09:00 AM",
      date: "2024-01-20",
      type: "Ultrasound Monitoring",
      treatment: "IVF",
      status: "confirmed",
      duration: "30 min",
      room: "Room 101",
      avatar: "SJ",
    },
    {
      id: 2,
      patient: "Maria Garcia",
      time: "10:30 AM",
      date: "2024-01-20",
      type: "IUI Procedure",
      treatment: "IUI",
      status: "confirmed",
      duration: "45 min",
      room: "Room 102",
      avatar: "MG",
    },
    {
      id: 3,
      patient: "Lisa Chen",
      time: "02:00 PM",
      date: "2024-01-20",
      type: "Consultation",
      treatment: "IVF",
      status: "pending",
      duration: "60 min",
      room: "Office 201",
      avatar: "LC",
    },
    {
      id: 4,
      patient: "Emma Wilson",
      time: "03:30 PM",
      date: "2024-01-20",
      type: "Egg Retrieval",
      treatment: "IVF",
      status: "confirmed",
      duration: "90 min",
      room: "OR 1",
      avatar: "EW",
    },
  ];

  const upcomingAppointments = [
    {
      patient: "Anna Brown",
      date: "2024-01-21",
      time: "09:00 AM",
      type: "Embryo Transfer",
      avatar: "AB",
    },
    {
      patient: "Jennifer Davis",
      date: "2024-01-21",
      time: "11:00 AM",
      type: "Follow-up",
      avatar: "JD",
    },
  ];

  const menuItems = [
    {
      key: "/doctor",
      icon: <DashboardOutlined />,
      label: <Link to="/doctor">Dashboard</Link>,
    },
    {
      key: "/doctor/patients",
      icon: <UserOutlined />,
      label: <Link to="/doctor/patients">Patients</Link>,
    },
    {
      key: "/doctor/appointments",
      icon: <CalendarOutlined />,
      label: <Link to="/doctor/appointments">Appointments</Link>,
    },
    {
      key: "/treatment-history",
      icon: <ClockCircleOutlined />,
      label: <Link to="/doctor/treatment_history">Treatment History</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={256} style={{ background: "#fff" }}>
        <div
          style={{ padding: "24px 16px", borderBottom: "1px solid #f0f0f0" }}
        >
          <Title level={4} style={{ margin: 0 }}>
            Fertility Clinic
          </Title>
          <Text type="secondary">Dr. Management Portal</Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={["/appointments"]}
          items={menuItems}
          style={{ border: "none", paddingTop: 16 }}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: "32px", background: "#f5f5f5" }}>
          <div style={{ marginBottom: 32 }}>
            <Row justify="space-between" align="middle">
              <Col>
                <Title level={2}>Appointments</Title>
                <Text type="secondary">
                  Manage patient appointments and scheduling
                </Text>
              </Col>
              <Col>
                <Button type="primary" icon={<PlusOutlined />}>
                  New Appointment
                </Button>
              </Col>
            </Row>
          </div>

          {/* Quick Stats */}
          <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
            <Col xs={24} sm={6}>
              <Card>
                <Statistic
                  title="Today's Appointments"
                  value={appointments.length}
                  prefix={<CalendarOutlined style={{ color: "#1890ff" }} />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card>
                <Statistic
                  title="Confirmed"
                  value={
                    appointments.filter((a) => a.status === "confirmed").length
                  }
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card>
                <Statistic
                  title="Pending"
                  value={
                    appointments.filter((a) => a.status === "pending").length
                  }
                  valueStyle={{ color: "#faad14" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={6}>
              <Card>
                <Statistic
                  title="Tomorrow"
                  value={upcomingAppointments.length}
                  prefix={<ClockCircleOutlined style={{ color: "#722ed1" }} />}
                  valueStyle={{ color: "#722ed1" }}
                />
              </Card>
            </Col>
          </Row>

          {/* Search and Filter */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col flex="auto">
              <Input
                placeholder="Search appointments..."
                prefix={<SearchOutlined />}
                size="large"
              />
            </Col>
            <Col>
              <Select
                placeholder="Filter by type"
                style={{ width: 200 }}
                size="large"
                options={[
                  { value: "all", label: "All Types" },
                  { value: "consultation", label: "Consultation" },
                  { value: "ultrasound", label: "Ultrasound" },
                  { value: "procedure", label: "Procedure" },
                  { value: "followup", label: "Follow-up" },
                ]}
              />
            </Col>
            <Col>
              <Select
                placeholder="Filter by status"
                style={{ width: 200 }}
                size="large"
                options={[
                  { value: "all", label: "All Status" },
                  { value: "confirmed", label: "Confirmed" },
                  { value: "pending", label: "Pending" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
              />
            </Col>
          </Row>

          <Row gutter={[24, 24]}>
            {/* Today's Appointments */}
            <Col xs={24} lg={16}>
              <Card
                title="Today's Schedule - January 20, 2024"
                extra="Your appointments for today"
              >
                <List
                  itemLayout="horizontal"
                  dataSource={appointments}
                  renderItem={(appointment) => (
                    <List.Item
                      key={appointment.id}
                      actions={[
                        <Button size="small" icon={<PhoneOutlined />}>
                          Call
                        </Button>,
                        <Link to={`/doctor/patients/${appointment.id}`}>
                          <Button type="primary" size="small">
                            View Patient
                          </Button>
                        </Link>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar style={{ backgroundColor: "#1890ff" }}>
                            {appointment.avatar}
                          </Avatar>
                        }
                        title={
                          <Space>
                            <Text strong>{appointment.patient}</Text>
                            <Tag
                              color={
                                appointment.treatment === "IVF"
                                  ? "blue"
                                  : "green"
                              }
                            >
                              {appointment.treatment}
                            </Tag>
                            <Tag
                              color={
                                appointment.status === "confirmed"
                                  ? "success"
                                  : "warning"
                              }
                            >
                              {appointment.status}
                            </Tag>
                          </Space>
                        }
                        description={
                          <Space direction="vertical" size={4}>
                            <Text>{appointment.type}</Text>
                            <Space>
                              <Text type="secondary">
                                {appointment.time} • {appointment.duration}
                              </Text>
                              <Text type="secondary">
                                <EnvironmentOutlined /> {appointment.room}
                              </Text>
                            </Space>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>

            {/* Sidebar */}
            <Col xs={24} lg={8}>
              <Space direction="vertical" style={{ width: "100%" }} size={24}>
                {/* Tomorrow's Schedule */}
                <Card title="Tomorrow's Schedule" extra="January 21, 2024">
                  <List
                    size="small"
                    dataSource={upcomingAppointments}
                    renderItem={(appointment) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              size="small"
                              style={{ backgroundColor: "#1890ff" }}
                            >
                              {appointment.avatar}
                            </Avatar>
                          }
                          title={appointment.patient}
                          description={
                            <Space direction="vertical" size={2}>
                              <Text type="secondary">{appointment.type}</Text>
                              <Text style={{ color: "#1890ff", fontSize: 12 }}>
                                {appointment.time}
                              </Text>
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>

                {/* Quick Actions */}
                <Card title="Quick Actions">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Button icon={<PlusOutlined />} style={{ width: "100%" }}>
                      Schedule Appointment
                    </Button>
                    <Button
                      icon={<CalendarOutlined />}
                      style={{ width: "100%" }}
                    >
                      View Calendar
                    </Button>
                    <Button icon={<PhoneOutlined />} style={{ width: "100%" }}>
                      Patient Reminders
                    </Button>
                  </Space>
                </Card>

                {/* Appointment Types */}
                <Card title="Appointment Types">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Row justify="space-between">
                      <Text>Consultations</Text>
                      <Text strong>1</Text>
                    </Row>
                    <Row justify="space-between">
                      <Text>Ultrasounds</Text>
                      <Text strong>1</Text>
                    </Row>
                    <Row justify="space-between">
                      <Text>Procedures</Text>
                      <Text strong>2</Text>
                    </Row>
                  </Space>
                </Card>
              </Space>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}
