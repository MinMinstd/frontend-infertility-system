import {
  Layout,
  Menu,
  Card,
  Input,
  Select,
  Button,
  Tabs,
  Badge,
  Progress,
  Typography,
} from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

const { Sider, Content } = Layout;
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

  return (
    <Layout className="min-h-screen">
      <Sider theme="light" width={256} className="shadow-sm">
        <div className="p-6">
          <Title level={4}>Fertility Clinic</Title>
          <Text type="secondary">Dr. Management Portal</Text>
        </div>
        <Menu mode="inline" defaultSelectedKeys={["patients"]}>
          <Menu.Item key="dashboard">
            <Link to="/doctor">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="patients">
            <Link to="/doctor/patients">Patients</Link>
          </Menu.Item>
          <Menu.Item key="appointments">
            <Link to="/doctor/appointments">Appointments</Link>
          </Menu.Item>
          <Menu.Item key="history" icon={<ClockCircleOutlined />}>
            <Link to="/treatment-history">Treatment History</Link>
          </Menu.Item>
          <Menu.Item key="schedule" icon={<ClockCircleOutlined />}>
            <Link to="/schedule">Schedule</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout className="bg-gray-50">
        <Content className="p-8">
          <div className="mb-8">
            <Title level={2}>Patient Management</Title>
            <Text>
              Manage and monitor all patients undergoing fertility treatments
            </Text>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search patients..."
              className="flex-1"
            />
            <Select placeholder="Filter by status" style={{ width: 200 }}>
              <Select.Option value="all">All Patients</Select.Option>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="critical">Critical</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
            </Select>
            <Button icon={<FilterOutlined />}>More Filters</Button>
          </div>

          <Tabs defaultActiveKey="all">
            <Tabs.TabPane tab={`All (${treatmentCounts.all})`} key="all">
              {patients.map((patient) => (
                <Card
                  key={patient.id}
                  className="mb-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <Text strong className="text-lg">
                          {patient.name}
                        </Text>
                        <div>
                          <Text type="secondary">
                            Age: {patient.age} • {patient.treatment} Treatment
                          </Text>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Badge
                            color={
                              patient.treatment === "IVF" ? "blue" : "cyan"
                            }
                            text={patient.treatment}
                          />
                          <Badge
                            status={
                              patient.status === "active" ? "success" : "error"
                            }
                            text={patient.status}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div>
                        <Text type="secondary">Current Stage</Text>
                        <div>
                          <Text strong>{patient.stage}</Text>
                        </div>
                      </div>
                      <Progress percent={patient.progress} size="small" />
                    </div>

                    <div className="text-right">
                      <div>
                        <Text type="secondary">Last Visit</Text>
                        <div>
                          <Text>{patient.lastVisit}</Text>
                        </div>
                      </div>
                      <div>
                        <Text type="secondary">Next Appointment</Text>
                        <div>
                          <Text type="success">{patient.nextAppointment}</Text>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() => detailLink(patient.id)}
                      >
                        View Details
                      </Button>
                      <Button icon={<EditOutlined />}>Update</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </Tabs.TabPane>

            <Tabs.TabPane tab={`IVF (${treatmentCounts.ivf})`} key="ivf">
              <div className="grid gap-4">
                {patients
                  .filter((p) => p.treatment === "IVF")
                  .map((patient) => (
                    <Card
                      key={patient.id}
                      className="mb-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <span className="text-purple-600 font-semibold">
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <Text strong className="text-lg">
                              {patient.name}
                            </Text>
                            <div>
                              <Text type="secondary">
                                Age: {patient.age} • IVF Treatment
                              </Text>
                            </div>
                            <Badge className="mt-2 bg-purple-100 text-purple-800">
                              IVF
                            </Badge>
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div>
                            <Text type="secondary">Current Stage</Text>
                            <div>
                              <Text strong>{patient.stage}</Text>
                            </div>
                          </div>
                          <Progress percent={patient.progress} size="small" />
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Link to={`/patients/${patient.id}`}>
                            <Button className="w-full sm:w-auto">
                              <EyeOutlined />
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab={`IUI (${treatmentCounts.iui})`} key="iui">
              <div className="grid gap-4">
                {patients
                  .filter((p) => p.treatment === "IUI")
                  .map((patient) => (
                    <Card
                      key={patient.id}
                      className="mb-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold">
                              {patient.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <Text strong className="text-lg">
                              {patient.name}
                            </Text>
                            <div>
                              <Text type="secondary">
                                Age: {patient.age} • IUI Treatment
                              </Text>
                            </div>
                            <Badge className="mt-2 bg-green-100 text-green-800">
                              IUI
                            </Badge>
                          </div>
                        </div>

                        <div className="text-right space-y-2">
                          <div>
                            <Text type="secondary">Current Stage</Text>
                            <div>
                              <Text strong>{patient.stage}</Text>
                            </div>
                          </div>
                          <Progress percent={patient.progress} size="small" />
                        </div>

                        <div className="flex flex-col space-y-2">
                          <Link to={`/patients/${patient.id}`}>
                            <Button className="w-full sm:w-auto">
                              <EyeOutlined />
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </Tabs.TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
}
