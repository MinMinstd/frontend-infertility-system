import { Card, Row, Col, Statistic, Progress } from "antd";
import {
  ExperimentOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
} from "@ant-design/icons";

interface PatientOverviewCardsProps {
  patient: {
    progress: number;
    stage: string;
    treatment: string;
    status: string;
  };
}

export function PatientOverviewCards({ patient }: PatientOverviewCardsProps) {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={6}>
        <Card
          style={{
            borderColor: "#ff69b4",
            boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
          }}
        >
          <Statistic
            title={<span style={{ color: "#ff69b4" }}>Treatment Progress</span>}
            value={patient.progress}
            suffix="%"
            prefix={<ExperimentOutlined style={{ color: "#ff69b4" }} />}
            valueStyle={{ color: "#ff69b4" }}
          />
          <Progress percent={patient.progress} strokeColor="#ff69b4" />
        </Card>
      </Col>
      <Col xs={24} sm={6}>
        <Card
          style={{
            borderColor: "#ff1493",
            boxShadow: "0 2px 8px rgba(255, 20, 147, 0.1)",
          }}
        >
          <Statistic
            title={<span style={{ color: "#ff1493" }}>Current Stage</span>}
            value={patient.stage}
            prefix={<FileTextOutlined style={{ color: "#ff1493" }} />}
            valueStyle={{ color: "#ff1493", fontSize: "14px" }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={6}>
        <Card
          style={{
            borderColor: "#ff69b4",
            boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
          }}
        >
          <Statistic
            title={<span style={{ color: "#ff69b4" }}>Treatment Type</span>}
            value={patient.treatment}
            prefix={<MedicineBoxOutlined style={{ color: "#ff69b4" }} />}
            valueStyle={{ color: "#ff69b4" }}
          />
        </Card>
      </Col>
      <Col xs={24} sm={6}>
        <Card
          style={{
            borderColor: "#ff1493",
            boxShadow: "0 2px 8px rgba(255, 20, 147, 0.1)",
          }}
        >
          <Statistic
            title={<span style={{ color: "#ff1493" }}>Status</span>}
            value={patient.status}
            prefix={<HeartOutlined style={{ color: "#ff1493" }} />}
            valueStyle={{ color: "#ff1493" }}
          />
        </Card>
      </Col>
    </Row>
  );
}
