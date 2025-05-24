import React from "react";
import { Card, Rate, Typography, Avatar, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

interface FeedbackCardProps {
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  reply?: string;
  isReplying?: boolean;
  onReplyChange?: (value: string) => void;
  onReplySubmit?: () => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  userName,
  rating,
  comment,
  date,
  avatarUrl,
  reply,
  isReplying,
  onReplyChange,
  onReplySubmit,
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
        <Avatar
          size={64}
          icon={<UserOutlined />}
          src={avatarUrl}
          style={{ border: "2px solid #f472b6", backgroundColor: "#fde8f3" }}
        />
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

          {/* Hiển thị phản hồi nếu có */}
          {reply && (
            <div
              style={{
                marginTop: 16,
                padding: 16,
                backgroundColor: "#f8fafc",
                borderRadius: 8,
              }}
            >
              <Text strong style={{ color: "#1f2937" }}>
                Phản hồi:
              </Text>
              <Paragraph style={{ marginTop: 8, color: "#4b5563" }}>
                {reply}
              </Paragraph>
            </div>
          )}

          {/* Form trả lời feedback */}
          {isReplying && (
            <div style={{ marginTop: 16 }}>
              <TextArea
                placeholder="Nhập phản hồi của bạn"
                rows={3}
                onChange={(e) => onReplyChange?.(e.target.value)}
                style={{ marginBottom: 8 }}
              />
              <Button
                type="primary"
                onClick={onReplySubmit}
                style={{ backgroundColor: "#f472b6", borderColor: "#f472b6" }}
              >
                Gửi phản hồi
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default FeedbackCard;
