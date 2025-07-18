import React, { useState } from "react";
import FeedbackList from "../../components/FeedbackCard";
import { Typography, Form, Input, Button, Rate, message, Card } from "antd";
import UserApi from "../../servers/user.api";
import type { FeedbackCreateRequest } from "../../types/user.d";

const { Title } = Typography;

const FeedbackPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FeedbackCreateRequest) => {
    setLoading(true);
    try {
      await UserApi.PostFeedback(values);
      message.success("Gửi phản hồi thành công!");
      form.resetFields();
      // Reload FeedbackList nếu cần (có thể dùng state hoặc ref tuỳ cách cài đặt FeedbackList)
      // Nếu FeedbackList không tự động reload, có thể truyền key hoặc callback để reload
      // window.location.reload(); // hoặc trigger reload FeedbackList nếu cần
    } catch {
      message.error("Gửi phản hồi thất bại!");
    } finally {
      setLoading(false);
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
      <Card
        style={{
          marginBottom: 32,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Đánh giá"
            name="rating"
            rules={[{ required: true, message: "Vui lòng chọn số sao đánh giá" }]}
          >
            <Rate allowClear={false} />
          </Form.Item>
          <Form.Item
            label="Bình luận"
            name="comments"
            rules={[
              { required: true, message: "Vui lòng nhập bình luận" },
              { max: 200, message: "Bình luận không được vượt quá 200 ký tự" },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={200}
              rows={4}
              placeholder="Nhập bình luận của bạn (tối đa 200 ký tự)"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ backgroundColor: "#f472b6", borderColor: "#f472b6" }}
            >
              Gửi phản hồi
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <FeedbackList />
    </div>
  );
};

export default FeedbackPage;
