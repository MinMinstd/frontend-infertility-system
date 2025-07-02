import { Card, Statistic } from "antd";
import {
  FileTextOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
} from "@ant-design/icons";

interface PatientOverviewCardsProps {
  patient: {
    progress: number;
    stage: string;
    treatment: string;
    status: string;
  };
}

export function PatientOverviewCards({ patient }: PatientOverviewCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <Card
        className="border border-pink-600 shadow-md rounded-2xl"
        bodyStyle={{ padding: 16 }}
      >
        <Statistic
          title={<span className="text-pink-600">Current Stage</span>}
          value={patient.stage}
          prefix={<FileTextOutlined className="text-pink-600" />}
          valueStyle={{ color: "#ff1493", fontSize: "14px" }}
        />
      </Card>

      <Card
        className="border border-pink-400 shadow-md rounded-2xl"
        bodyStyle={{ padding: 16 }}
      >
        <Statistic
          title={<span className="text-pink-500">Treatment Type</span>}
          value={patient.treatment}
          prefix={<MedicineBoxOutlined className="text-pink-500" />}
          valueStyle={{ color: "#ff69b4" }}
        />
      </Card>

      <Card
        className="border border-pink-600 shadow-md rounded-2xl"
        bodyStyle={{ padding: 16 }}
      >
        <Statistic
          title={<span className="text-pink-600">Status</span>}
          value={patient.status}
          prefix={<HeartOutlined className="text-pink-600" />}
          valueStyle={{ color: "#ff1493" }}
        />
      </Card>
    </div>
  );
}
