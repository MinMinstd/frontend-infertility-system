import { useState } from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';

const { Title, Text } = Typography;

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

interface ProfileCardProps {
  profile: UserProfile;
  onSave: (values: UserProfile) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(profile);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values: UserProfile) => {
        onSave(values);
        setIsEditing(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.setFieldsValue(profile);
  };

  return (
    <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        User Profile
      </Title>
      <Form form={form} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          {isEditing ? <Input /> : <Text>{profile.name}</Text>}
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          {isEditing ? <Input /> : <Text>{profile.email}</Text>}
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          {isEditing ? <Input /> : <Text>{profile.phone}</Text>}
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            {isEditing ? (
              <>
                <Button type="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="primary" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfileCard;