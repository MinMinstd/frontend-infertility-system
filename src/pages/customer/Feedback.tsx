import React, { useState } from "react";
import FeedbackCard from "../../components/FeedbackCard";
import { Form, Input, Button, Rate, Card, Typography, message } from "antd";
import type { Feedback } from "../../data/feedbackData";
import { sampleFeedbacks } from "../../data/feedbackData";

const { Title, Text } = Typography;

const FeedbackPage: React.FC = () => {
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
        date: new Date().toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        avatarUrl: `https://api.dicebear.com/6.x/avataaars/svg?seed=${newFeedback.userName}`,
      };
      setFeedbacks([newFeedbackItem, ...feedbacks]);
      setNewFeedback({});
      message.success("Phản hồi của bạn đã được gửi thành công!");
    } else {
      message.error("Vui lòng điền đầy đủ thông tin!");
    }
  };

  const handleReplyChange = (id: string, value: string) => {
    setIsReplying(id);
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitReply = (id: string) => {
    if (replyText[id]) {
      setFeedbacks((prev) =>
        prev.map((f) => (f.id === id ? { ...f, reply: replyText[id] } : f))
      );
      setReplyText((prev) => ({ ...prev, [id]: "" }));
      setIsReplying(null);
      message.success("Phản hồi đã được gửi!");
    } else {
      message.error("Vui lòng nhập nội dung phản hồi!");
    }
  };

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: "40px 20px",
        background: "#f9fafb",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
      }}
    >
      <Title
        level={2}
        style={{ textAlign: "center", color: "#1f2937", marginBottom: 24 }}
      >
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
        <Text
          style={{ textAlign: "center", display: "block", color: "#64748b" }}
        >
          Chưa có phản hồi nào. Hãy gửi phản hồi đầu tiên!
        </Text>
      )}
      <Title
        level={4}
        style={{
          textAlign: "center",
          color: "#1f2937",
          marginTop: 32,
          marginBottom: 16,
        }}
      >
        Gửi phản hồi của bạn
      </Title>
      <Card
        style={{
          marginBottom: 32,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Form layout="vertical" onFinish={handleSubmitFeedback}>
          <Form.Item label="Tên của bạn" required>
            <Input
              value={newFeedback.userName}
              onChange={(e) =>
                setNewFeedback({ ...newFeedback, userName: e.target.value })
              }
              placeholder="Nhập tên"
            />
          </Form.Item>
          <Form.Item label="Đánh giá" required>
            <Rate
              value={newFeedback.rating}
              onChange={(value) =>
                setNewFeedback({ ...newFeedback, rating: value })
              }
            />
          </Form.Item>
          <Form.Item label="Bình luận" required>
            <Input.TextArea
              value={newFeedback.comment}
              onChange={(e) =>
                setNewFeedback({ ...newFeedback, comment: e.target.value })
              }
              placeholder="Nhập bình luận của bạn"
              rows={4}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "#f472b6", borderColor: "#f472b6" }}
            >
              Gửi phản hồi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default FeedbackPage;
