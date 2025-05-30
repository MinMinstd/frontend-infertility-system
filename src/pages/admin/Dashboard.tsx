import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const appointmentData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Số lượng cuộc hẹn",
        data: [10, 15, 12, 100100, 20],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const revenueData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
    datasets: [
      {
        label: "Doanh thu",
        data: [1000, 1500, 1200, 1800, 2000],
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2 style={{ fontSize: 24, color: "#1890ff" }}>Hello Admin!</h2>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="July activity"
              value={24.345585}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix="$"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total booking" value={202} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Customer" value={554} />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Top Service">
            <ul>
              <li>01 Tư Vấn </li>
              <li>02 IVF</li>
              <li>03 IUI</li>
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="VIP Customer">
            <ul>
              <li>01 Đoàn Khánh - 123456 - 15</li>
              <li>02 MinhMinh - 56785 - 10</li>
              <li>03 HuyHuy - 55 - 2</li>
              <li>04 DuyDuy - 18 - 1</li>
            </ul>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Số lượng cuộc hẹn">
            <Line data={appointmentData} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Doanh thu">
            <Line data={revenueData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
