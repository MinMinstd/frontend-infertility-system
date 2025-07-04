import { useEffect, useState } from "react";
import { Typography, Row, Col, Tabs, Form, message } from "antd";
import { MedicalDetailModal } from "./components/modals/MedicalDetailModal";
import { TestResultModal } from "./components/modals/TestResultModal";
import { TreatmentRoadMapModal } from "./components/modals/TreatmentRoadMapModal";
import { PatientInformation } from "./PatientInformation";
import { TreatmentProgress } from "./TreatmentProgress";
import { DoctorSidebar } from "./DoctorSidebar";
import dayjs from "dayjs";
import { MedicalManagement } from "./MedicalManagement";
import DoctorApi from "../../servers/doctor.api";
import { useParams } from "react-router-dom";
import type {
  InformationPatientDetails,
  TreatmentOverview,
} from "../../types/doctor";
import type {
  ConsulationResult_typeTest,
  MedicalRecordDetail,
  TreatmentResult_typeTest,
  treatmentRoadmap,
  TypeTest,
  UpdateTreatmentResultFormValues,
} from "../../types/medicalRecord.d";
import { TreatmentResultModal } from "./components/modals/TreatmentResultModal";

const { Title, Text } = Typography;

interface TestResultFormValues {
  name: string;
  description: string;
}

export default function PatientDetailPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const customerIdNumber = customerId ? Number(customerId) : undefined;

  const [infoPatient, setInfoPatient] =
    useState<InformationPatientDetails | null>(null);
  const [treatmentOverview, setTreatmentOverview] = useState<
    TreatmentOverview[]
  >([]);
  const [treatmentRoadmap, setTreatmentRoadmap] = useState<treatmentRoadmap[]>(
    []
  );
  const [medicalRecordDetails, setMedicalRecordDetails] = useState<
    MedicalRecordDetail[]
  >([]);
  const [treatmentResult_typeTest, settreatmentResult_typeTest] = useState<
    TreatmentResult_typeTest[]
  >([]);

  const [consulationResult_typeTest, setConsultationResult_TypeTest] = useState<
    ConsulationResult_typeTest[]
  >([]);

  const [testResults, setTestResults] = useState<TypeTest[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);

  //road map
  const [isUpdateRoadmapModalVisible, setIsUpdateRoadmapModalVisible] =
    useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState<treatmentRoadmap | null>(
    null
  );

  //medical record detail
  const [
    isUpdateMedicalDetailModalVisible,
    setIsUpdateMedicalDetailModalVisible,
  ] = useState(false);

  const [
    isCreateMedicalDetailModalVisible,
    setIsCreateMedicalDetailModalVisible,
  ] = useState(false);

  //treatment result - type test
  const [
    isUpdateTreatmentResultModalVisible,
    setIsUpdateTreatmentResultModalVisible,
  ] = useState(false);
  const [editingTreatmentResult, setEditingTreatmentResult] =
    useState<TreatmentResult_typeTest | null>(null);
  const [treatmentResultForm] = Form.useForm();

  //medical record detail
  const [editingMedicalDetail, setEditingMedicalDetail] =
    useState<MedicalRecordDetail | null>(null);

  const [medicalDetailForm] = Form.useForm();
  // const [treatmentResultForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  useEffect(() => {
    const fetchInforPatient = async () => {
      if (customerIdNumber !== undefined) {
        const res = await DoctorApi.GetInforPatientDetail(customerIdNumber);
        setInfoPatient(res.data);
      }
    };
    fetchInforPatient();
  }, [customerIdNumber]);

  useEffect(() => {
    const fetachTreatmentOverview = async () => {
      if (customerIdNumber !== undefined) {
        const res = await DoctorApi.GetTreatmentProgressOverview(
          customerIdNumber
        );
        setTreatmentOverview(res.data);
      }
    };
    fetachTreatmentOverview();
  }, [customerIdNumber]);

  useEffect(() => {
    const fetchTreatmentRoadmap = async () => {
      if (customerIdNumber != null) {
        const res = await DoctorApi.GetTreatmentRoadmap(customerIdNumber);
        setTreatmentRoadmap(res.data);
      }
    };
    fetchTreatmentRoadmap();
  }, [customerIdNumber]);

  useEffect(() => {
    const fetchMedicalRecordDetail = async () => {
      if (customerIdNumber != null) {
        const res = await DoctorApi.GetMedicalRecordDetails(customerIdNumber);
        setMedicalRecordDetails(res.data);
      }
    };
    fetchMedicalRecordDetail();
  }, [customerIdNumber]);

  useEffect(() => {
    const fetchTreatmentResult_Typetest = async () => {
      if (customerIdNumber != null) {
        const res = await DoctorApi.GetTreatmentResult_TypeTest(
          customerIdNumber
        );
        settreatmentResult_typeTest(res.data);
      }
    };
    fetchTreatmentResult_Typetest();
  }, [customerIdNumber]);

  useEffect(() => {
    const fetchConsulationR_TestT = async () => {
      if (customerIdNumber != null) {
        const res = await DoctorApi.GetConsultaionResult_TypeTest(
          customerIdNumber
        );
        console.log("Data fetchConsulationR_TestT:", res.data);
        setConsultationResult_TypeTest(res.data);
      }
    };
    fetchConsulationR_TestT();
  }, [customerIdNumber]);

  const showUpdateRoadmapModal = (roadmap: treatmentRoadmap) => {
    setEditingRoadmap(roadmap);
    setIsUpdateRoadmapModalVisible(true);
    updateForm.setFieldsValue({
      date: dayjs(roadmap.date),
      description: roadmap.description,
      durationDay: roadmap.durationDay,
      status: roadmap.status,
    });
  };

  //Medical record details
  const showUpdateMedicalDetailModal = (medicalDetail: MedicalRecordDetail) => {
    console.log("Clicked medical detail:", medicalDetail);
    setEditingMedicalDetail(medicalDetail);
    setIsUpdateMedicalDetailModalVisible(true);
    medicalDetailForm.setFieldsValue({
      date: dayjs(medicalDetail.date),
      testResult: medicalDetail.testResult || "",
      note: medicalDetail.note || "",
      status: medicalDetail.status,
    });
  };

  const showCreateMedicalDetailModal = () => {
    setIsCreateMedicalDetailModalVisible(true);
    medicalDetailForm.resetFields();
  };

  const showUpdateTreatmentResultModal = (record: TreatmentResult_typeTest) => {
    setEditingTreatmentResult(record);
    setIsUpdateTreatmentResultModalVisible(true);
    treatmentResultForm.setFieldsValue({
      dateTreatmentResult: dayjs(record.date),
      description: record.description,
      result: record.result,
      typeTest: record.typeTest ?? [],
    });
  };

  //Treatment roadmap
  const handleUpdateTreatmentRoadmap = async (updated: treatmentRoadmap) => {
    if (!customerIdNumber || !editingRoadmap) return;

    const payload = {
      date: updated.date,
      stage: updated.stage,
      description: updated.description,
      durationDay: updated.durationDay,
      status: updated.status,
    };

    try {
      await DoctorApi.UpdateTreatmentRoadmap(
        customerIdNumber,
        updated.treatmentRoadmapId,
        payload
      );

      setTreatmentRoadmap((prev) =>
        prev.map((item) =>
          item.treatmentRoadmapId === updated.treatmentRoadmapId
            ? { ...item, ...payload }
            : item
        )
      );

      message.success("Cập nhật tiến độ điều trị thành công");
    } catch (error) {
      console.error("Lỗi khi cập nhật tiến độ điều trị:", error);
      message.error("Cập nhật thất bại");
    }
  };

  //treatment result - type test
  const handleUpdateTreatmentResult = async (
    values: UpdateTreatmentResultFormValues
  ) => {
    if (!editingTreatmentResult) return;

    const payload = {
      dateTreatmentResult: values.dateTreatmentResult.format("YYYY-MM-DD"),
      description: values.description,
      result: values.result,
      typeTest: values.typeTest.map((item) => ({
        typeTestId: item.typeTestId,
        name: item.name,
        description: item.description,
      })),
    };

    try {
      await DoctorApi.UpdateTreatmentResult_TypeTest(
        editingTreatmentResult.treatmentResultId,
        payload
      );

      settreatmentResult_typeTest((prev) =>
        prev.map((item) =>
          item.treatmentResultId === editingTreatmentResult.treatmentResultId
            ? { ...item, ...payload }
            : item
        )
      );

      message.success("Cập nhật kết quả điều trị thành công");
      setIsUpdateTreatmentResultModalVisible(false);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
      message.error("Cập nhật thất bại");
    }
  };

  //Medical record detail
  const handleUpdateMedicalRecordDetail = async (updated: {
    date: string;
    testResult?: string;
    note?: string;
    status: string;
  }) => {
    if (!customerIdNumber || !editingMedicalDetail) return;

    try {
      await DoctorApi.UpdateMedicalRecordDetail(
        customerIdNumber,
        editingMedicalDetail.medicalRecordDetailId,
        {
          date: updated.date,
          testResult: updated.testResult || "",
          note: updated.note || "",
          status: updated.status,
        }
      );

      // Cập nhật state
      setMedicalRecordDetails((prev) =>
        prev.map((item) =>
          item.medicalRecordDetailId ===
          editingMedicalDetail.medicalRecordDetailId
            ? { ...item, ...updated }
            : item
        )
      );

      message.success("Cập nhật hồ sơ bệnh án thành công");
      setIsUpdateMedicalDetailModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ bệnh án:", error);
      message.error("Cập nhật thất bại");
    }
  };

  const handleCreateMedicalRecordDetail = async (values: {
    treatmentRoadmapId: number;
    date: string;
    typeName: string;
    testResult?: string;
    note?: string;
    status: string;
  }) => {
    if (!customerIdNumber) return;

    try {
      const roadmapId = Number(values.treatmentRoadmapId);
      const response = await DoctorApi.CreateMedicalRecordDetail(
        customerIdNumber,
        {
          treatmentRoadmapId: roadmapId,
          date: values.date,
          typeName: values.typeName,
          testResult: values.testResult || "",
          note: values.note || "",
          status: values.status,
        }
      );

      // Tìm roadmap tương ứng để lấy stage và stepNumber
      const relatedRoadmap = treatmentRoadmap.find(
        (r) => r.treatmentRoadmapId === roadmapId
      );

      setMedicalRecordDetails((prev) => [
        ...prev,
        {
          medicalRecordDetailId: response.data.medicalRecordDetailId,
          treatmentRoadmapId: roadmapId,
          date: dayjs(values.date).format("YYYY-MM-DD"),
          typeName: values.typeName,
          testResult: values.testResult || "",
          note: values.note || "",
          status: values.status,
          stage: relatedRoadmap?.stage || "", // Cung cấp giá trị mặc định nếu cần
          stepNumber: relatedRoadmap?.stepNumber || 0, // Cung cấp giá trị mặc định nếu cần
        },
      ]);

      message.success("Tạo mới hồ sơ bệnh án thành công");
      setIsCreateMedicalDetailModalVisible(false);
      medicalDetailForm.resetFields();
    } catch (error) {
      console.error("Lỗi khi tạo mới hồ sơ bệnh án:", error);
      message.error("Tạo mới thất bại");
    }
  };

  //Consulation result
  const handleConSulationR_typeTSubmit = (values: TestResultFormValues) => {
    const newTrestmentResult: TypeTest = {
      typeTestId: Date.now(),
      name: values.name,
      description: values.description,
    };
    setTestResults([...testResults, newTrestmentResult]);
    setIsTestModalVisible(false);
    treatmentResultForm.resetFields();
  };

  const mappedTreatmentResults = treatmentResult_typeTest.map((item) => ({
    Treatment_result_ID: String(item.treatmentResultId),
    Road_ID: String(item.treatmentRoadmapId),
    Date: item.date,
    Description: item.description,
    Result: item.result,
  }));

  const PatientDetailContent = () => (
    <div>
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
                  <PatientInformation patient={infoPatient} />
                </Col>
                <Col xs={24} lg={12}>
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
                <MedicalManagement
                  treatmentRoadmap={treatmentRoadmap}
                  treatmentResults={treatmentResult_typeTest}
                  medicalRecordDetails={medicalRecordDetails}
                  consulationResults={consulationResult_typeTest}
                  onAddTest={() => setIsTestModalVisible(true)}
                  onUpdateRoadmap={showUpdateRoadmapModal}
                  onUpdateTreatmentResult={showUpdateTreatmentResultModal}
                  onUpdateDetail={showUpdateMedicalDetailModal}
                  onAddDetail={showCreateMedicalDetailModal}
                  onAddResult={() => {}}
                  onUpdateResult={() => {}}
                />
                {/* Treatment road map */}
                <TreatmentRoadMapModal
                  visible={isUpdateRoadmapModalVisible}
                  onCancel={() => setIsUpdateRoadmapModalVisible(false)}
                  onSubmit={(values) => {
                    if (editingRoadmap) {
                      handleUpdateTreatmentRoadmap({
                        ...editingRoadmap,
                        ...values,
                        date: dayjs(values.date).format("YYYY-MM-DD"),
                      });
                      setIsUpdateRoadmapModalVisible(false);
                    }
                  }}
                  form={updateForm}
                  treatmentRoadmap={treatmentRoadmap}
                />

                {/* Treatment result - type test */}
                <TreatmentResultModal
                  visible={isUpdateTreatmentResultModalVisible}
                  onCancel={() => setIsUpdateTreatmentResultModalVisible(false)}
                  onSubmit={handleUpdateTreatmentResult}
                  form={treatmentResultForm}
                  treatmentRoadmap={treatmentRoadmap}
                  treatmentResult={editingTreatmentResult}
                />

                {/* Medical record detail */}
                <MedicalDetailModal
                  open={isUpdateMedicalDetailModalVisible} // Sử dụng state đúng
                  onCancel={() => setIsUpdateMedicalDetailModalVisible(false)}
                  onSubmit={(values) => {
                    handleUpdateMedicalRecordDetail({
                      ...values,
                      date: dayjs(values.date).format("YYYY-MM-DD"),
                    });
                  }}
                  treatmentRoadmap={treatmentRoadmap}
                  treatmentResults={treatmentResult_typeTest}
                  form={medicalDetailForm}
                  isEditing={true} //  Thêm prop này để phân biệt chế độ edit
                />
                <MedicalDetailModal
                  open={isCreateMedicalDetailModalVisible}
                  onCancel={() => setIsCreateMedicalDetailModalVisible(false)}
                  onSubmit={(values) => {
                    handleCreateMedicalRecordDetail({
                      ...values,
                      date: values.date, // Đã xử lý trong hàm handle
                    });
                  }}
                  treatmentRoadmap={treatmentRoadmap}
                  treatmentResults={treatmentResult_typeTest}
                  form={medicalDetailForm}
                  isEditing={false}
                />

                {/* Consulation result - type test */}
                <TestResultModal
                  visible={isTestModalVisible}
                  onCancel={() => setIsTestModalVisible(false)}
                  onSubmit={handleConSulationR_typeTSubmit}
                  treatmentResults={mappedTreatmentResults}
                  medicalRecordDetails={medicalRecordDetails}
                  form={treatmentResultForm}
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
