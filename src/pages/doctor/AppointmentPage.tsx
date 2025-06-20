import { useState } from "react";
import {
  Layout,
  Menu,
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
} from "antd";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  BellOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

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
      key: "/doctor/treatment_history",
      icon: <ClockCircleOutlined />,
      label: <Link to="/doctor/treatment_history">Treatment History</Link>,
    },
    {
      key: "/doctor/schedule",
      icon: <ClockCircleOutlined />,
      label: <Link to="/doctor/schedule">Schedule</Link>,
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
        slot.isBooked = true;
        slot.patientName = "Bệnh nhân";

        const newNotification: NotificationItem = {
          id: `${dayIndex}-${period}-${slotIndex}-${Date.now()}`,
          patientName: slot.patientName,
          time: slot.time,
          day: day.day,
          date: day.date,
          isRead: false,
          timestamp: new Date(),
        };

        setNotifications((prev) => [newNotification, ...prev]);

        api.success({
          message: "Có lịch hẹn mới!",
          description: `${slot.patientName} đã đặt lịch khám vào ${slot.time}, ${day.day} (${day.date})`,
          placement: "topRight",
          duration: 4,
        });

        try {
          const audio = new Audio("/notification-sound.mp3");
          audio.play().catch(() => {});
        } catch (error) {
          console.log("Err: ", error);
        }
      } else {
        slot.isBooked = false;
        slot.patientName = undefined;
      }

      return newSchedule;
    });
  };

  const markAsRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );

  const markAllAsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

  const TimeSlotButton = ({
    slot,
    onClick,
  }: {
    slot: TimeSlot;
    onClick: () => void;
  }) => (
    <Button
      type={slot.isBooked ? "primary" : "default"}
      className={`w-full h-12 flex flex-col justify-center items-center ${
        slot.isBooked
          ? "bg-blue-600 border-blue-600"
          : "bg-white border-gray-300"
      }`}
      onClick={onClick}
    >
      <div className="text-xs font-medium">{slot.time}</div>
      {slot.isBooked && slot.patientName && (
        <div className="text-xs flex items-center gap-1 mt-1">
          <UserOutlined className="text-xs" />
          <span>{slot.patientName}</span>
        </div>
      )}
    </Button>
  );

  const NotificationDropdown = () => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const dropdownContent = (
      <div className="w-80 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center p-3 border-b">
          <Text strong>Thông báo ({unreadCount} chưa đọc)</Text>
          {unreadCount > 0 && (
            <Button type="link" size="small" onClick={markAllAsRead}>
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Chưa có thông báo nào
          </div>
        ) : (
          <List
            dataSource={notifications}
            renderItem={(item) => (
              <List.Item
                className={`cursor-pointer hover:bg-gray-50 ${
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
                      <span>Lịch hẹn mới</span>
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
                        {item.timestamp.toLocaleTimeString("vi-VN")}
                      </div>
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
      <Sider width={256} className="bg-white shadow-md">
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
          selectedKeys={["/doctor/schedule"]}
          items={menuItems}
          className="border-none pt-4 px-2"
        />
      </Sider>

      <Layout>
        <Content className="p-6 bg-gray-50">
          {contextHolder}
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
              <div>
                <Space align="center" className="mb-2">
                  <CalendarOutlined className="text-2xl text-blue-600" />
                  <Title level={2} className="!mb-0 text-gray-900">
                    Lịch Làm Việc Bác Sĩ
                  </Title>
                </Space>
                <Text className="text-gray-600">
                  Quản lý lịch khám từ thứ 2 đến thứ 7
                </Text>
              </div>
              <NotificationDropdown />
            </div>

            <Row gutter={[24, 24]}>
              {schedule.map((day, dayIndex) => (
                <Col key={dayIndex} xs={24} lg={12} xl={8}>
                  <Card
                    className="shadow-lg h-full"
                    title={
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold">{day.day}</span>
                        <Tag color="blue">{day.date}</Tag>
                      </div>
                    }
                  >
                    <Space direction="vertical" className="w-full" size="large">
                      <div>
                        <Space align="center" className="mb-3">
                          <ClockCircleOutlined className="text-orange-500" />
                          <Text strong>Buổi Sáng</Text>
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

                      <Divider>
                        <Tag color="gold">Nghỉ trưa: 11:30 - 13:30</Tag>
                      </Divider>

                      <div>
                        <Space align="center" className="mb-3">
                          <ClockCircleOutlined className="text-blue-500" />
                          <Text strong>Buổi Chiều</Text>
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

                      <Divider />
                      <div className="flex justify-between">
                        <Text type="secondary">
                          Đã đặt:{" "}
                          <Text strong>
                            {day.morning.filter((s) => s.isBooked).length +
                              day.afternoon.filter((s) => s.isBooked).length}
                          </Text>
                        </Text>
                        <Text type="secondary">
                          Còn trống:{" "}
                          <Text strong>
                            {day.morning.filter((s) => !s.isBooked).length +
                              day.afternoon.filter((s) => !s.isBooked).length}
                          </Text>
                        </Text>
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>

            <Card className="mt-6">
              <Title level={4}>Chú thích:</Title>
              <Space wrap size="large">
                <Space align="center">
                  <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                  <Text>Khung thời gian trống</Text>
                </Space>
                <Space align="center">
                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                  <Text>Đã có lịch hẹn</Text>
                </Space>
                <Space align="center">
                  <ClockCircleOutlined className="text-gray-500" />
                  <Text>Mỗi khung: 30 phút</Text>
                </Space>
              </Space>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
