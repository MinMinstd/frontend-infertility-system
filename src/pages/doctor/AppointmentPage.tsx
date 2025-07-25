"use client";

import { useEffect, useState } from "react";
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
  // Tag,
} from "antd";
import {
  CalendarOutlined,
  SearchOutlined,
  UserOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { DoctorSidebar } from "./DoctorSidebar";
import DoctorApi from "../../servers/doctor.api";
import type { AppointmentInfoPatient } from "../../types/booking";
import { BookingHistoryModal } from "./components/modals/BookingHistoryModal";

const { Title, Text } = Typography;

export default function DoctorSchedule() {
  const [appointmentPatients, setAppointmentPatients] = useState<
    AppointmentInfoPatient[]
  >([]);
  const [filteredPatients, setFilteredPatients] = useState<
    AppointmentInfoPatient[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchPatientAppointment = async () => {
      try {
        const res = await DoctorApi.GetListPatientAppointment();
        console.log("Danh sách khách hàng đặt lịch : ", res.data);
        setAppointmentPatients(res.data);
        setFilteredPatients(res.data);
      } catch (error) {
        console.log("Lỗi không thể lấy danh sách khách hàng đặt lịch", error);
      }
    };
    fetchPatientAppointment();
  }, []);

  useEffect(() => {
    let filtered = appointmentPatients;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (patient) =>
          patient.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.customerId
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          patient.serviceName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((patient) => patient.status === statusFilter);
    }

    setFilteredPatients(filtered);
  }, [searchTerm, statusFilter, appointmentPatients]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const calculateAge = (birthday: string) => {
    if (!birthday) return "N/A";
    const birthDate = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1;
    }
    return age;
  };

  // const getStatusColor = (status: string) => {
  //   switch (status?.toLowerCase()) {
  //     case "confirmed":
  //       return "#52c41a";
  //     case "pending":
  //       return "#faad14";
  //     case "cancelled":
  //       return "#ff4d4f";
  //     case "completed":
  //       return "#1890ff";
  //     default:
  //       return "#d9d9d9";
  //   }
  // };

  const AppointmentContent = () => (
    <div className="p-6">
      <div className="mb-8">
        <Row justify="space-between" align="middle">
          <Col>
            <Title
              level={2}
              style={{ color: "#FF1493 " }}
              className="text-pink-500 mb-2"
            >
              Lịch Khám Bệnh Nhân
            </Title>
            <Text type="secondary" className="text-gray-600">
              Quản lí lịch hẹn và lịch khám bệnh của bệnh nhân
            </Text>
          </Col>
        </Row>
      </div>

      {/* Search and Filters */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} md={12}>
          <Input
            placeholder="Tìm kiếm bệnh nhân theo tên...."
            prefix={<SearchOutlined className="text-pink-500" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-pink-300 focus:border-pink-500"
          />
        </Col>
        <Col xs={24} md={6}>
          <Select
            placeholder="Lọc Theo Trạng Thái"
            value={statusFilter}
            onChange={setStatusFilter}
            className="w-full"
            options={[
              { value: "Các trạng thái", label: "Các trạng thái" },
              { value: "Xác nhận", label: "Xác nhận" },
              { value: "Đang xử lý", label: "Đang xử lý" },
              { value: "Đã hủy", label: "Đã hủy" },
              { value: "Hoàn thành", label: "Hoàn thành" },
            ]}
          />
        </Col>
      </Row>

      {/* Appointments List */}
      <Row gutter={[24, 24]}>
        <Col xs={24}>
          <Card
            title={
              <span className="text-pink-500 font-semibold">
                Danh sách bệnh nhân đặt lịch ({filteredPatients.length})
              </span>
            }
            className="border-pink-200 shadow-lg"
          >
            <List
              dataSource={filteredPatients}
              locale={{ emptyText: "Không tìm thấy lịch hẹn" }}
              renderItem={(patient: AppointmentInfoPatient) => (
                <List.Item
                  className="border border-pink-100 rounded-lg mb-3 bg-pink-50 hover:bg-pink-100 transition-colors"
                  style={{ padding: "16px" }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        size={48}
                        className="bg-pink-500 text-white"
                        icon={<UserOutlined />}
                      >
                        {patient.fullName?.charAt(0)?.toUpperCase() || "?"}
                      </Avatar>
                    }
                    title={
                      <Space
                        direction="vertical"
                        size="small"
                        className="w-full"
                      >
                        <Space className="w-full justify-between">
                          <Text strong className="text-pink-600 text-lg">
                            {patient.fullName || "Tên bệnh nhân"}
                          </Text>
                          {/* <Tag
                            color={getStatusColor(patient.status)}
                            className="font-medium"
                          >
                            {patient.status?.toUpperCase() || "KHÔNG ĐỊNH DẠNG"}
                          </Tag> */}
                        </Space>
                        <Space className="text-gray-600">
                          <IdcardOutlined />
                          <Text>ID: {patient.customerId || "N/A"}</Text>
                        </Space>
                      </Space>
                    }
                    description={
                      <div className="mt-3">
                        <Row gutter={[16, 8]}>
                          <Col xs={24} sm={12} md={8}>
                            <Space direction="vertical" size="small">
                              <Text type="secondary" className="font-medium">
                                Thông tin bệnh nhân
                              </Text>
                              <Space>
                                <CalendarOutlined className="text-pink-500" />
                                <Text>
                                  Birthday: {formatDate(patient.birthday)}
                                </Text>
                              </Space>
                              <Space>
                                <UserOutlined className="text-pink-500" />
                                <Text>
                                  Age:{" "}
                                  {patient.age ||
                                    calculateAge(patient.birthday)}
                                </Text>
                              </Space>
                            </Space>
                          </Col>
                          {/* <Col xs={24} sm={12} md={8}>
                            <Space direction="vertical" size="small">
                              <Text type="secondary" className="font-medium">
                                Appointment Info
                              </Text>
                              <Space>
                                <ClockCircleOutlined className="text-pink-500" />
                                <Text>
                                  Start: {formatDate(patient.startDate)}
                                </Text>
                              </Space>
                              <Tag color="#ff69b4" className="mt-1">
                                {patient.serviceName || "No service specified"}
                              </Tag>
                            </Space>
                          </Col> */}
                        </Row>
                      </div>
                    }
                  />
                  <Space direction="vertical" className="ml-4">
                    <Button
                      type="primary"
                      className="bg-pink-500 border-pink-500 hover:bg-pink-600 hover:border-pink-600"
                      onClick={() => {
                        setSelectedCustomerId(patient.customerId);
                        setBookingModalOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                  </Space>
                </List.Item>
              )}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} appointments`,
              }}
            />
          </Card>
        </Col>
      </Row>

      {selectedCustomerId !== null && (
        <BookingHistoryModal
          open={isBookingModalOpen}
          customerId={selectedCustomerId}
          onClose={() => {
            setBookingModalOpen(false);
            setSelectedCustomerId(null);
          }}
        />
      )}
    </div>
  );

  return (
    <DoctorSidebar>
      <AppointmentContent />
    </DoctorSidebar>
  );
}
