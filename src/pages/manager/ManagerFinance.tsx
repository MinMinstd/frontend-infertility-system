import React, { useState, useEffect } from 'react';
import {
  Table,
  DatePicker,
  Typography,
  Tag,
  Button,
  Modal,
  Divider,
  Empty,
  Tabs,
} from 'antd';
import { Eye, User, FileText, DollarSign } from 'lucide-react';
import dayjs from 'dayjs';
import ManagerApi from '../../servers/manager.api';
import type { TreatmentRoadmapWithPayment, CustomerWithPayment, PaymentDetail } from '../../types/manager.d';

const { Title, Text } = Typography;

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
  const [roadmapRevenue, setRoadmapRevenue] = useState<TreatmentRoadmapWithPayment[]>([]);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);
  const [customerPayments, setCustomerPayments] = useState<CustomerWithPayment[]>([]);
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithPayment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [totalTransactions, setTotalTransactions] = useState<number>(0);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [loadingRevenue, setLoadingRevenue] = useState(false);

  // Lấy tổng số giao dịch theo tháng/năm từ API mới
  useEffect(() => {
    const fetchTotalTransactions = async () => {
      setLoadingTransactions(true);
      try {
        const res = await ManagerApi.GetTotalTransactions(selectedMonth.month() + 1, selectedMonth.year());
        setTotalTransactions(res.data.totalTransactions);
      } catch {
        setTotalTransactions(0);
      } finally {
        setLoadingTransactions(false);
      }
    };
    fetchTotalTransactions();
  }, [selectedMonth]);

  // Lấy doanh thu theo dịch vụ/tháng (giữ nguyên để hiển thị bảng chi tiết)
  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoadingRoadmap(true);
      try {
        const res = await ManagerApi.GetTreatmentRoadmapWithPayment(selectedMonth.month() + 1, selectedMonth.year());
        setRoadmapRevenue(res.data);
      } catch {
        setRoadmapRevenue([]);
      } finally {
        setLoadingRoadmap(false);
      }
    };
    fetchRoadmap();
  }, [selectedMonth]);

  // Lấy danh sách thanh toán khách hàng
  useEffect(() => {
    const fetchCustomer = async () => {
      setLoadingCustomer(true);
      try {
        const res = await ManagerApi.GetCustomerWithPayment();
        console.log("danh sách khách hàng", res.data);
        setCustomerPayments(res.data);
      } catch {
        setCustomerPayments([]);
      } finally {
        setLoadingCustomer(false);
      }
    };
    fetchCustomer();
  }, []);

  // Lấy tổng số khách hàng đã giao dịch theo tháng/năm từ API mới
  useEffect(() => {
    const fetchTotalCustomers = async () => {
      setLoadingCustomers(true);
      try {
        const res = await ManagerApi.GetTotalCustomers(selectedMonth.month() + 1, selectedMonth.year());
        setTotalCustomers(res.data.totalCustomers);
      } catch {
        setTotalCustomers(0);
      } finally {
        setLoadingCustomers(false);
      }
    };
    fetchTotalCustomers();
  }, [selectedMonth]);

  // Lấy tổng doanh thu theo tháng/năm từ API mới
  useEffect(() => {
    const fetchTotalRevenue = async () => {
      setLoadingRevenue(true);
      try {
        const res = await ManagerApi.GetTotalRevenue(selectedMonth.month() + 1, selectedMonth.year());
        setTotalRevenue(res.data.totalRevenue);
      } catch {
        setTotalRevenue(0);
      } finally {
        setLoadingRevenue(false);
      }
    };
    fetchTotalRevenue();
  }, [selectedMonth]);

 
  const roadmapColumns = [
    {
      title: <span className="text-pink-600 font-semibold">ID</span>,
      dataIndex: 'treatmentRoadmapId',
      key: 'treatmentRoadmapId',
      width: 80,
    },
    {
      title: <span className="text-pink-600 font-semibold">Giai đoạn</span>,
      dataIndex: 'stage',
      key: 'stage',
      width: 200,
    },
    {
      title: <span className="text-pink-600 font-semibold">Tổng thu (VNĐ)</span>,
      dataIndex: 'total',
      key: 'total',
      width: 180,
      render: (total: number) => total?.toLocaleString('vi-VN'),
    },
    {
      title: <span className="text-pink-600 font-semibold">Số giao dịch</span>,
      dataIndex: 'listPayment',
      key: 'listPayment',
      width: 120,
      render: (list: PaymentDetail[]) => list.length,
    },
  ];

  // Bảng quản lý thanh toán khách hàng
  const customerColumns = [
    {
      title: <span className="text-pink-600 font-semibold">Tên khách hàng</span>,
      dataIndex: 'fullName',
      key: 'fullName',
      render: (name: string) => <span className="flex items-center gap-2"><User className="w-4 h-4 text-blue-500" />{name}</span>,
    },
    {
      title: <span className="text-pink-600 font-semibold">Tổng thanh toán (VNĐ)</span>,
      dataIndex: 'totalPayment',
      key: 'totalPayment',
      render: (value: number) => value?.toLocaleString('vi-VN'),
    },
    {
      title: <span className="text-pink-600 font-semibold">Chi tiết</span>,
      key: 'action',
      render: (_: unknown, record: CustomerWithPayment) => (
        <Button type="primary" icon={<Eye className="w-4 h-4" />} onClick={() => { setSelectedCustomer(record); setModalVisible(true); }}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  // Bảng chi tiết thanh toán của khách hàng
  const paymentColumns = [
    {
      title: <span className="text-pink-600 font-semibold">Mã giao dịch</span>,
      dataIndex: 'paymentId',
      key: 'paymentId',
    },
    {
      title: <span className="text-pink-600 font-semibold">Khách hàng</span>,
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: <span className="text-pink-600 font-semibold">Dịch vụ</span>,
      dataIndex: 'serviceName',
      key: 'serviceName',
      render: (service: string) => <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-purple-500" />{service}</span>,
    },
    {
      title: <span className="text-pink-600 font-semibold">Ngày</span>,
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: <span className="text-pink-600 font-semibold">Số tiền</span>,
      dataIndex: 'priceByTreatement',
      key: 'priceByTreatement',
      render: (value) => {
        if (value === null || value === undefined) return 'N/A';
        const num = Number(value);
        return isNaN(num) ? value : num.toLocaleString('vi-VN');
      },
    },
   
    {
      title: <span className="text-pink-600 font-semibold">Trạng thái</span>,
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'Đã thanh toán' ? 'green' : 'orange';
        return <Tag color={color}>{status}</Tag>;
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
          <Text type="secondary">Theo dõi doanh thu theo dịch vụ/tháng và quản lý thanh toán khách hàng</Text>
        </div>
        <div className="mr-6"><FinanceSVG /></div>
      </div>
      {/* Thống kê tổng giao dịch, tổng doanh thu, số khách hàng giao dịch */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="flex-1 min-w-[220px] bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
          <div className="bg-blue-500 rounded-full p-3 flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-center">
            <div className="text-blue-600 font-semibold text-lg">Tổng giao dịch tháng {selectedMonth.format('MM/YYYY')}</div>
            <div className="text-3xl font-bold text-blue-700 mt-1">
              {loadingTransactions ? 'Đang tải...' : totalTransactions}
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-[220px] bg-gradient-to-br from-green-100 to-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
          <div className="bg-green-500 rounded-full p-3 flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-center">
            <div className="text-green-600 font-semibold text-lg">Tổng doanh thu tháng {selectedMonth.format('MM/YYYY')}</div>
            <div className="text-3xl font-bold text-green-700 mt-1">
              {loadingRevenue ? 'Đang tải...' : totalRevenue.toLocaleString('vi-VN')} <span className="text-base font-medium">VNĐ</span>
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-[220px] bg-gradient-to-br from-pink-100 to-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
          <div className="bg-pink-500 rounded-full p-3 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 text-center">
            <div className="text-pink-600 font-semibold text-lg">Khách hàng giao dịch tháng {selectedMonth.format('MM/YYYY')}</div>
            <div className="text-3xl font-bold text-pink-700 mt-1">
              {loadingCustomers ? 'Đang tải...' : totalCustomers}
            </div>
          </div>
        </div>
      </div>
      {/* Tabs cho 2 phần */}
      <Tabs
        defaultActiveKey="revenue"
        className="bg-white rounded-2xl shadow-lg p-6"
        items={[{
          key: 'revenue',
          label: <span className="text-blue-600 font-semibold">Doanh thu theo dịch vụ/tháng</span>,
          children: (
            <div>
              <div className="flex justify-end mb-4">
                <DatePicker
                  picker="month"
                  value={selectedMonth}
                  onChange={v => v && setSelectedMonth(v)}
                  format="MM/YYYY"
                  allowClear={false}
                />
              </div>
              <Table
                columns={roadmapColumns}
                dataSource={roadmapRevenue}
                rowKey="treatmentRoadmapId"
                loading={loadingRoadmap}
                className="rounded-xl overflow-hidden shadow"
                pagination={{ pageSize: 8 }}
                locale={{ emptyText: <Empty image={<FinanceSVG />} description={<span>Chưa có dữ liệu doanh thu</span>} /> }}
              />
            </div>
          )
        }, {
          key: 'customer',
          label: <span className="text-green-600 font-semibold">Quản lý thanh toán khách hàng</span>,
          children: (
            <div>
              <Table
                columns={customerColumns}
                dataSource={customerPayments}
                rowKey="customerId"
                loading={loadingCustomer}
                className="rounded-xl overflow-hidden shadow"
                pagination={{ pageSize: 8 }}
                locale={{ emptyText: <Empty image={<FinanceSVG />} description={<span>Chưa có dữ liệu khách hàng</span>} /> }}
              />
            </div>
          )
        }]}
      />
      <Modal
        title={<span className="text-pink-600 font-semibold">Chi tiết thanh toán: {selectedCustomer?.fullName}</span>}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
      >
        <Divider />
        <Table
          columns={paymentColumns}
          dataSource={selectedCustomer?.listPayment || []}
          rowKey="paymentId"
          className="rounded-xl overflow-hidden shadow"
          pagination={{ pageSize: 6 }}
          locale={{ emptyText: <Empty image={<FinanceSVG />} description={<span>Chưa có giao dịch nào</span>} /> }}
        />
      </Modal>
    </div>
  );
};

export default ManagerFinance;
