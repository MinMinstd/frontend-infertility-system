import {
  Card,
  Input,
  Select,
  Tabs,
  Badge,
  Button,
  Typography,
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
import type { MedicalRecordComplete, MedicalRecordOngoing } from "../../types/doctor";
import { useEffect, useState } from "react";
import DoctorApi from "../../servers/doctor.api";

const { Title, Text } = Typography;

export default function TreatmentHistoryPage() {
  const [completedTreatments, setCompletedTreatments] = useState<MedicalRecordComplete[]>([]);
  const [ongoingTreatments, setOngoingTreatments] = useState<MedicalRecordOngoing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompletedTreatments = async () => {
      try {
        setLoading(true);
        const response = await DoctorApi.GetMedicalRecordComplete();
        setCompletedTreatments(response.data);
        setError(null);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu:', err);
        setError('Không thể tải dữ liệu điều trị');
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedTreatments();
  }, []);

  useEffect(() => {
    const fetchOngoingTreatments = async () => {
      try {
        setLoading(true);
        const response = await DoctorApi.GetMedicalRecordOngoing();
        setOngoingTreatments(response.data);
        setError(null);
      } catch (err) {
        console.error('Lỗi khi tải dữ liệu đang điều trị:', err);
        setError('Không thể tải dữ liệu điều trị đang thực hiện');
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingTreatments();
  }, []);

  const treatmentStats = {
    totalCompleted: completedTreatments.length,
    successfulPregnancies: completedTreatments.filter(
      (t) => t.status === "Thành công"
    ).length,
    successRate: completedTreatments.length > 0
      ? Math.round(
        (completedTreatments.filter((t) => t.status === "Thành công").length /
          completedTreatments.length) * 100
      )
      : 0,
    averageCycles: completedTreatments.length > 0
      ? Math.round(
        completedTreatments.reduce((acc, t) => acc + t.attempt, 0) /
        completedTreatments.length
      )
      : 0,
  };

  const TreatmentHistoryContent = () => (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ color: "#ff69b4" }}>
          Lịch sử theo dõi
        </Title>
        <Text style={{ color: "#666" }}>
          Tổng quan về quá trình điều trị và kết quả
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
              title={
                <span style={{ color: "#ff69b4" }}>Tổng số ca hoàn thành</span>
              }
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
            label: `Tổng số ca hoàn thành (${completedTreatments.length})`,
            children: (
              <div>
                {loading ? (
                  <div className="text-center py-8">
                    <Text>Đang tải dữ liệu...</Text>
                  </div>
                ) : error ? (
                  <div className="text-center py-8">
                    <Text type="danger">{error}</Text>
                  </div>
                ) : (
                  completedTreatments.map((treatment) => (
                    <Card
                      key={treatment.medicalRecordId}
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
                            <Text strong style={{ fontSize: 16, color: "#ff69b4" }}>
                              {treatment.fullName}
                            </Text>
                            <div>
                              <Text type="secondary">
                                {treatment.serviceName} Treatment
                              </Text>
                            </div>
                            <div>
                              <Text type="secondary" className="text-sm">
                                Giai đoạn: {treatment.stage}
                              </Text>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} md={4}>
                          <div style={{ textAlign: "center" }}>
                            <Text type="secondary">Thời gian dự kiến</Text>
                            <div>
                              <Text>
                                {treatment.startDate} đến {treatment.endDate}
                              </Text>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} md={4}>
                          <div style={{ textAlign: "center" }}>
                            <Text type="secondary">Lần thử</Text>
                            <div>
                              <Text strong style={{ color: "#ff69b4" }}>
                                {treatment.attempt}
                              </Text>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} md={6}>
                          <div style={{ textAlign: "center" }}>
                            <Text type="secondary">Kết quả</Text>
                            <div>
                              <Badge
                                color={
                                  treatment.status === "Thành công"
                                    ? "#ff1493"
                                    : "#ff69b4"
                                }
                                text={treatment.status}
                              />
                            </div>
                            <div className="mt-1">
                              <Text type="secondary" className="text-xs">
                                {treatment.diagnosis}
                              </Text>
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
                  ))
                )}
              </div>
            ),
          },
          {
            key: "ongoing",
            label: `Tổng số ca đang điều trị (${loading ? '...' : ongoingTreatments.length})`,
            children: (
              <div>
                {loading ? (
                  <Card loading={true} style={{ marginBottom: 16 }} />
                ) : error ? (
                  <Card style={{ marginBottom: 16, borderColor: "#ff4d4f" }}>
                    <Text type="danger">{error}</Text>
                  </Card>
                ) : ongoingTreatments.length === 0 ? (
                  <Card style={{ marginBottom: 16, textAlign: "center" }}>
                    <Text type="secondary">Không có ca điều trị đang thực hiện</Text>
                  </Card>
                ) : (
                  ongoingTreatments.map((treatment) => (
                    <Card
                      key={treatment.medicalRecordId}
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
                              {treatment.fullName}
                            </Text>
                            <div>
                              <Text type="secondary">
                                {treatment.serviceName}
                              </Text>
                            </div>
                            {treatment.diagnosis && (
                              <div>
                                <Text type="secondary" italic>
                                  Chẩn đoán: {treatment.diagnosis}
                                </Text>
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col xs={24} md={4}>
                          <div style={{ textAlign: "center" }}>
                            <Text type="secondary">Ngày bắt đầu</Text>
                            <div>
                              <Text>{treatment.startDate}</Text>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} md={4}>
                          <div style={{ textAlign: "center" }}>
                            <Text type="secondary">Giai đoạn hiện tại</Text>
                            <div>
                              <Text strong style={{ color: "#ff69b4" }}>
                                {treatment.stage}
                              </Text>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} md={4}>
                          <div style={{ textAlign: "center" }}>
                            <Text type="secondary">Trạng thái</Text>
                            <div>
                              <Badge
                                status="processing"
                                text={treatment.status}
                                style={{ color: "#ff69b4" }}
                              />
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} md={2}>
                          <div style={{ textAlign: "center" }}>
                            <Text type="secondary">Lần thử</Text>
                            <div>
                              <Text strong>{treatment.attempt}</Text>
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
                              Xem chi tiết
                            </Button>
                            <Button
                              style={{
                                borderColor: "#ff69b4",
                                color: "#ff69b4",
                              }}
                            >
                              Cập nhật tiến độ
                            </Button>
                          </Space>
                        </Col>
                      </Row>
                    </Card>
                  ))
                )}
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
