import { useEffect, useState } from "react";
import { Card, Typography, Row, Col, Statistic, Space, Spin } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  TrophyOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { DoctorSidebar } from "./DoctorSidebar";
import { Column } from "@ant-design/plots";
import { motion } from "framer-motion";
import DoctorApi from "../../servers/doctor.api";

const { Title } = Typography;

// Interface cho Ant Design Plots data
interface ChartData {
  month: string;
  value: number;
}

// Interface cho tooltip items
interface TooltipItem {
  title: string;
  value: number;
  color: string;
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
  const [chartData, setChartData] = useState<ChartData[]>([]);

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

        // Prepare chart data for Ant Design Plots
        const chartDataArray = Object.entries(grouped).map(([month, value]) => ({
          month,
          value,
        }));
        setChartData(chartDataArray);
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title level={2} style={{ color: "#E91E63", marginBottom: "24px" }}>
            📊 Thống kê số liệu điều trị
          </Title>
        </motion.div>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Space direction="vertical" size="large" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={12} lg={6}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      style={{
                        borderColor: "#E91E63",
                        borderWidth: "2px",
                        boxShadow: "0 6px 20px rgba(233, 30, 99, 0.15)",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #FCE4EC 0%, #FFE0E6 100%)",
                      }}
                    >
                      <Statistic
                        title={
                          <span style={{ color: "#D81B60", fontWeight: 600, fontSize: "14px" }}>
                            👥 Tổng số bệnh nhân
                          </span>
                        }
                        value={dashboardStats.totalPatients}
                        prefix={<UserOutlined style={{ color: "#E91E63", fontSize: "20px" }} />}
                        valueStyle={{ color: "#E91E63", fontSize: "28px", fontWeight: "bold" }}
                      />
                    </Card>
                  </motion.div>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      style={{
                        borderColor: "#D81B60",
                        borderWidth: "2px",
                        boxShadow: "0 6px 20px rgba(216, 27, 96, 0.15)",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #FFE0E6 0%, #FCE4EC 100%)",
                      }}
                    >
                      <Statistic
                        title={
                          <span style={{ color: "#E91E63", fontWeight: 600, fontSize: "14px" }}>
                            📋 Hồ sơ điều trị đang theo dõi
                          </span>
                        }
                        value={dashboardStats.activeRecords}
                        prefix={<FileTextOutlined style={{ color: "#D81B60", fontSize: "20px" }} />}
                        valueStyle={{ color: "#D81B60", fontSize: "28px", fontWeight: "bold" }}
                      />
                    </Card>
                  </motion.div>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      style={{
                        borderColor: "#E91E63",
                        borderWidth: "2px",
                        boxShadow: "0 6px 20px rgba(233, 30, 99, 0.15)",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #FCE4EC 0%, #FFE0E6 100%)",
                      }}
                    >
                      <Statistic
                        title={
                          <span style={{ color: "#D81B60", fontWeight: 600, fontSize: "14px" }}>
                            ✅ Hồ Sơ Điều Trị Hoàn Tất
                          </span>
                        }
                        value={dashboardStats.completedSteps}
                        prefix={
                          <TrophyOutlined style={{ color: "#E91E63", fontSize: "20px" }} />
                        }
                        valueStyle={{ color: "#E91E63", fontSize: "28px", fontWeight: "bold" }}
                      />
                    </Card>
                  </motion.div>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      style={{
                        borderColor: "#D81B60",
                        borderWidth: "2px",
                        boxShadow: "0 6px 20px rgba(216, 27, 96, 0.15)",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, #FFE0E6 0%, #FCE4EC 100%)",
                      }}
                    >
                      <Statistic
                        title={
                          <span style={{ color: "#E91E63", fontWeight: 600, fontSize: "14px" }}>
                            🩺 Số lượt khám bác sĩ đã thực hiện
                          </span>
                        }
                        value={dashboardStats.doctorAppointments || 0}
                        prefix={
                          <HeartOutlined style={{ color: "#D81B60", fontSize: "20px" }} />
                        }
                        valueStyle={{ color: "#D81B60", fontSize: "28px", fontWeight: "bold" }}
                      />
                    </Card>
                  </motion.div>
                </Col>
              </Row>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >

              <Card
                title={
                  <span
                    style={{
                      color: "#E91E63",
                      fontSize: "18px",
                      fontWeight: 600,
                    }}
                  >
                    📊 Biểu đồ hồ sơ điều trị theo tháng
                  </span>
                }
                style={{
                  borderColor: "#E91E63",
                  borderWidth: "2px",
                  boxShadow: "0 6px 20px rgba(233, 30, 99, 0.15)",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #FCE4EC 0%, #FFE0E6 100%)",
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
                    <Column
                      data={chartData}
                      xField="month"
                      yField="value"
                      color="#E91E63"
                      columnStyle={{
                        radius: [6, 6, 0, 0],
                        cursor: 'pointer',
                        fill: '#E91E63',
                        stroke: '#D81B60',
                        lineWidth: 2,
                      }}
                      columnWidthRatio={0.6}
                      label={{
                        position: 'top',
                        offset: 8,
                        style: {
                          fill: '#E91E63',
                          fontSize: 14,
                          fontWeight: 'bold',
                          textAlign: 'center',
                        },
                      }}
                      tooltip={{
                        customContent: (items: TooltipItem[]) => {
                          if (!items || items.length === 0) return null;
                          const item = items[0];
                          return (
                            `<div style="padding: 12px; background: white; border: 2px solid #E91E63; border-radius: 8px; box-shadow: 0 4px 12px rgba(233, 30, 99, 0.2);">
                               <div style="color: #E91E63; font-weight: bold; margin-bottom: 4px;">${item.title}</div>
                               <div style="color: #666; font-size: 14px;">Số hồ sơ: <span style="color: #E91E63; font-weight: bold;">${item.value}</span></div>
                             </div>`
                          );
                        },
                      }}
                      meta={{
                        value: {
                          alias: 'Số hồ sơ',
                        },
                        month: {
                          alias: 'Tháng',
                        },
                      }}
                      animation={{
                        appear: {
                          animation: 'grow-in-y',
                          duration: 1200,
                          delay: (index: number) => index * 100,
                        },
                      }}
                    />
                  </div>
                )}
              </Card>
            </motion.div>
          </Space>
        )}
      </div>
    </DoctorSidebar>
  );
}
