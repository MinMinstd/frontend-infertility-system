import { Card, Space, Avatar, Typography, Form, Row, Col, Input } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  GiftOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { InformationPatientDetails } from "../../types/doctor";

const { Title, Text } = Typography;

//Định nghĩa patient thành obj
interface PatientInformationProps {
  patient: InformationPatientDetails | null;
}

export function PatientInformation({ patient }: PatientInformationProps) {
  if (!patient) return null;

  return (
    <Card
      title={<span style={{ color: "#ff69b4" }}>Thông tin bệnh nhân</span>}
      style={{
        borderColor: "#ff69b4",
        boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <Avatar
            size={64}
            style={{
              backgroundColor: "#ff69b4",
              color: "white",
              marginRight: 16,
            }}
          >
            {patient.wife
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <div>
            <Title level={3} style={{ margin: 0, color: "#ff69b4" }}>
              {patient.wife}
            </Title>
            <Text type="secondary">Partner: {patient.husband}</Text>
          </div>
        </div>

        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#ff69b4" }}>Họ và Tên Vợ</span>}
              >
                <Input
                  value={patient.wife}
                  readOnly
                  style={{ backgroundColor: "#fff5f7", borderColor: "#ffb6c1" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#ff69b4" }}>Họ và Tên Chồng</span>}
              >
                <Input
                  value={patient.husband}
                  readOnly
                  style={{ backgroundColor: "#fff5f7", borderColor: "#ffb6c1" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#ff69b4" }}>Số điện thoại</span>}
              >
                <Input
                  value={patient.phone}
                  prefix={<PhoneOutlined style={{ color: "#ff69b4" }} />}
                  readOnly
                  style={{ backgroundColor: "#fff5f7", borderColor: "#ffb6c1" }}
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
                  style={{ backgroundColor: "#fff5f7", borderColor: "#ffb6c1" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: "#ff69b4" }}>Ngày sinh</span>}
              >
                <Input
                  value={patient.birthday}
                  prefix={<GiftOutlined style={{ color: "#ff69b4" }} />}
                  readOnly
                  style={{ backgroundColor: "#fff5f7", borderColor: "#ffb6c1" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={<span style={{ color: "#ff69b4" }}>Tuổi</span>}>
                <Input
                  value={patient.age}
                  readOnly
                  style={{ backgroundColor: "#fff5f7", borderColor: "#ffb6c1" }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label={<span style={{ color: "#ff69b4" }}>Địa chỉ thường trú</span>}
              >
                <Input
                  value={patient.address}
                  prefix={<HomeOutlined style={{ color: "#ff69b4" }} />}
                  readOnly
                  style={{ backgroundColor: "#fff5f7", borderColor: "#ffb6c1" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Space>
    </Card>
  );
}
