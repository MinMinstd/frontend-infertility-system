import { Card, Button, Timeline, Tag, Typography, Row, Col, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Text } = Typography;

interface MedicalRecordDetail {
  Detail_ID: string;
  Record_ID: string;
  Treatment_result_ID: string;
  Date: string;
  Road_ID: string;
  Type: string;
  Test_result: string;
  Note: string;
}

interface MedicalRecordDetailsProps {
  medicalRecordDetails: MedicalRecordDetail[];
  onAddDetail: () => void;
}

export function MedicalRecordDetails({
  medicalRecordDetails,
  onAddDetail,
}: MedicalRecordDetailsProps) {
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
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Space direction="vertical" size="small">
                    <div>
                      <Text strong style={{ color: "#ff69b4" }}>
                        Ngày: {dayjs(detail.Date).format("DD/MM/YYYY")}
                      </Text>
                    </div>
                    <div>
                      <Text type="secondary">Bước: {detail.Road_ID}</Text>
                    </div>
                    <div>
                      <Tag color="#ff1493">{detail.Type}</Tag>
                    </div>
                  </Space>
                </Col>
                <Col span={12}>
                  <Space direction="vertical" size="small">
                    <div>
                      <Text strong style={{ color: "#ff69b4" }}>
                        Kết quả xét nghiệm:
                      </Text>
                      <br />
                      <Text type="secondary">{detail.Test_result}</Text>
                    </div>
                    <div>
                      <Text strong style={{ color: "#ff69b4" }}>
                        Ghi chú:
                      </Text>
                      <br />
                      <Text type="secondary">{detail.Note}</Text>
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
