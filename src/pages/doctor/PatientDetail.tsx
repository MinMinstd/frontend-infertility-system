import {
  Card,
  Typography,
  Row,
  Col,
  Input,
  Button,
  Tabs,
  Tag,
  Progress,
  Space,
  Steps,
  Form,
  Timeline,
  Avatar,
  Statistic,
} from "antd";
import {
  EditOutlined,
  SaveOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  FileTextOutlined,
  PhoneOutlined,
  MailOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { DoctorSidebar } from "./DoctorSidebar";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "antd";

const { Title, Text } = Typography;

export default function PatientDetailPage() {
  const patient = {
    id: 1,
    name: "Sarah Johnson",
    age: 32,
    treatment: "IVF",
    stage: "Egg Stimulation",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-20",
    status: "active",
    progress: 65,
    phone: "+1 (555) 123-4567",
    email: "sarah.johnson@email.com",
    partner: "Michael Johnson",
    startDate: "2024-01-01",
  };

  const treatmentStages = [
    { name: "Initial Consultation", completed: true, date: "2024-01-01" },
    { name: "Hormone Suppression", completed: true, date: "2024-01-05" },
    {
      name: "Egg Stimulation",
      completed: false,
      current: true,
      date: "2024-01-15",
    },
    { name: "Egg Retrieval", completed: false, date: "2024-01-22" },
    { name: "Fertilization", completed: false, date: "2024-01-23" },
    { name: "Embryo Transfer", completed: false, date: "2024-01-28" },
    { name: "Pregnancy Test", completed: false, date: "2024-02-12" },
  ];

  const injectionSchedule = [
    {
      medication: "Gonal-F",
      dose: "225 IU",
      time: "8:00 AM",
      status: "completed",
      date: "2024-01-15",
    },
    {
      medication: "Cetrotide",
      dose: "0.25mg",
      time: "8:00 PM",
      status: "completed",
      date: "2024-01-15",
    },
    {
      medication: "Gonal-F",
      dose: "225 IU",
      time: "8:00 AM",
      status: "pending",
      date: "2024-01-16",
    },
    {
      medication: "Cetrotide",
      dose: "0.25mg",
      time: "8:00 PM",
      status: "pending",
      date: "2024-01-16",
    },
  ];

  const testResults = [
    {
      date: "2024-01-15",
      result: "1,250 pg/mL",
      note: "Estradiol (E2) - High level",
    },
    {
      date: "2024-01-15",
      result: "5.2 mIU/mL",
      note: "LH - Normal range",
    },
    {
      date: "2024-01-15",
      result: "0.8 ng/mL",
      note: "Progesterone - Normal range",
    },
    {
      date: "2024-01-14",
      result: "12",
      note: "Follicle Count - Normal range",
    },
  ];

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form] = Form.useForm();
  const [testResultsList, setTestResultsList] = useState(testResults);

  const currentStep = treatmentStages.findIndex((stage) => stage.current);

  const showForm = () => {
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    form.resetFields();
  };

  interface TestResultFormValues {
    date: dayjs.Dayjs; // Changed from Date to moment.Moment to match DatePicker value type

    result: string;
    note: string;
  }

  interface TestResult {
    date: string;
    result: string;
    note: string;
  }

  const handleSubmit = (values: TestResultFormValues) => {
    try {
      const newTestResult: TestResult = {
        date: values.date.format("YYYY-MM-DD"),
        result: values.result,
        note: values.note,
      };
      setTestResultsList([...testResultsList, newTestResult]);
      setIsFormVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Error submitting test result:", error);
      // Handle error appropriately
    }
  };

  const PatientDetailContent = () => (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ color: "#ff69b4" }}>
              Patient Details
            </Title>
            <Text style={{ color: "#666" }}>
              Comprehensive view of patient information and treatment progress
            </Text>
          </Col>
          <Col>
            <Space>
              <Button
                icon={<EditOutlined />}
                style={{
                  borderColor: "#ff69b4",
                  color: "#ff69b4",
                }}
              >
                Edit Patient
              </Button>
              <Button
                icon={<EditOutlined />}
                style={{
                  borderColor: "#ff69b4",
                  color: "#ff69b4",
                }}
              >
                Edit Medical record
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                style={{
                  backgroundColor: "#ff69b4",
                  borderColor: "#ff69b4",
                }}
              >
                Save Changes
              </Button>
            </Space>
          </Col>
        </Row>
      </div>

      {/* Patient Overview Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={6}>
          <Card
            style={{
              borderColor: "#ff69b4",
              boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
            }}
          >
            <Statistic
              title={
                <span style={{ color: "#ff69b4" }}>Treatment Progress</span>
              }
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

      <Tabs
        defaultActiveKey="overview"
        items={[
          {
            key: "overview",
            label: "Overview",
            children: (
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <Card
                    title={
                      <span style={{ color: "#ff69b4" }}>
                        Patient Information
                      </span>
                    }
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
                          <Title
                            level={3}
                            style={{ margin: 0, color: "#ff69b4" }}
                          >
                            {patient.name}
                          </Title>
                          <Text type="secondary">Patient ID: {patient.id}</Text>
                        </div>
                      </div>

                      <Form layout="vertical">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Form.Item
                              label={
                                <span style={{ color: "#ff69b4" }}>
                                  Full Name
                                </span>
                              }
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
                            <Form.Item
                              label={
                                <span style={{ color: "#ff69b4" }}>Age</span>
                              }
                            >
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
                              label={
                                <span style={{ color: "#ff69b4" }}>Phone</span>
                              }
                            >
                              <Input
                                value={patient.phone}
                                prefix={
                                  <PhoneOutlined style={{ color: "#ff69b4" }} />
                                }
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
                              label={
                                <span style={{ color: "#ff69b4" }}>Email</span>
                              }
                            >
                              <Input
                                value={patient.email}
                                prefix={
                                  <MailOutlined style={{ color: "#ff69b4" }} />
                                }
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
                              label={
                                <span style={{ color: "#ff69b4" }}>
                                  Partner
                                </span>
                              }
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
                              label={
                                <span style={{ color: "#ff69b4" }}>
                                  Start Date
                                </span>
                              }
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
                </Col>

                <Col xs={24} lg={12}>
                  <Card
                    title={
                      <span style={{ color: "#ff69b4" }}>
                        Treatment Progress
                      </span>
                    }
                    style={{
                      borderColor: "#ff69b4",
                      boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
                    }}
                  >
                    <Steps
                      direction="vertical"
                      current={currentStep}
                      items={treatmentStages.map((stage) => ({
                        title: stage.name,
                        description: stage.date,
                        status: stage.completed
                          ? "finish"
                          : stage.current
                          ? "process"
                          : "wait",
                      }))}
                      progressDot
                      style={{ color: "#ff69b4" }}
                    />
                  </Card>
                </Col>
              </Row>
            ),
          },
          {
            key: "medications",
            label: "Medications",
            children: (
              <Card
                title={
                  <span style={{ color: "#ff69b4" }}>Injection Schedule</span>
                }
                style={{
                  borderColor: "#ff69b4",
                  boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
                }}
              >
                <Timeline
                  items={injectionSchedule.map((injection) => ({
                    color:
                      injection.status === "completed" ? "#ff1493" : "#ff69b4",
                    children: (
                      <div style={{ padding: "8px 0" }}>
                        <Space direction="vertical" size="small">
                          <div>
                            <Text strong style={{ color: "#ff69b4" }}>
                              {injection.medication}
                            </Text>
                            <Tag
                              color={
                                injection.status === "completed"
                                  ? "#ff1493"
                                  : "#ffb6c1"
                              }
                              style={{ marginLeft: 8 }}
                            >
                              {injection.status}
                            </Tag>
                          </div>
                          <Text type="secondary">
                            Time: {injection.time} | Date: {injection.date}
                          </Text>
                        </Space>
                      </div>
                    ),
                  }))}
                />
              </Card>
            ),
          },
          {
            key: "test_results",
            label: "Test Results",
            children: (
              <Card
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "#ff69b4" }}>Laboratory Results</span>
                    <Space>
                      <Button
                        size="small"
                        icon={<EditOutlined />}
                        onClick={showForm}
                        style={{
                          borderColor: "#ff69b4",
                          color: "#ff69b4",
                        }}
                      >
                        Add Test Result
                      </Button>
                      <Button
                        size="small"
                        icon={<EditOutlined />}
                        style={{
                          borderColor: "#ff1493",
                          color: "#ff1493",
                        }}
                      >
                        Edit All
                      </Button>
                    </Space>
                  </div>
                }
                style={{
                  borderColor: "#ff69b4",
                  boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
                }}
              >
                {isFormVisible && (
                  <Card
                    title={
                      <span style={{ color: "#ff69b4" }}>
                        Add New Test Result
                      </span>
                    }
                    style={{
                      marginBottom: 16,
                      borderColor: "#ff69b4",
                      backgroundColor: "#fff5f7",
                    }}
                    extra={
                      <Button
                        size="small"
                        onClick={handleCancel}
                        style={{
                          borderColor: "#ff69b4",
                          color: "#ff69b4",
                        }}
                      >
                        Cancel
                      </Button>
                    }
                  >
                    <Form form={form} layout="vertical" onFinish={handleSubmit}>
                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item
                            label={
                              <span style={{ color: "#ff69b4" }}>Date</span>
                            }
                            name="date"
                            rules={[
                              {
                                required: true,
                                message: "Please select date!",
                              },
                            ]}
                          >
                            <DatePicker
                              style={{ width: "100%" }}
                              format="YYYY-MM-DD"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            label={
                              <span style={{ color: "#ff69b4" }}>Result</span>
                            }
                            name="result"
                            rules={[
                              {
                                required: true,
                                message: "Please enter result!",
                              },
                            ]}
                          >
                            <Input placeholder="Enter test result" />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            label={
                              <span style={{ color: "#ff69b4" }}>Note</span>
                            }
                            name="note"
                            rules={[
                              { required: true, message: "Please enter note!" },
                            ]}
                          >
                            <Input placeholder="Enter note" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item>
                        <Space>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              backgroundColor: "#ff69b4",
                              borderColor: "#ff69b4",
                            }}
                          >
                            Add Result
                          </Button>
                          <Button onClick={handleCancel}>Cancel</Button>
                        </Space>
                      </Form.Item>
                    </Form>
                  </Card>
                )}
                <Row gutter={[16, 16]}>
                  {testResultsList.map((test, index) => (
                    <Col xs={24} sm={12} lg={8} key={index}>
                      <Card
                        size="small"
                        style={{
                          borderColor: "#ffb6c1",
                          backgroundColor: "#fff5f7",
                        }}
                        extra={
                          <Button
                            size="small"
                            type="text"
                            icon={<EditOutlined />}
                            style={{ color: "#ff69b4" }}
                          />
                        }
                      >
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <div>
                            <Text strong style={{ color: "#ff69b4" }}>
                              Date: {test.date}
                            </Text>
                          </div>
                          <div>
                            <Text style={{ color: "#ff1493" }}>
                              Result: {test.result}
                            </Text>
                          </div>
                          <div>
                            <Text type="secondary">Note: {test.note}</Text>
                          </div>
                        </Space>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );

  return (
    <DoctorSidebar>
      <PatientDetailContent />
    </DoctorSidebar>
  );
}
