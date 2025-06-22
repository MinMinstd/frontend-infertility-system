import {
  Card,
  Input,
  Select,
  Button,
  Tabs,
  Badge,
  Progress,
  Typography,
  Avatar,
  Space,
  Row,
  Col,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { DoctorSidebar } from "./DoctorSidebar";

const { Title, Text } = Typography;

export default function PatientsPage() {
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      age: 32,
      treatment: "IVF",
      stage: "Egg Stimulation",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-01-20",
      status: "active",
      progress: 65,
    },
    {
      id: 2,
      name: "Maria Garcia",
      age: 28,
      treatment: "IUI",
      stage: "Monitoring",
      lastVisit: "2024-01-14",
      nextAppointment: "2024-01-18",
      status: "active",
      progress: 40,
    },
    {
      id: 3,
      name: "Lisa Chen",
      age: 35,
      treatment: "IVF",
      stage: "Embryo Transfer",
      lastVisit: "2024-01-16",
      nextAppointment: "2024-01-25",
      status: "critical",
      progress: 85,
    },
    {
      id: 4,
      name: "Emma Wilson",
      age: 30,
      treatment: "IVF",
      stage: "Fertilization",
      lastVisit: "2024-01-16",
      nextAppointment: "2024-01-19",
      status: "active",
      progress: 75,
    },
  ];

  const treatmentCounts = {
    all: patients.length,
    ivf: patients.filter((p) => p.treatment === "IVF").length,
    iui: patients.filter((p) => p.treatment === "IUI").length,
    icsi: 0,
    frozen: 0,
  };

  const navigate = useNavigate();
  const detailLink = (id: number) => {
    navigate(`/doctor/patients/${id}`);
  };

  const PatientContent = () => (
    <div>
      <div style={{ marginBottom: 32 }}>
        <Title level={2} style={{ color: "#ff69b4" }}>Patient Management</Title>
        <Text style={{ color: "#666" }}>
          Manage and monitor all patients undergoing fertility treatments
        </Text>
      </div>

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
            style={{
              borderColor: "#ff69b4",
              color: "#ff69b4",
            }}
          >
            More Filters
          </Button>
        </Col>
      </Row>

      <Tabs 
        defaultActiveKey="all"
        items={[
          {
            key: "all",
            label: `All (${treatmentCounts.all})`,
            children: (
              <div>
                {patients.map((patient) => (
                  <Card
                    key={patient.id}
                    style={{
                      marginBottom: 16,
                      borderColor: "#ffb6c1",
                      boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
                      backgroundColor: "#fff5f7",
                    }}
                  >
                    <Row align="middle" justify="space-between">
                      <Col xs={24} md={8}>
                        <Space>
                          <Avatar
                            size={48}
                            style={{
                              backgroundColor: "#ff69b4",
                              color: "white",
                            }}
                          >
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar>
                          <div>
                            <Text strong style={{ fontSize: 16, color: "#ff69b4" }}>
                              {patient.name}
                            </Text>
                            <div>
                              <Text type="secondary">
                                Age: {patient.age} • {patient.treatment} Treatment
                              </Text>
                            </div>
                            <Space style={{ marginTop: 8 }}>
                              <Badge
                                color="#ff69b4"
                                text={patient.treatment}
                              />
                              <Badge
                                color={patient.status === "active" ? "#ff1493" : "#ff69b4"}
                                text={patient.status}
                              />
                            </Space>
                          </div>
                        </Space>
                      </Col>

                      <Col xs={24} md={6}>
                        <div style={{ textAlign: "center" }}>
                          <Text type="secondary">Current Stage</Text>
                          <div>
                            <Text strong style={{ color: "#ff69b4" }}>{patient.stage}</Text>
                          </div>
                          <Progress 
                            percent={patient.progress} 
                            size="small"
                            strokeColor="#ff69b4"
                          />
                        </div>
                      </Col>

                      <Col xs={24} md={6}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ marginBottom: 8 }}>
                            <Text type="secondary">Last Visit</Text>
                            <div>
                              <Text>{patient.lastVisit}</Text>
                            </div>
                          </div>
                          <div>
                            <Text type="secondary">Next Appointment</Text>
                            <div>
                              <Text style={{ color: "#ff1493" }}>{patient.nextAppointment}</Text>
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col xs={24} md={4}>
                        <Space direction="vertical">
                          <Button
                            type="primary"
                            icon={<EyeOutlined />}
                            onClick={() => detailLink(patient.id)}
                            style={{
                              backgroundColor: "#ff69b4",
                              borderColor: "#ff69b4",
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            icon={<EditOutlined />}
                            style={{
                              borderColor: "#ff69b4",
                              color: "#ff69b4",
                            }}
                          >
                            Edit
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
            key: "ivf",
            label: `IVF (${treatmentCounts.ivf})`,
            children: (
              <div>
                {patients.filter(p => p.treatment === "IVF").map((patient) => (
                  <Card
                    key={patient.id}
                    style={{
                      marginBottom: 16,
                      borderColor: "#ffb6c1",
                      boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
                      backgroundColor: "#fff5f7",
                    }}
                  >
                    <Row align="middle" justify="space-between">
                      <Col xs={24} md={8}>
                        <Space>
                          <Avatar
                            size={48}
                            style={{
                              backgroundColor: "#ff69b4",
                              color: "white",
                            }}
                          >
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar>
                          <div>
                            <Text strong style={{ fontSize: 16, color: "#ff69b4" }}>
                              {patient.name}
                            </Text>
                            <div>
                              <Text type="secondary">
                                Age: {patient.age} • {patient.treatment} Treatment
                              </Text>
                            </div>
                            <Space style={{ marginTop: 8 }}>
                              <Badge
                                color="#ff69b4"
                                text={patient.treatment}
                              />
                              <Badge
                                color={patient.status === "active" ? "#ff1493" : "#ff69b4"}
                                text={patient.status}
                              />
                            </Space>
                          </div>
                        </Space>
                      </Col>

                      <Col xs={24} md={6}>
                        <div style={{ textAlign: "center" }}>
                          <Text type="secondary">Current Stage</Text>
                          <div>
                            <Text strong style={{ color: "#ff69b4" }}>{patient.stage}</Text>
                          </div>
                          <Progress 
                            percent={patient.progress} 
                            size="small"
                            strokeColor="#ff69b4"
                          />
                        </div>
                      </Col>

                      <Col xs={24} md={6}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ marginBottom: 8 }}>
                            <Text type="secondary">Last Visit</Text>
                            <div>
                              <Text>{patient.lastVisit}</Text>
                            </div>
                          </div>
                          <div>
                            <Text type="secondary">Next Appointment</Text>
                            <div>
                              <Text style={{ color: "#ff1493" }}>{patient.nextAppointment}</Text>
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col xs={24} md={4}>
                        <Space direction="vertical">
                          <Button
                            type="primary"
                            icon={<EyeOutlined />}
                            onClick={() => detailLink(patient.id)}
                            style={{
                              backgroundColor: "#ff69b4",
                              borderColor: "#ff69b4",
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            icon={<EditOutlined />}
                            style={{
                              borderColor: "#ff69b4",
                              color: "#ff69b4",
                            }}
                          >
                            Edit
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
            key: "iui",
            label: `IUI (${treatmentCounts.iui})`,
            children: (
              <div>
                {patients.filter(p => p.treatment === "IUI").map((patient) => (
                  <Card
                    key={patient.id}
                    style={{
                      marginBottom: 16,
                      borderColor: "#ffb6c1",
                      boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
                      backgroundColor: "#fff5f7",
                    }}
                  >
                    <Row align="middle" justify="space-between">
                      <Col xs={24} md={8}>
                        <Space>
                          <Avatar
                            size={48}
                            style={{
                              backgroundColor: "#ff69b4",
                              color: "white",
                            }}
                          >
                            {patient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar>
                          <div>
                            <Text strong style={{ fontSize: 16, color: "#ff69b4" }}>
                              {patient.name}
                            </Text>
                            <div>
                              <Text type="secondary">
                                Age: {patient.age} • {patient.treatment} Treatment
                              </Text>
                            </div>
                            <Space style={{ marginTop: 8 }}>
                              <Badge
                                color="#ff69b4"
                                text={patient.treatment}
                              />
                              <Badge
                                color={patient.status === "active" ? "#ff1493" : "#ff69b4"}
                                text={patient.status}
                              />
                            </Space>
                          </div>
                        </Space>
                      </Col>

                      <Col xs={24} md={6}>
                        <div style={{ textAlign: "center" }}>
                          <Text type="secondary">Current Stage</Text>
                          <div>
                            <Text strong style={{ color: "#ff69b4" }}>{patient.stage}</Text>
                          </div>
                          <Progress 
                            percent={patient.progress} 
                            size="small"
                            strokeColor="#ff69b4"
                          />
                        </div>
                      </Col>

                      <Col xs={24} md={6}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ marginBottom: 8 }}>
                            <Text type="secondary">Last Visit</Text>
                            <div>
                              <Text>{patient.lastVisit}</Text>
                            </div>
                          </div>
                          <div>
                            <Text type="secondary">Next Appointment</Text>
                            <div>
                              <Text style={{ color: "#ff1493" }}>{patient.nextAppointment}</Text>
                            </div>
                          </div>
                        </div>
                      </Col>

                      <Col xs={24} md={4}>
                        <Space direction="vertical">
                          <Button
                            type="primary"
                            icon={<EyeOutlined />}
                            onClick={() => detailLink(patient.id)}
                            style={{
                              backgroundColor: "#ff69b4",
                              borderColor: "#ff69b4",
                            }}
                          >
                            View Details
                          </Button>
                          <Button
                            icon={<EditOutlined />}
                            style={{
                              borderColor: "#ff69b4",
                              color: "#ff69b4",
                            }}
                          >
                            Edit
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
      <PatientContent />
    </DoctorSidebar>
  );
}
