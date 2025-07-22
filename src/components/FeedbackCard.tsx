import React, { useEffect, useState } from "react";
import { Card, Rate, Typography } from "antd";
import ManagerApi from "../servers/manager.api";
import type { Feedback } from "../types/manager.d";

const { Text, Paragraph } = Typography;

interface FeedbackCardProps {
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  userName,
  rating,
  comment,
  date,
}) => {
  return (
    <Card
      style={{
        marginBottom: 24,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        background: "linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)",
        transition: "all 0.3s ease",
      }}
      hoverable
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          padding: 16,
        }}
      >
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text strong style={{ fontSize: 18, color: "#1f2937" }}>
              {userName}
            </Text>
            <Text type="secondary" style={{ fontSize: 14 }}>
              {new Date(date).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </div>
          <Rate
            disabled
            value={rating}
            style={{ fontSize: 16, color: "#f472b6", marginBottom: 12 }}
          />
          <Paragraph
            style={{
              fontSize: 16,
              color: "#4b5563",
              lineHeight: "1.6",
              margin: 0,
            }}
          >
            {comment}
          </Paragraph>
        </div>
      </div>
    </Card>
  );
};

const FeedbackList: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const res = await ManagerApi.GetFeedback();
        // Lọc trùng theo feedbackId
        const uniqueFeedbacks = (res.data || []).filter(
          (fb, idx, arr) => arr.findIndex(f => f.feedbackId === fb.feedbackId) === idx
        );
        setFeedbacks(uniqueFeedbacks);
      } catch {
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, []);

  if (loading) return <div>Đang tải phản hồi...</div>;
  const filteredFeedbacks = feedbacks.filter(fb => fb.status === 'Ok');
  if (!filteredFeedbacks.length) return <div>Chưa có phản hồi nào.</div>;

  return (
    <div>
      {filteredFeedbacks.map((fb) => (
        <FeedbackCard
          key={fb.feedbackId}
          userName={fb.fullName}
          rating={fb.rating}
          comment={fb.comments}
          date={fb.date}
        />
      ))}
    </div>
  );
};

export default FeedbackList;
