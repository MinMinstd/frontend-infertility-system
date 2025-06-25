"use client";

import { Card, Button, Space, Typography, Divider } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";

const { Text } = Typography;

interface TestResult {
  Test_ID: string;
  Treatment_result_ID: string;
  Name: string;
  Description: string;
  Result_ID: string;
  Note: string;
}

interface TestResultsProps {
  testResults: TestResult[];
  onAddTest: () => void;
}

export function TestResults({ testResults, onAddTest }: TestResultsProps) {
  return (
    <Card
      style={{
        borderColor: "#ff69b4",
        boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
      }}
    >
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddTest}
          style={{
            backgroundColor: "#ff69b4",
            borderColor: "#ff69b4",
          }}
        >
          Thêm kết quả xét nghiệm
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testResults.map((test) => (
          <Card
            key={test.Test_ID}
            style={{
              borderColor: "#ffb6c1",
              backgroundColor: "#fff5f7",
            }}
            title={<span style={{ color: "#ff69b4" }}>{test.Name}</span>}
            extra={
              <Space>
                <Button
                  size="small"
                  type="text"
                  icon={<EyeOutlined />}
                  style={{ color: "#ff69b4" }}
                />
                <Button
                  size="small"
                  type="text"
                  icon={<EditOutlined />}
                  style={{ color: "#ff69b4" }}
                />
              </Space>
            }
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text type="secondary">Mô tả: {test.Description}</Text>
              </div>
              <div>
                <Text type="secondary">Liên kết kết quả: {test.Result_ID}</Text>
              </div>
              <Divider style={{ margin: "8px 0" }} />
              <div>
                <Text strong style={{ color: "#ff69b4" }}>
                  Đánh giá chuyên môn:
                </Text>
                <br />
                <Text type="secondary">{test.Note}</Text>
              </div>
            </Space>
          </Card>
        ))}
      </div>
    </Card>
  );
}
