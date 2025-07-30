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
  Badge,
} from "antd";
import {
  CalendarOutlined,
  SearchOutlined,
  UserOutlined,
  IdcardOutlined,
  FilterOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-8 rounded-b-3xl shadow-2xl mb-8"
      >
        <Row justify="space-between" align="middle">
          <Col>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Title
                level={1}
                className="text-white mb-2 font-bold"
                style={{ margin: 0, fontSize: '2.5rem' }}
              >
                <TeamOutlined className="mr-3" />
                Lịch Khám Bệnh Nhân
              </Title>
              <Text className="text-pink-100 text-lg">
                Quản lí lịch hẹn và lịch khám bệnh của bệnh nhân
              </Text>
            </motion.div>
          </Col>
          <Col>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <Text className="text-white text-sm opacity-90 block mb-2">
                  Tổng số bệnh nhân
                </Text>
                <Text className="text-white text-3xl font-bold">
                  {filteredPatients.length}
                </Text>
              </div>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 mb-8 mx-6"
      >
        <Row gutter={[24, 16]} align="middle">
          <Col xs={24} md={14}>
            <Input
              size="large"
              placeholder="Tìm kiếm bệnh nhân theo tên, ID hoặc dịch vụ..."
              prefix={<SearchOutlined className="text-pink-500 text-lg" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // ✅ Chặn hành vi submit mặc định
                }
              }}
              className="border-2 border-pink-200 hover:border-pink-400 focus:border-pink-500 rounded-xl"
              style={{
                boxShadow: '0 2px 8px rgba(233, 30, 99, 0.1)',
              }}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              size="large"
              placeholder="Lọc theo trạng thái"
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full"
              suffixIcon={<FilterOutlined className="text-pink-500" />}
              style={{
                borderRadius: '12px',
              }}
              options={[
                { value: "all", label: "Tất cả trạng thái" },
                { value: "Đang xử lý", label: "Đang xử lý" },
                { value: "Đã hủy", label: "Đã hủy" },
                { value: "Hoàn thành", label: "Thành Công" },
              ]}
            />
          </Col>
          <Col xs={24} md={2}>
            <Button
              size="large"
              htmlType="button"
              type="primary"
              className="w-full bg-gradient-to-r from-pink-500 to-pink-600 border-none hover:from-pink-600 hover:to-pink-700 rounded-xl shadow-lg"
              icon={<FilterOutlined />}
            >
              Lọc
            </Button>
          </Col>
        </Row>
      </motion.div>

      {/* Appointments List */}
      <div className="mx-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card
            title={
              <div className="flex items-center justify-between">
                <span className="text-pink-600 font-bold text-xl flex items-center">
                  <TeamOutlined className="mr-2" />
                  Danh sách bệnh nhân đặt lịch
                </span>
                <Badge
                  count={filteredPatients.length}
                  style={{
                    backgroundColor: '#E91E63',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                />
              </div>
            }
            className="border-2 border-pink-200 shadow-2xl rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #fce4ec 100%)',
            }}
          >
            <List
              dataSource={filteredPatients}
              locale={{
                emptyText: (
                  <div className="text-center py-12">
                    <TeamOutlined className="text-6xl text-pink-300 mb-4" />
                    <Text className="text-pink-400 text-lg">Không tìm thấy lịch hẹn nào</Text>
                  </div>
                )
              }}
              renderItem={(patient: AppointmentInfoPatient, index: number) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="mb-4"
                >
                  <List.Item
                    className="border-2 border-pink-200 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-pink-50 hover:to-white transition-all duration-300 shadow-lg hover:shadow-xl"
                    style={{ padding: "24px" }}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge.Ribbon text="Bệnh nhân" color="#E91E63">
                          <Avatar
                            size={64}
                            className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-4 border-white shadow-lg"
                            icon={<UserOutlined className="text-2xl" />}
                          >
                            {patient.fullName?.charAt(0)?.toUpperCase() || "?"}
                          </Avatar>
                        </Badge.Ribbon>
                      }
                      title={
                        <div className="ml-4">
                          <div className="flex items-center justify-between mb-3">
                            <Text strong className="text-pink-600 text-2xl font-bold">
                              {patient.fullName || "Tên bệnh nhân"}
                            </Text>
                          </div>
                          <Space className="text-gray-500 text-base">
                            <IdcardOutlined className="text-pink-500" />
                            <Text className="font-medium">ID: {patient.customerId || "N/A"}</Text>
                          </Space>
                        </div>
                      }
                      description={
                        <div className="mt-4 ml-4">
                          <Row gutter={[24, 16]}>
                            <Col xs={24} sm={12} md={10}>
                              <div className="bg-gradient-to-r from-pink-50 to-white p-4 rounded-xl border border-pink-100">
                                <Text className="text-pink-600 font-bold text-base block mb-3">
                                  📋 Thông tin bệnh nhân
                                </Text>
                                <Space direction="vertical" size="middle" className="w-full">
                                  <div className="flex items-center">
                                    <CalendarOutlined className="text-pink-500 text-lg mr-3" />
                                    <div>
                                      <Text className="text-gray-500 text-sm block">Ngày sinh</Text>
                                      <Text className="font-medium text-base">
                                        {formatDate(patient.birthday)}
                                      </Text>
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <UserOutlined className="text-pink-500 text-lg mr-3" />
                                    <div>
                                      <Text className="text-gray-500 text-sm block">Tuổi</Text>
                                      <Text className="font-medium text-base">
                                        {patient.age || calculateAge(patient.birthday)} tuổi
                                      </Text>
                                    </div>
                                  </div>
                                </Space>
                              </div>
                            </Col>
                            <Col xs={24} sm={12} md={10}>
                              <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-xl border border-blue-100">
                                <Text className="text-blue-600 font-bold text-base block mb-3">
                                  🏥 Thông tin dịch vụ
                                </Text>
                                <div className="bg-pink-100 px-3 py-2 rounded-lg">
                                  <Text className="text-pink-700 font-medium">
                                    {patient.serviceName || "Chưa xác định dịch vụ"}
                                  </Text>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      }
                    />
                    <div className="ml-6 flex flex-col justify-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="primary"
                          size="large"
                          className="bg-gradient-to-r from-pink-500 to-pink-600 border-none hover:from-pink-600 hover:to-pink-700 rounded-xl shadow-lg font-bold px-8 py-3 h-auto"
                          onClick={() => {
                            setSelectedCustomerId(patient.customerId);
                            setBookingModalOpen(true);
                          }}
                        >
                          <span className="text-lg">📋 Xem Chi Tiết</span>
                        </Button>
                      </motion.div>
                    </div>
                  </List.Item>
                </motion.div>
              )}
              pagination={{
                pageSize: 8,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `Hiển thị ${range[0]}-${range[1]} trong tổng số ${total} lịch hẹn`,
                className: "mt-8",
                itemRender: (current, type, originalElement) => {
                  if (type === 'page') {
                    return (
                      <Button
                        className={`rounded-lg border-pink-200 ${current === current ? 'bg-pink-500 text-white border-pink-500' : 'hover:border-pink-400'
                          }`}
                      >
                        {current}
                      </Button>
                    );
                  }
                  return originalElement;
                },
              }}
            />
          </Card>
        </motion.div>
      </div>

      {selectedCustomerId !== null && (
        <BookingHistoryModal
          open={isBookingModalOpen}
          customerId={selectedCustomerId}
          statusFilter={statusFilter}
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
