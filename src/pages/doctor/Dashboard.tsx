import { useEffect, useState } from "react";
import { Card, Typography, Row, Col, Statistic, Space, Spin } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import { DoctorSidebar } from "./DoctorSidebar";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import DoctorApi from "../../servers/doctor.api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const { Title } = Typography;

// Interface cho Chart.js data
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
    fill: boolean;
  }[];
}

// Mock data - thay thế bằng API thực tế sau này
// const mockData = {
//   totalPatients: 127, // Tổng số bệnh nhân từ Customers
//   activeRecords: 23, // Hồ sơ điều trị đang theo dõi (status ≠ "Thành công")
//   completedSteps: 45, // Bước điều trị hoàn tất (status = "Complete")
//   doctorAppointments: 89, // Số lượt khám bác sĩ đã thực hiện
//   monthlyRecords: {
//     "Th1 2024": 8,
//     "Th2 2024": 12,
//     "Th3 2024": 15,
//     "Th4 2024": 18,
//     "Th5 2024": 22,
//     "Th6 2024": 25,
//     "Th7 2024": 20,
//     "Th8 2024": 28,
//     "Th9 2024": 30,
//     "Th10 2024": 26,
//     "Th11 2024": 32,
//     "Th12 2024": 35,
//   },
// };

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalPatients: 0,
    activeRecords: 0,
    completedSteps: 0,
    doctorAppointments: 0,
  });
  const [chartData, setChartData] = useState<ChartData | null>(null);

  const groupByMonth = (records: { startDate: string }[]) => {
    const result: Record<string, number> = {};

    records.forEach((r) => {
      const date = new Date(r.startDate);
      const label = date.toLocaleString("vi-VN", {
        month: "short", // "Thg 7"
        year: "numeric", // "2025"
      });

      result[label] = (result[label] || 0) + 1;
    });

    return result;
  };




  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {

        const [totalPatients, completedSteps, activeRecords, doctorAppointments, chart] = await Promise.all([
          DoctorApi.GetAmountPatient(),
          DoctorApi.GetAmountMdStatisSuccess(),
          DoctorApi.GetAmountMedicalRecord(),
          DoctorApi.GetAmountBooking(),
          DoctorApi.GetStatisForChartDashboard(),
        ]);

        const grouped = groupByMonth(chart.data);

        // Set mock data
        setDashboardStats({
          totalPatients: totalPatients.data,
          activeRecords: activeRecords.data,
          completedSteps: completedSteps.data,
          doctorAppointments: doctorAppointments.data,
        });

        // Prepare chart data
        setChartData({
          labels: Object.keys(grouped),
          datasets: [
            {
              label: "Hồ sơ điều trị theo tháng",
              data: Object.values(chart.data),
              borderColor: "#ff69b4",
              backgroundColor: "rgba(255, 105, 180, 0.1)",
              tension: 0.4,
              fill: true,
            },
          ],

        });
      } catch (err) {
        console.error("Dashboard load error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DoctorSidebar>
      <div>
        <Title level={2} style={{ color: "#ff69b4" }}>
          Thống kê số liệu điều trị
        </Title>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Space direction="vertical" size="large" className="w-full">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={6}>
                <Card
                  style={{
                    borderColor: "#ff69b4",
                    boxShadow: "0 4px 12px rgba(255, 105, 180, 0.15)",
                  }}
                >
                  <Statistic
                    title={
                      <span style={{ color: "#ff69b4", fontWeight: 600 }}>
                        Tổng số bệnh nhân
                      </span>
                    }
                    value={dashboardStats.totalPatients}
                    prefix={<UserOutlined style={{ color: "#ff69b4" }} />}
                    valueStyle={{ color: "#ff69b4", fontSize: "24px" }}
                  />

                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card
                  style={{
                    borderColor: "#ff1493",
                    boxShadow: "0 4px 12px rgba(255, 20, 147, 0.15)",
                  }}
                >
                  <Statistic
                    title={
                      <span style={{ color: "#ff1493", fontWeight: 600 }}>
                        Hồ sơ điều trị đang theo dõi
                      </span>
                    }
                    value={dashboardStats.activeRecords}
                    prefix={<FileTextOutlined style={{ color: "#ff1493" }} />}
                    valueStyle={{ color: "#ff1493", fontSize: "24px" }}
                  />

                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card
                  style={{
                    borderColor: "#ff69b4",
                    boxShadow: "0 4px 12px rgba(255, 105, 180, 0.15)",
                  }}
                >
                  <Statistic
                    title={
                      <span style={{ color: "#ff69b4", fontWeight: 600 }}>
                        Hồ Sơ Điều Trị Hoàn Tất
                      </span>
                    }
                    value={dashboardStats.completedSteps}
                    prefix={
                      <CheckCircleOutlined style={{ color: "#ff69b4" }} />
                    }
                    valueStyle={{ color: "#ff69b4", fontSize: "24px" }}
                  />

                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card
                  style={{
                    borderColor: "#ff1493",
                    boxShadow: "0 4px 12px rgba(255, 20, 147, 0.15)",
                  }}
                >
                  <Statistic
                    title={
                      <span style={{ color: "#ff1493", fontWeight: 600 }}>
                        🩺 Số lượt khám bác sĩ đã thực hiện
                      </span>
                    }
                    value={dashboardStats.doctorAppointments || 0}
                    prefix={
                      <MedicineBoxOutlined style={{ color: "#ff1493" }} />
                    }
                    valueStyle={{ color: "#ff1493", fontSize: "24px" }}
                  />

                </Card>
              </Col>
            </Row>

            <Card
              title={
                <span
                  style={{
                    color: "#ff69b4",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  📊 Biểu đồ hồ sơ điều trị theo tháng
                </span>
              }
              style={{
                borderColor: "#ff69b4",
                boxShadow: "0 4px 12px rgba(255, 105, 180, 0.15)",
              }}
            >
              {/* <div
                style={{
                  color: "#666",
                  fontSize: "14px",
                  marginBottom: "16px",
                }}
              >
                Dữ liệu từ MedicalRecords.StartDate group by month
              </div> */}
              {chartData && (
                <div style={{ height: "400px" }}>
                  <Line
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top" as const,
                        },
                        title: {
                          display: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: "rgba(255, 105, 180, 0.1)",
                          },
                        },
                        x: {
                          grid: {
                            color: "rgba(255, 105, 180, 0.1)",
                          },
                        },
                      },
                    }}
                  />
                </div>
              )}
            </Card>
          </Space>
        )}
      </div>
    </DoctorSidebar>
  );
}
