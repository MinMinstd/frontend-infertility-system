import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Space, message } from "antd";
import { Delete, Plus, Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";

interface Doctor {
  key: string;
  id: string;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
}

// Interface định nghĩa cấu trúc dữ liệu lịch làm việc
interface TimeSlot {
  start: string;
  end: string;
  isAvailable: boolean;
}

interface Schedule {
  date: string;
  morning: boolean;  // true nếu có lịch buổi sáng
  afternoon: boolean; // true nếu có lịch buổi chiều
  timeSlots: TimeSlot[]; // Danh sách các khung giờ 30 phút
}

const ManagerDoctors: React.FC = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [form] = Form.useForm();

  // Mock data - replace with actual API call
  const doctors: Doctor[] = [
    {
      key: "1",
      id: "DOC001",
      name: "BS. Nguyễn Văn A",
      specialization: "Sản phụ khoa",
      phone: "0123456789",
      email: "nguyenvana@example.com",
      status: "active",
    },
    {
      key: "2",
      id: "DOC002",
      name: "BS. Trần Thị B",
      specialization: "Hiếm muộn",
      phone: "0987654321",
      email: "tranthib@example.com",
      status: "active",
    },
    {
      key: "3",
      id: "DOC003",
      name: "BS. Lê Văn C",
      specialization: "Sản phụ khoa",
      phone: "0123987456",
      email: "levanc@example.com",
      status: "inactive",
    },
  ];

  // Dữ liệu mẫu cho lịch làm việc - sẽ được thay thế bằng API call
  const mockSchedule: Schedule[] = [
    { 
      date: "2024-03-18", 
      morning: true, 
      afternoon: false,
      timeSlots: [
        { start: "07:00", end: "07:30", isAvailable: true },
        { start: "07:30", end: "08:00", isAvailable: true },
        { start: "08:00", end: "08:30", isAvailable: false },
        { start: "08:30", end: "09:00", isAvailable: true },
        { start: "09:00", end: "09:30", isAvailable: false },
        { start: "09:30", end: "10:00", isAvailable: true },
        { start: "10:00", end: "10:30", isAvailable: true },
        { start: "10:30", end: "11:00", isAvailable: false },
        { start: "11:00", end: "11:30", isAvailable: true },
      ]
    },
    { 
      date: "2024-03-19", 
      morning: false, 
      afternoon: true,
      timeSlots: [
        { start: "13:00", end: "13:30", isAvailable: true },
        { start: "13:30", end: "14:00", isAvailable: false },
        { start: "14:00", end: "14:30", isAvailable: true },
        { start: "14:30", end: "15:00", isAvailable: true },
        { start: "15:00", end: "15:30", isAvailable: false },
        { start: "15:30", end: "16:00", isAvailable: true },
        { start: "16:00", end: "16:30", isAvailable: true },
        { start: "16:30", end: "17:00", isAvailable: false },
      ]
    },
    // ... other days with similar structure
  ];

  const columns: ColumnsType<Doctor> = [
    {
      title: "Mã bác sĩ",
      dataIndex: "id",
      key: "id",
      width: 120,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Chuyên môn",
      dataIndex: "specialization",
      key: "specialization",
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status === "active" ? "Đang làm việc" : "Nghỉ phép"}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<CalendarIcon className="w-4 h-4" />}
            onClick={() => handleViewSchedule(record)}
          >
            Xem lịch
          </Button>
          <Button
            danger
            icon={<Delete className="w-4 h-4" />}
            onClick={() => handleDelete(record)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleDelete = (doctor: Doctor) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa bác sĩ này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        // Handle delete logic here
        message.success("Đã xóa bác sĩ thành công");
      },
    });
  };

  const handleViewSchedule = (doctor: Doctor) => {
    navigate(`/manager/doctors/${doctor.id}/schedule`);
  };

  const handleSubmit = (values: Doctor) => {
    if (selectedDoctor) {
      // Update existing doctor
      message.success("Cập nhật thông tin bác sĩ thành công");
    } else {
      // Add new doctor
      message.success("Thêm bác sĩ mới thành công");
    }
    setIsModalVisible(false);
    form.resetFields();
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý bác sĩ</h1>
            <Button
              type="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => {
                setSelectedDoctor(null);
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              Thêm bác sĩ mới
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={doctors}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      <Modal
        title={`Lịch làm việc - ${selectedDoctor?.name}`}
        open={isScheduleModalVisible}
        onCancel={() => {
          setIsScheduleModalVisible(false);
          setSelectedDoctor(null);
        }}
        footer={null}
        width={800}
      >
        <div className="mt-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Lịch làm việc trong tuần</h3>
            {/* Grid hiển thị lịch làm việc */}
            <div className="grid grid-cols-2 gap-4">
              {mockSchedule.map((schedule, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  {/* Hiển thị ngày tháng */}
                  <div className="font-medium mb-2">
                    {new Date(schedule.date).toLocaleDateString('vi-VN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  {/* Hiển thị trạng thái ca sáng và chiều */}
                  <div className="space-y-2">
                    <div className={`flex items-center ${schedule.morning ? 'text-green-600' : 'text-gray-400'}`}>
                      <span className="mr-2">Buổi sáng:</span>
                      {schedule.morning ? 'Có lịch' : 'Nghỉ'}
                    </div>
                    <div className={`flex items-center ${schedule.afternoon ? 'text-green-600' : 'text-gray-400'}`}>
                      <span className="mr-2">Buổi chiều:</span>
                      {schedule.afternoon ? 'Có lịch' : 'Nghỉ'}
                    </div>
                    
                    {/* Hiển thị chi tiết từng khung giờ */}
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Chi tiết khung giờ:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {schedule.timeSlots.map((slot, slotIndex) => (
                          <div 
                            key={slotIndex}
                            className={`p-2 rounded text-sm ${
                              slot.isAvailable 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            <div className="font-medium">{slot.start} - {slot.end}</div>
                            <div className="text-xs">
                              {slot.isAvailable ? 'Có lịch' : 'Chưa có lịch'}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title={selectedDoctor ? "Sửa thông tin bác sĩ" : "Thêm bác sĩ mới"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setSelectedDoctor(null);
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <Form.Item
            name="id"
            label="Mã bác sĩ"
            rules={[{ required: true, message: "Vui lòng nhập mã bác sĩ" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="specialization"
            label="Chuyên môn"
            rules={[{ required: true, message: "Vui lòng chọn chuyên môn" }]}
          >
            <Select>
              <Select.Option value="Sản phụ khoa">Sản phụ khoa</Select.Option>
              <Select.Option value="Hiếm muộn">Hiếm muộn</Select.Option>
              <Select.Option value="Thụ tinh trong ống nghiệm">
                Thụ tinh trong ống nghiệm
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select>
              <Select.Option value="active">Đang làm việc</Select.Option>
              <Select.Option value="inactive">Nghỉ phép</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                  setSelectedDoctor(null);
                }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                {selectedDoctor ? "Cập nhật" : "Thêm mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerDoctors; 