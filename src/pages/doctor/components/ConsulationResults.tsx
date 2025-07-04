import { Card, Button, Space, Typography, Divider } from "antd";
import { PlusOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import type { ConsulationResult_typeTest } from "../../../types/medicalRecord.d";

const { Text } = Typography;

interface ConsulationResultsProps {
  consulationResults: ConsulationResult_typeTest[];
  onAddTest: () => void;
}

export function ConsulationResults({
  consulationResults,
  onAddTest,
}: ConsulationResultsProps) {
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
          Thêm kết luận xét nghiệm
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {consulationResults.map((result) => (
          <Card
            key={result.consulationResultId}
            style={{
              borderColor: "#ffb6c1",
              backgroundColor: "#fff5f7",
            }}
            title={
              <span style={{ color: "#ff69b4" }}>
                Ngày kết luận: {result.date}
              </span>
            }
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
              <Text strong>Kết luận:</Text>
              <Text type="secondary">{result.resultValue}</Text>

              <Divider style={{ margin: "8px 0" }} />

              <Text strong>Ghi chú:</Text>
              <Text type="secondary">{result.note}</Text>

              <Divider style={{ margin: "8px 0" }} />

              <Text strong>Các xét nghiệm liên quan:</Text>
              <ul style={{ paddingLeft: 20 }}>
                {result.typeTests.map((test) => (
                  <li key={test.typeTestId}>
                    <Text>
                      <strong>{test.name}</strong> – {test.description}
                    </Text>
                  </li>
                ))}
              </ul>
            </Space>
          </Card>
        ))}
      </div>
    </Card>
  );
}
