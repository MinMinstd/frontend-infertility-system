import React, { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  DatePicker,
  Statistic,
  Table,
} from 'antd';
import { motion } from 'framer-motion';
import ManagerApi from '../../servers/manager.api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import { Users, User, MessageCircle, Calendar } from 'lucide-react';
import type { Appointment } from '../../types/manager.d';
import type { Order } from '../../types/manager.d';

const { Title, Text } = Typography;

const tableVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 120 } },
};

// SVG report/chart minh họa
const ReportSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="18" width="44" height="32" rx="8" fill="#f472b6"/>
    <rect x="10" y="18" width="44" height="32" rx="8" stroke="#ec4899" strokeWidth="2"/>
    <rect x="20" y="38" width="6" height="8" rx="2" fill="#fff"/>
    <rect x="30" y="32" width="6" height="14" rx="2" fill="#fff"/>
    <rect x="40" y="26" width="6" height="20" rx="2" fill="#fff"/>
  </svg>
);

const ManagerReport: React.FC = () => {
  const [revenueChartData, setRevenueChartData] = useState<{ month: string, totalRevenue: number }[]>([]);
  const [loadingRevenueChart, setLoadingRevenueChart] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [newAccounts, setNewAccounts] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  // Thêm lại state
  const [topDoctors, setTopDoctors] = useState<{ name: string; count: number }[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  // Lấy dữ liệu doanh thu từng tháng trong năm hiện tại
  useEffect(() => {
    const fetchRevenueChart = async () => {
      setLoadingRevenueChart(true);
      const promises = Array.from({ length: 12 }, (_, i) => ManagerApi.GetTotalRevenue(i + 1, selectedYear));
      const results = await Promise.allSettled(promises);
      const data = results.map((res, idx) => ({
        month: (idx + 1).toString().padStart(2, '0'),
        totalRevenue: res.status === 'fulfilled' ? res.value.data.totalRevenue : 0
      }));
      setRevenueChartData(data);
      setLoadingRevenueChart(false);
    };
    fetchRevenueChart();
  }, [selectedYear]);

  useEffect(() => {
    Promise.all([
      ManagerApi.GetCountTotalAccounts(),
      ManagerApi.GetCountNewAccount(),
      ManagerApi.GetCountDoctorsAccount(),
      ManagerApi.GetAllAppointments(),
      ManagerApi.GetFeedback(),
    ]).then(([allAccRes, newAccRes, doctorAccRes, appointmentsRes, feedbacksRes]) => {
      setTotalAccounts(typeof allAccRes.data === 'number' ? allAccRes.data : (Array.isArray(allAccRes.data) ? allAccRes.data.length : 0));
      setNewAccounts(
        typeof newAccRes.data === 'number'
          ? newAccRes.data
          : (Array.isArray(newAccRes.data) ? newAccRes.data.length : 0)
      );
      setTotalDoctors(typeof doctorAccRes.data === 'number' ? doctorAccRes.data : (Array.isArray(doctorAccRes.data) ? doctorAccRes.data.length : 0));
      setTotalAppointments(Array.isArray(appointmentsRes.data) ? appointmentsRes.data.length : 0);
      setTotalFeedbacks(Array.isArray(feedbacksRes.data) ? feedbacksRes.data.length : 0);
    }).catch(() => {
      setTotalAccounts(0);
      setNewAccounts(0);
      setTotalDoctors(0);
      setTotalAppointments(0);
      setTotalFeedbacks(0);
    });
  }, []);

  // Khôi phục lại logic lấy dữ liệu cho topDoctors và recentOrders trong useEffect
  useEffect(() => {
    Promise.all([
      ManagerApi.GetAllAppointments(),
      ManagerApi.GetAllOrder(),
    ]).then(([appointmentsRes, ordersRes]) => {
      // Top 5 bác sĩ nhiều lịch hẹn nhất
      if (Array.isArray(appointmentsRes.data)) {
        const doctorMap: Record<string, { name: string; count: number }> = {};
        appointmentsRes.data.forEach((a: Appointment) => {
          if (a.doctorName) {
            if (!doctorMap[a.doctorName]) doctorMap[a.doctorName] = { name: a.doctorName, count: 0 };
            doctorMap[a.doctorName].count += 1;
          }
        });
        setTopDoctors(Object.values(doctorMap).sort((a, b) => b.count - a.count).slice(0, 5));
      }
      // 5 đơn hàng gần nhất
      if (Array.isArray(ordersRes.data)) {
        setRecentOrders(ordersRes.data.slice(-5).reverse());
      }
    });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Banner đầu trang */}
      <div className="w-full flex items-center gap-6 bg-white rounded-2xl shadow mb-8 overflow-hidden">
        <div className="ml-4"><ReportSVG /></div>
        <div className="flex-1">
          <Title level={2} className="text-pink-600 !mb-1">Báo cáo thống kê</Title>
          <Text type="secondary">Theo dõi và phân tích dữ liệu hệ thống</Text>
        </div>
        <div className="mr-6"><ReportSVG /></div>
      </div>
      {/* End Banner */}
      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} sm={12} md={4}>
          <motion.div variants={tableVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}>
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-blue-100 to-white relative">
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><ReportSVG /></div>
              <Statistic title={<span className="text-blue-600">Tổng tài khoản</span>} value={totalAccounts} prefix={<Users className="w-6 h-6 text-blue-500" />} valueStyle={{ color: '#3b82f6', fontWeight: 700, fontSize: 20 }} />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <motion.div variants={tableVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}>
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-green-100 to-white relative">
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><ReportSVG /></div>
              <Statistic title={<span className="text-green-600">Tài khoản mới</span>} value={newAccounts} prefix={<User className="w-6 h-6 text-green-500" />} valueStyle={{ color: '#22c55e', fontWeight: 700, fontSize: 20 }} />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <motion.div variants={tableVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}>
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-pink-100 to-white relative">
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><ReportSVG /></div>
              <Statistic title={<span className="text-pink-600">Bác sĩ</span>} value={totalDoctors} prefix={<User className="w-6 h-6 text-pink-500" />} valueStyle={{ color: '#ec4899', fontWeight: 700, fontSize: 20 }} />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <motion.div variants={tableVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}>
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-orange-100 to-white relative">
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><ReportSVG /></div>
              <Statistic title={<span className="text-orange-600">Lịch hẹn</span>} value={totalAppointments} prefix={<Calendar className="w-6 h-6 text-orange-500" />} valueStyle={{ color: '#f59e42', fontWeight: 700, fontSize: 20 }} />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <motion.div variants={tableVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}>
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-purple-100 to-white relative">
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><ReportSVG /></div>
              <Statistic title={<span className="text-purple-600">Phản hồi</span>} value={totalFeedbacks} prefix={<MessageCircle className="w-6 h-6 text-indigo-500" />} valueStyle={{ color: '#6366f1', fontWeight: 700, fontSize: 20 }} />
            </Card>
          </motion.div>
        </Col>
      </Row>
      {/* Biểu đồ doanh thu theo tháng */}
      <Card className="bg-white rounded-2xl shadow-lg p-6 mt-6 relative">
        <div className="mb-4 flex items-center justify-between">
          <Title level={4} className="text-yellow-600 !mb-0">Biểu đồ tổng doanh thu theo tháng ({selectedYear})</Title>
          <DatePicker
            picker="year"
            value={selectedYear ? dayjs(`${selectedYear}`, 'YYYY') : undefined}
            onChange={v => v && setSelectedYear(v.year())}
            allowClear={false}
            style={{ minWidth: 100 }}
          />
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={revenueChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 14 }} />
            <YAxis tickFormatter={v => v.toLocaleString('vi-VN')} tick={{ fontSize: 14 }} />
            <Tooltip formatter={v => `${Number(v).toLocaleString('vi-VN')} VNĐ`} labelFormatter={l => `Tháng ${l}`} />
            <Line type="monotone" dataKey="totalRevenue" stroke="#eab308" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
        {loadingRevenueChart && <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10"><span className="text-yellow-600 font-semibold text-lg">Đang tải biểu đồ...</span></div>}
      </Card>
      {/* Bảng top bác sĩ và đơn hàng gần đây */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} md={12}>
          <Card className="rounded-2xl shadow-lg p-4">
            <Title level={4} className="text-pink-600">Top 5 bác sĩ có nhiều lịch hẹn nhất</Title>
            <Table
              columns={[
                { title: 'Bác sĩ', dataIndex: 'name', key: 'name' },
                { title: 'Số lịch hẹn', dataIndex: 'count', key: 'count' },
              ]}
              dataSource={topDoctors}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card className="rounded-2xl shadow-lg p-4">
            <Title level={4} className="text-pink-600">5 đơn hàng gần nhất</Title>
            <Table
              columns={[
                { title: 'Mã đơn', dataIndex: 'orderId', key: 'orderId' },
                { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
              ]}
              dataSource={recentOrders.map((order, i) => ({
                key: order.orderId || i,
                orderId: order.orderId,
                customer: `${order.wife}${order.husband ? ' & ' + order.husband : ''}`,
              }))}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ManagerReport;
