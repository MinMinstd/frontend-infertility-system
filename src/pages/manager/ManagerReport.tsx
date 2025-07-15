import React, { useEffect, useState } from 'react';
import {
  Table,
  Card,
  Row,
  Col,
  Typography,
  Statistic,
  message,
  Empty,
} from 'antd';
import { Users, User, FileText, MessageCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import ManagerApi from '../../servers/manager.api';
import type { Order } from '../../types/manager.d';

const { Title, Text } = Typography;

interface ServiceStats {
  key: string;
  serviceName: string;
  usageCount: number;
  revenue: number;
}

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
  const [loading, setLoading] = useState(true);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [newAccounts, setNewAccounts] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [serviceStats, setServiceStats] = useState<ServiceStats[]>([]);
  // Thêm các state mới
  const [totalDoctorAccounts, setTotalDoctorAccounts] = useState(0);
  const [totalCustomerAccounts, setTotalCustomerAccounts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [topDoctors, setTopDoctors] = useState<{ name: string; count: number }[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      ManagerApi.GetCountTotalAccounts(),
      ManagerApi.GetCountNewAccount(),
      ManagerApi.GetCountDoctorsAccount(),
      ManagerApi.GetCountCustomerAccount(),
      ManagerApi.GetAllDoctors(),
      ManagerApi.GetAllAppointments(),
      ManagerApi.GetAllTreatmentRoadMap(),
      ManagerApi.GetFeedback(),
      ManagerApi.GetAllOrder(),
    ])
      .then(([
        totalAccRes,
        newAccRes,
        doctorAccRes,
        customerAccRes,
        doctorsRes,
        appointmentsRes,
        servicesRes,
        feedbacksRes,
        ordersRes,
      ]) => {
        setTotalAccounts(Array.isArray(totalAccRes.data) ? totalAccRes.data.length : (typeof totalAccRes.data === 'number' ? totalAccRes.data : 0));
        setNewAccounts(Array.isArray(newAccRes.data) ? newAccRes.data.length : (typeof newAccRes.data === 'number' ? newAccRes.data : 0));
        setTotalDoctorAccounts(Array.isArray(doctorAccRes.data) ? doctorAccRes.data.length : (typeof doctorAccRes.data === 'number' ? doctorAccRes.data : 0));
        setTotalCustomerAccounts(Array.isArray(customerAccRes.data) ? customerAccRes.data.length : (typeof customerAccRes.data === 'number' ? customerAccRes.data : 0));
        setTotalDoctors(Array.isArray(doctorsRes.data) ? doctorsRes.data.length : 0);
        setTotalAppointments(Array.isArray(appointmentsRes.data) ? appointmentsRes.data.length : 0);
        setTotalServices(Array.isArray(servicesRes.data) ? servicesRes.data.length : 0);
        setTotalFeedbacks(Array.isArray(feedbacksRes.data) ? feedbacksRes.data.length : 0);
        // Tổng hợp dịch vụ
        const serviceMap: Record<string, { usageCount: number; revenue: number }> = {};
        let revenue = 0;
        if (Array.isArray(ordersRes.data)) {
          setTotalOrders(ordersRes.data.length);
          setRecentOrders(ordersRes.data.slice(-5).reverse());
          ordersRes.data.forEach((order: Order) => {
            if (order.orderDetailList && Array.isArray(order.orderDetailList)) {
              order.orderDetailList.forEach((detail: { serviceName?: string; price?: number }) => {
                const name = detail.serviceName || 'Khác';
                const price = detail.price || 0;
                if (!serviceMap[name]) serviceMap[name] = { usageCount: 0, revenue: 0 };
                serviceMap[name].usageCount += 1;
                serviceMap[name].revenue += price;
                revenue += price;
              });
            }
          });
        }
        setTotalRevenue(revenue);
        setServiceStats(
          Object.entries(serviceMap).map(([serviceName, stat], idx) => ({
            key: String(idx + 1),
            serviceName,
            usageCount: stat.usageCount,
            revenue: stat.revenue,
          }))
        );
        // Top bác sĩ nhiều lịch hẹn nhất
        if (Array.isArray(appointmentsRes.data)) {
          const doctorMap: Record<string, { name: string; count: number }> = {};
          appointmentsRes.data.forEach((a: import('../../types/manager.d').Appointment) => {
            if (a.doctorName) {
              if (!doctorMap[a.doctorName]) doctorMap[a.doctorName] = { name: a.doctorName, count: 0 };
              doctorMap[a.doctorName].count += 1;
            }
          });
          setTopDoctors(Object.values(doctorMap).sort((a, b) => b.count - a.count).slice(0, 5));
        }
      })
      .catch(() => {
        message.error('Lỗi khi tải dữ liệu tổng hợp!');
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: <span className="text-pink-600 font-semibold">Tên dịch vụ</span>,
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: <span className="text-pink-600 font-semibold">Số lần sử dụng</span>,
      dataIndex: 'usageCount',
      key: 'usageCount',
      render: (count: number) => (
        <span className="text-blue-600 font-medium">{count}</span>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Doanh thu</span>,
      dataIndex: 'revenue',
      key: 'revenue',
      render: (amount: number) => (
        <span className="text-green-600 font-medium">
          {amount.toLocaleString('vi-VN')} VNĐ
        </span>
      ),
    },
  ];

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
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-blue-100 to-white relative">
              {/* SVG report nhỏ góc phải card */}
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><ReportSVG /></div>
              <Statistic
                title={<span className="text-blue-600">Tổng tài khoản</span>}
                value={totalAccounts}
                prefix={<Users className="w-6 h-6 text-blue-500" />}
                valueStyle={{ color: '#3b82f6', fontWeight: 700, fontSize: 20 }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-green-100 to-white relative">
              {/* SVG report nhỏ góc phải card */}
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><ReportSVG /></div>
              <Statistic
                title={<span className="text-green-600">Tài khoản mới</span>}
                value={newAccounts}
                prefix={<User className="w-6 h-6 text-green-500" />}
                valueStyle={{ color: '#22c55e', fontWeight: 700, fontSize: 20 }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-pink-100 to-white relative">
              {/* SVG report nhỏ góc phải card */}
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><ReportSVG /></div>
              <Statistic
                title={<span className="text-pink-600">Bác sĩ</span>}
                value={totalDoctors}
                prefix={<User className="w-6 h-6 text-pink-500" />}
                valueStyle={{ color: '#ec4899', fontWeight: 700, fontSize: 20 }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-orange-100 to-white relative">
              {/* SVG report nhỏ góc phải card */}
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><ReportSVG /></div>
              <Statistic
                title={<span className="text-orange-600">Lịch hẹn</span>}
                value={totalAppointments}
                prefix={<Calendar className="w-6 h-6 text-orange-500" />}
                valueStyle={{ color: '#f59e42', fontWeight: 700, fontSize: 20 }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-purple-100 to-white relative">
              {/* SVG report nhỏ góc phải card */}
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><ReportSVG /></div>
              <Statistic
                title={<span className="text-purple-600">Dịch vụ</span>}
                value={totalServices}
                prefix={<FileText className="w-6 h-6 text-purple-500" />}
                valueStyle={{ color: '#a855f7', fontWeight: 700, fontSize: 20 }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-indigo-100 to-white relative">
              {/* SVG report nhỏ góc phải card */}
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><ReportSVG /></div>
              <Statistic
                title={<span className="text-indigo-600">Phản hồi</span>}
                value={totalFeedbacks}
                prefix={<MessageCircle className="w-6 h-6 text-indigo-500" />}
                valueStyle={{ color: '#6366f1', fontWeight: 700, fontSize: 20 }}
              />
            </Card>
          </motion.div>
        </Col>
      </Row>
      {/* Card thống kê mở rộng */}
      <Row gutter={[16, 16]} className="mt-2">
        <Col xs={24} sm={12} md={4}>
          <Card className="shadow-md rounded-xl border-0 bg-gradient-to-br from-blue-200 to-white">
            <Statistic
              title={<span className="text-blue-700">Tài khoản bác sĩ</span>}
              value={totalDoctorAccounts}
              valueStyle={{ color: '#2563eb', fontWeight: 700, fontSize: 18 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="shadow-md rounded-xl border-0 bg-gradient-to-br from-green-200 to-white">
            <Statistic
              title={<span className="text-green-700">Tài khoản khách hàng</span>}
              value={totalCustomerAccounts}
              valueStyle={{ color: '#16a34a', fontWeight: 700, fontSize: 18 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="shadow-md rounded-xl border-0 bg-gradient-to-br from-pink-200 to-white">
            <Statistic
              title={<span className="text-pink-700">Tổng đơn hàng</span>}
              value={totalOrders}
              valueStyle={{ color: '#db2777', fontWeight: 700, fontSize: 18 }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={4}>
          <Card className="shadow-md rounded-xl border-0 bg-gradient-to-br from-yellow-200 to-white">
            <Statistic
              title={<span className="text-yellow-700">Tổng doanh thu</span>}
              value={totalRevenue.toLocaleString('vi-VN') + ' VNĐ'}
              valueStyle={{ color: '#eab308', fontWeight: 700, fontSize: 18 }}
            />
          </Card>
        </Col>
      </Row>
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
              dataSource={topDoctors.map((d, i) => ({ ...d, key: i }))}
              pagination={false}
              size="small"
              loading={loading}
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
                // Không có createdAt, thay bằng orderId hoặc để trống
              ]}
              dataSource={recentOrders.map((order, i) => ({
                key: order.orderId || i,
                orderId: order.orderId,
                customer: `${order.wife}${order.husband ? ' & ' + order.husband : ''}`,
              }))}
              pagination={false}
              size="small"
              loading={loading}
            />
          </Card>
        </Col>
      </Row>
      <Card className="bg-white rounded-2xl shadow-lg p-6 mt-6 relative">
        {/* SVG report nhỏ góc phải card/table */}
        <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none select-none"><ReportSVG /></div>
        <Table
          columns={columns}
          dataSource={serviceStats}
          rowKey="key"
          className="rounded-xl overflow-hidden shadow"
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: <Empty image={<ReportSVG />} description={<span>Chưa có dữ liệu báo cáo</span>} /> }}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default ManagerReport;
