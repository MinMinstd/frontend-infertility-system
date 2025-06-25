import { useState } from "react";
import { Typography, Row, Col, Button, Tabs, Space, Form } from "antd";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

import { TreatmentResultModal } from "./components/modals/TreatmentResultModal";
import { MedicalDetailModal } from "./components/modals/MedicalDetailModal";
import { TestResultModal } from "./components/modals/TestResultModal";
import { PatientOverviewCards } from "./PatientOverviewCards";
import { PatientInformation } from "./PatientInformation";
import { TreatmentProgress } from "./TreatmentProgress";
import { DoctorSidebar } from "./DoctorSidebar";
import dayjs from "dayjs";
import { MedicalManagement } from "./MedicalManagement";

interface TreatmentResultFormValues {
  date: dayjs.Dayjs;
  description: string;
  result: string;
}

interface MedicalDetailFormValues {
  date: dayjs.Dayjs;
  road_id: string;
  treatment_result_id: string;
  type: string;
  test_result: string;
  note: string;
}

interface TestResultFormValues {
  treatment_result_id: string;
  name: string;
  description: string;
  result_id: string;
  note: string;
}

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

  const treatmentRoadmap = [
    {
      Road_ID: "R001",
      Date: "2024-01-01",
      Stage: "Giai đoạn chuẩn bị",
      Service_Name: "Khám sức khỏe tổng quát",
      Description: "Khám lâm sàng và đánh giá tình trạng sức khỏe",
      Duration_day: 1,
      Price: 500000,
      Status: "Đã hoàn thành",
    },
    {
      Road_ID: "R002",
      Date: "2024-01-05",
      Stage: "Giai đoạn chuẩn bị",
      Service_Name: "Xét nghiệm máu",
      Description: "Xét nghiệm hormone, chức năng gan thận",
      Duration_day: 1,
      Price: 800000,
      Status: "Đã hoàn thành",
    },
    {
      Road_ID: "R003",
      Date: "2024-01-10",
      Stage: "Giai đoạn điều trị",
      Service_Name: "Kích thích buồng trứng",
      Description: "Sử dụng thuốc kích thích phóng noãn",
      Duration_day: 10,
      Price: 2000000,
      Status: "Đang tiến hành",
    },
    {
      Road_ID: "R004",
      Date: "2024-01-20",
      Stage: "Giai đoạn điều trị",
      Service_Name: "Chọc hút trứng",
      Description: "Thu thập trứng từ buồng trứng",
      Duration_day: 1,
      Price: 1500000,
      Status: "Đang chờ",
    },
  ];

  const [treatmentResults, setTreatmentResults] = useState([
    {
      Treatment_result_ID: "TR001",
      Road_ID: "R001",
      Date: "2024-01-01",
      Description: "Khám lâm sàng hoàn tất, không phát hiện bất thường",
      Result: "Đáp ứng tốt",
    },
    {
      Treatment_result_ID: "TR002",
      Road_ID: "R002",
      Date: "2024-01-05",
      Description: "Kết quả xét nghiệm trong giới hạn bình thường",
      Result: "Bình thường",
    },
  ]);

  const [medicalRecordDetails, setMedicalRecordDetails] = useState([
    {
      Detail_ID: "MD001",
      Record_ID: "MR001",
      Treatment_result_ID: "TR001",
      Date: "2024-01-01",
      Road_ID: "R001",
      Type: "Theo dõi",
      Test_result: "Huyết áp: 120/80, Nhịp tim: 72",
      Note: "Bệnh nhân tình trạng ổn định",
    },
    {
      Detail_ID: "MD002",
      Record_ID: "MR001",
      Treatment_result_ID: "TR002",
      Date: "2024-01-05",
      Road_ID: "R002",
      Type: "Xét nghiệm",
      Test_result: "FSH: 8.2, LH: 5.1, E2: 45",
      Note: "Các chỉ số hormone trong giới hạn bình thường",
    },
  ]);

  const [testResults, setTestResults] = useState([
    {
      Test_ID: "T001",
      Treatment_result_ID: "TR002",
      Name: "Xét nghiệm hormone",
      Description: "Kiểm tra mức độ hormone sinh sản",
      Result_ID: "MD002",
      Note: "Kết quả tốt, phù hợp để bắt đầu điều trị",
    },
  ]);

  const [activeTab, setActiveTab] = useState("overview");
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [selectedRoadId, setSelectedRoadId] = useState("");

  const [form] = Form.useForm();
  const [detailForm] = Form.useForm();
  const [testForm] = Form.useForm();

  const showResultModal = (roadId: string) => {
    setSelectedRoadId(roadId);
    setIsResultModalVisible(true);
  };

  const handleResultSubmit = (values: TreatmentResultFormValues) => {
    const newResult = {
      Treatment_result_ID: `TR${Date.now()}`,
      Road_ID: selectedRoadId,
      Date: values.date.format("YYYY-MM-DD"),
      Description: values.description,
      Result: values.result,
    };
    setTreatmentResults([...treatmentResults, newResult]);
    setIsResultModalVisible(false);
    form.resetFields();
  };

  const handleDetailSubmit = (values: MedicalDetailFormValues) => {
    const newDetail = {
      Detail_ID: `MD${Date.now()}`,
      Record_ID: "MR001",
      Treatment_result_ID: values.treatment_result_id,
      Date: values.date.format("YYYY-MM-DD"),
      Road_ID: values.road_id,
      Type: values.type,
      Test_result: values.test_result,
      Note: values.note,
    };
    setMedicalRecordDetails([...medicalRecordDetails, newDetail]);
    setIsDetailModalVisible(false);
    detailForm.resetFields();
  };

  const handleTestSubmit = (values: TestResultFormValues) => {
    const newTest = {
      Test_ID: `T${Date.now()}`,
      Treatment_result_ID: values.treatment_result_id,
      Name: values.name,
      Description: values.description,
      Result_ID: values.result_id,
      Note: values.note,
    };
    setTestResults([...testResults, newTest]);
    setIsTestModalVisible(false);
    testForm.resetFields();
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
      <PatientOverviewCards patient={patient} />

      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        items={[
          {
            key: "overview",
            label: "Overview",
            children: (
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <PatientInformation patient={patient} />
                </Col>
                <Col xs={24} lg={12}>
                  <TreatmentProgress treatmentStages={treatmentStages} />
                </Col>
              </Row>
            ),
          },
          {
            key: "medications",
            label: "Medical Management",
            children: (
              <>
                <MedicalManagement
                  treatmentRoadmap={treatmentRoadmap}
                  treatmentResults={treatmentResults}
                  medicalRecordDetails={medicalRecordDetails}
                  testResults={testResults}
                  onUpdateResult={showResultModal}
                  onAddResult={() => setIsResultModalVisible(true)}
                  onAddDetail={() => setIsDetailModalVisible(true)}
                  onAddTest={() => setIsTestModalVisible(true)}
                />

                {/* Modals */}
                <TreatmentResultModal
                  visible={isResultModalVisible}
                  onCancel={() => setIsResultModalVisible(false)}
                  onSubmit={handleResultSubmit}
                  treatmentRoadmap={treatmentRoadmap}
                  form={form}
                />

                <MedicalDetailModal
                  visible={isDetailModalVisible}
                  onCancel={() => setIsDetailModalVisible(false)}
                  onSubmit={handleDetailSubmit}
                  treatmentRoadmap={treatmentRoadmap}
                  treatmentResults={treatmentResults}
                  form={detailForm}
                />

                <TestResultModal
                  visible={isTestModalVisible}
                  onCancel={() => setIsTestModalVisible(false)}
                  onSubmit={handleTestSubmit}
                  treatmentResults={treatmentResults}
                  medicalRecordDetails={medicalRecordDetails}
                  form={testForm}
                />
              </>
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
