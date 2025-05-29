import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Upload, message } from 'antd';
const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    email: 'abcabc@gmail.com',
    name: 'abcabc',
    phone: '123456789123456789',
  });

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(profile);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      setProfile(values);
      setIsEditing(false);
      message.success('Cập nhật hồ sơ thành công!');
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.setFieldsValue(profile);
  };

  return (
    <Card style={{ maxWidth: 500, margin: '0 auto', borderRadius: 8 }}>
      <Title level={3} style={{ textAlign: 'center', color: '#1890ff' }}>Hồ sơ cá nhân</Title>
      <Form form={form} layout="vertical" initialValues={profile}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
          {isEditing ? <Input /> : <Text>{profile.email}</Text>}
        </Form.Item>
        <Form.Item label="Tên" name="name" rules={[{ required: true }]}>
          {isEditing ? <Input /> : <Text>{profile.name}</Text>}
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true }]}>
          {isEditing ? <Input /> : <Text>{profile.phone}</Text>}
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: 'right' }}>
            {isEditing ? (
              <>
                <Button onClick={handleCancel} style={{ marginRight: 8 }}>Hủy</Button>
                <Button type="primary" onClick={handleSave}>Lưu</Button>
              </>
            ) : (
              <Button type="primary" onClick={handleEdit}>Chỉnh sửa</Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Profile;   