import { Card, Button, Space, Tag, Typography } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { TreatmentResult_typeTest } from "../../../types/medicalRecord.d";

const { Text } = Typography;

interface TreatmentResultsProps {
  treatmentResults: TreatmentResult_typeTest[];
  onAddTreatmentResult: () => void;
  onUpdateTreatmentResult: (record: TreatmentResult_typeTest) => void;
}

export function TreatmentResults({
  treatmentResults,
  onAddTreatmentResult,
  onUpdateTreatmentResult,
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
          onClick={onAddTreatmentResult}
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
            key={result.treatmentResultId}
            size="small"
            style={{
              borderColor: "#ffb6c1",
              backgroundColor: "#fff5f7",
            }}
            title={
              <span style={{ color: "#ff69b4" }}>
                Bước: {result.stepNumber}
              </span>
            }
            extra={
              <Button
                size="small"
                type="text"
                icon={<EditOutlined />}
                style={{ color: "#ff69b4" }}
                onClick={() => onUpdateTreatmentResult(result)}
              />
            }
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              <div>
                <Text strong style={{ color: "#ff69b4" }}>
                  Ngày:{" "}
                  {dayjs(result.dateTreatmentResult).isValid()
                    ? dayjs(result.dateTreatmentResult).format("DD/MM/YYYY")
                    : "Không xác định"}
                </Text>
              </div>
              <div>
                <Text type="secondary">Mô tả: {result.description}</Text>
              </div>
              <div>
                <Tag color="#ff1493">{result.result}</Tag>
              </div>
              {result.typeTest?.length > 0 && (
                <div>
                  <Text strong style={{ color: "#ff69b4" }}>
                    Các xét nghiệm:
                  </Text>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {result.typeTest.map((test) => (
                      <li key={test.typeTestId}>
                        {test.name} – {test.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Space>
          </Card>
        ))}
      </div>
    </Card>
  );
}
