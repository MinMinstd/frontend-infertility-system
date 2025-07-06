import { Button, Card, Steps, Tag } from "antd";
import dayjs from "dayjs";
import type { MedicalRecord } from "../../types/medicalRecord.d";

interface MedicalRecordProps {
  medicalRecord: MedicalRecord[];
  onSelectRecord: (bookingId: number, medicalRecordId: number) => void;
}

export function MedicalRecordOverview({
  medicalRecord,
  onSelectRecord,
}: MedicalRecordProps) {
  const today = dayjs();

  // Xác định current step
  const mappedStages = medicalRecord.map((stage) => {
    const start = dayjs(stage.startDate);
    const end = dayjs(stage.endDate);

    const current =
      today.isAfter(start.subtract(1, "day")) && today.isBefore(end);
    const completed = today.isAfter(end);

    return {
      ...stage,
      current,
      completed,
    };
  });

  const currentStep = mappedStages.findIndex((stage) => stage.current);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "thành công":
        return "green";
      case "thất bại":
        return "red";
      case "đang điều trị":
        return "blue";
      default:
        return "default";
    }
  };

  return (
    <Card
      title={<span style={{ color: "#ff69b4" }}>Tiến Trình Điều Trị</span>}
      style={{
        borderColor: "#ff69b4",
        boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
      }}
    >
      <Steps
        direction="vertical"
        current={currentStep}
        items={mappedStages.map((stage) => ({
          title: `Lần ${stage.attempt}: ${stage.stage}`,
          description: (
            <div className="text-sm text-gray-600">
              <div>
                <strong>Thời gian:</strong>{" "}
                {dayjs(stage.startDate).format("DD/MM/YYYY")} –{" "}
                {dayjs(stage.endDate).format("DD/MM/YYYY")}
              </div>
              <div>
                <strong>Chẩn đoán:</strong> {stage.diagnosis}
              </div>
              <div>
                <strong>Trạng thái:</strong>{" "}
                <Tag color={getStatusColor(stage.status)}>{stage.status}</Tag>
              </div>

              {/* Nút điều hướng tới MedicalManager */}
              <Button
                type="primary"
                size="small"
                className="mt-2"
                style={{
                  backgroundColor: "#ff69b4",
                  borderColor: "#ff69b4",
                  marginTop: 8,
                }}
                onClick={() =>
                  onSelectRecord(stage.bookingId, stage.medicalRecordId)
                }
              >
                Xem chi tiết
              </Button>
            </div>
          ),
          status: stage.completed
            ? "finish"
            : stage.current
            ? "process"
            : "wait",
        }))}
        progressDot
      />
    </Card>
  );
}
