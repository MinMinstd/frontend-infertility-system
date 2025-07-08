import { Card, Button, Timeline, Tag, Typography, Row, Col, Space } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { MedicalRecordDetail } from "../../../types/medicalRecord.d";

const { Text } = Typography;

interface MedicalRecordDetailsProps {
  medicalRecordDetails: MedicalRecordDetail[];
  onAddDetail: () => void;
  onUpdateDetail: (medicalDetail: MedicalRecordDetail) => void;
}

export function MedicalRecordDetails({
  medicalRecordDetails,
  onAddDetail,
  onUpdateDetail,
}: MedicalRecordDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "green";
      case "Pending":
        return "orange";
      case "Cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Card
      style={{
        borderColor: "#ff69b4",
        boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
      }}
    >
      <div className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddDetail}
          style={{
            backgroundColor: "#ff69b4",
            borderColor: "#ff69b4",
          }}
        >
          Thêm chi tiết điều trị
        </Button>
      </div>

      <Timeline
        items={medicalRecordDetails.map((detail) => ({
          color: "#ff69b4",
          children: (
            <Card
              size="small"
              style={{
                borderColor: "#ffb6c1",
                backgroundColor: "#fff5f7",
                marginBottom: 8,
                position: "relative",
              }}
            >
              {/* Thêm nút cập nhật */}
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => onUpdateDetail(detail)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "#ff69b4",
                }}
              />

              <Row gutter={16}>
                <Col span={12}>
                  <Space direction="vertical" size="small">
                    <Text strong style={{ color: "#ff69b4" }}>
                      Ngày: {dayjs(detail.date).format("DD/MM/YYYY")}
                    </Text>
                    <Text type="secondary">Bước: {detail.stepNumber}</Text>
                    <Text type="secondary">Giai đoạn: {detail.stage}</Text>
                    {detail.typeName && (
                      <Tag color="pink">{detail.typeName}</Tag>
                    )}
                    <Tag color={getStatusColor(detail.status)}>
                      {detail.status}
                    </Tag>
                  </Space>
                </Col>
                <Col span={12}>
                  <Space direction="vertical" size="small">
                    <div>
                      <Text strong style={{ color: "#ff69b4" }}>
                        Kết quả xét nghiệm:
                      </Text>
                      <br />
                      <Text type="secondary">
                        {detail.testResult || "Không có"}
                      </Text>
                    </div>
                    <div>
                      <Text strong style={{ color: "#ff69b4" }}>
                        Ghi chú:
                      </Text>
                      <br />
                      <Text type="secondary">{detail.note || "Không có"}</Text>
                    </div>
                  </Space>
                </Col>
              </Row>
            </Card>
          ),
        }))}
      />
    </Card>
  );
}
