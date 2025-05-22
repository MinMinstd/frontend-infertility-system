import React, { useState } from 'react';
import FeedbackCard from '../components/FeedbackCard';
import { Form, Input, Button, Rate, Card, Typography, Space, message } from 'antd';

const { Title, Text } = Typography;

export interface Feedback {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  reply?: string;
}

export const sampleFeedbacks: Feedback[] = [
  {
    id: '1',
    userName: 'Nguyễn Thị An',
    rating: 5,
    comment: 'Bác sĩ tư vấn rất tận tình, giải thích rõ ràng về tình trạng của tôi. Cảm ơn đội ngũ y tế!',
    date: '2025-05-20',
    avatarUrl: 'https://example.com/avatar1.jpg'
  },
  {
    id: '2',
    userName: 'Trần Văn Bình',
    rating: 4,
    comment: 'Dịch vụ tốt, thời gian chờ đợi hơi lâu một chút nhưng nhìn chung rất hài lòng.',
    date: '2025-05-19'
  },
  {
    id: '3',
    userName: 'Lê Thị Cúc',
    rating: 5,
    comment: 'Phòng khám sạch sẽ, nhân viên thân thiện. Tôi sẽ giới thiệu cho bạn bè.',
    date: '2025-05-18',
    avatarUrl: 'https://example.com/avatar3.jpg'
  },
  {
    id: '4',
    userName: 'Phạm Đức Duy',
    rating: 4,
    comment: 'Bác sĩ chuyên môn cao, tư vấn rất chi tiết về phương pháp điều trị.',
    date: '2025-05-17'
  },
  {
    id: '5',
    userName: 'Hoàng Thị Em',
    rating: 5,
    comment: 'Rất hài lòng với kết quả điều trị. Cảm ơn đội ngũ bác sĩ nhiều!',
    date: '2025-05-16',
    avatarUrl: 'https://example.com/avatar5.jpg'
  },
];

const Feedback: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(sampleFeedbacks);
  const [newFeedback, setNewFeedback] = useState<Partial<Feedback>>({});
  const [isReplying, setIsReplying] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const handleSubmitFeedback = () => {
    if (newFeedback.userName && newFeedback.comment && newFeedback.rating) {
      const newFeedbackItem: Feedback = {
        id: Date.now().toString(),
        userName: newFeedback.userName!,
        rating: newFeedback.rating!,
        comment: newFeedback.comment!,
        date: new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' }),
        avatarUrl: `https://api.dicebear.com/6.x/avataaars/svg?seed=${newFeedback.userName}`,
      };
      setFeedbacks([newFeedbackItem, ...feedbacks]);
      setNewFeedback({});
      message.success('Phản hồi của bạn đã được gửi thành công!');
    } else {
      message.error('Vui lòng điền đầy đủ thông tin!');
    }
  };

  const handleReplyChange = (id: string, value: string) => {
    setIsReplying(id);
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitReply = (id: string) => {
    if (replyText[id]) {
      setFeedbacks((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, reply: replyText[id] } : f
        )
      );
      setReplyText((prev) => ({ ...prev, [id]: '' }));
      setIsReplying(null);
      message.success('Phản hồi đã được gửi!');
    } else {
      message.error('Vui lòng nhập nội dung phản hồi!');
    }
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: '40px auto',
        padding: '40px 20px',
        background: '#f9fafb',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
      }}
    >
      <Title level={2} style={{ textAlign: 'center', color: '#1f2937', marginBottom: 24 }}>
        Ý kiến phản hồi từ khách hàng
      </Title>
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback.id}
            userName={feedback.userName}
            rating={feedback.rating}
            comment={feedback.comment}
            date={feedback.date}
            avatarUrl={feedback.avatarUrl}
            reply={feedback.reply}
            onReplyChange={(value) => handleReplyChange(feedback.id, value)}
            onReplySubmit={() => handleSubmitReply(feedback.id)}
            isReplying={isReplying === feedback.id}
          />
        ))
      ) : (
        <Text style={{ textAlign: 'center', display: 'block', color: '#64748b' }}>
          Chưa có phản hồi nào. Hãy gửi phản hồi đầu tiên!
        </Text>
      )}
      <Title level={4} style={{ textAlign: 'center', color: '#1f2937', marginTop: 32, marginBottom: 16 }}>
        Gửi phản hồi của bạn
      </Title>
      <Card style={{ marginBottom: 32, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Form layout="vertical" onFinish={handleSubmitFeedback}>
          <Form.Item label="Tên của bạn" required>
            <Input
              value={newFeedback.userName}
              onChange={(e) => setNewFeedback({ ...newFeedback, userName: e.target.value })}
              placeholder="Nhập tên"
            />
          </Form.Item>
          <Form.Item label="Đánh giá" required>
            <Rate
              value={newFeedback.rating}
              onChange={(value) => setNewFeedback({ ...newFeedback, rating: value })}
            />
          </Form.Item>
          <Form.Item label="Bình luận" required>
            <Input.TextArea
              value={newFeedback.comment}
              onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
              placeholder="Nhập bình luận của bạn"
              rows={4}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: '#f472b6', borderColor: '#f472b6' }}>
              Gửi phản hồi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Feedback;