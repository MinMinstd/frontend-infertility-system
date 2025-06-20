"use client";

import { useState } from "react";
import {
  Card,
  Button,
  Tag,
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
  Layout,
  Menu,
} from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LineChartOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
const { Content, Sider, Header } = Layout;

interface TimeSlot {
  time: string;
  isBooked: boolean;
  patientName?: string;
  patientId?: number;
  treatmentType?: string;
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
  treatmentType?: string;
}

export default function SchedulePage() {
  // Tạo khung thời gian buổi sáng (7:30 - 11:30)
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

  // Tạo khung thời gian buổi chiều (13:30 - 17:00)
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
      day: "Monday",
      date: "20/01/2025",
      morning: createMorningSlots(),
      afternoon: createAfternoonSlots(),
    },
    {
      day: "Tuesday",
      date: "21/01/2025",
      morning: createMorningSlots(),
      afternoon: createAfternoonSlots(),
    },
    {
      day: "Wednesday",
      date: "22/01/2025",
      morning: createMorningSlots(),
      afternoon: createAfternoonSlots(),
    },
    {
      day: "Thursday",
      date: "23/01/2025",
      morning: createMorningSlots(),
      afternoon: createAfternoonSlots(),
    },
    {
      day: "Friday",
      date: "24/01/2025",
      morning: createMorningSlots(),
      afternoon: createAfternoonSlots(),
    },
    {
      day: "Saturday",
      date: "25/01/2025",
      morning: createMorningSlots(),
      afternoon: createAfternoonSlots(),
    },
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [api, contextHolder] = notification.useNotification();

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
    {
      key: "/patients",
      icon: <UserOutlined />,
      label: <Link to="/patients">Patients</Link>,
    },
    {
      key: "/appointments",
      icon: <CalendarOutlined />,
      label: <Link to="/appointments">Appointments</Link>,
    },
    {
      key: "/schedule",
      icon: <ClockCircleOutlined />,
      label: <Link to="/schedule">Schedule</Link>,
    },
    {
      key: "/treatment-history",
      icon: <LineChartOutlined />,
      label: <Link to="/treatment-history">Treatment History</Link>,
    },
  ];

  const toggleSlot = (
    dayIndex: number,
    period: "morning" | "afternoon",
    slotIndex: number
  ) => {
    setSchedule((prev) => {
      const newSchedule = [...prev];
      const slot = newSchedule[dayIndex][period][slotIndex];
      const day = newSchedule[dayIndex];

      if (!slot.isBooked) {
        // Đặt lịch mới
        slot.isBooked = true;
        slot.patientName = "New Patient";
        slot.treatmentType = "IVF Consultation";

        // Tạo thông báo mới
        const newNotification: NotificationItem = {
          id: `${dayIndex}-${period}-${slotIndex}-${Date.now()}`,
          patientName: slot.patientName,
          time: slot.time,
          day: day.day,
          date: day.date,
          isRead: false,
          timestamp: new Date(),
          treatmentType: slot.treatmentType,
        };

        setNotifications((prev) => [newNotification, ...prev]);

        // Hiển thị notification popup
        api.success({
          message: "New Appointment Booked!",
          description: `${slot.patientName} scheduled for ${slot.time}, ${day.day} (${day.date})`,
          placement: "topRight",
          duration: 4,
        });
      } else {
        // Hủy lịch
        slot.isBooked = false;
        slot.patientName = undefined;
        slot.treatmentType = undefined;
      }

      return newSchedule;
    });
  };

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const TimeSlotButton = ({
    slot,
    onClick,
  }: {
    slot: TimeSlot;
    onClick: () => void;
  }) => (
    <Button
      type={slot.isBooked ? "primary" : "default"}
      className={`w-full h-16 flex flex-col justify-center items-center transition-all duration-200 ${
        slot.isBooked
          ? "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500 shadow-md"
          : "bg-white border-gray-300 hover:border-blue-400 hover:shadow-sm"
      }`}
      onClick={onClick}
    >
      <div className="text-xs font-medium">{slot.time}</div>
      {slot.isBooked && slot.patientName && (
        <div className="text-xs flex items-center gap-1 mt-1">
          <UserOutlined className="text-xs" />
          <span className="truncate max-w-20">{slot.patientName}</span>
        </div>
      )}
      {slot.isBooked && slot.treatmentType && (
        <div className="text-xs opacity-80 truncate max-w-24">
          {slot.treatmentType}
        </div>
      )}
    </Button>
  );

  const NotificationDropdown = () => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const dropdownContent = (
      <div className="w-80 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center p-3 border-b">
          <Text strong>Notifications ({unreadCount} unread)</Text>
          {unreadCount > 0 && (
            <Button type="link" size="small" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications yet
          </div>
        ) : (
          <List
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item
                className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                  !item.isRead ? "bg-blue-50" : ""
                }`}
                onClick={() => markAsRead(item.id)}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      icon={<UserOutlined />}
                      className={!item.isRead ? "bg-blue-500" : "bg-gray-400"}
                    />
                  }
                  title={
                    <div className="flex items-center gap-2">
                      <span>New Appointment</span>
                      {!item.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  }
                  description={
                    <div>
                      <div>
                        {item.patientName} - {item.time}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.day} ({item.date}) •{" "}
                        {item.timestamp.toLocaleTimeString("en-US")}
                      </div>
                      {item.treatmentType && (
                        <Tag color="blue" className="mt-1">
                          {item.treatmentType}
                        </Tag>
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </div>
    );

    return (
      <Dropdown
        overlay={dropdownContent}
        trigger={["click"]}
        placement="bottomRight"
      >
        <Button
          type="text"
          icon={
            <Badge count={unreadCount} size="small">
              <BellOutlined className="text-xl" />
            </Badge>
          }
          className="flex items-center"
        />
      </Dropdown>
    );
  };

  return (
    <Layout className="min-h-screen">
      {contextHolder}
      <Sider width={256} className="bg-white shadow-lg">
        <div className="p-6 border-b border-gray-100">
          <Title level={4} className="!mb-0 text-gray-800">
            Fertility Clinic
          </Title>
          <Text type="secondary" className="text-sm">
            Dr. Management Portal
          </Text>
        </div>
        <Menu
          mode="inline"
          selectedKeys={["/schedule"]}
          items={menuItems}
          className="border-none pt-4 px-2"
        />
      </Sider>

      <Layout>
        <Header className="bg-white shadow-sm px-8 flex items-center justify-between">
          <div>
            <Title level={3} className="!mb-0">
              Doctor Schedule
            </Title>
            <Text type="secondary">
              Manage weekly appointments and availability
            </Text>
          </div>
          <Space size={16}>
            <NotificationDropdown />
            <Button
              type="text"
              icon={<SettingOutlined />}
              className="flex items-center"
            />
            <Avatar className="bg-blue-500">DS</Avatar>
          </Space>
        </Header>

        <Content className="p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Schedule Grid */}
            <Row gutter={[24, 24]}>
              {schedule.map((day, dayIndex) => (
                <Col key={dayIndex} xs={24} lg={12} xl={8}>
                  <Card
                    className="shadow-lg h-full border-0 hover:shadow-xl transition-shadow duration-300"
                    title={
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-800">
                          {day.day}
                        </span>
                        <Tag color="blue" className="font-medium">
                          {day.date}
                        </Tag>
                      </div>
                    }
                  >
                    <Space direction="vertical" className="w-full" size="large">
                      {/* Buổi sáng */}
                      <div>
                        <Space align="center" className="mb-3">
                          <ClockCircleOutlined className="text-orange-500" />
                          <Text strong className="text-gray-700">
                            Morning
                          </Text>
                          <Tag color="orange">7:30 - 11:30</Tag>
                        </Space>
                        <Row gutter={[8, 8]}>
                          {day.morning.map((slot, slotIndex) => (
                            <Col key={slotIndex} span={12}>
                              <TimeSlotButton
                                slot={slot}
                                onClick={() =>
                                  toggleSlot(dayIndex, "morning", slotIndex)
                                }
                              />
                            </Col>
                          ))}
                        </Row>
                      </div>

                      {/* Nghỉ trưa */}
                      <div>
                        <Divider />
                        <div className="text-center">
                          <Tag color="gold" className="px-4 py-1">
                            Lunch Break: 11:30 - 13:30
                          </Tag>
                        </div>
                        <Divider />
                      </div>

                      {/* Buổi chiều */}
                      <div>
                        <Space align="center" className="mb-3">
                          <ClockCircleOutlined className="text-blue-500" />
                          <Text strong className="text-gray-700">
                            Afternoon
                          </Text>
                          <Tag color="blue">13:30 - 17:00</Tag>
                        </Space>
                        <Row gutter={[8, 8]}>
                          {day.afternoon.map((slot, slotIndex) => (
                            <Col key={slotIndex} span={12}>
                              <TimeSlotButton
                                slot={slot}
                                onClick={() =>
                                  toggleSlot(dayIndex, "afternoon", slotIndex)
                                }
                              />
                            </Col>
                          ))}
                        </Row>
                      </div>

                      {/* Thống kê ngày */}
                      <div>
                        <Divider />
                        <div className="flex justify-between">
                          <Text type="secondary">
                            Booked:{" "}
                            <Text strong className="text-blue-600">
                              {day.morning.filter((s) => s.isBooked).length +
                                day.afternoon.filter((s) => s.isBooked).length}
                            </Text>
                          </Text>
                          <Text type="secondary">
                            Available:{" "}
                            <Text strong className="text-green-600">
                              {day.morning.filter((s) => !s.isBooked).length +
                                day.afternoon.filter((s) => !s.isBooked).length}
                            </Text>
                          </Text>
                        </div>
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Chú thích */}
            <Card className="mt-6 border-0 shadow-md">
              <Title level={4}>Legend:</Title>
              <Space wrap size="large">
                <Space align="center">
                  <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                  <Text>Available time slot</Text>
                </Space>
                <Space align="center">
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded"></div>
                  <Text>Booked appointment</Text>
                </Space>
                <Space align="center">
                  <ClockCircleOutlined className="text-gray-500" />
                  <Text>Each slot: 30 minutes</Text>
                </Space>
                <Space align="center">
                  <UserOutlined className="text-blue-500" />
                  <Text>Click to book/cancel appointments</Text>
                </Space>
              </Space>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
