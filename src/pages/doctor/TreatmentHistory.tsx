import {
  Layout,
  Menu,
  Card,
  Input,
  Select,
  Tabs,
  Badge,
  Button,
  Typography,
  Progress,
} from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  CalendarOutlined,
  HistoryOutlined,
  SearchOutlined,
  FileTextOutlined,
  HeartOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

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

  return (
    <Layout className="min-h-screen">
      <Sider theme="light" width={256} className="border-r">
        <div className="p-6">
          <Title level={4}>Fertility Clinic</Title>
          <Text type="secondary">Dr. Management Portal</Text>
        </div>
        <Menu mode="inline" defaultSelectedKeys={["history"]}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/doctor">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="patients" icon={<UserOutlined />}>
            <Link to="/doctor/patients">Patients</Link>
          </Menu.Item>
          <Menu.Item key="appointments" icon={<CalendarOutlined />}>
            <Link to="/doctor/appointments">Appointments</Link>
          </Menu.Item>
          <Menu.Item key="history" icon={<HistoryOutlined />}>
            <Link to="/doctor/treatment_history">Treatment History</Link>
          </Menu.Item>
          <Menu.Item key="schedule" icon={<HistoryOutlined />}>
            <Link to="/doctor/schedule">Schedule</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Content className="bg-gray-50 p-8">
        <div className="mb-8">
          <Title level={2}>Treatment History</Title>
          <Text>Complete overview of all patient treatments and outcomes</Text>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <div className="flex justify-between items-center">
              <div>
                <Text type="secondary">Total Completed</Text>
                <Title level={3} className="mb-0">
                  {treatmentStats.totalCompleted}
                </Title>
              </div>
              <FileTextOutlined className="text-2xl text-blue-600" />
            </div>
          </Card>
          <Card>
            <div className="flex justify-between items-center">
              <div>
                <Text type="secondary">Successful Pregnancies</Text>
                <Title level={3} className="mb-0" type="success">
                  {treatmentStats.successfulPregnancies}
                </Title>
              </div>
              <HeartOutlined className="text-2xl text-green-600" />
            </div>
          </Card>
          <Card>
            <div className="flex justify-between items-center">
              <div>
                <Text type="secondary">Success Rate</Text>
                <Title level={3} className="mb-0" type="success">
                  {treatmentStats.successRate}%
                </Title>
              </div>
              <RiseOutlined className="text-2xl text-emerald-600" />
            </div>
          </Card>
          <Card>
            <div className="flex justify-between items-center">
              <div>
                <Text type="secondary">Avg. Cycles</Text>
                <Title level={3} className="mb-0">
                  {treatmentStats.averageCycles}
                </Title>
              </div>
              <CheckCircleOutlined className="text-2xl text-purple-600" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search treatment history..."
            className="flex-1"
          />
          <Select
            placeholder="Filter by treatment"
            style={{ width: 200 }}
            className="mr-4"
          >
            <Select.Option value="all">All Treatments</Select.Option>
            <Select.Option value="ivf">IVF</Select.Option>
            <Select.Option value="iui">IUI</Select.Option>
            <Select.Option value="icsi">ICSI</Select.Option>
          </Select>
          <Select placeholder="Filter by outcome" style={{ width: 200 }}>
            <Select.Option value="all">All Outcomes</Select.Option>
            <Select.Option value="success">Successful</Select.Option>
            <Select.Option value="ongoing">Ongoing</Select.Option>
            <Select.Option value="discontinued">Discontinued</Select.Option>
          </Select>
        </div>

        {/* Treatment Tabs */}
        <Tabs defaultActiveKey="completed">
          <TabPane
            tab={`Completed (${completedTreatments.length})`}
            key="completed"
          >
            {completedTreatments.map((treatment) => (
              <Card
                key={treatment.id}
                className="mb-4 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      {treatment.status === "success" ? (
                        <CheckCircleOutlined className="text-xl text-green-600" />
                      ) : (
                        <CloseCircleOutlined className="text-xl text-red-600" />
                      )}
                    </div>
                    <div>
                      <Title level={5} className="mb-0">
                        {treatment.patient}
                      </Title>
                      <Text type="secondary">
                        {treatment.treatment} Treatment
                      </Text>
                      <div className="mt-2 space-x-2">
                        <Badge
                          status={
                            treatment.status === "success" ? "success" : "error"
                          }
                          text={treatment.outcome}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <Text type="secondary">Duration</Text>
                    <div>
                      {treatment.startDate} - {treatment.endDate}
                    </div>
                    <Text type="secondary">Cycles: {treatment.cycles}</Text>
                  </div>

                  <div className="space-y-2">
                    <Button icon={<FileTextOutlined />}>View Details</Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabPane>

          <TabPane tab={`Ongoing (${ongoingTreatments.length})`} key="ongoing">
            {ongoingTreatments.map((treatment) => (
              <Card key={treatment.id} className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <Title level={5} className="mb-0">
                        {treatment.patient}
                      </Title>
                      <Text type="secondary">
                        {treatment.treatment} Treatment - Cycle{" "}
                        {treatment.cycle}
                      </Text>
                      <div className="mt-2 space-x-2">
                        <Badge
                          color={
                            treatment.treatment === "IVF" ? "blue" : "cyan"
                          }
                          text={treatment.treatment}
                        />
                        <Badge status="processing" text="In Progress" />
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Current Stage</p>
                      <p className="font-medium">{treatment.currentStage}</p>
                    </div>
                    <Progress
                      percent={treatment.progress}
                      strokeColor="#3b82f6"
                      className="w-32"
                    />
                    <p className="text-xs text-gray-500">
                      {treatment.progress}% Complete
                    </p>
                  </div>

                  <div className="text-right space-y-2">
                    <div>
                      <p className="text-sm text-gray-600">Started</p>
                      <p className="font-medium">{treatment.startDate}</p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <Link to={`/patients/${treatment.id}`}>
                      <Button className="w-full sm">Manage Treatment</Button>
                    </Link>
                    <Button className="sm" variant="outlined">
                      View Progress
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
}
