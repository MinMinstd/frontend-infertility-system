import { Card, Steps } from "antd";

interface TreatmentStage {
  name: string;
  completed: boolean;
  current?: boolean;
  date: string;
}

interface TreatmentProgressProps {
  treatmentStages: TreatmentStage[];
}

export function TreatmentProgress({ treatmentStages }: TreatmentProgressProps) {
  const currentStep = treatmentStages.findIndex((stage) => stage.current);

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
        items={treatmentStages.map((stage) => ({
          title: stage.name,
          description: stage.date,
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
