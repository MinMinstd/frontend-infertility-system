import { useEffect, useState } from "react";
import { Typography, Row, Col, Tabs, Button, message, Form, Badge } from "antd";
import { FileAddOutlined, UserOutlined, MedicineBoxOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
// import { TestResultModal } from "./components/modals/TestResultModal";
// import { TreatmentRoadMapModal } from "./components/modals/TreatmentRoadMapModal";
import { PatientInformation } from "./PatientInformation";
import { DoctorSidebar } from "./DoctorSidebar";
import { MedicalManagement } from "./MedicalManagement";
import DoctorApi from "../../servers/doctor.api";
import { useParams } from "react-router-dom";
import type { InformationPatientDetails } from "../../types/doctor";
import dayjs from "dayjs";
import type {
  // ConsulationResult_typeTest,
  MedicalRecord,
  // MedicalRecordDetail,
  // TreatmentResult_typeTest,
  // treatmentRoadmap,
  // TypeTest,
  // UpdateTreatmentResultFormValues,
} from "../../types/medicalRecord.d";
// import { TreatmentResultModal } from "./components/modals/TreatmentResultModal";
import { MedicalRecordOverview } from "./MedicalRecordOverview";
import { MedicalRecordModal } from "./components/modals/MedicalRecordModal";

const { Title, Text } = Typography;

// interface TestResultFormValues {
//   name: string;
//   description: string;
// }

export default function PatientDetailPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const customerIdNumber = customerId ? Number(customerId) : undefined;
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );
  const [selectedMedicalRecordId, setSelectedMedicalRecordId] = useState<
    number | null
  >(null);

  const [infoPatient, setInfoPatient] =
    useState<InformationPatientDetails | null>(null);

  //medical record
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord[]>([]);
  const [
    isCreateMedicalRecordModalVisible,
    setIsCreateMedicalRecordModalVisible,
  ] = useState(false);
  const [medicalRecordForm] = Form.useForm();

  // const [treatmentRoadmap, setTreatmentRoadmap] = useState<treatmentRoadmap[]>(
  //   []
  // );

  // const [medicalRecordDetails, setMedicalRecordDetails] = useState<
  //   MedicalRecordDetail[]
  // >([]);

  // const [treatmentResult_typeTest, settreatmentResult_typeTest] = useState<
  //   TreatmentResult_typeTest[]
  // >([]);

  // const [consulationResult_typeTest, setConsultationResult_TypeTest] = useState<
  //   ConsulationResult_typeTest[]
  // >([]);

  // const [testResults, setTestResults] = useState<TypeTest[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  // const [isTestModalVisible, setIsTestModalVisible] = useState(false);

  //medical record detail
  // const [
  //   isUpdateMedicalDetailModalVisible,
  //   setIsUpdateMedicalDetailModalVisible,
  // ] = useState(false);

  // const [
  //   isCreateMedicalDetailModalVisible,
  //   setIsCreateMedicalDetailModalVisible,
  // ] = useState(false);

  //treatment result - type test
  // const [
  //   isUpdateTreatmentResultModalVisible,
  //   setIsUpdateTreatmentResultModalVisible,
  // ] = useState(false);

  // const [editingTreatmentResult, setEditingTreatmentResult] =
  //   useState<TreatmentResult_typeTest | null>(null);

  // const [treatmentResultForm] = Form.useForm();

  //medical record detail
  // const [editingMedicalDetail, setEditingMedicalDetail] =
  //   useState<MedicalRecordDetail | null>(null);

  // const [medicalDetailForm] = Form.useForm();

  useEffect(() => {
    const fetchInforPatient = async () => {
      if (customerIdNumber !== undefined) {
        const res = await DoctorApi.GetInforPatientDetail(customerIdNumber);
        setInfoPatient(res.data);
      }
    };
    fetchInforPatient();
  }, [customerIdNumber]);

  // useEffect(() => {
  //   const fetchTreatmentRoadmap = async () => {
  //     if (customerIdNumber != null) {
  //       const res = await DoctorApi.GetTreatmentRoadmap1(customerIdNumber);
  //       setTreatmentRoadmap(res.data);
  //     }
  //   };
  //   fetchTreatmentRoadmap();
  // }, [customerIdNumber]);

  // useEffect(() => {
  //   const fetchMedicalRecordDetail = async () => {
  //     if (customerIdNumber != null) {
  //       const res = await DoctorApi.GetMedicalRecordDetails(customerIdNumber);
  //       setMedicalRecordDetails(res.data);
  //     }
  //   };
  //   fetchMedicalRecordDetail();
  // }, [customerIdNumber]);

  // useEffect(() => {
  //   const fetchTreatmentResult_Typetest = async () => {
  //     if (customerIdNumber != null) {
  //       const res = await DoctorApi.GetTreatmentResult_TypeTest(
  //         customerIdNumber
  //       );
  //       const mapped = res.data.map((item) => ({
  //         ...item,
  //         date: dayjs(item.date), // chuẩn hóa về object để format luôn đúng
  //       }));
  //       settreatmentResult_typeTest(mapped);
  //     }
  //   };
  //   fetchTreatmentResult_Typetest();
  // }, [customerIdNumber]);

  // useEffect(() => {
  //   const fetchConsulationR_TestT = async () => {
  //     if (customerIdNumber != null) {
  //       const res = await DoctorApi.GetConsultaionResult_TypeTest(
  //         customerIdNumber
  //       );
  //       console.log("Data fetchConsulationR_TestT:", res.data);
  //       setConsultationResult_TypeTest(res.data);
  //     }
  //   };
  //   fetchConsulationR_TestT();
  // }, [customerIdNumber]);

  //Lấy danh sách medical record
  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        if (customerIdNumber != null) {
          const res = await DoctorApi.GetMedicalRecord(customerIdNumber);
          setMedicalRecord(res.data);
        }
      } catch (error) {
        console.error("Lỗi khi fetch danh sách medical record:", error);
      }
    };
    fetchMedicalRecord();
  }, [customerIdNumber]);

  //Medical record details
  // const showUpdateMedicalDetailModal = (medicalDetail: MedicalRecordDetail) => {
  //   console.log("Clicked medical detail:", medicalDetail);
  //   setEditingMedicalDetail(medicalDetail);
  //   setIsUpdateMedicalDetailModalVisible(true);
  //   medicalDetailForm.setFieldsValue({
  //     date: dayjs(medicalDetail.date),
  //     testResult: medicalDetail.testResult || "",
  //     note: medicalDetail.note || "",
  //     status: medicalDetail.status,
  //   });
  // };

  // const showCreateMedicalDetailModal = () => {
  //   setIsCreateMedicalDetailModalVisible(true);
  //   medicalDetailForm.resetFields();
  // };

  // const showUpdateTreatmentResultModal = (record: TreatmentResult_typeTest) => {
  //   setEditingTreatmentResult(record);
  //   setIsUpdateTreatmentResultModalVisible(true);
  //   treatmentResultForm.setFieldsValue({
  //     dateTreatmentResult: dayjs(record.dateTreatmentResult),
  //     description: record.description,
  //     result: record.result,
  //     typeTest: record.typeTest ?? [],
  //   });
  // };

  //treatment result - type test

  // const handleUpdateTreatmentResult = async (
  //   values: UpdateTreatmentResultFormValues
  // ) => {
  //   if (!editingTreatmentResult) return;

  //   const payload = {
  //     dateTreatmentResult: values.dateTreatmentResult.format("YYYY-MM-DD"),
  //     description: values.description,
  //     result: values.result,
  //     typeTest: values.typeTest.map((item) => ({
  //       typeTestId: item.typeTestId,
  //       name: item.name,
  //       description: item.description,
  //     })),
  //   };

  //   try {
  //     await DoctorApi.UpdateTreatmentResult_TypeTest(
  //       editingTreatmentResult.treatmentResultId,
  //       payload
  //     );

  //     console.log("Cập nhật treatment result: ", payload);

  //     settreatmentResult_typeTest((prev) =>
  //       prev.map((item) =>
  //         item.treatmentResultId === editingTreatmentResult.treatmentResultId
  //           ? { ...item, ...payload, date: payload.dateTreatmentResult }
  //           : item
  //       )
  //     );

  //     message.success("Cập nhật kết quả điều trị thành công");
  //     setIsUpdateTreatmentResultModalVisible(false);
  //   } catch (error) {
  //     console.error("Lỗi cập nhật:", error);
  //     message.error("Cập nhật thất bại");
  //   }
  // };

  // const handleCreateTreatmentResultWithTypeTest = async (values: {
  //   dateTreatmentResult: string;
  //   stage: string;
  //   description: string;
  //   durationDay: number;
  //   result: string;
  //   treatmentRoadmapId: number;
  //   name: string;
  //   descriptionTypeTest: string;
  // }) => {
  //   if (!customerIdNumber) return;

  //   try {
  //     // Chuẩn hóa dữ liệu gửi lên API
  //     const payload = {
  //       ...values,
  //       dateTreatmentResult: dayjs(values.dateTreatmentResult).format(
  //         "YYYY-MM-DD"
  //       ),
  //       durationDay: Number(values.durationDay),
  //     };

  //     console.log("Payload trước khi gửi:", payload);

  //     await DoctorApi.CreateTreatResult_TypeTest(customerIdNumber, payload);

  //     // Sau khi tạo mới, fetch lại danh sách treatment result để cập nhật giao diện
  //     const res = await DoctorApi.GetTreatmentResult_TypeTest(customerIdNumber);
  //     settreatmentResult_typeTest(res.data);

  //     message.success("Tạo mới kết quả điều trị thành công");
  //     setIsUpdateTreatmentResultModalVisible(false); // hoặc set modal tạo mới về false nếu bạn có modal riêng
  //     treatmentResultForm.resetFields();
  //   } catch (error) {
  //     console.error("Lỗi khi tạo mới kết quả điều trị:", error);
  //     message.error("Tạo mới thất bại");
  //   }
  // };

  //Medical record detail

  // const handleUpdateMedicalRecordDetail = async (updated: {
  //   date: string;
  //   testResult?: string;
  //   note?: string;
  //   status: string;
  // }) => {
  //   if (!customerIdNumber || !editingMedicalDetail) return;

  //   try {
  //     await DoctorApi.UpdateMedicalRecordDetail(
  //       customerIdNumber,
  //       editingMedicalDetail.medicalRecordDetailId,
  //       {
  //         date: updated.date,
  //         testResult: updated.testResult || "",
  //         note: updated.note || "",
  //         status: updated.status,
  //       }
  //     );

  //     // Cập nhật state
  //     setMedicalRecordDetails((prev) =>
  //       prev.map((item) =>
  //         item.medicalRecordDetailId ===
  //         editingMedicalDetail.medicalRecordDetailId
  //           ? { ...item, ...updated }
  //           : item
  //       )
  //     );

  //     message.success("Cập nhật hồ sơ bệnh án thành công");
  //     setIsUpdateMedicalDetailModalVisible(false);
  //   } catch (error) {
  //     console.error("Lỗi khi cập nhật hồ sơ bệnh án:", error);
  //     message.error("Cập nhật thất bại");
  //   }
  // };

  // const handleCreateMedicalRecordDetail = async (values: {
  //   treatmentRoadmapId: number;
  //   date: string;
  //   typeName: string;
  //   testResult?: string;
  //   note?: string;
  //   status: string;
  // }) => {
  //   if (!customerIdNumber) return;

  //   try {
  //     const roadmapId = Number(values.treatmentRoadmapId);
  //     const response = await DoctorApi.CreateMedicalRecordDetail(
  //       customerIdNumber,
  //       {
  //         treatmentRoadmapId: roadmapId,
  //         date: values.date,
  //         typeName: values.typeName,
  //         testResult: values.testResult || "",
  //         note: values.note || "",
  //         status: values.status,
  //       }
  //     );

  //     // Tìm roadmap tương ứng để lấy stage và stepNumber
  //     const relatedRoadmap = treatmentRoadmap.find(
  //       (r) => r.treatmentRoadmapId === roadmapId
  //     );

  //     setMedicalRecordDetails((prev) => [
  //       ...prev,
  //       {
  //         medicalRecordDetailId: response.data.medicalRecordDetailId,
  //         treatmentRoadmapId: roadmapId,
  //         date: dayjs(values.date).format("YYYY-MM-DD"),
  //         typeName: values.typeName,
  //         testResult: values.testResult || "",
  //         note: values.note || "",
  //         status: values.status,
  //         stage: relatedRoadmap?.stage || "", // Cung cấp giá trị mặc định nếu cần
  //         stepNumber: relatedRoadmap?.stepNumber || 0, // Cung cấp giá trị mặc định nếu cần
  //       },
  //     ]);

  //     message.success("Tạo mới hồ sơ bệnh án thành công");
  //     setIsCreateMedicalDetailModalVisible(false);
  //     medicalDetailForm.resetFields();
  //   } catch (error) {
  //     console.error("Lỗi khi tạo mới hồ sơ bệnh án:", error);
  //     message.error("Tạo mới thất bại");
  //   }
  // };

  //Consulation result

  // const handleConSulationR_typeTSubmit = (values: TestResultFormValues) => {
  //   const newTrestmentResult: TypeTest = {
  //     typeTestId: Date.now(),
  //     name: values.name,
  //     description: values.description,
  //   };
  //   setTestResults([...testResults, newTrestmentResult]);
  //   setIsTestModalVisible(false);
  //   treatmentResultForm.resetFields();
  // };

  // const mappedTreatmentResults = treatmentResult_typeTest.map((item) => ({
  //   Treatment_result_ID: String(item.treatmentResultId),
  //   Road_ID: String(item.treatmentRoadmapId),
  //   Date: item.dateTreatmentResult,
  //   Description: item.description,
  //   Result: item.result,
  // }));

  //Create medical record

  const handleCreateMedicalRecord = async (value: {
    startDate: string;
    endDate: string;
    stage: string;
    diagnosis: string;
    status: string;
    attempt: number;
  }) => {
    if (!customerId) return;

    try {
      const payload = {
        startDate: dayjs(value.startDate).format("YYYY-MM-DD"),
        endDate: dayjs(value.endDate).format("YYYY-MM-DD"),
        stage: value.stage,
        diagnosis: value.diagnosis,
        status: value.status,
        attempt: value.attempt,
      };
      await DoctorApi.CreateMedicalRecord(Number(customerId), payload);

      const res = await DoctorApi.GetMedicalRecord(Number(customerId));
      setMedicalRecord(res.data);

      message.success("Tạo mới hồ sơ điều trị thành công");
      setIsCreateMedicalRecordModalVisible(false);
      medicalRecordForm.resetFields();
    } catch (error) {
      console.log("lỗi không tạo mới một medical record: ", error);
      message.error("Tạo mới hồ sơ thất bại");
    }
  };

  const [editingRecord, setEditingRecord] = useState<MedicalRecord | null>(
    null
  );
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const showUpdateStatusModal = (record: MedicalRecord) => {
    setEditingRecord(record);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateMedicalRecord = async (
    medicalRecordId: number,
    values: {
      endDate: string;
      stage: string;
      diagnosis: string;
      status: string;
      attempt: number;
    }
  ) => {
    if (!customerIdNumber) return;

    try {
      const payload = {
        endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
        stage: values.stage,
        diagnosis: values.diagnosis,
        status: values.status,
        attempt: Number(values.attempt),
      };

      await DoctorApi.UpdateMedicalRecord(medicalRecordId, payload); // ✅ dùng tham số

      const res = await DoctorApi.GetMedicalRecord(customerIdNumber);
      setMedicalRecord(res.data);
      setIsUpdateModalOpen(false);
      message.success("Cập nhật hồ sơ điều trị thành công");
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ:", error);
      message.error("Cập nhật hồ sơ thất bại");
    }
  };

  const PatientDetailContent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #E91E63 0%, #FCE4EC 100%)",
        padding: "24px"
      }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          marginBottom: 32,
          background: "linear-gradient(135deg, #E91E63, #D81B60)",
          padding: "32px",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(233, 30, 99, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ color: "white", margin: 0, fontSize: "28px" }}>
              Hồ Sơ Điều Trị Chi tiết
            </Title>
            <Text style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "16px" }}>
              Tổng quan về thông tin bệnh nhân và tiến trình điều trị
            </Text>
            <div style={{ marginTop: "12px" }}>
              <Badge
                count={medicalRecord.length}
                style={{
                  backgroundColor: "white",
                  color: "#E91E63",
                  fontWeight: "bold",
                  fontSize: "14px"
                }}
              >
                <Text style={{ color: "white", marginRight: "8px" }}>
                  Tổng hồ sơ điều trị:
                </Text>
              </Badge>
            </div>
          </Col>
        </Row>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          border: "2px solid #E91E63"
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          style={{
            borderRadius: "12px"
          }}
          items={[
            {
              key: "overview",
              label: (
                <span style={{ color: "#E91E63", fontWeight: "600", fontSize: "16px" }}>
                  <UserOutlined style={{ marginRight: "8px" }} />
                  Tổng quan
                </span>
              ),
              children: (
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={12}>
                    <PatientInformation patient={infoPatient} />
                  </Col>
                  <Col xs={24} lg={12}>
                    {/* Thêm nút tạo mới hồ sơ */}
                    <Row
                      justify="space-between"
                      align="middle"
                      style={{ marginBottom: 12 }}
                    >
                      <Col>
                        <Text strong style={{ color: "#ff69b4", fontSize: 16 }}>
                          Danh sách hồ sơ điều trị
                        </Text>
                      </Col>
                      <Col>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            type="primary"
                            icon={<FileAddOutlined />}
                            size="large"
                            style={{
                              backgroundColor: "#E91E63",
                              borderColor: "#E91E63",
                              borderRadius: "12px",
                              boxShadow: "0 4px 16px rgba(233, 30, 99, 0.3)",
                              fontWeight: "600",
                              height: "48px",
                              padding: "0 24px"
                            }}
                            onClick={() =>
                              setIsCreateMedicalRecordModalVisible(true)
                            }
                          >
                            Tạo hồ sơ điều trị
                          </Button>
                        </motion.div>
                      </Col>
                    </Row>

                    <MedicalRecordOverview
                      medicalRecord={medicalRecord}
                      onSelectRecord={(bookingId, medicalRecordId) => {
                        setSelectedBookingId(bookingId);
                        setSelectedMedicalRecordId(medicalRecordId);
                        setActiveTab("medications"); // chuyển sang tab chứa MedicalManagement
                      }}
                      onEditRecord={showUpdateStatusModal} // ✅ truyền ở đây
                      editingRecord={editingRecord}
                      isUpdateModalOpen={isUpdateModalOpen}
                      onCancelUpdate={() => setIsUpdateModalOpen(false)}
                      onUpdateMedicalRecord={handleUpdateMedicalRecord}
                    />
                    <MedicalRecordModal
                      open={isCreateMedicalRecordModalVisible}
                      onCancel={() => setIsCreateMedicalRecordModalVisible(false)}
                      onSubmit={handleCreateMedicalRecord}
                    />
                  </Col>
                </Row>
              ),
            },
            {
              key: "medications",
              label: (
                <span style={{ color: "#E91E63", fontWeight: "600", fontSize: "16px" }}>
                  <MedicineBoxOutlined style={{ marginRight: "8px" }} />
                  Quản lý y tế
                </span>
              ),
              children: (
                <>
                  <MedicalManagement
                    customerId={customerIdNumber!}
                    bookingId={selectedBookingId}
                    medicalRecordId={selectedMedicalRecordId}
                  // treatmentRoadmap={treatmentRoadmap}
                  // treatmentResults={treatmentResult_typeTest}
                  // medicalRecordDetails={medicalRecordDetails}
                  // consulationResults={consulationResult_typeTest}
                  // onAddTest={() => setIsTestModalVisible(true)}
                  // onUpdateTreatmentResult={showUpdateTreatmentResultModal}
                  // onUpdateDetail={showUpdateMedicalDetailModal}
                  // onAddDetail={showCreateMedicalDetailModal}
                  // onAddTreatmentResult={() => {
                  //   setIsUpdateTreatmentResultModalVisible(true);
                  //   setEditingTreatmentResult(null);
                  //   treatmentResultForm.resetFields();
                  // }}
                  />

                  {/* Treatment result - type test */}
                  {/* <TreatmentResultModal
                  open={isUpdateTreatmentResultModalVisible}
                  onCancel={() => setIsUpdateTreatmentResultModalVisible(false)}
                  onSubmit={
                    editingTreatmentResult
                      ? handleUpdateTreatmentResult
                      : handleCreateTreatmentResultWithTypeTest
                  }
                  isEditing={!!editingTreatmentResult}
                  form={treatmentResultForm}
                  treatmentRoadmap={treatmentRoadmap}
                  treatmentResult={editingTreatmentResult}
                /> */}
                  {/* {editingTreatmentResult ? (
                  <TreatmentResultModal
                    open={isUpdateTreatmentResultModalVisible}
                    onCancel={() =>
                      setIsUpdateTreatmentResultModalVisible(false)
                    }
                    onSubmit={handleUpdateTreatmentResult}
                    isEditing={true}
                    form={treatmentResultForm}
                    treatmentRoadmap={treatmentRoadmap}
                    treatmentResult={editingTreatmentResult}
                  />
                ) : (
                  <TreatmentResultModal
                    open={isUpdateTreatmentResultModalVisible}
                    onCancel={() =>
                      setIsUpdateTreatmentResultModalVisible(false)
                    }
                    onSubmit={handleCreateTreatmentResultWithTypeTest}
                    isEditing={false}
                    form={treatmentResultForm}
                    treatmentRoadmap={treatmentRoadmap}
                    treatmentResult={null}
                  />
                )} */}

                  {/* Medical record detail */}
                  {/* <MedicalDetailModal
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
                /> */}

                  {/* Consulation result - type test */}
                  {/* <TestResultModal
                  visible={isTestModalVisible}
                  onCancel={() => setIsTestModalVisible(false)}
                  onSubmit={handleConSulationR_typeTSubmit}
                  treatmentResults={mappedTreatmentResults}
                  medicalRecordDetails={medicalRecordDetails}
                  form={treatmentResultForm}
                /> */}
                </>
              ),
            },
          ]}
        />
      </motion.div>
    </motion.div>
  );

  return (
    <DoctorSidebar>
      <PatientDetailContent />
    </DoctorSidebar>
  );
}
