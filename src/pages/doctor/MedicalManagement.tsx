import { Alert, Collapse, message, Form } from "antd";
import { TreatmentRoadmap } from "./components/TreatmentRoadmap";
import { TreatmentResults } from "./components/TreatmentResults";
import { MedicalRecordDetails } from "./components/MedicalRecordDetails";
import { ConsulationResults } from "./components/ConsulationResults";
import dayjs from "dayjs";
import type {
  ConsulationResult_typeTest,
  MedicalRecordDetail,
  TreatmentResult_typeTest,
  treatmentRoadmap,
  UpdateTreatmentResultFormValues,
} from "../../types/medicalRecord.d";
import { useEffect, useState } from "react";
import DoctorApi from "../../servers/doctor.api";
import { TreatmentRoadMapModal } from "./components/modals/TreatmentRoadMapModal";
import { TreatmentResultModal } from "./components/modals/TreatmentResultModal";

interface MedicalManagementProps {
  customerId: number;
  bookingId: number | null;
  medicalRecordId: number | null;
  // treatmentRoadmap: treatmentRoadmap[];
  // treatmentResults: TreatmentResult_typeTest[];
  medicalRecordDetails: MedicalRecordDetail[];
  consulationResults: ConsulationResult_typeTest[];
  // onAddTreatmentResult: () => void;
  onAddDetail: () => void;
  onAddTest: () => void;
  // onUpdateTreatmentResult: (treatmentReuslut: TreatmentResult_typeTest) => void;
  onUpdateDetail: (medicalDetail: MedicalRecordDetail) => void;
}

export function MedicalManagement({
  customerId,
  bookingId,
  medicalRecordId,
  medicalRecordDetails,
  consulationResults,
  onUpdateDetail,
  onAddDetail,
  onAddTest,
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
  // const [medicalRecordDetails, setMedicalRecordDetails] = useState<
  //   MedicalRecordDetail[]
  // >([]);

  // const [editingMedicalDetail, setEditingMedicalDetail] =
  //   useState<MedicalRecordDetail | null>(null);

  // const [medicalDetailForm] = Form.useForm();

  //hệ sinh thái của treatment road map
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
        const res = await DoctorApi.GetTreatmentResult_TypeTest(
          customerId,
          bookingId
        );
        const mapped = res.data.map((item) => ({
          ...item,
          date: dayjs(item.date), // chuẩn hóa về object để format luôn đúng
        }));
        settreatmentResult_typeTest(mapped);
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

  // const mappedTreatmentResults = treatmentResult_typeTest.map((item) => ({
  //   Treatment_result_ID: String(item.treatmentResultId),
  //   Road_ID: String(item.treatmentRoadmapId),
  //   Date: item.dateTreatmentResult,
  //   Description: item.description,
  //   Result: item.result,
  // }));

  //Hệ sinh thái medical record detail
  // useEffect(() => {
  //   const fetchMedicalRecordDetail = async () => {
  //     if (medicalRecordId) {
  //       const res = await DoctorApi.GetMedicalRecordDetailByDetailId(
  //         medicalRecordId
  //       );
  //       setMedicalRecordDetail(res.data);
  //     }
  //   };
  //   fetchMedicalRecordDetail();
  // }, [medicalRecordId]);

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
                📝 3. Chi tiết điều trị mỗi ngày (Medical Record Details)
              </span>
            ),
            children: (
              <MedicalRecordDetails
                medicalRecordDetails={medicalRecordDetails}
                onAddDetail={onAddDetail}
                onUpdateDetail={onUpdateDetail}
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
                🧪 4. Ghi chú và đánh giá kết quả xét nghiệm
              </span>
            ),
            children: (
              <ConsulationResults
                consulationResults={consulationResults}
                onAddTest={onAddTest}
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
    </div>
  );
}
