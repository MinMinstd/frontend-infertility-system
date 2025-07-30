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
  Spin,
  Empty,
} from "antd";
import {
  SearchOutlined,
  FileTextOutlined,
  HeartOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
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
        console.log("Danh sách thực hiện hoàn thành : ", response.data);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E91E63 0%, #FCE4EC 100%)",
        padding: "24px"
      }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          marginBottom: 32,
          background: "linear-gradient(135deg, #E91E63, #D81B60)",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(233, 30, 99, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ color: "white", margin: 0, fontSize: "28px" }}>
              Lịch sử theo dõi
            </Title>
            <Text style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "16px" }}>
              Tổng quan về quá trình điều trị và kết quả
            </Text>
            <div style={{ marginTop: "12px" }}>
              <Badge
                count={completedTreatments.length + ongoingTreatments.length}
                style={{
                  backgroundColor: "white",
                  color: "#E91E63",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}
              >
                <Text style={{ color: "white", marginRight: "8px" }}>
                  Tổng số ca điều trị:
                </Text>
              </Badge>
            </div>
          </Col>
        </Row>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card
                style={{
                  background: "linear-gradient(135deg, #E91E63, #D81B60)",
                  border: "none",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(233, 30, 99, 0.3)",
                }}
              >
                <Statistic
                  title={
                    <span style={{ color: "white", fontWeight: "600" }}>Tổng số ca hoàn thành</span>
                  }
                  value={treatmentStats.totalCompleted}
                  prefix={<FileTextOutlined style={{ color: "white" }} />}
                  valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card
                style={{
                  background: "linear-gradient(135deg, #D81B60, #E91E63)",
                  border: "none",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(216, 27, 96, 0.3)",
                }}
              >
                <Statistic
                  title={
                    <span style={{ color: "white", fontWeight: "600" }}>Thai kỳ thành công</span>
                  }
                  value={treatmentStats.successfulPregnancies}
                  prefix={<HeartOutlined style={{ color: "white" }} />}
                  valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card
                style={{
                  background: "linear-gradient(135deg, #E91E63, #D81B60)",
                  border: "none",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(233, 30, 99, 0.3)",
                }}
              >
                <Statistic
                  title={<span style={{ color: "white", fontWeight: "600" }}>Tỷ lệ thành công</span>}
                  value={treatmentStats.successRate}
                  suffix="%"
                  prefix={<RiseOutlined style={{ color: "white" }} />}
                  valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <motion.div whileHover={{ scale: 1.05, y: -5 }}>
              <Card
                style={{
                  background: "linear-gradient(135deg, #D81B60, #E91E63)",
                  border: "none",
                  borderRadius: "16px",
                  boxShadow: "0 8px 32px rgba(216, 27, 96, 0.3)",
                }}
              >
                <Statistic
                  title={<span style={{ color: "white", fontWeight: "600" }}>Chu kỳ trung bình</span>}
                  value={treatmentStats.averageCycles}
                  prefix={<CheckCircleOutlined style={{ color: "white" }} />}
                  valueStyle={{ color: "white", fontSize: "28px", fontWeight: "bold" }}
                />
              </Card>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{
          background: "linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(252, 228, 236, 0.8))",
          padding: "24px",
          borderRadius: "16px",
          marginBottom: 24,
          border: "2px solid #E91E63"
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Input
              prefix={<SearchOutlined style={{ color: "#E91E63" }} />}
              placeholder="Tìm kiếm lịch sử điều trị..."
              size="large"
              style={{
                borderColor: "#E91E63",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(233, 30, 99, 0.1)"
              }}
            />
          </Col>
          <Col xs={24} md={5}>
            <Select
              placeholder="Lọc theo điều trị"
              size="large"
              style={{
                width: "100%",
                borderRadius: "12px"
              }}
              options={[
                { value: "all", label: "Tất cả điều trị" },
                { value: "IVF", label: "IVF" },
                { value: "IUI", label: "IUI" },
              ]}
            />
          </Col>
          <Col xs={24} md={5}>
            <Select
              placeholder="Lọc theo trạng thái"
              size="large"
              style={{
                width: "100%",
                borderRadius: "12px"
              }}
              options={[
                { value: "all", label: "Tất cả trạng thái" },
                { value: "success", label: "Thành công" },
                { value: "discontinued", label: "Ngừng điều trị" },
              ]}
            />
          </Col>
          <Col xs={24} md={6}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="primary"
                icon={<FilterOutlined />}
                size="large"
                style={{
                  backgroundColor: "#E91E63",
                  borderColor: "#E91E63",
                  borderRadius: "12px",
                  fontWeight: "600",
                  boxShadow: "0 4px 16px rgba(233, 30, 99, 0.3)"
                }}
              >
                Bộ lọc nâng cao
              </Button>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: "2px solid #E91E63"
        }}
      >
        <Tabs
          defaultActiveKey="completed"
          style={{
            borderRadius: "12px"
          }}
          items={[
            {
              key: "completed",
              label: (
                <span style={{ color: "#E91E63", fontWeight: "600", fontSize: "16px" }}>
                  <CheckCircleOutlined style={{ marginRight: "8px" }} />
                  Ca hoàn thành ({completedTreatments.length})
                </span>
              ),
              children: (
                <div>
                  {loading ? (
                    <div style={{ textAlign: "center", padding: "48px" }}>
                      <Spin size="large" style={{ color: "#E91E63" }} />
                      <div style={{ marginTop: "16px" }}>
                        <Text style={{ color: "#E91E63" }}>Đang tải dữ liệu...</Text>
                      </div>
                    </div>
                  ) : error ? (
                    <div style={{ textAlign: "center", padding: "48px" }}>
                      <Text type="danger" style={{ fontSize: "16px" }}>{error}</Text>
                    </div>
                  ) : (
                    completedTreatments.map((treatment, index) => (
                      <motion.div
                        key={treatment.medicalRecordId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card
                          style={{
                            marginBottom: 16,
                            background: "linear-gradient(135deg, #FCE4EC, #F8BBD9)",
                            border: "2px solid #E91E63",
                            borderRadius: "16px",
                            boxShadow: "0 8px 32px rgba(233, 30, 99, 0.2)",
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
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    type="primary"
                                    icon={<EyeOutlined />}
                                    style={{
                                      backgroundColor: "#E91E63",
                                      borderColor: "#E91E63",
                                      borderRadius: "8px",
                                      fontWeight: "600"
                                    }}
                                  >
                                    Xem chi tiết
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    icon={<DownloadOutlined />}
                                    style={{
                                      borderColor: "#E91E63",
                                      color: "#E91E63",
                                      borderRadius: "8px",
                                      fontWeight: "600"
                                    }}
                                  >
                                    Tải báo cáo
                                  </Button>
                                </motion.div>
                              </Space>
                            </Col>
                          </Row>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              ),
            },
            {
              key: "ongoing",
              label: (
                <span style={{ color: "#E91E63", fontWeight: "600", fontSize: "16px" }}>
                  <HeartOutlined style={{ marginRight: "8px" }} />
                  Đang điều trị ({loading ? '...' : ongoingTreatments.length})
                </span>
              ),
              children: (
                <div>
                  {loading ? (
                    <div style={{ textAlign: "center", padding: "48px" }}>
                      <Spin size="large" style={{ color: "#E91E63" }} />
                      <div style={{ marginTop: "16px" }}>
                        <Text style={{ color: "#E91E63" }}>Đang tải dữ liệu...</Text>
                      </div>
                    </div>
                  ) : error ? (
                    <Card style={{
                      marginBottom: 16,
                      borderColor: "#ff4d4f",
                      borderRadius: "16px",
                      textAlign: "center",
                      padding: "24px"
                    }}>
                      <Text type="danger" style={{ fontSize: "16px" }}>{error}</Text>
                    </Card>
                  ) : ongoingTreatments.length === 0 ? (
                    <Card style={{
                      marginBottom: 16,
                      textAlign: "center",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #FCE4EC, #F8BBD9)",
                      border: "2px solid #E91E63",
                      padding: "48px"
                    }}>
                      <Empty
                        description={
                          <Text type="secondary" style={{ fontSize: "16px" }}>
                            Không có ca điều trị đang thực hiện
                          </Text>
                        }
                      />
                    </Card>
                  ) : (
                    ongoingTreatments.map((treatment, index) => (
                      <motion.div
                        key={treatment.medicalRecordId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card
                          style={{
                            marginBottom: 16,
                            background: "linear-gradient(135deg, #FCE4EC, #F8BBD9)",
                            border: "2px solid #E91E63",
                            borderRadius: "16px",
                            boxShadow: "0 8px 32px rgba(233, 30, 99, 0.2)",
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
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    type="primary"
                                    icon={<EyeOutlined />}
                                    style={{
                                      backgroundColor: "#E91E63",
                                      borderColor: "#E91E63",
                                      borderRadius: "8px",
                                      fontWeight: "600"
                                    }}
                                  >
                                    Xem chi tiết
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    icon={<EditOutlined />}
                                    style={{
                                      borderColor: "#E91E63",
                                      color: "#E91E63",
                                      borderRadius: "8px",
                                      fontWeight: "600"
                                    }}
                                  >
                                    Cập nhật tiến độ
                                  </Button>
                                </motion.div>
                              </Space>
                            </Col>
                          </Row>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              ),
            },
          ]}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <DoctorSidebar>
      <TreatmentHistoryContent />
    </DoctorSidebar>
  );
}
