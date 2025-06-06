import { Table, Tag, Button, Space, Modal, Form, Input, Select, DatePicker, TimePicker } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { Calendar, Clock, User, FileText, Edit, Delete } from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  service: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

const ManagerAppointments = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [form] = Form.useForm();

  // Mock data - replace with actual API call
  const appointments: Appointment[] = [
    {
      id: "1",
      patientName: "Nguyễn Văn A",
      doctorName: "BS. Trần Thị B",
      service: "Tư vấn sức khỏe sinh sản",
      date: "2024-03-20",
      time: "09:00",
      status: "scheduled",
    },
    {
      id: "2",
      patientName: "Lê Văn C",
      doctorName: "BS. Nguyễn Văn D",
      service: "Khám và điều trị hiếm muộn",
      date: "2024-03-21",
      time: "14:30",
      status: "completed",
      notes: "Đã hoàn thành tư vấn",
    },
    {
      id: "3",
      patientName: "Phạm Thị E",
      doctorName: "BS. Hoàng Văn F",
      service: "Thụ tinh trong ống nghiệm",
      date: "2024-03-22",
      time: "10:00",
      status: "cancelled",
      notes: "Bệnh nhân hủy lịch",
    },
  ];

  const columns: ColumnsType<Appointment> = [
    {
      title: "Bệnh nhân",
      dataIndex: "patientName",
      key: "patientName",
      render: (name) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" />
          {name}
        </div>
      ),
    },
    {
      title: "Bác sĩ",
      dataIndex: "doctorName",
      key: "doctorName",
      render: (name) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-green-500" />
          {name}
        </div>
      ),
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      key: "service",
      render: (service) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-500" />
          {service}
        </div>
      ),
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-pink-500" />
          {new Date(date).toLocaleDateString("vi-VN")}
        </div>
      ),
    },
    {
      title: "Giờ",
      dataIndex: "time",
      key: "time",
      render: (time) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-500" />
          {time}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusConfig = {
          scheduled: { color: "blue", text: "Đã lên lịch" },
          completed: { color: "green", text: "Hoàn thành" },
          cancelled: { color: "red", text: "Đã hủy" },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
          >
            Sửa
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

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    form.setFieldsValue({
      ...appointment,
      date: new Date(appointment.date),
      time: appointment.time,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (appointment: Appointment) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa lịch hẹn này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        // Handle delete logic here
        console.log("Delete appointment:", appointment.id);
      },
    });
  };

  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý lịch hẹn</h1>
            <Button
              type="primary"
              onClick={() => {
                setSelectedAppointment(null);
                form.resetFields();
                setIsModalVisible(true);
              }}
            >
              Thêm lịch hẹn mới
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={appointments}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      <Modal
        title={selectedAppointment ? "Sửa lịch hẹn" : "Thêm lịch hẹn mới"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
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
            name="patientName"
            label="Tên bệnh nhân"
            rules={[{ required: true, message: "Vui lòng nhập tên bệnh nhân" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="doctorName"
            label="Bác sĩ"
            rules={[{ required: true, message: "Vui lòng chọn bác sĩ" }]}
          >
            <Select>
              <Select.Option value="BS. Trần Thị B">BS. Trần Thị B</Select.Option>
              <Select.Option value="BS. Nguyễn Văn D">BS. Nguyễn Văn D</Select.Option>
              <Select.Option value="BS. Hoàng Văn F">BS. Hoàng Văn F</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="service"
            label="Dịch vụ"
            rules={[{ required: true, message: "Vui lòng chọn dịch vụ" }]}
          >
            <Select>
              <Select.Option value="Tư vấn sức khỏe sinh sản">
                Tư vấn sức khỏe sinh sản
              </Select.Option>
              <Select.Option value="Khám và điều trị hiếm muộn">
                Khám và điều trị hiếm muộn
              </Select.Option>
              <Select.Option value="Thụ tinh trong ống nghiệm">
                Thụ tinh trong ống nghiệm
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Ngày"
            rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item
            name="time"
            label="Giờ"
            rules={[{ required: true, message: "Vui lòng chọn giờ" }]}
          >
            <TimePicker className="w-full" format="HH:mm" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select>
              <Select.Option value="scheduled">Đã lên lịch</Select.Option>
              <Select.Option value="completed">Hoàn thành</Select.Option>
              <Select.Option value="cancelled">Đã hủy</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="notes" label="Ghi chú">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Space>
              <Button
                onClick={() => {
                  setIsModalVisible(false);
                  form.resetFields();
                }}
              >
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                {selectedAppointment ? "Cập nhật" : "Thêm mới"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerAppointments; 