import { Alert, Collapse } from "antd";
import { TreatmentRoadmap } from "./components/TreatmentRoadmap";
import { TreatmentResults } from "./components/TreatmentResults";
import { MedicalRecordDetails } from "./components/MedicalRecordDetails";
import { ConsulationResults } from "./components/TestResults";
import type {
  ConsulationResult_typeTest,
  MedicalRecordDetail,
  TreatmentResult_typeTest,
  treatmentRoadmap,
} from "../../types/medicalRecord.d";

interface MedicalManagementProps {
  treatmentRoadmap: treatmentRoadmap[];
  treatmentResults: TreatmentResult_typeTest[];
  medicalRecordDetails: MedicalRecordDetail[];
  consulationResults: ConsulationResult_typeTest[];
  onUpdateResult: (roadId: string) => void;
  onAddResult: () => void;
  onAddDetail: () => void;
  onAddTest: () => void;
  onUpdateRoadmap: (roadmap: treatmentRoadmap) => void;
  onUpdateDetail: (medicalDetail: MedicalRecordDetail) => void;
}

export function MedicalManagement({
  treatmentRoadmap,
  treatmentResults,
  medicalRecordDetails,
  consulationResults,
  onUpdateRoadmap,
  onUpdateDetail,
  onAddResult,
  onAddDetail,
  onAddTest,
}: MedicalManagementProps) {
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
                onUpdateRoadmap={onUpdateRoadmap}
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
                treatmentResults={treatmentResults}
                onAddResult={onAddResult}
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
    </div>
  );
}
