import {
  Card,
  Input,
  Select,
  Button,
  Tabs,
  Badge,
  Typography,
  Avatar,
  Space,
  Row,
  Col,
  Spin,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";

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
    ivf: patients.filter((p) => p.serviceName === "IVF").length,
    iui: patients.filter((p) => p.serviceName === "IUI").length,
    icsi: 0,
    frozen: 0,
  };

  const navigate = useNavigate();
  const detailLink = (customerId: number) => {
    navigate(`/doctor/patients/${customerId}`);
  };

  const renderPatientCard = (patient: InformationPatient) => (
    <Card
      key={patient.customerId}
      style={{
        marginBottom: 16,
        borderColor: "#ffb6c1",
        boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
        backgroundColor: "#fff5f7",
      }}
    >
      <Row align="middle" justify="space-between">
        <Col xs={24} md={12}>
          <Space>
            <Avatar
              size={48}
              style={{
                backgroundColor: "#ff69b4",
                color: "white",
              }}
            >
              {patient.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <div>
              <Text strong style={{ fontSize: 16, color: "#ff69b4" }}>
                {patient.fullName}
              </Text>
              <div>
                <Text type="secondary">
                  Age: {patient.age} • {patient.serviceName}
                </Text>
              </div>
              <Space style={{ marginTop: 8 }}>
                <Badge color="#ff69b4" text={patient.serviceName} />
                <Badge color="#ff1493" text={patient.status} />
              </Space>
            </div>
          </Space>
        </Col>

        <Col xs={24} md={6}>
          <div style={{ textAlign: "center" }}>
            <Text type="secondary">Start Date</Text>
            <div>
              <Text strong style={{ color: "#ff69b4" }}>
                {patient.startDate}
              </Text>
            </div>
          </div>
        </Col>

        <Col xs={24} md={4}>
          <Space direction="vertical">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => detailLink(patient.customerId)}
              style={{ backgroundColor: "#ff69b4", borderColor: "#ff69b4" }}
            >
              View Details
            </Button>
            <Button
              icon={<EditOutlined />}
              style={{ borderColor: "#ff69b4", color: "#ff69b4" }}
            >
              Edit
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );

  const PatientContent = () => (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ color: "#ff69b4" }}>
          Patient Management
        </Title>
        <Text style={{ color: "#666" }}>
          Quản lý và theo dõi tất cả bệnh nhân đang điều trị hiếm muộn
        </Text>
      </div>

      {loading ? (
        <div className="flex justify-center py-6">
          <Spin size="large" />
        </div>
      ) : loadError ? (
        <div className="text-center text-red-500 py-6">
          Không thể tải danh sách bệnh nhân. Vui lòng thử lại sau.
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} md={8}>
              <Input
                prefix={<SearchOutlined style={{ color: "#ff69b4" }} />}
                placeholder="Search patients..."
                style={{ borderColor: "#ff69b4" }}
              />
            </Col>
            <Col xs={24} md={6}>
              <Select
                placeholder="Filter by status"
                style={{ width: "100%", borderColor: "#ff69b4" }}
                options={[
                  { value: "all", label: "All Patients" },
                  { value: "active", label: "Active" },
                  { value: "critical", label: "Critical" },
                  { value: "completed", label: "Completed" },
                ]}
              />
            </Col>
            <Col xs={24} md={6}>
              <Button
                icon={<FilterOutlined />}
                style={{ borderColor: "#ff69b4", color: "#ff69b4" }}
              >
                More Filters
              </Button>
            </Col>
          </Row>

          {/* Bệnh nhân đăng kí dịch vụ nào thì hiển thị ở danh sách đó */}
          <Tabs
            defaultActiveKey="all"
            items={[
              {
                key: "all",
                label: `All (${treatmentCounts.all})`,
                children: <div>{patients.map(renderPatientCard)}</div>,
              },
              {
                key: "ivf",
                label: `IVF (${treatmentCounts.ivf})`,
                children: (
                  <div>
                    {patients
                      .filter((p) => p.serviceName === "IVF")
                      .map(renderPatientCard)}
                  </div>
                ),
              },
              {
                key: "iui",
                label: `IUI (${treatmentCounts.iui})`,
                children: (
                  <div>
                    {patients
                      .filter((p) => p.serviceName === "IUI")
                      .map(renderPatientCard)}
                  </div>
                ),
              },
            ]}
          />
        </>
      )}
    </div>
  );

  return <DoctorSidebar>{<PatientContent />}</DoctorSidebar>;
}
