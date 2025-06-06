import {
  Card,
  Layout,
  Menu,
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
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  AppstoreAddOutlined,
  ClockCircleOutlined,
  EditOutlined,
  SaveOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

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
      test: "Estradiol (E2)",
      value: "1,250 pg/mL",
      normal: "200-400 pg/mL",
      status: "high",
      date: "2024-01-15",
    },
    {
      test: "LH",
      value: "5.2 mIU/mL",
      normal: "1-20 mIU/mL",
      status: "normal",
      date: "2024-01-15",
    },
    {
      test: "Progesterone",
      value: "0.8 ng/mL",
      normal: "<1.5 ng/mL",
      status: "normal",
      date: "2024-01-15",
    },
    {
      test: "Follicle Count",
      value: "12",
      normal: "8-15",
      status: "normal",
      date: "2024-01-14",
    },
  ];

  const menuItems = [
    {
      key: "/",
      icon: <AppstoreAddOutlined />,
      label: <Link to="/doctor">Dashboard</Link>,
    },
    {
      key: "patients",
      icon: <UserOutlined />,
      label: <Link to="/patients">Patients</Link>,
    },
    {
      key: "appointments",
      icon: <CalendarOutlined />,
      label: <Link to="doctor/appointments">Appointments</Link>,
    },
    {
      key: "treatment_history",
      icon: <ClockCircleOutlined />,
      label: <Link to="/doctor/treatment_history">Treatment History</Link>,
    },
  ];

  const currentStep = treatmentStages.findIndex((stage) => stage.current);

  const tabItems = [
    {
      key: "overview",
      label: "Overview",
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="Patient Information" className="border-0 shadow-md">
              <Form layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Full Name">
                      <Input
                        value={patient.name}
                        readOnly
                        className="bg-gray-50"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Age">
                      <Input
                        value={patient.age}
                        readOnly
                        className="bg-gray-50"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Phone">
                      <Input
                        value={patient.phone}
                        readOnly
                        className="bg-gray-50"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Email">
                      <Input
                        value={patient.email}
                        readOnly
                        className="bg-gray-50"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Partner">
                      <Input
                        value={patient.partner}
                        readOnly
                        className="bg-gray-50"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Treatment Start">
                      <Input
                        value={patient.startDate}
                        readOnly
                        className="bg-gray-50"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Current Status" className="border-0 shadow-md">
              <Space direction="vertical" className="w-full" size={16}>
                <Row justify="space-between" align="middle">
                  <Text className="font-medium">Treatment Type:</Text>
                  <Tag color="#1890ff" className="font-medium">
                    {patient.treatment}
                  </Tag>
                </Row>
                <Row justify="space-between" align="middle">
                  <Text className="font-medium">Current Stage:</Text>
                  <Text strong>{patient.stage}</Text>
                </Row>
                <Row justify="space-between" align="middle">
                  <Text className="font-medium">Status:</Text>
                  <Tag color="#52c41a" className="font-medium">
                    Active
                  </Tag>
                </Row>
                <Row justify="space-between" align="middle">
                  <Text className="font-medium">Last Visit:</Text>
                  <Text>{patient.lastVisit}</Text>
                </Row>
                <Row justify="space-between" align="middle">
                  <Text className="font-medium">Next Appointment:</Text>
                  <Text className="text-blue-600 font-medium">
                    {patient.nextAppointment}
                  </Text>
                </Row>
              </Space>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: "injections",
      label: (
        <span className="flex items-center gap-2">
          <MedicineBoxOutlined />
          Injections
        </span>
      ),
      children: (
        <Card
          title={
            <span className="flex items-center gap-2">
              <MedicineBoxOutlined />
              Injection Schedule
            </span>
          }
          extra="Monitor daily medication administration"
          className="border-0 shadow-md"
        >
          <Space direction="vertical" className="w-full" size={16}>
            {injectionSchedule.map((injection, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      injection.status === "completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  />
                  <div>
                    <Text strong className="text-gray-800">
                      {injection.medication}
                    </Text>
                    <br />
                    <Text type="secondary" className="text-sm">
                      {injection.dose} at {injection.time}
                    </Text>
                  </div>
                </div>
                <div className="text-right">
                  <Text className="text-sm font-medium block">
                    {injection.date}
                  </Text>
                  <Tag
                    color={
                      injection.status === "completed" ? "#52c41a" : "#faad14"
                    }
                    className="mt-1"
                  >
                    {injection.status}
                  </Tag>
                </div>
              </div>
            ))}
          </Space>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            className="w-full mt-6 h-10 bg-gradient-to-r from-blue-500 to-blue-600 border-0"
          >
            Update Injection Status
          </Button>
        </Card>
      ),
    },
    {
      key: "tests",
      label: (
        <span className="flex items-center gap-2">
          <ExperimentOutlined />
          Test Results
        </span>
      ),
      children: (
        <Card
          title={
            <span className="flex items-center gap-2">
              <ExperimentOutlined />
              Laboratory Results
            </span>
          }
          extra="Latest test results and hormone levels"
          className="border-0 shadow-md"
        >
          <Space direction="vertical" className="w-full" size={16}>
            {testResults.map((test, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <Text strong className="text-gray-800">
                    {test.test}
                  </Text>
                  <br />
                  <Text type="secondary" className="text-sm">
                    Normal: {test.normal}
                  </Text>
                </div>
                <div className="text-right">
                  <Text strong className="text-lg block">
                    {test.value}
                  </Text>
                  <Space className="mt-1">
                    <Tag
                      color={
                        test.status === "normal"
                          ? "#52c41a"
                          : test.status === "high"
                          ? "#ff4d4f"
                          : "#d9d9d9"
                      }
                    >
                      {test.status}
                    </Tag>
                    <Text type="secondary" className="text-xs">
                      {test.date}
                    </Text>
                  </Space>
                </div>
              </div>
            ))}
          </Space>
          <div className="mt-6 space-y-4">
            <Text strong>Add Test Results</Text>
            <TextArea
              rows={4}
              placeholder="Enter new test results or notes..."
            />
            <Button
              type="primary"
              icon={<SaveOutlined />}
              className="bg-gradient-to-r from-green-500 to-green-600 border-0"
            >
              Save Results
            </Button>
          </div>
        </Card>
      ),
    },
    {
      key: "monitoring",
      label: "Monitoring",
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="Ultrasound Monitoring" className="border-0 shadow-md">
              <Space direction="vertical" className="w-full" size={16}>
                <Row justify="space-between" align="middle">
                  <Text className="font-medium">Follicle Count:</Text>
                  <Text strong className="text-lg">
                    12
                  </Text>
                </Row>
                <Row justify="space-between" align="middle">
                  <Text className="font-medium">Largest Follicle:</Text>
                  <Text strong>18mm</Text>
                </Row>
                <Row justify="space-between" align="middle">
                  <Text className="font-medium">Endometrial Thickness:</Text>
                  <Text strong>8.5mm</Text>
                </Row>
                <Row justify="space-between" align="middle">
                  <Text className="font-medium">Last Scan:</Text>
                  <Text>2024-01-14</Text>
                </Row>
                <Button
                  type="primary"
                  className="w-full h-10 bg-gradient-to-r from-purple-500 to-purple-600 border-0"
                >
                  Update Scan Results
                </Button>
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Treatment Notes" className="border-0 shadow-md">
              <Space direction="vertical" className="w-full">
                <TextArea
                  rows={6}
                  placeholder="Add treatment notes, observations, or instructions..."
                  className="mb-4"
                />
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  className="w-full h-10 bg-gradient-to-r from-green-500 to-green-600 border-0"
                >
                  Save Notes
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: "history",
      label: (
        <span className="flex items-center gap-2">
          <FileTextOutlined />
          History
        </span>
      ),
      children: (
        <Card
          title={
            <span className="flex items-center gap-2">
              <FileTextOutlined />
              Treatment History
            </span>
          }
          extra="Complete timeline of patient's treatment journey"
          className="border-0 shadow-md"
        >
          <Timeline
            items={[
              {
                color: "blue",
                children: (
                  <div>
                    <Text strong className="text-gray-800">
                      Egg Stimulation Started
                    </Text>
                    <br />
                    <Text type="secondary">Began Gonal-F 225 IU daily</Text>
                    <br />
                    <Text type="secondary" className="text-xs">
                      January 15, 2024
                    </Text>
                  </div>
                ),
              },
              {
                color: "green",
                children: (
                  <div>
                    <Text strong className="text-gray-800">
                      Hormone Suppression Completed
                    </Text>
                    <br />
                    <Text type="secondary">
                      Lupron treatment completed successfully
                    </Text>
                    <br />
                    <Text type="secondary" className="text-xs">
                      January 10, 2024
                    </Text>
                  </div>
                ),
              },
              {
                color: "green",
                children: (
                  <div>
                    <Text strong className="text-gray-800">
                      Initial Consultation
                    </Text>
                    <br />
                    <Text type="secondary">
                      Treatment plan established, consent forms signed
                    </Text>
                    <br />
                    <Text type="secondary" className="text-xs">
                      January 1, 2024
                    </Text>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Layout className="min-h-screen">
        <Sider width={256} className="bg-white shadow-lg">
          <div className="p-6 border-b border-gray-100">
            <Title level={4} className="!mb-0 text-gray-800">
              Fertility Clinic
            </Title>
            <Text type="secondary" className="text-sm">
              Dr. Management Portal
            </Text>
          </div>
          <Menu
            mode="inline"
            selectedKeys={["/patients"]}
            items={menuItems}
            className="border-none pt-4 px-2"
          />
        </Sider>

        <Layout>
          <Content className="p-8">
            {/* Patient Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xl">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <Title level={2} className="!mb-0 text-gray-900">
                      {patient.name}
                    </Title>
                    <Text type="secondary" className="text-base">
                      Age: {patient.age} • {patient.treatment} Treatment
                    </Text>
                    <div className="flex items-center space-x-2 mt-2">
                      <Tag color="#1890ff" className="font-medium">
                        {patient.treatment}
                      </Tag>
                      <Tag color="#52c41a" className="font-medium">
                        Active
                      </Tag>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    className="mb-2 bg-gradient-to-r from-blue-500 to-blue-600 border-0"
                  >
                    Edit Patient
                  </Button>
                  <Text type="secondary" className="text-sm block">
                    Next: {patient.nextAppointment}
                  </Text>
                </div>
              </div>
            </div>

            {/* Treatment Progress */}
            <Card
              title="Treatment Progress"
              extra={`Current stage: ${patient.stage}`}
              className="mb-8 border-0 shadow-md"
            >
              <Space direction="vertical" className="w-full" size={24}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Text className="font-medium">Overall Progress</Text>
                    <Text className="font-medium">{patient.progress}%</Text>
                  </div>
                  <Progress
                    percent={patient.progress}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                    strokeWidth={8}
                  />
                </div>

                <Steps current={currentStep} size="small" className="mt-6">
                  {treatmentStages.map((stage, index) => (
                    <Steps.Step
                      key={index}
                      title={
                        <span className="text-sm font-medium">
                          {stage.name}
                        </span>
                      }
                      description={
                        <span className="text-xs text-gray-500">
                          {stage.date}
                        </span>
                      }
                      status={
                        stage.completed
                          ? "finish"
                          : stage.current
                          ? "process"
                          : "wait"
                      }
                    />
                  ))}
                </Steps>
              </Space>
            </Card>

            {/* Detailed Information Tabs */}
            <Card className="border-0 shadow-md">
              <Tabs defaultActiveKey="overview" size="large" items={tabItems} />
            </Card>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
