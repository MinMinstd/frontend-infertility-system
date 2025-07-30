import {
  Card,
  Input,
  Select,
  Button,
  Tabs,
  Typography,
  Avatar,
  Space,
  Row,
  Col,
  Spin,
  Badge,
} from "antd";
import { SearchOutlined, FilterOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { DoctorSidebar } from "./DoctorSidebar";
import { useEffect, useState } from "react";
import DoctorApi from "../../servers/doctor.api";
import type { InformationPatient } from "../../types/doctor";

const { Title, Text } = Typography;

export default function PatientsPage() {
  const [patients, setPatients] = useState<InformationPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  //Lấy danh sách bệnh nhân
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await DoctorApi.GetAllPatients();
        console.log("Danh sách bệnh nhân: ", res.data);
        setPatients(res.data);
        setLoadError(false);
      } catch (error) {
        console.error("Lỗi không thể load được danh sách bệnh nhân: ", error);
        setLoadError(true);
      }
      setLoading(false);
    };
    fetchPatients();
  }, []);

  const treatmentCounts = {
    all: patients.length,
    ivf: patients.filter((p) => p.serviceName?.includes("IVF")).length,
    iui: patients.filter((p) => p.serviceName?.includes("IUI")).length,
  };

  const navigate = useNavigate();
  const detailLink = (customerId: number) => {
    navigate(`/doctor/patients/${customerId}`);
  };

  const renderPatientCard = (patient: InformationPatient, index: number) => (
    <motion.div
      key={patient.customerId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card
        style={{
          marginBottom: 20,
          borderColor: "#E91E63",
          borderWidth: "2px",
          boxShadow: "0 6px 20px rgba(233, 30, 99, 0.12)",
          backgroundColor: "#FAFAFA",
          borderRadius: "16px",
          background: "linear-gradient(135deg, #FCE4EC 0%, #FFFFFF 100%)",
        }}
        hoverable
      >
        <Row align="middle" justify="space-between" gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Space size={16}>
              <Badge.Ribbon text="Active" color="#E91E63">
                <Avatar
                  size={64}
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor: "#E91E63",
                    color: "white",
                    fontSize: "24px",
                    border: "3px solid #FCE4EC",
                  }}
                >
                  {patient.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
              </Badge.Ribbon>
              <div>
                <Text strong style={{ fontSize: 18, color: "#E91E63", display: "block", marginBottom: 4 }}>
                  {patient.fullName}
                </Text>
                <Space split={<span style={{ color: "#E91E63" }}>•</span>}>
                  <Text style={{ color: "#666", fontSize: 14 }}>
                    <strong>Tuổi:</strong> {patient.age}
                  </Text>
                  <Text style={{ color: "#E91E63", fontSize: 14, fontWeight: 500 }}>
                    {patient.serviceName}
                  </Text>
                </Space>
              </div>
            </Space>
          </Col>

          <Col xs={24} md={8}>
            <div style={{ textAlign: "center", padding: "12px", backgroundColor: "#FCE4EC", borderRadius: "12px" }}>
              <Text type="secondary" style={{ fontSize: 12, display: "block", marginBottom: 4 }}>Mô tả dịch vụ</Text>
              <Text strong style={{ color: "#E91E63", fontSize: 14 }}>
                {patient.descriptionService || "Chưa có mô tả"}
              </Text>
            </div>
          </Col>

          <Col xs={24} md={4}>
            <div style={{ textAlign: "center" }}>
              <Button
                type="primary"
                size="large"
                icon={<EyeOutlined />}
                onClick={() => detailLink(patient.customerId)}
                style={{ 
                  backgroundColor: "#E91E63", 
                  borderColor: "#E91E63",
                  borderRadius: "12px",
                  fontWeight: 600,
                  height: "48px",
                  boxShadow: "0 4px 12px rgba(233, 30, 99, 0.3)"
                }}
                className="hover:scale-105 transition-transform duration-200"
              >
                Chi tiết
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </motion.div>
  );

  const PatientContent = () => (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: 40 }}
      >
        <div style={{ 
          background: "linear-gradient(135deg, #E91E63 0%, #D81B60 100%)",
          padding: "32px",
          borderRadius: "20px",
          marginBottom: 32,
          boxShadow: "0 8px 32px rgba(233, 30, 99, 0.2)"
        }}>
          <Title level={2} style={{ color: "white", margin: 0, fontSize: "28px" }}>
            👥 Danh sách bệnh nhân điều trị
          </Title>
          <Text style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "16px", display: "block", marginTop: 8 }}>
            Quản lý và theo dõi tất cả bệnh nhân đang điều trị hiếm muộn
          </Text>
          <div style={{ marginTop: 16, display: "flex", gap: "24px" }}>
            <div style={{ textAlign: "center" }}>
              <Text style={{ color: "white", fontSize: "24px", fontWeight: "bold", display: "block" }}>
                {treatmentCounts.all}
              </Text>
              <Text style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "12px" }}>Tổng bệnh nhân</Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text style={{ color: "white", fontSize: "24px", fontWeight: "bold", display: "block" }}>
                {treatmentCounts.ivf}
              </Text>
              <Text style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "12px" }}>IVF</Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text style={{ color: "white", fontSize: "24px", fontWeight: "bold", display: "block" }}>
                {treatmentCounts.iui}
              </Text>
              <Text style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "12px" }}>IUI</Text>
            </div>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center py-12"
        >
          <Spin size="large" style={{ color: "#E91E63" }} />
        </motion.div>
      ) : loadError ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
          style={{
            background: "linear-gradient(135deg, #FFEBEE 0%, #FCE4EC 100%)",
            borderRadius: "16px",
            border: "2px solid #E91E63"
          }}
        >
          <Text style={{ color: "#E91E63", fontSize: "16px" }}>
            ❌ Không thể tải danh sách bệnh nhân. Vui lòng thử lại sau.
          </Text>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card style={{
              marginBottom: 32,
              borderColor: "#E91E63",
              borderWidth: "2px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #FCE4EC 0%, #FFFFFF 100%)",
              boxShadow: "0 4px 16px rgba(233, 30, 99, 0.1)"
            }}>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={10}>
                  <Input
                    size="large"
                    prefix={<SearchOutlined style={{ color: "#E91E63", fontSize: "18px" }} />}
                    placeholder="🔍 Tìm kiếm bệnh nhân..."
                    style={{ 
                      borderColor: "#E91E63",
                      borderRadius: "12px",
                      borderWidth: "2px"
                    }}
                  />
                </Col>
                <Col xs={24} md={8}>
                  <Select
                    size="large"
                    placeholder="📋 Lọc theo trạng thái"
                    style={{ 
                      width: "100%",
                      borderRadius: "12px"
                    }}
                    options={[
                      { value: "all", label: "🔄 Tất cả bệnh nhân" },
                      { value: "active", label: "✅ Đang điều trị" },
                      { value: "critical", label: "⚠️ Cần theo dõi" },
                      { value: "completed", label: "🎉 Hoàn thành" },
                    ]}
                  />
                </Col>
                <Col xs={24} md={6}>
                  <Button
                    size="large"
                    icon={<FilterOutlined />}
                    style={{ 
                      borderColor: "#E91E63", 
                      color: "#E91E63",
                      borderRadius: "12px",
                      borderWidth: "2px",
                      fontWeight: 600,
                      width: "100%"
                    }}
                  >
                    🔧 Bộ lọc
                  </Button>
                </Col>
              </Row>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Bệnh nhân đăng kí dịch vụ nào thì hiển thị ở danh sách đó */}
            <Tabs
              defaultActiveKey="all"
              size="large"
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 4px 16px rgba(233, 30, 99, 0.1)",
                border: "2px solid #E91E63"
              }}
              items={[
                {
                  key: "all",
                  label: (
                    <span style={{ color: "#E91E63", fontWeight: 600 }}>
                      🔄 Tất cả ({treatmentCounts.all})
                    </span>
                  ),
                  children: <div>{patients.map((patient, index) => renderPatientCard(patient, index))}</div>,
                },
                {
                  key: "ivf",
                  label: (
                    <span style={{ color: "#E91E63", fontWeight: 600 }}>
                      🧬 IVF ({treatmentCounts.ivf})
                    </span>
                  ),
                  children: (
                    <div>
                      {patients
                        .filter((p) => p.serviceName?.includes("IVF"))
                        .map((patient, index) => renderPatientCard(patient, index))}
                    </div>
                  ),
                },
                {
                  key: "iui",
                  label: (
                    <span style={{ color: "#E91E63", fontWeight: 600 }}>
                      💉 IUI ({treatmentCounts.iui})
                    </span>
                  ),
                  children: (
                    <div>
                      {patients
                        .filter((p) => p.serviceName?.includes("IUI"))
                        .map((patient, index) => renderPatientCard(patient, index))}
                    </div>
                  ),
                },
              ]}
            />
          </motion.div>
        </>
      )}
    </div>
  );

  return <DoctorSidebar>{<PatientContent />}</DoctorSidebar>;
}
