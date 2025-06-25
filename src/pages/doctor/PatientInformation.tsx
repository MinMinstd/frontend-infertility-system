import { Card, Space, Avatar, Typography, Form, Row, Col, Input } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface PatientInformationProps {
  patient: {
    id: number;
    name: string;
    age: number;
    phone: string;
    email: string;
    partner: string;
    startDate: string;
  };
}

export function PatientInformation({ patient }: PatientInformationProps) {
  return (
    <Card
      title={<span style={{ color: "#ff69b4" }}>Patient Information</span>}
      style={{
        borderColor: "#ff69b4",
        boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Avatar
            size={64}
            style={{
              backgroundColor: "#ff69b4",
              color: "white",
              marginRight: 16,
            }}
          >
            {patient.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <div>
            <Title level={3} style={{ margin: 0, color: "#ff69b4" }}>
              {patient.name}
            </Title>
            <Text type="secondary">Patient ID: {patient.id}</Text>
          </div>
        </div>

        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#ff69b4" }}>Full Name</span>}
              >
                <Input
                  value={patient.name}
                  readOnly
                  style={{
                    backgroundColor: "#fff5f7",
                    borderColor: "#ffb6c1",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={{ color: "#ff69b4" }}>Age</span>}>
                <Input
                  value={patient.age}
                  readOnly
                  style={{
                    backgroundColor: "#fff5f7",
                    borderColor: "#ffb6c1",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#ff69b4" }}>Phone</span>}
              >
                <Input
                  value={patient.phone}
                  prefix={<PhoneOutlined style={{ color: "#ff69b4" }} />}
                  readOnly
                  style={{
                    backgroundColor: "#fff5f7",
                    borderColor: "#ffb6c1",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#ff69b4" }}>Email</span>}
              >
                <Input
                  value={patient.email}
                  prefix={<MailOutlined style={{ color: "#ff69b4" }} />}
                  readOnly
                  style={{
                    backgroundColor: "#fff5f7",
                    borderColor: "#ffb6c1",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#ff69b4" }}>Partner</span>}
              >
                <Input
                  value={patient.partner}
                  readOnly
                  style={{
                    backgroundColor: "#fff5f7",
                    borderColor: "#ffb6c1",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#ff69b4" }}>Start Date</span>}
              >
                <Input
                  value={patient.startDate}
                  readOnly
                  style={{
                    backgroundColor: "#fff5f7",
                    borderColor: "#ffb6c1",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </Card>
  );
}
