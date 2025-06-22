import { useState } from "react";
import {
  Card,
  Typography,
  Row,
  Col,
  Space,
  Divider,
  notification,
  Badge,
  Dropdown,
  List,
  Avatar,
} from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  PlusOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { DoctorSidebar } from "./DoctorSidebar";

const { Title, Text } = Typography;
const { Sider, Content } = Layout;

interface TimeSlot {
  time: string;
  isBooked: boolean;
  patientName?: string;
}

interface DaySchedule {
  day: string;
  date: string;
  morning: TimeSlot[];
  afternoon: TimeSlot[];
}

interface NotificationItem {
  id: string;
  patientName: string;
  time: string;
  day: string;
  date: string;
  isRead: boolean;
  timestamp: Date;
}

export default function DoctorSchedule() {
  const createMorningSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 7; hour <= 11; hour++) {
      if (hour === 7) {
        slots.push({ time: "7:30 - 8:00", isBooked: false });
      } else if (hour === 11) {
        slots.push({ time: "11:00 - 11:30", isBooked: false });
      } else {
        slots.push({ time: `${hour}:00 - ${hour}:30`, isBooked: false });
        slots.push({ time: `${hour}:30 - ${hour + 1}:00`, isBooked: false });
      }
    }
    return slots;
  };

  const createAfternoonSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    for (let hour = 13; hour <= 16; hour++) {
      if (hour === 13) {
        slots.push({ time: "13:30 - 14:00", isBooked: false });
      }
      if (hour >= 14) {
        slots.push({ time: `${hour}:00 - ${hour}:30`, isBooked: false });
      }
      if (hour <= 16) {
        slots.push({ time: `${hour}:30 - ${hour + 1}:00`, isBooked: false });
      }
    }
    return slots;
  };

  const [schedule, setSchedule] = useState<DaySchedule[]>([
    {
      day: "Thứ 2",
      date: "20/01/2025",
      morning: createMorningSlots(),
      afternoon: createAfternoonSlots(),
    },
    {
      day: "Thứ 3",
      date: "21/01/2025",
      morning: createMorningSlots(),
      afternoon: createAfternoonSlots(),
    },
    {
      day: "Thứ 4",
      date: "22/01/2025",
      morning: createMorningSlots(),
      afternoon: createAfternoonSlots(),
    },
    {
      day: "Thứ 5",
      date: "23/01/2025",
      morning: createMorningSlots(),
      afternoon: createAfternoonSlots(),
    },
    {
      day: "Thứ 6",
      date: "24/01/2025",
      morning: createMorningSlots(),
      afternoon: createAfternoonSlots(),
    },
    {
      day: "Thứ 7",
      date: "25/01/2025",
      morning: createMorningSlots(),
      afternoon: createAfternoonSlots(),
    },
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [api, contextHolder] = notification.useNotification();

  const AppointmentContent = () => (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ color: "#ff69b4" }}>Appointments</Title>
            <Text type="secondary">
              Manage patient appointments and scheduling
            </Text>
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              style={{
                backgroundColor: "#ff69b4",
                borderColor: "#ff69b4",
              }}
            >
              New Appointment
            </Button>
          </Col>
        </Row>
      </div>

      {/* Quick Stats */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={6}>
          <Card style={{ borderColor: "#ff69b4", boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)" }}>
            <Statistic
              title={<span style={{ color: "#ff69b4" }}>Today's Appointments</span>}
              value={appointments.length}
              prefix={<CalendarOutlined style={{ color: "#ff69b4" }} />}
              valueStyle={{ color: "#ff69b4" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ borderColor: "#ff1493", boxShadow: "0 2px 8px rgba(255, 20, 147, 0.1)" }}>
            <Statistic
              title={<span style={{ color: "#ff1493" }}>Confirmed</span>}
              value={
                appointments.filter((a) => a.status === "confirmed").length
              }
              valueStyle={{ color: "#ff1493" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ borderColor: "#ffb6c1", boxShadow: "0 2px 8px rgba(255, 182, 193, 0.1)" }}>
            <Statistic
              title={<span style={{ color: "#ffb6c1" }}>Pending</span>}
              value={
                appointments.filter((a) => a.status === "pending").length
              }
              valueStyle={{ color: "#ffb6c1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card style={{ borderColor: "#ff69b4", boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)" }}>
            <Statistic
              title={<span style={{ color: "#ff69b4" }}>Tomorrow</span>}
              value={upcomingAppointments.length}
              prefix={<ClockCircleOutlined style={{ color: "#ff69b4" }} />}
              valueStyle={{ color: "#ff69b4" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Input
            placeholder="Search appointments..."
            prefix={<SearchOutlined style={{ color: "#ff69b4" }} />}
            style={{ borderColor: "#ff69b4" }}
          />
        </Col>
        <Col xs={24} md={4}>
          <Select
            placeholder="Status"
            style={{ width: "100%", borderColor: "#ff69b4" }}
            options={[
              { value: "all", label: "All Status" },
              { value: "confirmed", label: "Confirmed" },
              { value: "pending", label: "Pending" },
            ]}
          />
        </Col>
        <Col xs={24} md={4}>
          <Select
            placeholder="Treatment"
            style={{ width: "100%", borderColor: "#ff69b4" }}
            options={[
              { value: "all", label: "All Treatments" },
              { value: "IVF", label: "IVF" },
              { value: "IUI", label: "IUI" },
            ]}
          />
        </Col>
        <Col xs={24} md={4}>
          <Select
            placeholder="Date"
            style={{ width: "100%", borderColor: "#ff69b4" }}
            options={[
              { value: "today", label: "Today" },
              { value: "tomorrow", label: "Tomorrow" },
              { value: "week", label: "This Week" },
            ]}
          />
        </Col>
      </Row>

      {/* Appointments List */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card 
            title={<span style={{ color: "#ff69b4" }}>Today's Appointments</span>}
            style={{ borderColor: "#ff69b4", boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)" }}
          >
            <List
              dataSource={appointments}
              renderItem={(appointment) => (
                <List.Item
                  style={{
                    border: "1px solid #ffb6c1",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    backgroundColor: "#fff5f7",
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: "#ff69b4",
                          color: "white",
                        }}
                      >
                        {appointment.avatar}
                      </Avatar>
                    }
                    title={
                      <Space>
                        <Text strong style={{ color: "#ff69b4" }}>
                          {appointment.patient}
                        </Text>
                        <Tag
                          color={appointment.status === "confirmed" ? "#ff1493" : "#ffb6c1"}
                        >
                          {appointment.status}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size="small">
                        <Text>{appointment.type}</Text>
                        <Space>
                          <Text type="secondary">
                            <CalendarOutlined /> {appointment.date} at {appointment.time}
                          </Text>
                          <Text type="secondary">
                            <ClockCircleOutlined /> {appointment.duration}
                          </Text>
                        </Space>
                        <Space>
                          <Text type="secondary">
                            <EnvironmentOutlined /> {appointment.room}
                          </Text>
                          <Tag color="#ff69b4">{appointment.treatment}</Tag>
                        </Space>
                      </Space>
                    }
                  />
                  <Space>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#ff69b4",
                        borderColor: "#ff69b4",
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      style={{
                        borderColor: "#ff69b4",
                        color: "#ff69b4",
                      }}
                    >
                      Reschedule
                    </Button>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card 
            title={<span style={{ color: "#ff69b4" }}>Upcoming</span>}
            style={{ borderColor: "#ff69b4", boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)" }}
          >
            <List
              dataSource={upcomingAppointments}
              renderItem={(appointment) => (
                <List.Item
                  style={{
                    border: "1px solid #ffb6c1",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    backgroundColor: "#fff5f7",
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        style={{
                          backgroundColor: "#ff1493",
                          color: "white",
                        }}
                      >
                        {appointment.avatar}
                      </Avatar>
                    }
                    title={
                      <Text strong style={{ color: "#ff69b4" }}>
                        {appointment.patient}
                      </Text>
                    }
                    description={
                      <Space direction="vertical" size="small">
                        <Text>{appointment.type}</Text>
                        <Text type="secondary">
                          {appointment.date} at {appointment.time}
                        </Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <DoctorSidebar>
      <AppointmentContent />
    </DoctorSidebar>
  );
}
