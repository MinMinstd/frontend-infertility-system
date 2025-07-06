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
} from "../../types/medicalRecord.d";
import { useEffect, useState } from "react";
import DoctorApi from "../../servers/doctor.api";
import { TreatmentRoadMapModal } from "./components/modals/TreatmentRoadMapModal";

interface MedicalManagementProps {
  customerId: number;
  bookingId: number | null;
  medicalRecordId: number | null;
  treatmentRoadmap: treatmentRoadmap[];
  treatmentResults: TreatmentResult_typeTest[];
  medicalRecordDetails: MedicalRecordDetail[];
  consulationResults: ConsulationResult_typeTest[];
  onUpdateResult: (roadId: string) => void;
  onAddTreatmentResult: () => void;
  onAddDetail: () => void;
  onAddTest: () => void;
  // onUpdateRoadmap: (roadmap: treatmentRoadmap) => void;
  onUpdateTreatmentResult: (treatmentReuslut: TreatmentResult_typeTest) => void;
  onUpdateDetail: (medicalDetail: MedicalRecordDetail) => void;
}

export function MedicalManagement({
  customerId,
  bookingId,
  treatmentResults,
  medicalRecordDetails,
  consulationResults,
  onUpdateTreatmentResult,
  onUpdateDetail,
  onAddTreatmentResult,
  onAddDetail,
  onAddTest,
}: MedicalManagementProps) {
  const [treatmentRoadmap, setTreatmentRoadmap] = useState<treatmentRoadmap[]>(
    []
  );
  const [isUpdateRoadmapModalVisible, setIsUpdateRoadmapModalVisible] =
    useState(false);
  const [editingRoadmap, setEditingRoadmap] = useState<treatmentRoadmap | null>(
    null
  );
  const [updateForm] = Form.useForm();

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
                treatmentResults={treatmentResults} //hiển thị thông tin
                onAddTreatmentResult={onAddTreatmentResult}
                onUpdateTreatmentResult={onUpdateTreatmentResult}
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
    </div>
  );
}
