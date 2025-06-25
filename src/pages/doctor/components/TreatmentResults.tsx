import { Card, Button, Space, Tag, Typography } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

interface TreatmentResult {
  Treatment_result_ID: string;
  Road_ID: string;
  Date: string;
  Description: string;
  Result: string;
}

interface TreatmentResultsProps {
  treatmentResults: TreatmentResult[];
  onAddResult: () => void;
}

export function TreatmentResults({
  treatmentResults,
  onAddResult,
}: TreatmentResultsProps) {
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
          onClick={onAddResult}
          style={{
            backgroundColor: "#ff69b4",
            borderColor: "#ff69b4",
          }}
        >
          Thêm kết quả điều trị
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {treatmentResults.map((result) => (
          <Card
            key={result.Treatment_result_ID}
            size="small"
            style={{
              borderColor: "#ffb6c1",
              backgroundColor: "#fff5f7",
            }}
            title={
              <span style={{ color: "#ff69b4" }}>Bước: {result.Road_ID}</span>
            }
            extra={
              <Button
                size="small"
                type="text"
                icon={<EditOutlined />}
                style={{ color: "#ff69b4" }}
              />
            }
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text strong style={{ color: "#ff69b4" }}>
                  Ngày: {dayjs(result.Date).format("DD/MM/YYYY")}
                </Text>
              </div>
              <div>
                <Text type="secondary">Mô tả: {result.Description}</Text>
              </div>
              <div>
                <Tag color="#ff1493">{result.Result}</Tag>
              </div>
            </Space>
          </Card>
        ))}
      </div>
    </Card>
  );
}
