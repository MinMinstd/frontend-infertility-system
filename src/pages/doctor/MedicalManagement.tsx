import { Alert, Collapse, message, Form } from "antd";
import { TreatmentRoadmap } from "./components/TreatmentRoadmap";
import { TreatmentResults } from "./components/TreatmentResults";
import { MedicalRecordDetails } from "./components/MedicalRecordDetails";
import { ConsulationResults } from "./components/ConsulationResults";
import dayjs from "dayjs";
import type {
  ConsulationResult_typeTest,
  CreateEmbryo,
  CreateMedicalRecordDetail,
  Embryo,
  MedicalRecordDetail,
  TreatmentResult_typeTest,
  treatmentRoadmap,
  TypeTest,
  UpdateConsulation,
  UpdateEmbryo,
  UpdateTreatmentResultFormValues,
} from "../../types/medicalRecord.d";
import { useEffect, useState } from "react";
import DoctorApi from "../../servers/doctor.api";
import { TreatmentRoadMapModal } from "./components/modals/TreatmentRoadMapModal";
import { TreatmentResultModal } from "./components/modals/TreatmentResultModal";
import { MedicalDetailModal } from "./components/modals/MedicalDetailModal";
import { UpdateMedicalDetailModal } from "./components/modals/UpdateMedicalDetailModal";
import { TestResultModal } from "./components/modals/TestResultModal";
import { CreateTypeTestModal } from "./components/modals/TypeTest.Modal";
import { EmbryoStorage } from "./components/EmbryoStorage";
import { CreateEmbryoModal } from "./components/modals/CreateEmbryoModal";
import { UpdateEmbryoModal } from "./components/modals/UpdateEmbryoModal";
import { UpdateConsulationResultModal } from "./components/modals/UpdateConsulationReultModal";

interface MedicalManagementProps {
  customerId: number;
  bookingId: number | null;
  medicalRecordId: number | null;
}

export function MedicalManagement({
  customerId,
  bookingId,
  medicalRecordId,
}: MedicalManagementProps) {
  //road map
  const [treatmentRoadmap, setTreatmentRoadmap] = useState<treatmentRoadmap[]>(
    []
  );
  const [isUpdateRoadmapModalVisible, setIsUpdateRoadmapModalVisible] =
    useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState<treatmentRoadmap | null>(
    null
  );
  const [updateForm] = Form.useForm();

  //treatment result - type test
  const [treatmentResult_typeTest, settreatmentResult_typeTest] = useState<
    TreatmentResult_typeTest[]
  >([]);

  const [editingTreatmentResult, setEditingTreatmentResult] =
    useState<TreatmentResult_typeTest | null>(null);

  const [
    isUpdateTreatmentResultModalVisible,
    setIsUpdateTreatmentResultModalVisible,
  ] = useState(false);

  const [treatmentResultForm] = Form.useForm();

  //medical record detail
  const [medicalRecordDetail, setMedicalRecordDetail] = useState<
    MedicalRecordDetail[]
  >([]);

  const [
    isUpdateMedicalDetailModalVisible,
    setIsUpdateMedicalDetailModalVisible,
  ] = useState(false);

  const [
    isCreateMedicalDetailModalVisible,
    setIsCreateMedicalDetailModalVisible,
  ] = useState(false);

  const [editingMedicalDetail, setEditingMedicalDetail] =
    useState<MedicalRecordDetail | null>(null);

  const [medicalDetailForm] = Form.useForm();

  // consulation result - type test
  const [consulationResult_typeTest, setConsultationResult_TypeTest] = useState<
    ConsulationResult_typeTest[]
  >([]);
  const [isTestModalVisible, setIsTestModalVisible] = useState(false);
  const [isEditConsulationModalVisible, setIsEditConsulationModalVisible] =
    useState(false);
  const [editConsulationResult, setEditConsulationResult] =
    useState<ConsulationResult_typeTest | null>(null);
  const [testResults, setTestResults] = useState<TypeTest[]>([]);
  const [consulationResultForm] = Form.useForm();

  //type test
  const [isCreateTypeTestModalVisible, setIsCreateTypeTestModalVisible] =
    useState(false);

  // hệ sinh thái của treatment road map
  useEffect(() => {
    const fetchRoadmap = async () => {
      if (customerId && bookingId) {
        try {
          const resRoadmap = await DoctorApi.GetTreatmentRoadmap(
            customerId,
            bookingId
          );
          setTreatmentRoadmap(resRoadmap.data);
        } catch (error) {
          console.log("Lỗi khi gọi API GetTreatmentRoadmap:", error);
        }
      }
    };
    fetchRoadmap();
  }, [customerId, bookingId]);

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

  const handleUpdateTreatmentRoadmap = async (updated: treatmentRoadmap) => {
    if (!customerId || !editingRoadmap) return;

    const payload = {
      date: updated.date,
      stage: updated.stage,
      description: updated.description,
      durationDay: updated.durationDay,
      status: updated.status,
    };

    try {
      await DoctorApi.UpdateTreatmentRoadmap(
        customerId,
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

  //hệ sinh thái treatment result - type test
  useEffect(() => {
    const fetchTreatmentResult_Typetest = async () => {
      if (customerId && bookingId) {
        try {
          const res = await DoctorApi.GetTreatmentResult_TypeTest(
            customerId,
            bookingId
          );
          console.log("Treatment result mới đây nè: ", res.data);
          const mapped = res.data.map((item) => ({
            ...item,
            date: dayjs(item.date), // chuẩn hóa về object để format luôn đúng
          }));
          settreatmentResult_typeTest(mapped);
        } catch (error) {
          // Xử lý lỗi ở đây, ví dụ:
          console.error("Lỗi lấy treatment result:", error);
          // hoặc set trạng thái lỗi cho UI, ví dụ:
          // setError("Không thể lấy dữ liệu kết quả điều trị!");
        }
      }
    };
    fetchTreatmentResult_Typetest();
  }, [customerId, bookingId]);

  const showUpdateTreatmentResultModal = (record: TreatmentResult_typeTest) => {
    setEditingTreatmentResult(record);
    setIsUpdateTreatmentResultModalVisible(true);
    treatmentResultForm.setFieldsValue({
      dateTreatmentResult: dayjs(record.dateTreatmentResult),
      description: record.description,
      result: record.result,
      typeTest: record.typeTest ?? [],
    });
  };

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

      console.log("Cập nhật treatment result: ", payload);

      settreatmentResult_typeTest((prev) =>
        prev.map((item) =>
          item.treatmentResultId === editingTreatmentResult.treatmentResultId
            ? { ...item, ...payload, date: payload.dateTreatmentResult }
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

  const handleCreateTreatmentResultWithTypeTest = async (values: {
    dateTreatmentResult: string;
    stage: string;
    description: string;
    durationDay: number;
    result: string;
    treatmentRoadmapId: number;
    name: string;
    descriptionTypeTest: string;
  }) => {
    if (!customerId && !bookingId) return;

    try {
      // Chuẩn hóa dữ liệu gửi lên API
      const payload = {
        ...values,
        dateTreatmentResult: dayjs(values.dateTreatmentResult).format(
          "YYYY-MM-DD"
        ),
        durationDay: Number(values.durationDay),
      };

      console.log("Payload trước khi gửi:", payload);

      await DoctorApi.CreateTreatResult_TypeTest(customerId, payload);

      if (!customerId || !bookingId) return;
      // Sau khi tạo mới, fetch lại danh sách treatment result để cập nhật giao diện
      const res = await DoctorApi.GetTreatmentResult_TypeTest(
        customerId,
        bookingId
      );
      settreatmentResult_typeTest(res.data);

      message.success("Tạo mới kết quả điều trị thành công");
      setIsUpdateTreatmentResultModalVisible(false); // hoặc set modal tạo mới về false nếu bạn có modal riêng
      treatmentResultForm.resetFields();
    } catch (error) {
      console.error("Lỗi khi tạo mới kết quả điều trị:", error);
      message.error("Tạo mới thất bại");
    }
  };

  //Hệ sinh thái medical record detail
  useEffect(() => {
    const fetchMedicalRecordDetail = async () => {
      if (medicalRecordId) {
        try {
          const res = await DoctorApi.GetMedicalRecordDetailByDetailId(
            medicalRecordId
          );
          console.log("Medical record của bệnh nhân mới nè:", res.data);
          setMedicalRecordDetail(res.data);
        } catch (error) {
          console.log("Lỗi không thể load medical record detail: ", error);
        }
      }
    };
    fetchMedicalRecordDetail();
  }, [medicalRecordId]);

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

  const handleUpdateMedicalRecordDetail = async (updated: {
    date: string;
    testResult?: string;
    note?: string;
    status: string;
  }) => {
    if (!customerId || !editingMedicalDetail) return;

    // Validation
    if (!updated.date || !updated.status) {
      message.error("Ngày và trạng thái là bắt buộc!");
      return;
    }


    // Xử lý format date an toàn
    let formattedDate: string;
    
    if (dayjs.isDayjs(updated.date)) {
      formattedDate = updated.date.format("YYYY-MM-DD");
    } else {
      // Thử parse với nhiều format khác nhau
      const parsedDate = dayjs(updated.date, ["DD/MM/YYYY", "YYYY-MM-DD", "MM/DD/YYYY"], true);
      
      if (!parsedDate.isValid()) {
        message.error("Định dạng ngày không hợp lệ!");
        return;
      }
      
      formattedDate = parsedDate.format("YYYY-MM-DD");
    }


    console.log("Data gửi đi:", {
      date: formattedDate, // phải là "2025-07-24"
      testResult: updated.testResult?.trim() || "N/A",
      note: updated.note || "",
      status: updated.status,
    });

    try {
      await DoctorApi.UpdateMedicalRecordDetail(
        customerId,
        editingMedicalDetail.medicalRecordDetailId,
        {
          date: formattedDate,
          testResult: updated.testResult?.trim() || "N/A",
          note: updated.note || "",
          status: updated.status,
        }
      );

      // Cập nhật state
      setMedicalRecordDetail((prev) =>
        prev.map((item) =>
          item.medicalRecordDetailId ===
            editingMedicalDetail.medicalRecordDetailId
            ? {
              ...item,
              date: formattedDate,
              testResult: updated.testResult?.trim() || "N/A",
              note: updated.note || "",
              status: updated.status,
            }
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

  const handleCreateMedicalRecordDetail = async (
    values: CreateMedicalRecordDetail
  ) => {
    if (!customerId || medicalRecordId == null) return;

    try {
      const roadmapId = Number(values.treatmentRoadmapId);
      const consulationRId = Number(values.consulationResultId);
      const treatmentResultId = Number(values.treatmentResultId);
      const response = await DoctorApi.CreateMedicalRecordDetail(
        medicalRecordId,
        {
          treatmentRoadmapId: roadmapId,
          consulationResultId: consulationRId,
          treatmentResultId: treatmentResultId,
          date: values.date,
          typeName: values.typeName,
          testResult: values.testResult || "",
          note: values.note || "",
          status: values.status,
        }
      );

      console.log("Hồ sơ bệnh án được gửi xuống backend : ", response.data);
      // Tìm roadmap tương ứng để lấy stage và stepNumber
      const relatedRoadmap = treatmentRoadmap.find(
        (r) => r.treatmentRoadmapId === roadmapId
      );

      if (!relatedRoadmap) {
        message.error("Không tìm thấy giai đoạn điều trị tương ứng");
        return;
      }

      setMedicalRecordDetail((prev) => [
        ...prev,
        {
          medicalRecordDetailId: response.data.medicalRecordDetailId,
          treatmentRoadmapId: roadmapId,
          consulationResultId: consulationRId,
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

  //Hệ sinh thái consulation result  - type test
  useEffect(() => {
    const fetchConsulationR_typeT = async () => {
      try {
        if (customerId && bookingId) {
          const res = await DoctorApi.GetConsultaionResult_TypeTests(
            customerId,
            bookingId
          );
          setConsultationResult_TypeTest(res.data);
        }
      } catch (error) {
        console.log("Lỗi khi lấy consulation result type test", error);
      }
    };
    fetchConsulationR_typeT();
  }, [customerId, bookingId]);

  const showAddConsulationR_typeTest = () => {
    setIsTestModalVisible(true);
    consulationResultForm.resetFields();
  };

  const showEditConsulationModal = (record: ConsulationResult_typeTest) => {
    setEditConsulationResult(record);
    setIsEditConsulationModalVisible(true);
    consulationResultForm.setFieldsValue({
      date: dayjs(record.date),
      resultValue: record.resultValue,
      note: record.note,
      typeTest: record.typeTests ?? [],
    });
  };

  const handleCreateConSulationR_typeT = async (values: {
    date: string;
    resultValue: string;
    note: string;
    name: string;
    descriptionTypeTest: string;
  }) => {
    if (!customerId || !bookingId) return;

    try {
      // Chuẩn hóa dữ liệu gửi lên API
      const payload = {
        date: dayjs().format("YYYY-MM-DD"), // Ngày hiện tại hoặc từ form nếu có
        resultValue: values.resultValue || "",
        note: values.note || "", // Ghi chú từ description trong form
        name: values.name, // Tên xét nghiệm
        descriptionTypeTest: values.descriptionTypeTest, // Mô tả loại xét nghiệm
      };
      console.log(
        "Dữ liệu từ form gửi lên backend của consulation : ",
        payload
      );
      // Gọi API để tạo mới kết quả xét nghiệm
      await DoctorApi.CreateConsulationResult_typeTest(
        customerId,
        bookingId,
        payload
      );

      // Sau khi tạo mới, fetch lại danh sách để cập nhật giao diện
      const res = await DoctorApi.GetConsultaionResult_TypeTests(
        customerId,
        bookingId
      );
      setConsultationResult_TypeTest(res.data);

      // Thêm vào state testResults nếu cần
      const newTypeTest: TypeTest = {
        typeTestId: Date.now(),
        name: values.name,
        description: values.descriptionTypeTest,
      };
      setTestResults([...testResults, newTypeTest]);

      // Hiển thị thông báo thành công và đóng modal
      message.success("Tạo mới kết quả xét nghiệm thành công");
      setIsTestModalVisible(false);
      treatmentResultForm.resetFields();
    } catch (error) {
      console.error("Lỗi khi tạo mới kết quả xét nghiệm:", error);
      message.error("Tạo mới thất bại");
    }
  };

  const handleUpdateConsulationResult = async (values: UpdateConsulation) => {
    if (!editConsulationResult) return;

    try {
      // 1️⃣ Chuẩn hóa payload
      const payload = {
        date: dayjs(values.date).format("YYYY-MM-DD"),
        resultValue: values.resultValue,
        note: values.note,
        typeTest: values.typeTest,
      };

      // 2️⃣ Gọi API update
      await DoctorApi.UpdateConsulationResult_TypeTest(
        editConsulationResult.consulationResultId,
        payload
      );

      // 3️⃣ Refresh danh sách
      const res = await DoctorApi.GetConsultaionResult_TypeTests(
        customerId,
        bookingId!
      );
      setConsultationResult_TypeTest(res.data);

      // 4️⃣ UI feedback + đóng modal
      message.success("Cập nhật kết quả khám thành công");
      setEditConsulationResult(null);
      setIsEditConsulationModalVisible(false);
    } catch (err) {
      console.error("Lỗi khi cập nhật:", err);
      message.error("Cập nhật thất bại");
    }
  };

  //type test dành consulation result
  const handleCreateTypeTest = async (values: {
    name: string;
    description: string;
    consulationResultId: number; // Add consulationResultId to values
  }) => {
    if (!customerId || !values.consulationResultId) return;

    try {
      await DoctorApi.CreateTypeTest(customerId, values.consulationResultId, {
        name: values.name,
        description: values.description,
      });

      message.success("Tạo mới type test thành công");
      setIsTestModalVisible(false);
      consulationResultForm.resetFields();

      // Refresh consultation results after creating new type test
      if (bookingId) {
        const res = await DoctorApi.GetConsultaionResult_TypeTests(
          customerId,
          bookingId
        );
        setConsultationResult_TypeTest(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi tạo mới type test:", error);
      message.error("Tạo mới thất bại");
    }
  };

  const mappedTreatmentResults = treatmentResult_typeTest.map((item) => ({
    Treatment_result_ID: String(item.treatmentResultId),
    Road_ID: String(item.treatmentRoadmapId),
    Date: item.dateTreatmentResult,
    Description: item.description,
    Result: item.result,
  }));

  ///hệ sinh thái Lưu trữ phôi ở đây
  const [embryos, setEmbryos] = useState<Embryo[]>([]);
  const [isCreateEmbryoModalVisible, setIsCreateEmbryoModalVisible] =
    useState(false);
  const [editingEmbryo, setEditingEmbryo] = useState<Embryo | null>(null);
  const [isUpdateEmbryoModalVisible, setIsUpdateEmbryoModalVisible] =
    useState(false);
  const [updateEmbryoForm] = Form.useForm();
  const [embryoForm] = Form.useForm();

  useEffect(() => {
    const fetchEmbryos = async () => {
      if (customerId && bookingId) {
        try {
          const res = await DoctorApi.GetListEmbryos(customerId, bookingId);
          setEmbryos(res.data);
        } catch (error) {
          console.log("Lỗi khi lấy danh sách phôi trứng", error);
        }
      }
    };
    fetchEmbryos();
  }, [customerId, bookingId]);

  const handleCreateEmbryo = async (value: CreateEmbryo) => {
    if (!customerId || !bookingId) {
      console.log("Not Have customer id or booking id");
      return;
    }

    try {
      const payload = {
        ...value,
        createAt: dayjs().format("YYYY-MM-DD"),
      };
      console.log("Thuoc tinh embryo gui suong backend: ", payload);
      await DoctorApi.CreateEmbryo(bookingId, payload);

      //Cap nhat lai danh sach embryo moi
      const res = await DoctorApi.GetListEmbryos(customerId, bookingId);
      setEmbryos(res.data);
      setIsCreateEmbryoModalVisible(false);
      embryoForm.resetFields();
    } catch (error) {
      console.log("Tao embryo moi bi loi", error);
    }
  };

  const handleUpdateEmbryo = async (value: UpdateEmbryo) => {
    if (!editingEmbryo) return;

    try {
      const payload = {
        ...value,
        transferredAt: dayjs(value.transferredAt).format("YYYY-MM-DD"),
      };

      await DoctorApi.UpdateEmbryo(editingEmbryo.embryoId, payload);

      if (!customerId || !bookingId) return;
      const res = await DoctorApi.GetListEmbryos(customerId, bookingId);
      setEmbryos(res.data);

      message.success("Cập nhật phôi thành công");
      setIsUpdateEmbryoModalVisible(false);
      setEditingEmbryo(null);
      updateEmbryoForm.resetFields();
    } catch (error) {
      console.error("Lỗi cập nhật phôi", error);
      message.error("Cập nhật thất bại");
    }
  };

  return (
    <div style={{ marginTop: 24 }}>
      <Alert
        message="Quản lý hồ sơ điều trị"
        description="Theo dõi tiến độ, cập nhật kết quả và quản lý chi tiết điều trị của bệnh nhân"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      <Collapse
        defaultActiveKey={["1"]}
        items={[
          {
            key: "1",
            label: (
              <span
                style={{
                  color: "#ff69b4",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                🗺️ 1. Theo dõi tiến độ các bước điều trị (Treatment Roadmap)
              </span>
            ),
            children: (
              <TreatmentRoadmap
                treatmentRoadmap={treatmentRoadmap}
                onUpdateRoadmap={showUpdateRoadmapModal}
              />
            ),
          },
          {
            key: "2",
            label: (
              <span
                style={{
                  color: "#ff69b4",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                ✏️ 2. Cập nhật kết quả từng bước điều trị
              </span>
            ),
            children: (
              <TreatmentResults
                treatmentResults={treatmentResult_typeTest} //hiển thị thông tin
                onAddTreatmentResult={() => {
                  setIsUpdateTreatmentResultModalVisible(true);
                  setEditingTreatmentResult(null);
                  treatmentResultForm.resetFields();
                }}
                onUpdateTreatmentResult={showUpdateTreatmentResultModal}
              />
            ),
          },
          {
            key: "3",
            label: (
              <span
                style={{
                  color: "#ff69b4",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                🧪 3. Ghi chú và đánh giá kết quả xét nghiệm
              </span>
            ),
            children: (
              <ConsulationResults
                consulationResults={consulationResult_typeTest}
                onAddTest={showAddConsulationR_typeTest}
                onAddTypeTest={() => setIsCreateTypeTestModalVisible(true)}
                onUpdateConsulationResult={showEditConsulationModal}
              />
            ),
          },
          {
            key: "4",
            label: (
              <span
                style={{
                  color: "#ff69b4",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                📝 4. Chi tiết điều trị mỗi ngày (Medical Record Details)
              </span>
            ),
            children: (
              <MedicalRecordDetails
                medicalRecordDetails={medicalRecordDetail}
                onAddDetail={showCreateMedicalDetailModal}
                onUpdateDetail={showUpdateMedicalDetailModal}
              />
            ),
          },
          {
            key: "5",
            label: (
              <span
                style={{
                  color: "#ff69b4",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                📦 5. Phôi Lưu trữ (Embryo Storage)
              </span>
            ),
            children: (
              <EmbryoStorage
                embryos={embryos}
                onCreateEmbryo={() => setIsCreateEmbryoModalVisible(true)} // ✅ mở modal
                onUpdateEmbryo={(embryo) => {
                  setEditingEmbryo(embryo);
                  setIsUpdateEmbryoModalVisible(true);
                  updateEmbryoForm.setFieldsValue({
                    transferredAt: dayjs(embryo.transferredAt),
                    type: embryo.type,
                    status: embryo.status,
                    note: embryo.note,
                  });
                }}
              />
            ),
          },
        ]}
      />

      {/* //Hiển thị bảng chức năng */}
      {/* Road map */}
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

      {/* treatment result - typetes */}
      {editingTreatmentResult ? (
        <TreatmentResultModal
          open={isUpdateTreatmentResultModalVisible}
          onCancel={() => setIsUpdateTreatmentResultModalVisible(false)}
          onSubmit={handleUpdateTreatmentResult}
          isEditing={true}
          form={treatmentResultForm}
          treatmentRoadmap={treatmentRoadmap}
          treatmentResult={editingTreatmentResult}
        />
      ) : (
        <TreatmentResultModal
          open={isUpdateTreatmentResultModalVisible}
          onCancel={() => setIsUpdateTreatmentResultModalVisible(false)}
          onSubmit={handleCreateTreatmentResultWithTypeTest}
          isEditing={false}
          form={treatmentResultForm}
          treatmentRoadmap={treatmentRoadmap}
          treatmentResult={null}
        />
      )}

      {/* Medical record detail */}
      <UpdateMedicalDetailModal
        open={isUpdateMedicalDetailModalVisible}
        onCancel={() => setIsUpdateMedicalDetailModalVisible(false)}
        onSubmit={handleUpdateMedicalRecordDetail}
        form={medicalDetailForm}
      />
      <MedicalDetailModal
        open={isCreateMedicalDetailModalVisible}
        onCancel={() => setIsCreateMedicalDetailModalVisible(false)}
        onSubmit={(values) => {
          handleCreateMedicalRecordDetail({
            ...values,
            consulationResultId: values.consulationResultId,
            date: dayjs(values.date).format("YYYY-MM-DD"), // Đã xử lý trong hàm handle
          });
        }}
        treatmentRoadmap={treatmentRoadmap}
        treatmentResults={treatmentResult_typeTest}
        consulationResults={consulationResult_typeTest}
        form={medicalDetailForm}
        isEditing={false}
      />

      {/* Consulation result - type test  (tạo mới) + (cập nhật)*/}
      <TestResultModal
        visible={isTestModalVisible}
        onCancel={() => setIsTestModalVisible(false)}
        onCreateConsulation={handleCreateConSulationR_typeT}
        treatmentResults={mappedTreatmentResults}
        medicalRecordDetails={medicalRecordDetail}
        form={consulationResultForm}
      />
      <UpdateConsulationResultModal
        open={isEditConsulationModalVisible}
        onCancel={() => {
          setIsEditConsulationModalVisible(false);
          setEditConsulationResult(null);
        }}
        initialValues={
          editConsulationResult && {
            date: editConsulationResult.date,
            resultValue: editConsulationResult.resultValue,
            note: editConsulationResult.note,
            typeTest: editConsulationResult.typeTests || [],
          }
        }
        typeTest={testResults}
        onSubmit={(values) => {
          const payload: UpdateConsulation = {
            date: values.date.format("YYYY-MM-DD"),
            resultValue: values.resultValue,
            note: values.note || "",
            typeTest: values.typeTest || []
          };
          handleUpdateConsulationResult(payload);
        }}
      />

      {/* ----------------------------------------------------------------- */}
      {/* Type test  */}
      <CreateTypeTestModal
        visible={isCreateTypeTestModalVisible}
        onCancel={() => setIsCreateTypeTestModalVisible(false)}
        onSubmit={handleCreateTypeTest}
        consulationResults={consulationResult_typeTest}
      />

      {/* Phôi lưu trữ */}
      <CreateEmbryoModal
        open={isCreateEmbryoModalVisible}
        onCancel={() => setIsCreateEmbryoModalVisible(false)}
        onSubmit={handleCreateEmbryo}
        form={embryoForm}
      />
      <UpdateEmbryoModal
        open={isUpdateEmbryoModalVisible}
        onCancel={() => {
          setIsUpdateEmbryoModalVisible(false);
          setEditingEmbryo(null);
          updateEmbryoForm.resetFields();
        }}
        onSubmit={handleUpdateEmbryo}
        form={updateEmbryoForm}
        embryo={editingEmbryo}
      />
    </div>
  );
}
