// This is a pure content component for the admin nested layout. Do not add layout/sidebar/header/footer here.
import React from "react";
import { Statistic } from "antd";
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Hello Admin!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <Statistic
            title={
              <span className="text-pink-600 font-semibold">Hoạt động tháng này</span>
            }
            value={24.345585}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix="$"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <Statistic
            title={
              <span className="text-pink-600 font-semibold">Tổng số lịch hẹn đã đặt</span>
            }
            value={202}
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <Statistic
            title={
              <span className="text-pink-600 font-semibold">
                Tổng số khách hàng đã đặt lịch
              </span>
            }
            value={554}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-pink-600 mb-2">Dịch vụ được yêu thích</h3>
          <ul className="space-y-1 text-gray-700">
            <li>01 Tư Vấn </li>
            <li>02 IVF</li>
            <li>03 IUI</li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-pink-600 mb-2">Khách hàng VIP</h3>
          <ul className="space-y-1 text-gray-700">
            <li>01 Đoàn Khánh - 123456 - 15</li>
            <li>02 MinhMinh - 56785 - 10</li>
            <li>03 HuyHuy - 55 - 2</li>
            <li>04 DuyDuy - 18 - 1</li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-pink-600 mb-2">
            Số lượng cuộc hẹn
          </h3>
          <Line data={appointmentData} />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-pink-600 mb-2">Doanh thu</h3>
          <Line data={revenueData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
