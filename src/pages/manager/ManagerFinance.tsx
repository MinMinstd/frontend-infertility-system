import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  DatePicker,
  Row,
  Col,
  Statistic,
  Typography,
  Space,
  Tag,
  Button,
  Modal,
  Divider,
  Spin,
  Empty,
} from 'antd';
import { Eye, DollarSign, User, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface RevenueData {
  key: string;
  month: string;
  revenue: number;
  patients: number;
  treatments: number;
}

interface DetailedRevenueData {
  key: string;
  customerName: string;
  serviceName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 100 } },
};

const tableVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 120 } },
};

// SVG finance/money minh họa
const FinanceSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="22" width="44" height="24" rx="8" fill="#34d399"/>
    <rect x="10" y="22" width="44" height="24" rx="8" stroke="#059669" strokeWidth="2"/>
    <circle cx="32" cy="34" r="8" fill="#fff"/>
    <text x="32" y="38" textAnchor="middle" fontSize="16" fill="#34d399" fontWeight="bold">₫</text>
  </svg>
);

const ManagerFinance: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(dayjs());
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [detailedRevenueData, setDetailedRevenueData] = useState<DetailedRevenueData[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonthData, setSelectedMonthData] = useState<RevenueData | null>(null);
  const [currentMonthStats, setCurrentMonthStats] = useState({
    totalRevenue: 0,
    totalPatients: 0,
    totalTreatments: 0,
    previousMonthComparison: 0,
  });

  // Mock data - Replace with actual API call
  useEffect(() => {
    const mockData: RevenueData[] = [
      {
        key: '1',
        month: 'January 2024',
        revenue: 15000000,
        patients: 45,
        treatments: 60,
      },
      {
        key: '2',
        month: 'February 2024',
        revenue: 18000000,
        patients: 52,
        treatments: 75,
      },
      {
        key: '3',
        month: 'March 2024',
        revenue: 16500000,
        patients: 48,
        treatments: 68,
      },
    ];

    const mockDetailedData: DetailedRevenueData[] = [
      {
        key: '1',
        customerName: 'Nguyễn Văn A',
        serviceName: 'Khám tổng quát',
        amount: 500000,
        date: '2024-03-15',
        status: 'completed',
      },
      {
        key: '2',
        customerName: 'Trần Thị B',
        serviceName: 'Điều trị IVF',
        amount: 15000000,
        date: '2024-03-16',
        status: 'completed',
      },
      {
        key: '3',
        customerName: 'Lê Văn C',
        serviceName: 'Siêu âm',
        amount: 800000,
        date: '2024-03-17',
        status: 'pending',
      },
    ];

    setRevenueData(mockData);
    setDetailedRevenueData(mockDetailedData);
    setCurrentMonthStats({
      totalRevenue: 16500000,
      totalPatients: 48,
      totalTreatments: 68,
      previousMonthComparison: 8.33,
    });
  }, []);

  const handleViewDetails = (record: RevenueData) => {
    setSelectedMonthData(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: <span className="text-pink-600 font-semibold">Tháng</span>,
      dataIndex: 'month',
      key: 'month',
      render: (text: string) => (
        <Text strong>{text}</Text>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Doanh thu</span>,
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value: number) => (
        <Text strong style={{ color: '#1890ff' }}>
          {value.toLocaleString('vi-VN')} VNĐ
        </Text>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Số bệnh nhân</span>,
      dataIndex: 'patients',
      key: 'patients',
      render: (value: number) => (
        <Text>{value} bệnh nhân</Text>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Số ca điều trị</span>,
      dataIndex: 'treatments',
      key: 'treatments',
      render: (value: number) => (
        <Text>{value} ca</Text>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Chi tiết</span>,
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<Eye className="w-4 h-4" />}
          onClick={() => handleViewDetails(record)}
          style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const detailedColumns = [
    {
      title: <span className="text-pink-600 font-semibold">Tên khách hàng</span>,
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text: string) => (
        <span className="flex items-center gap-2"><User className="w-4 h-4 text-blue-500" />{text}</span>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Dịch vụ</span>,
      dataIndex: 'serviceName',
      key: 'serviceName',
      render: (service: string) => (
        <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-purple-500" />{service}</span>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Số tiền</span>,
      dataIndex: 'amount',
      key: 'amount',
      render: (value: number) => (
        <Text strong style={{ color: '#1890ff' }}>
          {value.toLocaleString('vi-VN')} VNĐ
        </Text>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Ngày</span>,
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: <span className="text-pink-600 font-semibold">Trạng thái</span>,
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'completed' ? 'green' : status === 'pending' ? 'orange' : 'red';
        const text = status === 'completed' ? 'Hoàn thành' : status === 'pending' ? 'Chờ xử lý' : 'Đã huỷ';
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Banner đầu trang */}
      <div className="w-full flex items-center gap-6 bg-white rounded-2xl shadow mb-8 overflow-hidden">
        <div className="ml-4"><FinanceSVG /></div>
        <div className="flex-1">
          <Title level={2} className="text-pink-600 !mb-1">Quản lý tài chính</Title>
          <Text type="secondary">Theo dõi doanh thu, bệnh nhân, điều trị và chi tiết từng tháng</Text>
        </div>
        <div className="mr-6"><FinanceSVG /></div>
      </div>
      {/* End Banner */}
      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} sm={12} md={6}>
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-blue-100 to-white relative">
              {/* SVG finance nhỏ góc phải card */}
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><FinanceSVG /></div>
              <Statistic
                title={<span className="text-blue-600">Tổng doanh thu</span>}
                value={currentMonthStats.totalRevenue}
                prefix={<DollarSign className="w-6 h-6 text-blue-500" />}
                valueStyle={{ color: '#3b82f6', fontWeight: 700, fontSize: 24 }}
                suffix="VNĐ"
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-green-100 to-white">
              <Statistic
                title={<span className="text-green-600">Bệnh nhân</span>}
                value={currentMonthStats.totalPatients}
                prefix={<User className="w-6 h-6 text-green-500" />}
                valueStyle={{ color: '#22c55e', fontWeight: 700, fontSize: 24 }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-pink-100 to-white">
              <Statistic
                title={<span className="text-pink-600">Ca điều trị</span>}
                value={currentMonthStats.totalTreatments}
                prefix={<FileText className="w-6 h-6 text-pink-500" />}
                valueStyle={{ color: '#ec4899', fontWeight: 700, fontSize: 24 }}
              />
            </Card>
          </motion.div>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow rounded-xl border-0 bg-gradient-to-br from-orange-100 to-white">
              <Statistic
                title={<span className="text-orange-600">So với tháng trước</span>}
                value={currentMonthStats.previousMonthComparison}
                suffix="%"
                valueStyle={{ color: '#f59e42', fontWeight: 700, fontSize: 24 }}
              />
            </Card>
          </motion.div>
        </Col>
      </Row>
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="mt-8"
      >
        <Card className="bg-white rounded-2xl shadow-lg p-6 mt-6 relative">
          {/* SVG finance nhỏ góc phải card/table */}
          <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none select-none"><FinanceSVG /></div>
          <Table
            columns={columns}
            dataSource={revenueData}
            rowKey="key"
            className="rounded-xl overflow-hidden shadow"
            pagination={{ pageSize: 10 }}
            locale={{ emptyText: <Empty image={<FinanceSVG />} description={<span>Chưa có dữ liệu tài chính</span>} /> }}
          />
        </Card>
      </motion.div>
      <Modal
        title={<span className="text-pink-600 font-semibold">Chi tiết doanh thu tháng {selectedMonthData?.month}</span>}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <Divider />
        <motion.div
          variants={tableVariants}
          initial="hidden"
          animate="visible"
        >
          <Table
            columns={detailedColumns}
            dataSource={detailedRevenueData}
            rowKey="key"
            className="rounded-xl overflow-hidden shadow"
            pagination={{ pageSize: 5 }}
            locale={{ emptyText: <Empty image={<FinanceSVG />} description={<span>Chưa có chi tiết doanh thu</span>} /> }}
          />
        </motion.div>
      </Modal>
    </div>
  );
};

export default ManagerFinance;
