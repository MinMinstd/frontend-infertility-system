"use client";

import { useState } from "react";
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
  Tag,
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

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface AppointmentFormData {
  name: string;
  dob: dayjs.Dayjs; // Fix: incorrect type dayjs.Day.Dayjs
  gender: string;
  service: string;
  date: dayjs.Dayjs;
  timeSlot: string;
  note?: string;
}

export default function AppointmentForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Tạo các khung giờ từ 8:00 đến 17:00 (mỗi khung 30 phút)
  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = 7; hour < 17; hour++) {
      // Khung giờ đầu: 8:00-8:30, 9:00-9:30, etc.
      const startTime = `${hour.toString().padStart(2, "0")}:00`;
      const endTime = `${hour.toString().padStart(2, "0")}:30`;
      slots.push(`${startTime} - ${endTime}`);

      // Khung giờ sau: 8:30-9:00, 9:30-10:00, etc.
      if (hour < 16) {
        // Không tạo khung 16:30-17:00 vì kết thúc lúc 17:00
        const startTime2 = `${hour.toString().padStart(2, "0")}:30`;
        const endTime2 = `${(hour + 1).toString().padStart(2, "0")}:00`;
        slots.push(`${startTime2} - ${endTime2}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const onFinish = async (values: AppointmentFormData) => {
    try {
      setLoading(true);
      // Validate dates before submitting
      if (!values.date.isValid() || !values.dob.isValid()) {
        message.error("Ngày không hợp lệ!");
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success(
        "Đặt lịch hẹn thành công! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất."
      );
      form.resetFields();
      console.log("Form data:", values);
    } catch (error) {
      console.error("Error details:", error); // Ghi log thông tin lỗi
      message.error("Có lỗi xảy ra khi đặt lịch!");
    } finally {
      setLoading(false);
    }
  };

  const services = [
    "Khám tổng quát",
    "Khám chuyên khoa tim mạch",
    "Khám chuyên khoa thần kinh",
    "Khám chuyên khoa nội tiết",
    "Khám chuyên khoa tiêu hóa",
    "Khám phụ khoa",
    "Khám nhi khoa",
    "Khám mắt",
    "Khám tai mũi họng",
    "Khám da liễu",
    "Tư vấn dinh dưỡng",
    "Vật lý trị liệu",
  ];

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
              className="space-y-2"
            >
              <Row gutter={[24, 0]}>
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
                      className="rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500"
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
                      className="w-full rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500"
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[24, 0]}>
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
                    <Select placeholder="Chọn giới tính" className="rounded-lg">
                      <Option value="Nam">Nam</Option>
                      <Option value="Nữ">Nữ</Option>
                      <Option value="Khác">Khác</Option>
                    </Select>
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
                      className="rounded-lg"
                      showSearch
                      filterOption={(input, option) =>
                        (option?.children as unknown as string)
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      {services.map((service) => (
                        <Option key={service} value={service}>
                          {service}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[24, 0]}>
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
                      className="w-full rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500"
                      format="DD/MM/YYYY"
                      disabledDate={(current) =>
                        current && current < dayjs().startOf("day")
                      }
                    />
                  </Form.Item>
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
                      className="rounded-lg"
                      showSearch
                      filterOption={(input, option) =>
                        (option?.children as unknown as string)
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      {timeSlots.map((slot, index) => (
                        <Option key={slot} value={slot}>
                          <div className="flex items-center justify-between">
                            <span>{slot}</span>
                            {index < 6 && (
                              <Tag color="green" className="text-sm">
                                Sáng
                              </Tag>
                            )}
                            {index >= 6 && index < 12 && (
                              <Tag color="orange" className="text-sm">
                                Trưa
                              </Tag>
                            )}
                            {index >= 12 && (
                              <Tag color="blue" className="text-sm">
                                Chiều
                              </Tag>
                            )}
                          </div>
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
                  className="rounded-lg border-gray-300 hover:border-pink-400 focus:border-pink-500"
                />
              </Form.Item>

              <div className="pt-6">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  className="w-full h-12 bg-gradient-to-r from-pink-500 to-rose-400 border-0 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
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
