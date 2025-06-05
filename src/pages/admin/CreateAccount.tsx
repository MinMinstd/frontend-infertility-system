// This is a pure content component for the admin nested layout. Do not add layout/sidebar/header/footer here.
import React, { useState } from "react";
import { Form, Input, Button, Select, message, Typography, Card } from "antd";
const { Title } = Typography;

const roleOptions = [
  { label: "Bác sĩ", value: "doctor" },
  { label: "Quản lý", value: "manager" },
];

const CreateAccount: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      form.resetFields();
      message.success("Tạo tài khoản thành công!");
    }, 1200);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg mx-auto">
      <Title level={3} className="text-center text-pink-600 font-bold mb-6">Cấp tài khoản mới</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="space-y-2"
      >
        <Form.Item
          label={<span className="font-semibold text-pink-600">Vai trò</span>}
          name="role"
          rules={[{ required: true, message: "Vui lòng chọn vai trò!" }]}
        >
          <Select options={roleOptions} placeholder="Chọn vai trò" />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold text-pink-600">Họ và tên</span>}
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold text-pink-600">Email</span>}
          name="email"
          rules={[{ required: true, type: "email", message: "Email không hợp lệ!" }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold text-pink-600">Số điện thoại</span>}
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold text-pink-600">Mật khẩu</span>}
          name="password"
          rules={[{ required: true, min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" autoComplete="new-password" />
        </Form.Item>
        <Form.Item
          label={<span className="font-semibold text-pink-600">Xác nhận mật khẩu</span>}
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" autoComplete="new-password" />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="bg-pink-500 hover:bg-pink-600 border-none rounded-lg text-white w-full mt-4"
          >
            Tạo tài khoản
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateAccount; 