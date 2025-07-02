import { Card, Steps } from "antd";
import type { TreatmentOverview } from "../../types/doctor";
import dayjs from "dayjs";

interface TreatmentProgressProps {
  treatmentStages: TreatmentOverview[];
}

export function TreatmentProgress({ treatmentStages }: TreatmentProgressProps) {
  const today = dayjs();

  // Map lại treatmentStages để thêm current và completed
  const mappedStages = treatmentStages.map((stage) => {
    const start = dayjs(stage.date);
    const end = start.add(stage.durationDay, "day");

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

  return (
    <Card
      title={<span style={{ color: "#ff69b4" }}>Treatment Progress</span>}
      style={{
        borderColor: "#ff69b4",
        boxShadow: "0 2px 8px rgba(255, 105, 180, 0.1)",
      }}
    >
      <Steps
        direction="vertical"
        current={currentStep}
        items={mappedStages.map((stage) => ({
          title: stage.stage,
          description: dayjs(stage.date).format("YYYY-MM-DD"),
          status: stage.completed
            ? "finish"
            : stage.current
            ? "process"
            : "wait",
        }))}
        progressDot
        style={{ color: "#ff69b4" }}
      />
    </Card>
  );
}
