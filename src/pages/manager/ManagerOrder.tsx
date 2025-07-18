import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Button, Empty, Card, Typography } from 'antd';
import { motion } from 'framer-motion';
import { FileText, User, UserCircle } from 'lucide-react';
import ManagerApi from '../../servers/manager.api';
import type { Order } from '../../types/manager.d';

const { Title, Text } = Typography;

const tableVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 120 } },
};

// SVG order/cart minh họa
const OrderSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="20" width="40" height="28" rx="8" fill="#f87171"/>
    <rect x="12" y="20" width="40" height="28" rx="8" stroke="#ef4444" strokeWidth="2"/>
    <rect x="20" y="12" width="24" height="12" rx="4" fill="#ef4444"/>
    <circle cx="24" cy="48" r="4" fill="#fff"/>
    <circle cx="40" cy="48" r="4" fill="#fff"/>
  </svg>
);

const ManagerOrder: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await ManagerApi.GetAllOrder();
        setOrders(response.data);
      } catch {
        message.error('Lấy danh sách order thất bại');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const columns = [
    {
      title: <span className="text-pink-600 font-semibold">Trạng thái</span>,
      dataIndex: 'status',
      key: 'status',
      width: 120,
    },
    {
      title: <span className="text-pink-600 font-semibold">Vợ</span>,
      dataIndex: 'wife',
      key: 'wife',
      width: 180,
      render: (wife: string) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-pink-500" />
          {wife}
        </div>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Chồng</span>,
      dataIndex: 'husband',
      key: 'husband',
      width: 180,
      render: (husband: string) => (
        <div className="flex items-center gap-2">
          <UserCircle className="w-4 h-4 text-blue-500" />
          {husband}
        </div>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 120,
      render: (_: unknown, record: Order) => (
        <Button
          type="link"
          onClick={() => setExpandedOrderId(expandedOrderId === record.orderId ? null : record.orderId)}
        >
          {expandedOrderId === record.orderId ? 'Ẩn chi tiết' : 'Xem chi tiết'}
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Banner đầu trang */}
        <div className="w-full flex items-center gap-6 bg-white rounded-2xl shadow mb-8 overflow-hidden">
          <div className="ml-4"><OrderSVG /></div>
          <div className="flex-1">
            <Title level={2} className="text-pink-600 !mb-1">Quản lý lịch sử điều trị</Title>
            <Text type="secondary">Theo dõi và quản lý tất cả đơn hàng, chi tiết điều trị</Text>
          </div>
          <div className="mr-6"><OrderSVG /></div>
        </div>
        {/* End Banner */}
        <Card className="bg-white rounded-2xl shadow-lg p-6 mt-6 relative">
          {/* SVG order nhỏ góc phải card */}
          <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none select-none"><OrderSVG /></div>
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Spin size="large" />
            </div>
          ) : (
            <motion.div
              variants={tableVariants}
              initial="hidden"
              animate="visible"
            >
              <Table
                columns={columns}
                dataSource={orders}
                rowKey="orderId"
                className="rounded-xl overflow-hidden shadow"
                pagination={{ pageSize: 10 }}
                showHeader
                locale={{
                  emptyText: (
                    <div className="flex flex-col items-center justify-center py-10">
                      <Empty image={<OrderSVG />} description="Không có đơn hàng nào" />
                    </div>
                  ),
                }}
                components={{
                  body: {
                    row: (props: React.HTMLAttributes<HTMLTableRowElement> & { 'data-row-key'?: number }) => {
                      const { children, ...restProps } = props;
                      const record = props['data-row-key']
                        ? orders.find((o) => o.orderId === props['data-row-key'])
                        : null;
                      return (
                        <>
                          <tr {...restProps}>{children}</tr>
                          {record && expandedOrderId === record.orderId && (
                            <motion.tr
                              initial={{ opacity: 0, y: 30 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
                            >
                              <td colSpan={columns.length}>
                                <Table
                                  columns={[
                                    { title: <span className="text-pink-600 font-semibold">ID điều trị</span>, dataIndex: 'orderDetailId', key: 'orderDetailId', width: 80 },
                                    { title: <span className="text-pink-600 font-semibold">Bác sĩ</span>, dataIndex: 'doctorName', key: 'doctorName', width: 140 },
                                    { title: <span className="text-pink-600 font-semibold">Dịch vụ</span>, dataIndex: 'serviceName', key: 'serviceName', width: 120, render: (service: string) => (<span className="flex items-center gap-2"><FileText className="w-4 h-4 text-purple-500" />{service}</span>) },
                                    { title: <span className="text-pink-600 font-semibold">Giai đoạn</span>, dataIndex: 'stageName', key: 'stageName', width: 120 },
                                    { title: <span className="text-pink-600 font-semibold">Ngày điều trị</span>, dataIndex: 'dateTreatment', key: 'dateTreatment', width: 120 },
                                    { title: <span className="text-pink-600 font-semibold">Giờ điều trị</span>, dataIndex: 'timeTreatment', key: 'timeTreatment', width: 100 },
                                  ]}
                                  dataSource={record.orderDetailList}
                                  rowKey="orderDetailId"
                                  pagination={false}
                                  size="small"
                                  className="rounded-lg border border-gray-100 mt-2"
                                  locale={{
                                    emptyText: (
                                      <div className="flex flex-col items-center justify-center py-4">
                                        <Empty image={<OrderSVG />} description="Không có chi tiết điều trị" />
                                      </div>
                                    ),
                                  }}
                                />
                              </td>
                            </motion.tr>
                          )}
                        </>
                      );
                    },
                  },
                }}
              />
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ManagerOrder; 