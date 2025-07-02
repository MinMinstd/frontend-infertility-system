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
  MedicalRecordDetail,
  TreatmentResult_typeTest,
  treatmentRoadmap,
  TypeTest,
} from "../../types/medicalRecord.d";

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
  const [editingMedicalDetail, setEditingMedicalDetail] =
    useState<MedicalRecordDetail | null>(null);

  const [medicalDetailForm] = Form.useForm();
  const [testForm] = Form.useForm();
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

  const handleTestSubmit = (values: TestResultFormValues) => {
    const newTest: TypeTest = {
      typeTestId: Date.now(),
      name: values.name,
      description: values.description,
    };
    setTestResults([...testResults, newTest]);
    setIsTestModalVisible(false);
    testForm.resetFields();
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
                  testResults={testResults}
                  onAddDetail={() => {}}
                  onAddTest={() => setIsTestModalVisible(true)}
                  onUpdateRoadmap={showUpdateRoadmapModal}
                  onUpdateDetail={showUpdateMedicalDetailModal}
                  onAddResult={() => {}}
                  onUpdateResult={() => {}}
                />

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

                <MedicalDetailModal
                  open={isUpdateMedicalDetailModalVisible} // ✅ Sử dụng state đúng
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
                  isEditing={true} // ✅ Thêm prop này để phân biệt chế độ edit
                />

                <TestResultModal
                  visible={isTestModalVisible}
                  onCancel={() => setIsTestModalVisible(false)}
                  onSubmit={handleTestSubmit}
                  treatmentResults={mappedTreatmentResults}
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
