"use client";

import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Card,
  Typography,
  Space,
  message,
  Row,
  Col,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  ClockCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import ServiceApi from "../../servers/service.api";
import DoctorApi from "../../servers/doctor.api";
import type { Service } from "../../types/service.d";
import type { Doctor } from "../../types/doctor.d";
import type { DoctorSchedule } from "../../types/doctorSchedule.d";
import { bookingApi } from "../../servers/booking.api";
import type { BookingConsulant } from "../../types/booking.d";
import { useNotification } from "../../context/NotificationContext";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface AppointmentFormData {
  name: string;
  dob: dayjs.Dayjs;
  gender: string;
  husband: string;
  wife: string;
  service: number;
  doctor: number;
  date: dayjs.Dayjs;
  timeSlot: number;
  note?: string;
}

export default function AppointmentForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [timeSlots, setTimeSlots] = useState<DoctorSchedule[]>([]);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(
    null
  );
  const { addNotification } = useNotification();

  //Thực hiện lấy danh sách dịch vụ
  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      try {
        const response = await ServiceApi.getAllServicesToBooking();
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        message.error("Lỗi khi tải danh sách dịch vụ!");
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  //Thực hiện lấy danh sách bác sĩ theo dịch vụ
  useEffect(() => {
    if (selectedService) {
      const fetchDoctors = async () => {
        setLoadingDoctors(true);
        setDoctors([]);
        form.setFieldsValue({ doctor: null, date: null, timeSlot: null });
        setSelectedDoctor(null);
        setSelectedDate(null);
        setTimeSlots([]);
        setAvailabilityMessage(null);
        try {
          const response =
            await DoctorApi.getDoctorsByServiceIdForBookingConsulation(
              String(selectedService)
            );
          setDoctors(response.data);
        } catch (error) {
          console.error("Error fetching doctors:", error);
          message.error("Lỗi khi tải danh sách bác sĩ!");
        } finally {
          setLoadingDoctors(false);
        }
      };
      fetchDoctors();
    }
  }, [selectedService, form]);

  //Thực hiện lấy lịch làm việc của bác sĩ
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const fetchSchedule = async () => {
        setLoadingTimeSlots(true);
        setTimeSlots([]);
        setAvailabilityMessage(null);
        form.setFieldsValue({ timeSlot: null });
        try {
          const dateString = selectedDate.format("YYYY-MM-DD");
          const response = await DoctorApi.getDoctorSchedule(
            selectedDoctor,
            dateString
          );
          if (response.data && response.data.length > 0) {
            setTimeSlots(response.data);
          } else {
            setAvailabilityMessage("Bác sĩ không làm việc vào ngày này!");
          }
        } catch (error) {
          console.error("Error fetching schedule:", error);
          message.error("Lỗi khi tải lịch làm việc của bác sĩ!");
          setAvailabilityMessage(
            "Không thể tải lịch làm việc. Vui lòng thử lại."
          );
        } finally {
          setLoadingTimeSlots(false);
        }
      };
      fetchSchedule();
    }
  }, [selectedDoctor, selectedDate, form]);

  const onFinish = async (values: AppointmentFormData) => {
    setLoading(true);
    try {
      // Validate dates before submitting
      if (!values.date.isValid() || !values.dob.isValid()) {
        message.error("Ngày không hợp lệ!");
        setLoading(false);
        return;
      }

      // Find the selected time slot to get startTime
      const selectedSlot = timeSlots.find(
        (slot) => slot.doctorScheduleId === values.timeSlot
      );

      if (!selectedSlot) {
        message.error("Khung giờ đã chọn không hợp lệ. Vui lòng chọn lại.");
        setLoading(false);
        return;
      }

      const bookingData: BookingConsulant = {
        husband: values.husband,
        wife: values.wife,
        date: values.date.format("YYYY-MM-DD"),
        time: `${selectedSlot.startTime.substring(
          0,
          5
        )} - ${selectedSlot.endTime.substring(0, 5)}`,
        note: values.note,
        doctorId: values.doctor,
        doctorScheduleId: values.timeSlot,
        serviceId: values.service,
      };

      await bookingApi.bookingConsulant(bookingData);
      addNotification({
        avatar: "/Images/doctor-avatar.png",
        name: "Phòng khám",
        message: "Bạn đã đặt lịch hẹn thành công!",
        time: new Date().toLocaleTimeString(),
      });
      message.success(
        "Đặt lịch hẹn thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất."
      );
      form.resetFields();
      // Reset states after successful booking
      setSelectedService(null);
      setSelectedDoctor(null);
      setSelectedDate(null);
      setTimeSlots([]);
      setAvailabilityMessage(null);
    } catch (error) {
      console.error("Error details:", error);
      message.error("Có lỗi xảy ra khi đặt lịch!");
    } finally {
      setLoading(false);
    }
  };

  const handleServiceChange = (value: number) => {
    setSelectedService(value);
  };

  const handleDoctorChange = (value: number) => {
    setSelectedDoctor(value);
    // Reset date and time when doctor changes
    form.setFieldsValue({ date: null, timeSlot: null });
    setSelectedDate(null);
    setTimeSlots([]);
    setAvailabilityMessage(null);
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    if (!date) {
      setTimeSlots([]);
      setAvailabilityMessage(null);
      form.setFieldsValue({ timeSlot: null });
    }
  };

  return (
    <section
      className="py-16 px-4 bg-gradient-to-br from-pink-50 via-white to-rose-50 min-h-screen"
      id="appointment"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
            <HeartOutlined className="text-3xl text-pink-500" />
          </div>
          <Title level={2} className="!text-pink-600 !mb-2">
            Đặt lịch hẹn khám
          </Title>
          <p className="text-gray-600 text-lg">
            Chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tốt nhất cho
            bạn
          </p>
        </div>

        <Card
          className="shadow-2xl border-0 rounded-2xl overflow-hidden"
          bodyStyle={{ padding: 0 }}
        >
          <div className="bg-gradient-to-r from-pink-500 to-rose-400 p-6">
            <div className="flex items-center text-white">
              <MedicineBoxOutlined className="text-2xl mr-3" />
              <Title level={3} className="!text-white !mb-0">
                Thông tin đặt lịch
              </Title>
            </div>
          </div>

          <div className="p-8">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              size="large"
              className="space-y-1"
            >
              <Row gutter={[16, 8]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label={
                      <span className="text-gray-700 font-semibold flex items-center">
                        <UserOutlined className="mr-2 text-pink-500" />
                        Họ và tên
                      </span>
                    }
                    rules={[
                      { required: true, message: "Vui lòng nhập họ tên!" },
                    ]}
                  >
                    <Input
                      placeholder="Nhập họ và tên đầy đủ"
                      className="rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500 h-10 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="dob"
                    label={
                      <span className="text-gray-700 font-semibold flex items-center">
                        <CalendarOutlined className="mr-2 text-pink-500" />
                        Ngày sinh
                      </span>
                    }
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày sinh!" },
                    ]}
                  >
                    <DatePicker
                      placeholder="Chọn ngày sinh"
                      className="w-full rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500 h-10 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 8]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="gender"
                    label={
                      <span className="text-gray-700 font-semibold">
                        Giới tính
                      </span>
                    }
                    rules={[
                      { required: true, message: "Vui lòng chọn giới tính!" },
                    ]}
                  >
                    <Select placeholder="Chọn giới tính" className="rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500 h-10 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg">
                      <Option value="Nam">Nam</Option>
                      <Option value="Nữ">Nữ</Option>
                      <Option value="Khác">Khác</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="husband"
                    label={
                      <span className="text-gray-700 font-semibold flex items-center">
                        <UserOutlined className="mr-2 text-pink-500" />
                        Tên chồng
                      </span>
                    }
                    rules={[
                      { required: true, message: "Vui lòng nhập tên chồng!" },
                    ]}
                  >
                    <Input
                      placeholder="Nhập tên chồng"
                      className="rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500 h-10 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 8]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="wife"
                    label={
                      <span className="text-gray-700 font-semibold flex items-center">
                        <UserOutlined className="mr-2 text-pink-500" />
                        Tên vợ
                      </span>
                    }
                    rules={[
                      { required: true, message: "Vui lòng nhập tên vợ!" },
                    ]}
                  >
                    <Input
                      placeholder="Nhập tên vợ"
                      className="rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500 h-10 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="service"
                    label={
                      <span className="text-gray-700 font-semibold flex items-center">
                        <MedicineBoxOutlined className="mr-2 text-pink-500" />
                        Dịch vụ khám
                      </span>
                    }
                    rules={[
                      { required: true, message: "Vui lòng chọn dịch vụ!" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn dịch vụ muốn sử dụng"
                      className="rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500 h-10 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                      showSearch
                      filterOption={(input, option) =>
                        String(option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      onChange={handleServiceChange}
                      loading={loadingServices}
                      optionLabelProp="label"
                    >
                      {services.map((service) => (
                        <Option
                          key={service.serviceDBId}
                          value={service.serviceDBId}
                          label={service.name}
                        >
                          {service.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 8]}>
                <Col xs={24}>
                  <Form.Item
                    name="doctor"
                    label={
                      <span className="text-gray-700 font-semibold flex items-center">
                        <UserOutlined className="mr-2 text-pink-500" />
                        Chọn bác sĩ
                      </span>
                    }
                    rules={[
                      { required: true, message: "Vui lòng chọn bác sĩ!" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn bác sĩ khám"
                      className="rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500 h-10 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                      showSearch
                      filterOption={(input, option) =>
                        String(option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      loading={loadingDoctors}
                      disabled={!selectedService || loadingDoctors}
                      optionLabelProp="label"
                      onChange={handleDoctorChange}
                    >
                      {doctors.map((doctor) => (
                        <Option
                          key={doctor.doctorId}
                          value={doctor.doctorId}
                          label={doctor.fullName}
                        >
                          <div className="py-1">
                            <div className="font-semibold text-gray-800">
                              {doctor.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {doctor.experience} năm kinh nghiệm
                            </div>
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 8]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="date"
                    label={
                      <span className="text-gray-700 font-semibold flex items-center">
                        <CalendarOutlined className="mr-2 text-pink-500" />
                        Ngày khám
                      </span>
                    }
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày khám!" },
                    ]}
                  >
                    <DatePicker
                      placeholder="Chọn ngày khám"
                      className="w-full rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500 h-10 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                      format="DD/MM/YYYY"
                      disabledDate={(current) =>
                        current && current < dayjs().startOf("day")
                      }
                      onChange={handleDateChange}
                      disabled={!selectedDoctor}
                    />
                  </Form.Item>
                  {availabilityMessage && (
                    <p className="text-red-500 -mt-2 mb-2">
                      {availabilityMessage}
                    </p>
                  )}
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="timeSlot"
                    label={
                      <span className="text-gray-700 font-semibold flex items-center">
                        <ClockCircleOutlined className="mr-2 text-pink-500" />
                        Khung giờ khám
                      </span>
                    }
                    rules={[
                      { required: true, message: "Vui lòng chọn khung giờ!" },
                    ]}
                  >
                    <Select
                      placeholder="Chọn khung giờ"
                      className="rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500 h-10 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg"
                      showSearch
                      disabled={
                        !selectedDate ||
                        timeSlots.length === 0 ||
                        loadingTimeSlots
                      }
                      loading={loadingTimeSlots}
                    >
                      {timeSlots.map((slot) => (
                        <Option
                          key={slot.doctorScheduleId}
                          value={slot.doctorScheduleId}
                        >
                          {`${slot.startTime.substring(
                            0,
                            5
                          )} - ${slot.endTime.substring(0, 5)}`}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="note"
                label={
                  <span className="text-gray-700 font-semibold flex items-center">
                    <EditOutlined className="mr-2 text-pink-500" />
                    Ghi chú (không bắt buộc)
                  </span>
                }
              >
                <TextArea
                  rows={4}
                  placeholder="Mô tả triệu chứng hoặc yêu cầu đặc biệt..."
                  className="rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500 transition-all duration-200 shadow-sm hover:shadow-md focus:shadow-lg resize-none"
                />
              </Form.Item>

              <div className="pt-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  className="w-full h-12 bg-gradient-to-r from-pink-600 to-pink-400 hover:from-pink-700 hover:to-pink-500 border-0 rounded-lg font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899, #f472b6)',
                    border: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #be185d, #ec4899)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #ec4899, #f472b6)';
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.98)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  icon={<HeartOutlined />}
                >
                  {loading ? "Đang xử lý..." : "Đặt lịch hẹn ngay"}
                </Button>
              </div>
            </Form>
          </div>
        </Card>

        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-pink-100">
            <Title level={4} className="!text-pink-600 !mb-3">
              Lưu ý quan trọng
            </Title>
            <Space direction="vertical" className="text-gray-600">
              <p>• Vui lòng đến trước giờ hẹn 15-30 phút để làm thủ tục</p>
              <p>• Mang theo CMND/CCCD và thẻ bảo hiểm y tế (nếu có)</p>
              <p>• Chúng tôi sẽ liên hệ xác nhận lịch hẹn trong vòng 2 giờ</p>
              <p>
                • Hotline hỗ trợ:{" "}
                <span className="text-pink-600 font-semibold">1900-xxxx</span>
              </p>
            </Space>
          </div>
        </div>
      </div>
    </section>
  );
}
