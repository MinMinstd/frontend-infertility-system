import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Space, message } from "antd";
import { Edit, Delete, Plus, User } from "lucide-react";
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

const ManagerDoctors: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    form.setFieldsValue(doctor);
    setIsModalVisible(true);
  };

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