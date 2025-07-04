import { useState } from "react";
import {
  Card,
  Typography,
  Row,
  Col,
  Space,
  List,
  Avatar,
  Button,
  Input,
  Select,
  Statistic,
  Tag,
} from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  PlusOutlined,
  SearchOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { DoctorSidebar } from "./DoctorSidebar";

const { Title, Text } = Typography;

interface Appointment {
  key: string;
  patient: string;
  avatar: string;
  status: "confirmed" | "pending";
  type: string;
  date: string;
  time: string;
  duration: string;
  room: string;
  treatment: string;
}

// Mock data for appointments
const mockAppointments: Appointment[] = [
  {
    key: "1",
    patient: "Nguyen Van A",
    avatar: "A",
    status: "confirmed",
    type: "Consultation",
    date: "20/01/2025",
    time: "08:00",
    duration: "30m",
    room: "101",
    treatment: "IVF",
  },
  {
    key: "2",
    patient: "Tran Thi B",
    avatar: "B",
    status: "pending",
    type: "Follow-up",
    date: "20/01/2025",
    time: "09:00",
    duration: "30m",
    room: "102",
    treatment: "IUI",
  },
];

const mockUpcomingAppointments: Appointment[] = [
  {
    key: "3",
    patient: "Le Van C",
    avatar: "C",
    status: "confirmed",
    type: "Consultation",
    date: "21/01/2025",
    time: "10:00",
    duration: "30m",
    room: "103",
    treatment: "IVF",
  },
];

export default function DoctorSchedule() {
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [upcomingAppointments] = useState<Appointment[]>(
    mockUpcomingAppointments
  );

  const AppointmentContent = () => (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ color: "#ff69b4" }}>
              Appointments
            </Title>
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
          <Card
            style={{
              borderColor: "#ff69b4",
              boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
            }}
          >
            <Statistic
              title={
                <span style={{ color: "#ff69b4" }}>Today's Appointments</span>
              }
              value={appointments.length}
              prefix={<CalendarOutlined style={{ color: "#ff69b4" }} />}
              valueStyle={{ color: "#ff69b4" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            style={{
              borderColor: "#ff1493",
              boxShadow: "0 2px 8px rgba(255, 20, 147, 0.1)",
            }}
          >
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
          <Card
            style={{
              borderColor: "#ffb6c1",
              boxShadow: "0 2px 8px rgba(255, 182, 193, 0.1)",
            }}
          >
            <Statistic
              title={<span style={{ color: "#ffb6c1" }}>Pending</span>}
              value={appointments.filter((a) => a.status === "pending").length}
              valueStyle={{ color: "#ffb6c1" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={6}>
          <Card
            style={{
              borderColor: "#ff69b4",
              boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
            }}
          >
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
            title={<span style={{ color: "#ff69b4" }}>Patient booking</span>}
            style={{
              borderColor: "#ff69b4",
              boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
            }}
          >
            <List
              dataSource={appointments}
              renderItem={(appointment: Appointment) => (
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
                          color={
                            appointment.status === "confirmed"
                              ? "#ff1493"
                              : "#ffb6c1"
                          }
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
                            <CalendarOutlined /> {appointment.date} at{" "}
                            {appointment.time}
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
            style={{
              borderColor: "#ff69b4",
              boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
            }}
          >
            <List
              dataSource={upcomingAppointments}
              renderItem={(appointment: Appointment) => (
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
