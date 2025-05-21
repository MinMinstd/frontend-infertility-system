import React from 'react';
import { Card, Rate, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

interface FeedbackCardProps {
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  userName,
  rating,
  comment,
  date,
  avatarUrl
}) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'start', gap: 16 }}>
        <Avatar 
          size={48} 
          icon={<UserOutlined />} 
          src={avatarUrl}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text strong>{userName}</Text>
            <Text type="secondary">{date}</Text>
          </div>
          <Rate disabled defaultValue={rating} style={{ fontSize: 16, marginBottom: 8 }} />
          <Paragraph>{comment}</Paragraph>
        </div>
      </div>
    </Card>
  );
};

export default FeedbackCard;