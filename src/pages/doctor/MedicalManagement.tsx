import { Alert, Collapse } from "antd";
import { TreatmentRoadmap } from "./components/TreatmentRoadmap";
import { TreatmentResults } from "./components/TreatmentResults";
import { MedicalRecordDetails } from "./components/MedicalRecordDetails";
import { TestResults } from "./components/TestResults";
import type {
  MedicalRecordDetail,
  treatmentRoadmap,
} from "../../types/medicalRecord.d";

interface TreatmentResult {
  Treatment_result_ID: string;
  Road_ID: string;
  Date: string;
  Description: string;
  Result: string;
}

interface TestResult {
  Test_ID: string;
  Treatment_result_ID: string;
  Name: string;
  Description: string;
  Result_ID: string;
  Note: string;
}

interface MedicalManagementProps {
  treatmentRoadmap: treatmentRoadmap[];
  treatmentResults: TreatmentResult[];
  medicalRecordDetails: MedicalRecordDetail[];
  testResults: TestResult[];
  onUpdateResult: (roadId: string) => void;
  onAddResult: () => void;
  onAddDetail: () => void;
  onAddTest: () => void;
}

export function MedicalManagement({
  treatmentRoadmap,
  treatmentResults,
  medicalRecordDetails,
  testResults,
  onUpdateResult,
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
                onUpdateResult={onUpdateResult}
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
              <TestResults testResults={testResults} onAddTest={onAddTest} />
            ),
          },
        ]}
      />
    </div>
  );
}
