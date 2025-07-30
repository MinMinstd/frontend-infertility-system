"use client";

import {
  Modal,
  Typography,
  Tag,
  Space,
  Button,
  Timeline,
  Form,
  DatePicker,
  Select,
  Input,
  message,
  List,
  Card,
  Row,
  Col,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs, { type Dayjs } from "dayjs";
import DoctorApi from "../../../../servers/doctor.api";
import { useAuth } from "../../../../context/AuthContext";

const { Text, Title } = Typography;

interface Booking {
  bookingId: number;
  note?: string;
  createdDate: string;
  status: string;
  date: string;
  time: string;
  type: string;
  fullName: string;
  serviceName: string;
}

interface Appointment {
  appointmentId: number;
  date: string;
  time: string;
  note?: string;
  status: string;
  doctorName: string;
  serviceName: string;
  stageName: string;
  dateTreatment: string;
  timeTreatment: string;
}

interface DoctorSlot {
  doctorScheduleId: number;
  startTime: string;
  endTime: string;
  status: string; // hoặc isAvailable nếu backend trả về khác
}

interface TreatmentStageInfo {
  treatmentRoadmapId: number;
  stage: string;
}

interface BookingHistoryModalProps {
  open: boolean;
  customerId: number;
  onClose: () => void;
  statusFilter?: string;
}

export function BookingHistoryModal({
  open,
  customerId,
  onClose,
  statusFilter = "all",
}: BookingHistoryModalProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [appointmentsMap, setAppointmentsMap] = useState<
    Record<number, Appointment[]>
  >({});
  const [creatingFor, setCreatingFor] = useState<number | null>(null);
  const [doctorSlots, setDoctorSlots] = useState<Record<string, DoctorSlot[]>>(
    {}
  );
  const [selectedDateMap, setSelectedDateMap] = useState<
    Record<number, Dayjs | null>
  >({});
  const [treatmentStages, setTreatmentStages] = useState<
    Record<number, TreatmentStageInfo[]>
  >({});
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);
  const [form] = Form.useForm();

  const { user } = useAuth();
  const doctorId = user?.userId;

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const res = await DoctorApi.GetListBookingCustomer(customerId);
        setBookings(res.data);
      } catch {
        message.error("Lỗi khi tải danh sách booking");
      }
    };
    if (open) fetchBookingHistory();
  }, [open, customerId]);

  useEffect(() => {
    const fetchAllAppointments = async () => {
      try {
        const results = await Promise.all(
          bookings.map((b) =>
            DoctorApi.GetListAppointmentInBooking(b.bookingId).then((res) => ({
              bookingId: b.bookingId,
              data: res.data,
            }))
          )
        );
        const updatedMap: Record<number, Appointment[]> = {};
        results.forEach(({ bookingId, data }) => {
          updatedMap[bookingId] = data;
        });
        setAppointmentsMap(updatedMap);
      } catch {
        message.error("Không thể tải lịch hẹn");
      }
    };
    if (open && bookings.length) fetchAllAppointments();
  }, [open, bookings]);

  useEffect(() => {
    console.log("🔥 useEffect triggered");
    console.log("🔍 creatingFor:", creatingFor);
    console.log("🔍 doctorId:", doctorId);

    if (!creatingFor || !doctorId) return;
    const selectedDate = selectedDateMap[creatingFor];
    if (!selectedDate) return;
    const formatted = selectedDate.format("YYYY-MM-DD");

    const fetch = async () => {
      try {
        const response = await await DoctorApi.GetDoctorScheduleByDate(
          formatted
        );
        console.log("Giờ làm việc của bác sĩ :", response.data);
        setDoctorSlots((prev) => ({ ...prev, [formatted]: response.data }));
      } catch {
        message.error("Không thể tải lịch làm việc của bác sĩ.");
      }
    };
    fetch();
  }, [creatingFor, selectedDateMap, doctorId]);

  const fetchTreatmentStages = async (bookingId: number) => {
    if (treatmentStages[bookingId]) return;
    try {
      const res = await DoctorApi.GetTreatmentRoadmap(customerId, bookingId);
      const stageInfos = res.data.map((item: TreatmentStageInfo) => ({
        treatmentRoadmapId: item.treatmentRoadmapId,
        stage: item.stage,
      }));
      setTreatmentStages((prev) => ({ ...prev, [bookingId]: stageInfos }));
    } catch {
      message.error("Không thể tải giai đoạn điều trị");
    }
  };

  const getStatusColor = (status: string) => {
    if (!status) return "gray";
    switch (status.toLowerCase()) {
      case "confirmed":
        return "green";
      case "pending":
        return "orange";
      case "cancelled":
        return "red";
      case "completed":
        return "blue";
      default:
        return "gray";
    }
  };

  const handleDateChange = (bookingId: number, date: Dayjs | null) => {
    if (!date) return;
    setSelectedDateMap((prev) => ({ ...prev, [bookingId]: date }));
  };

  // const handleCreateAppointment = async (bookingId: number) => {
  //   try {
  //     const values = await form.validateFields();
  //     const selectedStage = values.stage;
  //     const stageInfo = treatmentStages[bookingId]?.find(
  //       (item) => item.stage === selectedStage
  //     );
  //     if (!stageInfo) {
  //       message.error("Không tìm thấy thông tin giai đoạn điều trị");
  //       return;
  //     }
  //     const payload = {
  //       treatmentRoadmapId: stageInfo.treatmentRoadmapId,
  //       dateTreatment: dayjs(values.date).format("YYYY-MM-DD"),
  //       timeTreatment: values.time,
  //       doctorScheduleId: values.doctorScheduleId,
  //     };

  //     console.log("📤 Dữ liệu gửi lên backend:", {
  //       bookingId,
  //       treatmentRoadmapId: stageInfo.treatmentRoadmapId,
  //       dateTreatment: dayjs(values.date).format("YYYY-MM-DD"),
  //       timeTreatment: values.time,
  //       doctorScheduleId: values.doctorScheduleId,
  //     });

  //     await DoctorApi.CreateBookingAppointment(bookingId, payload);
  //     message.success("Tạo lịch khám thành công");
  //     form.resetFields();
  //     setCreatingFor(null);
  //     // Refresh appointments
  //     const res = await DoctorApi.GetListAppointmentInBooking(bookingId);
  //     setAppointmentsMap((prev) => ({ ...prev, [bookingId]: res.data }));
  //   } catch {
  //     message.error("Vui lòng điền đầy đủ thông tin hợp lệ");
  //   }
  // };

  const handleCreateAppointment = async (bookingId: number) => {
    try {
      const values = await form.validateFields();

      const selectedStage = values.stage;
      const doctorScheduleId = values.doctorScheduleId;
      const selectedDate = selectedDateMap[bookingId]?.format("YYYY-MM-DD");

      // 1. Lấy treatmentRoadmapId từ stage
      const stageInfo = treatmentStages[bookingId]?.find(
        (item) => item.stage === selectedStage
      );
      if (!stageInfo) {
        message.error("Không tìm thấy thông tin giai đoạn điều trị");
        return;
      }

      // 2. Tra lại slot từ doctorScheduleId
      const selectedSlot = doctorSlots[selectedDate || ""]?.find(
        (slot) => slot.doctorScheduleId === doctorScheduleId
      );

      if (!selectedSlot) {
        message.error("Không tìm thấy giờ khám phù hợp");
        return;
      }

      // 3. Tạo payload
      const payload = {
        treatmentRoadmapId: stageInfo.treatmentRoadmapId,
        dateTreatment: dayjs(values.date).format("YYYY-MM-DD"),
        doctorScheduleId: doctorScheduleId,
        timeTreatment: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
      };

      console.log("📤 Payload gửi đi:", payload);

      // 4. Gọi API tạo lịch khám
      await DoctorApi.CreateBookingAppointment(bookingId, payload);
      message.success("Tạo lịch khám thành công");

      // 5. Làm mới
      form.resetFields();
      setCreatingFor(null);

      const res = await DoctorApi.GetListAppointmentInBooking(bookingId);
      setAppointmentsMap((prev) => ({ ...prev, [bookingId]: res.data }));
    } catch (error) {
      console.error("❌ Lỗi tạo lịch khám:", error);
      message.error("Vui lòng điền đầy đủ thông tin hợp lệ");
    }
  };

  const handleUpdateStatusAppointment = async (
    bookingId: number,
    status: string
  ) => {
    try {
      await DoctorApi.UpdateStatusBooking(bookingId, status); // truyền status qua query string
      message.success("Cập nhật trạng thái thành công");

      // Làm mới danh sách lịch hẹn
      const res = await DoctorApi.GetListBookingCustomer(customerId);
      setBookings(res.data);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái booking:", error);
      message.error("Lỗi khi cập nhật trạng thái booking");
    }
  };

  // Lọc bookings dựa trên statusFilter
  const filteredBookings = statusFilter === "all" 
    ? bookings 
    : bookings.filter(booking => booking.status === statusFilter);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={1000}
      title={
        <Row justify="space-between" align="middle" className="w-full">
          <Col>
            <Title level={3} className="mb-0 text-pink-600">
              Lịch sử đặt lịch khám
            </Title>
          </Col>
        </Row>
      }
      className="booking-history-modal"
    >
      <div className="max-h-[70vh] overflow-y-auto">
        <List
          dataSource={filteredBookings}
          locale={{ 
            emptyText: statusFilter === "all" 
              ? "Không có lịch sử booking" 
              : `Không có booking nào với trạng thái "${statusFilter}"` 
          }}
          renderItem={(booking) => {
            const selectedDate = selectedDateMap[booking.bookingId];
            const slotKey = selectedDate?.format("YYYY-MM-DD") || "";
            const appointments = appointmentsMap[booking.bookingId] || [];
            const isExpanded = expandedBooking === booking.bookingId;

            return (
              <List.Item className="p-0 border-0">
                <Card
                  className="w-full mb-4 border-pink-200 hover:border-pink-400 transition-colors"
                  bodyStyle={{ padding: "16px" }}
                >
                  {/* Booking Header */}
                  <Row justify="space-between" align="middle" className="mb-3">
                    <Col>
                      <Space direction="vertical" size="small">
                        <Space>
                          <Text strong className="text-lg text-pink-600">
                            Booking #{booking.bookingId}
                          </Text>
                          <Tag
                            color={getStatusColor(booking.status)}
                            className="font-medium"
                          >
                            {booking.status}
                          </Tag>
                        </Space>
                        <div className="mt-2 flex items-center gap-2">
                          <Text className="text-sm">Cập nhật trạng thái:</Text>
                          <Select
                            size="small"
                            value={booking.status}
                            style={{ width: 160 }}
                            onChange={(value) =>
                              handleUpdateStatusAppointment(
                                booking.bookingId,
                                value
                              )
                            }
                            options={[
                              { label: "Đang xử lý", value: "Đang xử lý" },
                              { label: "Thành Công", value: "Thành Công" }, // hoặc "Completed" nếu backend dùng enum tiếng Anh
                            ]}
                          />
                        </div>

                        <Text type="secondary" className="text-sm">
                          <CalendarOutlined className="mr-1" />
                          Ngày tạo:{" "}
                          {dayjs(booking.createdDate).format("DD/MM/YYYY")}
                        </Text>
                      </Space>
                    </Col>
                    <Col>
                      <Space>
                        <Button
                          type="link"
                          onClick={() =>
                            setExpandedBooking(
                              isExpanded ? null : booking.bookingId
                            )
                          }
                          className="text-pink-500 hover:text-pink-600"
                        >
                          {isExpanded ? "Thu gọn" : "Xem chi tiết"}
                        </Button>
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => {
                            setCreatingFor(booking.bookingId);
                            fetchTreatmentStages(booking.bookingId);
                          }}
                          className="bg-pink-500 border-pink-500 hover:bg-pink-600 hover:border-pink-600"
                        >
                          Tạo lịch khám
                        </Button>
                      </Space>
                    </Col>
                  </Row>

                  {/* Booking Basic Info */}
                  <Row gutter={[16, 8]} className="mb-3">
                    <Col xs={24} sm={12}>
                      <Space
                        direction="vertical"
                        size="small"
                        className="w-full"
                      >
                        <Text>
                          <UserOutlined className="text-pink-500 mr-2" />
                          Khách hàng: <strong>{booking.fullName}</strong>
                        </Text>
                        <Text>
                          Dịch vụ: <strong>{booking.serviceName}</strong>
                        </Text>
                      </Space>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Space
                        direction="vertical"
                        size="small"
                        className="w-full"
                      >
                        <Text>
                          <CalendarOutlined className="text-pink-500 mr-2" />
                          Ngày hẹn:{" "}
                          <strong>
                            {dayjs(booking.date).format("DD/MM/YYYY")}
                          </strong>
                        </Text>
                        <Text>
                          <ClockCircleOutlined className="text-pink-500 mr-2" />
                          Giờ hẹn: <strong>{booking.time}</strong>
                        </Text>
                      </Space>
                    </Col>
                  </Row>

                  {booking.note && (
                    <Text type="secondary" className="block mb-3">
                      Ghi chú: {booking.note}
                    </Text>
                  )}

                  {/* Expanded Content */}
                  {isExpanded && (
                    <>
                      <Divider className="my-3" />
                      <Title level={5} className="text-pink-600 mb-3">
                        Lịch sử khám ({appointments.length} lần)
                      </Title>

                      {appointments.length > 0 ? (
                        <Timeline
                          className="mb-4"
                          items={appointments.map((appointment) => ({
                            color: "pink",
                            children: (
                              <Card
                                size="small"
                                className="bg-pink-50 border-pink-200"
                              >
                                <Row gutter={[16, 8]}>
                                  <Col xs={24} sm={12}>
                                    <Space direction="vertical" size="small">
                                      <Text strong className="text-pink-600">
                                        {dayjs(appointment.date).format(
                                          "DD/MM/YYYY"
                                        )}{" "}
                                        lúc {appointment.timeTreatment}
                                      </Text>
                                      <Tag
                                        color={getStatusColor(
                                          appointment.status
                                        )}
                                      >
                                        {appointment.status}
                                      </Tag>
                                      <Text>
                                        Bác sĩ: {appointment.doctorName}
                                      </Text>
                                    </Space>
                                  </Col>
                                  <Col xs={24} sm={12}>
                                    <Space direction="vertical" size="small">
                                      <Text>
                                        Dịch vụ: {appointment.serviceName}
                                      </Text>
                                      <Text>
                                        Giai đoạn: {appointment.stageName}
                                      </Text>
                                      <Text>
                                        Điều trị:{" "}
                                        {dayjs(
                                          appointment.dateTreatment
                                        ).format("DD/MM/YYYY")}{" "}
                                        - {appointment.timeTreatment}
                                      </Text>
                                    </Space>
                                  </Col>
                                </Row>
                                {appointment.note && (
                                  <Text type="secondary" className="block mt-2">
                                    Ghi chú: {appointment.note}
                                  </Text>
                                )}
                              </Card>
                            ),
                          }))}
                        />
                      ) : (
                        <Text
                          type="secondary"
                          className="block text-center py-4"
                        >
                          Chưa có lịch khám nào
                        </Text>
                      )}
                    </>
                  )}

                  {/* Create Appointment Form */}
                  {creatingFor === booking.bookingId && (
                    <>
                      <Divider className="my-3" />
                      <Title level={5} className="text-pink-600 mb-3">
                        Tạo lịch khám mới
                      </Title>
                      <Form layout="vertical" form={form}>
                        <Row gutter={16}>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              name="date"
                              label="Ngày khám"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn ngày khám",
                                },
                              ]}
                            >
                              <DatePicker
                                className="w-full"
                                placeholder="Chọn ngày khám"
                                onChange={(date) =>
                                  handleDateChange(booking.bookingId, date)
                                }
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              name="doctorScheduleId"
                              label="Giờ khám"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn giờ khám",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Chọn giờ khả dụng"
                                options={(doctorSlots[slotKey] || [])
                                  .filter((s) => s.status === "Available")
                                  .map((s) => ({
                                    value: s.doctorScheduleId,
                                    label: `${s.startTime} - ${s.endTime}`,
                                  }))}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          <Col xs={24} sm={12}>
                            <Form.Item
                              name="stage"
                              label="Giai đoạn điều trị"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng chọn giai đoạn",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Chọn giai đoạn"
                                onFocus={() =>
                                  fetchTreatmentStages(booking.bookingId)
                                }
                                options={(
                                  treatmentStages[booking.bookingId] || []
                                ).map((s) => ({
                                  value: s.stage,
                                  label: s.stage,
                                }))}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={12}>
                            <Form.Item name="note" label="Ghi chú">
                              <Input.TextArea
                                rows={2}
                                placeholder="Nhập ghi chú (tùy chọn)"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Space className="mt-3">
                          <Button
                            type="primary"
                            onClick={() =>
                              handleCreateAppointment(booking.bookingId)
                            }
                            className="bg-pink-500 border-pink-500 hover:bg-pink-600 hover:border-pink-600"
                          >
                            Xác nhận tạo lịch
                          </Button>
                          <Button
                            onClick={() => {
                              setCreatingFor(null);
                              form.resetFields();
                            }}
                          >
                            Hủy
                          </Button>
                        </Space>
                      </Form>
                    </>
                  )}
                </Card>
              </List.Item>
            );
          }}
        />
      </div>
    </Modal>
  );
}
