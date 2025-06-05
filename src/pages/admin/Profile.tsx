// This is a pure content component for the admin nested layout. Do not add layout/sidebar/header/footer here.
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  message,
  DatePicker,
  Select,
  Upload,
  Avatar,
  Divider,
} from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const { Title, Text } = Typography;

const genderOptions = [
  { label: "Nam", value: "male" },
  { label: "Nữ", value: "female" },
  { label: "Khác", value: "other" },
];

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [profile, setProfile] = useState({
    email: "abcabc@gmail.com",
    name: "Admin User",
    phone: "0123456789",
    gender: "male",
    dob: null as dayjs.Dayjs | null,
    address: "Hà Nội, Việt Nam",
    avatar: undefined,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(profile);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      setProfile({ ...profile, ...values });
      setIsEditing(false);
      message.success("Cập nhật hồ sơ thành công!");
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.setFieldsValue(profile);
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === "done" || info.file.status === "uploading") {
      // Fake preview
      const reader = new FileReader();
      reader.onload = (e) => setAvatarUrl(e.target?.result as string);
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <Title level={3} className="text-center text-pink-600 font-bold mb-6">
        Hồ sơ cá nhân Admin
      </Title>
      <div className="flex flex-col items-center mb-6">
        <Avatar
          size={96}
          src={avatarUrl}
          icon={<UserOutlined />}
          className="mb-2"
        />
        {isEditing && (
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleAvatarChange}
          >
            <Button
              icon={<UploadOutlined />}
              className="bg-pink-500 hover:bg-pink-600 border-none rounded-lg text-white"
            >
              Cập nhật ảnh đại diện
            </Button>
          </Upload>
        )}
      </div>
      <Form
        form={form}
        layout="vertical"
        initialValues={profile}
        className="space-y-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            label={<span className="font-semibold text-pink-600">Email</span>}
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            {isEditing ? <Input /> : <Text>{profile.email}</Text>}
          </Form.Item>
          <Form.Item
            label={<span className="font-semibold text-pink-600">Tên</span>}
            name="name"
            rules={[{ required: true }]}
          >
            {isEditing ? <Input /> : <Text>{profile.name}</Text>}
          </Form.Item>
          <Form.Item
            label={
              <span className="font-semibold text-pink-600">Số điện thoại</span>
            }
            name="phone"
            rules={[{ required: true }]}
          >
            {isEditing ? <Input /> : <Text>{profile.phone}</Text>}
          </Form.Item>
          <Form.Item
            label={
              <span className="font-semibold text-pink-600">Giới tính</span>
            }
            name="gender"
            rules={[{ required: true }]}
          >
            {isEditing ? (
              <Select options={genderOptions} />
            ) : (
              <Text>
                {genderOptions.find((g) => g.value === profile.gender)?.label}
              </Text>
            )}
          </Form.Item>
          <Form.Item
            label={
              <span className="font-semibold text-pink-600">Ngày sinh</span>
            }
            name="dob"
          >
            {isEditing ? (
              <DatePicker format="DD/MM/YYYY" className="w-full" />
            ) : (
              <Text>
                {profile.dob ? dayjs(profile.dob).format("DD/MM/YYYY") : ""}
              </Text>
            )}
          </Form.Item>
          <Form.Item
            label={<span className="font-semibold text-pink-600">Địa chỉ</span>}
            name="address"
          >
            {isEditing ? <Input /> : <Text>{profile.address}</Text>}
          </Form.Item>
        </div>
        <Divider className="my-4">Bảo mật</Divider>
        {isEditing || showPassword ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              label={
                <span className="font-semibold text-pink-600">Mật khẩu cũ</span>
              }
              name="oldPassword"
              rules={[{ required: true }]}
            >
              <Input.Password autoComplete="off" />
            </Form.Item>
            <Form.Item
              label={
                <span className="font-semibold text-pink-600">
                  Mật khẩu mới
                </span>
              }
              name="newPassword"
              rules={[{ required: true, min: 6 }]}
            >
              <Input.Password autoComplete="off" />
            </Form.Item>
            <Form.Item
              label={
                <span className="font-semibold text-pink-600">
                  Xác nhận mật khẩu
                </span>
              }
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password autoComplete="off" />
            </Form.Item>
          </div>
        ) : (
          <div className="text-right">
            <Button
              type="link"
              onClick={() => setShowPassword(true)}
              className="text-pink-600"
            >
              Đổi mật khẩu
            </Button>
          </div>
        )}
        <Form.Item>
          <div className="text-right">
            {isEditing ? (
              <>
                <Button onClick={handleCancel} className="mr-2 rounded-lg">
                  Hủy
                </Button>
                <Button
                  type="primary"
                  onClick={handleSave}
                  className="bg-pink-500 hover:bg-pink-600 border-none rounded-lg text-white"
                >
                  Lưu
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                onClick={handleEdit}
                className="bg-pink-500 hover:bg-pink-600 border-none rounded-lg text-white"
              >
                Chỉnh sửa
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
