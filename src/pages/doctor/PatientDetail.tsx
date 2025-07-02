import { useEffect, useState } from "react";
import { Typography, Row, Col, Tabs, Form, message } from "antd";
import { TreatmentResultModal } from "./components/modals/TreatmentResultModal";
import { MedicalDetailModal } from "./components/modals/MedicalDetailModal";
import { TestResultModal } from "./components/modals/TestResultModal";
// import { PatientOverviewCards } from "./PatientOverviewCards"; Thanh report trong trang patient detail
import { PatientInformation } from "./PatientInformation";
import { TreatmentProgress } from "./TreatmentProgress";
import { DoctorSidebar } from "./DoctorSidebar";

import { MedicalManagement } from "./MedicalManagement";
import DoctorApi from "../../servers/doctor.api";
import { useParams } from "react-router-dom";
import type {
  InformationPatientDetails,
  TreatmentOverview,
} from "../../types/doctor";
import type {
  CreateMedicalRecordDetail,
  MedicalRecordDetail,
  TreatmentResultFormValues,
  treatmentRoadmap,
} from "../../types/medicalRecord.d";

interface TestResultFormValues {
  treatment_result_id: string;
  name: string;
  description: string;
  result_id: string;
  note: string;
}

const { Title, Text } = Typography;

export default function PatientDetailPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const customerIdNumber = customerId ? Number(customerId) : undefined;

  //thông tin trả ra dạng obj của Patient
  const [infoPatient, setInfoPatient] =
    useState<InformationPatientDetails | null>(null);

  //thông tin trả dạng list Treatment overview
  const [treatmentOverview, setTreatmentOverview] = useState<
    TreatmentOverview[]
  >([]);

  //danh sách treatment roadmap trong medical manager
  const [treatmentRoadmap, setTreatmentRoadmap] = useState<treatmentRoadmap[]>(
    []
  );

  //danh sách medical record trong medical manager
  const [medicalRecordDetails, setMedicalRecordDetails] = useState<
    MedicalRecordDetail[]
  >([]);

  //Dùng để lấy thông tin dịch vụ, stage hiện tại đang sử dụng,
  // const patient = {
  //   id: 1,
  //   name: "Sarah Johnson",
  //   age: 32,
  //   treatment: "IVF",
  //   stage: "Egg Stimulation",
  //   lastVisit: "2024-01-15",
  //   nextAppointment: "2024-01-20",
  //   status: "active",
  //   progress: 65,
  //   phone: "+1 (555) 123-4567",
  //   email: "sarah.johnson@email.com",
  //   partner: "Michael Johnson",
  //   startDate: "2024-01-01",
  // };

  //API thông tin bệnh nhân
  useEffect(() => {
    const fetchInforPatient = async () => {
      try {
        if (customerIdNumber !== undefined) {
          const res = await DoctorApi.GetInforPatientDetail(customerIdNumber);
          console.log("Thông tin bệnh nhân hiển thị: ", res.data);
          setInfoPatient(res.data);
        }
      } catch (error) {
        console.error(
          "Lỗi hệ thống không thể lấy được thông tin cá nhân bệnh nhân: ",
          error
        );
      }
    };
    fetchInforPatient();
  }, [customerIdNumber]);

  //API giai đoạn điều trị tại overview
  useEffect(() => {
    const fetachTreatmentOverview = async () => {
      try {
        if (customerIdNumber !== undefined) {
          const res = await DoctorApi.GetTreatmentProgressOverview(
            customerIdNumber
          );
          console.log("Thông tin quy trình hoạt động: ", res.data);
          setTreatmentOverview(res.data);
        }
      } catch (error) {
        console.log("Lỗi hệ thống không load treatment overview: ", error);
      }
    };
    fetachTreatmentOverview();
  }, [customerIdNumber]);

  //API tiến độ các bước điều trị Treatment roadmap
  useEffect(() => {
    const fetchTreatmentRoadmap = async () => {
      try {
        if (customerIdNumber != null) {
          const res = await DoctorApi.GetTreatmentRoadmap(customerIdNumber);
          console.log(" Treatment roadmap đã lọc: ", res.data);
          setTreatmentRoadmap(res.data);
        }
      } catch (error) {
        console.error("Lỗi hệ thống không lấy được danh sách: ", error);
      }
    };

    fetchTreatmentRoadmap();
  }, [customerIdNumber]);

  // API medical record details
  useEffect(() => {
    const fetchMedicalRecordDetail = async () => {
      try {
        if (customerIdNumber != null) {
          const res = await DoctorApi.GetMedicalRecordDetails(customerIdNumber);
          console.log("Lấy thông tin medical record detail ở đây:", res.data);
          setMedicalRecordDetails(res.data);
        }
      } catch (error) {
        console.log(
          "Lỗi hệ thống không thể kết nối tại medical record detail",
          error
        );
      }
    };
    fetchMedicalRecordDetail();
  }, [customerIdNumber]);

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

  const [form] = Form.useForm();
  const [detailForm] = Form.useForm();
  const [testForm] = Form.useForm();

  const showResultModal = () => {
    setIsResultModalVisible(true);
  };

  //Cập nhật kết quả điều trị
  const handleResultSubmit = (values: TreatmentResultFormValues) => {
    const newResult = {
      Treatment_result_ID: `TR${Date.now()}`,
      Road_ID: `R${values.treatmentRoadmapId}`, // hoặc giữ nguyên số nếu bạn không prefix
      Date: values.date,
      Description: values.stage + " - " + values.durationDay + " ngày",
      Result: values.status,
    };
    setTreatmentResults([...treatmentResults, newResult]);
    setIsResultModalVisible(false);
    form.resetFields();
  };

  //Thêm mới medical record
  const handleDetailSubmit = async (values: CreateMedicalRecordDetail) => {
    try {
      // 1. Kiểm tra chắc chắn medicalRecordId tồn tại
      if (!infoPatient?.medicalRecordId) {
        throw new Error("Không tìm thấy ID hồ sơ bệnh án");
      }

      // 2. Tìm treatmentRoadmapId
      const roadmapItem = treatmentRoadmap.find(
        (item) => item.stage === values.stage
      );
      if (!roadmapItem) {
        throw new Error("Không tìm thấy giai đoạn điều trị tương ứng");
      }

      // 3. Tạo request data với type chính xác
      const requestData: Parameters<
        typeof DoctorApi.CreateMedicalRecordDetail
      >[0] = {
        medicalRecordId: infoPatient.medicalRecordId, // Đã được kiểm tra nên không còn undefined
        treatmentRoadmapId: roadmapItem.treatmentRoadmapId,
        stepNumber: values.stepNumber,
        date: values.date.format("YYYY-MM-DD"),
        typeName: values.typeName as
          | "Consultation"
          | "Treatment"
          | "Test"
          | "Result", // Ép kiểu nếu cần
        status: values.status as "Pending" | "Completed" | "Cancelled",
        testResult: values.testResult || undefined, // Dùng undefined thay vì null
        note: values.note || undefined,
        stage: values.stage,
      };

      // 4. Gọi API
      const response = await DoctorApi.CreateMedicalRecordDetail(requestData);

      // 4. Cập nhật state và hiển thị thông báo
      setMedicalRecordDetails((prev) => [...prev, response.data]);
      message.success("Thêm chi tiết hồ sơ thành công");

      return true;
    } catch (error) {
      console.error("Lỗi khi thêm chi tiết:", error);
      return false;
    }
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
              Hồ Sơ Điều Trị Chi tiết
            </Title>
            <Text style={{ color: "#666" }}>
              Tổng quan về thông tin bệnh nhân và tiến trình điều trị
            </Text>
          </Col>
        </Row>
      </div>

      {/* Patient Overview Cards */}
      {/* <PatientOverviewCards patient={patient} /> */}
      {/* Muốn xóa chỗ này thành làm các thông tin như trạng thái  */}
      {/* CHƯA SỬA CHỖ NÀY LƯU Ý !!!! */}

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
                  {/* // Đã thực hiện */}
                  <PatientInformation patient={infoPatient} />
                </Col>
                <Col xs={24} lg={12}>
                  {/* // Đã thực hiện */}
                  <TreatmentProgress treatmentStages={treatmentOverview} />
                </Col>
              </Row>
            ),
          },
          {
            key: "medications",
            label: "Medical Management",
            children: (
              <>
                {/* Thông tin hiển thị tại medical manager */}
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
                  open={isDetailModalVisible}
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
