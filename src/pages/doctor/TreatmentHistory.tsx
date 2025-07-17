import {
  Card,
  Input,
  Select,
  Tabs,
  Badge,
  Button,
  Typography,
  Progress,
  Row,
  Col,
  Space,
  Statistic,
} from "antd";
import {
  SearchOutlined,
  FileTextOutlined,
  HeartOutlined,
  RiseOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { DoctorSidebar } from "./DoctorSidebar";

const { Title, Text } = Typography;

export default function TreatmentHistoryPage() {
  const completedTreatments = [
    {
      id: 1,
      patient: "Jennifer Smith",
      treatment: "IVF",
      startDate: "2023-08-01",
      endDate: "2023-10-15",
      outcome: "Successful Pregnancy",
      cycles: 1,
      status: "success",
    },
    {
      id: 2,
      patient: "Amanda Johnson",
      treatment: "IUI",
      startDate: "2023-09-15",
      endDate: "2023-11-20",
      outcome: "Successful Pregnancy",
      cycles: 3,
      status: "success",
    },
    {
      id: 3,
      patient: "Rachel Brown",
      treatment: "IVF",
      startDate: "2023-06-01",
      endDate: "2023-09-30",
      outcome: "Treatment Discontinued",
      cycles: 2,
      status: "discontinued",
    },
    {
      id: 4,
      patient: "Michelle Davis",
      treatment: "IUI",
      startDate: "2023-10-01",
      endDate: "2023-12-15",
      outcome: "Successful Pregnancy",
      cycles: 2,
      status: "success",
    },
  ];

  const ongoingTreatments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      treatment: "IVF",
      startDate: "2024-01-01",
      currentStage: "Egg Stimulation",
      progress: 65,
      cycle: 1,
    },
    {
      id: 2,
      patient: "Maria Garcia",
      treatment: "IUI",
      startDate: "2024-01-10",
      currentStage: "Monitoring",
      progress: 40,
      cycle: 1,
    },
  ];

  const treatmentStats = {
    totalCompleted: completedTreatments.length,
    successfulPregnancies: completedTreatments.filter(
      (t) => t.status === "success"
    ).length,
    successRate: Math.round(
      (completedTreatments.filter((t) => t.status === "success").length /
        completedTreatments.length) *
        100
    ),
    averageCycles: Math.round(
      completedTreatments.reduce((acc, t) => acc + t.cycles, 0) /
        completedTreatments.length
    ),
  };

  const TreatmentHistoryContent = () => (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ color: "#ff69b4" }}>
          Treatment History
        </Title>
        <Text style={{ color: "#666" }}>
          Complete overview of all patient treatments and outcomes
        </Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderColor: "#ff69b4",
              boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
            }}
          >
            <Statistic
              title={<span style={{ color: "#ff69b4" }}>Total Completed</span>}
              value={treatmentStats.totalCompleted}
              prefix={<FileTextOutlined style={{ color: "#ff69b4" }} />}
              valueStyle={{ color: "#ff69b4" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderColor: "#ff1493",
              boxShadow: "0 2px 8px rgba(255, 20, 147, 0.1)",
            }}
          >
            <Statistic
              title={
                <span style={{ color: "#ff1493" }}>Successful Pregnancies</span>
              }
              value={treatmentStats.successfulPregnancies}
              prefix={<HeartOutlined style={{ color: "#ff1493" }} />}
              valueStyle={{ color: "#ff1493" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderColor: "#ff69b4",
              boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
            }}
          >
            <Statistic
              title={<span style={{ color: "#ff69b4" }}>Success Rate</span>}
              value={treatmentStats.successRate}
              suffix="%"
              prefix={<RiseOutlined style={{ color: "#ff69b4" }} />}
              valueStyle={{ color: "#ff69b4" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card
            style={{
              borderColor: "#ff1493",
              boxShadow: "0 2px 8px rgba(255, 20, 147, 0.1)",
            }}
          >
            <Statistic
              title={<span style={{ color: "#ff1493" }}>Avg. Cycles</span>}
              value={treatmentStats.averageCycles}
              prefix={<CheckCircleOutlined style={{ color: "#ff1493" }} />}
              valueStyle={{ color: "#ff1493" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Search and Filters */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} md={8}>
          <Input
            prefix={<SearchOutlined style={{ color: "#ff69b4" }} />}
            placeholder="Search treatment history..."
            style={{ borderColor: "#ff69b4" }}
          />
        </Col>
        <Col xs={24} md={6}>
          <Select
            placeholder="Filter by treatment"
            style={{ width: "100%", borderColor: "#ff69b4" }}
            options={[
              { value: "all", label: "All Treatments" },
              { value: "IVF", label: "IVF" },
              { value: "IUI", label: "IUI" },
            ]}
          />
        </Col>
        <Col xs={24} md={6}>
          <Select
            placeholder="Filter by status"
            style={{ width: "100%", borderColor: "#ff69b4" }}
            options={[
              { value: "all", label: "All Status" },
              { value: "success", label: "Successful" },
              { value: "discontinued", label: "Discontinued" },
            ]}
          />
        </Col>
      </Row>

      <Tabs
        defaultActiveKey="completed"
        items={[
          {
            key: "completed",
            label: `Completed Treatments (${completedTreatments.length})`,
            children: (
              <div>
                {completedTreatments.map((treatment) => (
                  <Card
                    key={treatment.id}
                    style={{
                      marginBottom: 16,
                      borderColor: "#ffb6c1",
                      boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
                      backgroundColor: "#fff5f7",
                    }}
                  >
                    <Row align="middle" justify="space-between">
                      <Col xs={24} md={6}>
                        <div>
                          <Text
                            strong
                            style={{ fontSize: 16, color: "#ff69b4" }}
                          >
                            {treatment.patient}
                          </Text>
                          <div>
                            <Text type="secondary">
                              {treatment.treatment} Treatment
                            </Text>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={4}>
                        <div style={{ textAlign: "center" }}>
                          <Text type="secondary">Duration</Text>
                          <div>
                            <Text>
                              {treatment.startDate} - {treatment.endDate}
                            </Text>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={4}>
                        <div style={{ textAlign: "center" }}>
                          <Text type="secondary">Cycles</Text>
                          <div>
                            <Text strong style={{ color: "#ff69b4" }}>
                              {treatment.cycles}
                            </Text>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={6}>
                        <div style={{ textAlign: "center" }}>
                          <Text type="secondary">Outcome</Text>
                          <div>
                            <Badge
                              color={
                                treatment.status === "success"
                                  ? "#ff1493"
                                  : "#ff69b4"
                              }
                              text={treatment.outcome}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={4}>
                        <Space direction="vertical">
                          <Button
                            type="primary"
                            style={{
                              backgroundColor: "#ff69b4",
                              borderColor: "#ff69b4",
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            style={{
                              borderColor: "#ff69b4",
                              color: "#ff69b4",
                            }}
                          >
                            Download Report
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            ),
          },
          {
            key: "ongoing",
            label: `Ongoing Treatments (${ongoingTreatments.length})`,
            children: (
              <div>
                {ongoingTreatments.map((treatment) => (
                  <Card
                    key={treatment.id}
                    style={{
                      marginBottom: 16,
                      borderColor: "#ffb6c1",
                      boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
                      backgroundColor: "#fff5f7",
                    }}
                  >
                    <Row align="middle" justify="space-between">
                      <Col xs={24} md={6}>
                        <div>
                          <Text
                            strong
                            style={{ fontSize: 16, color: "#ff69b4" }}
                          >
                            {treatment.patient}
                          </Text>
                          <div>
                            <Text type="secondary">
                              {treatment.treatment} Treatment
                            </Text>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={4}>
                        <div style={{ textAlign: "center" }}>
                          <Text type="secondary">Start Date</Text>
                          <div>
                            <Text>{treatment.startDate}</Text>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={4}>
                        <div style={{ textAlign: "center" }}>
                          <Text type="secondary">Current Stage</Text>
                          <div>
                            <Text strong style={{ color: "#ff69b4" }}>
                              {treatment.currentStage}
                            </Text>
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={6}>
                        <div style={{ textAlign: "center" }}>
                          <Text type="secondary">Progress</Text>
                          <Progress
                            percent={treatment.progress}
                            size="small"
                            strokeColor="#ff69b4"
                          />
                        </div>
                      </Col>
                      <Col xs={24} md={4}>
                        <Space direction="vertical">
                          <Button
                            type="primary"
                            style={{
                              backgroundColor: "#ff69b4",
                              borderColor: "#ff69b4",
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            style={{
                              borderColor: "#ff69b4",
                              color: "#ff69b4",
                            }}
                          >
                            Update Progress
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  );

  return (
    <DoctorSidebar>
      <TreatmentHistoryContent />
    </DoctorSidebar>
  );
}
