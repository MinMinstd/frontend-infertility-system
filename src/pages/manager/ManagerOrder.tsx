import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Button } from 'antd';
import ManagerApi from '../../servers/manager.api';
import type { Order } from '../../types/manager.d';

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
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
    },
    {
      title: 'Vợ',
      dataIndex: 'wife',
      key: 'wife',
      width: 180,
    },
    {
      title: 'Chồng',
      dataIndex: 'husband',
      key: 'husband',
      width: 180,
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
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={orders}
              rowKey="orderId"
              className="rounded-xl overflow-hidden shadow"
              pagination={{ pageSize: 10 }}
              // expandable={{ expandedRowRender }} // Xóa expandable
              showHeader
              // Render bảng chi tiết bên dưới dòng được chọn
              expandedRowRender={undefined}
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
                          <tr>
                            <td colSpan={columns.length}>
                              <Table
                                columns={[
                                  { title: 'Bác sĩ', dataIndex: 'doctorName', key: 'doctorName', width: 180 },
                                  { title: 'Dịch vụ', dataIndex: 'serviceName', key: 'serviceName', width: 180 },
                                ]}
                                dataSource={record.orderDetailList}
                                rowKey="orderDetailId"
                                pagination={false}
                                size="small"
                              />
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerOrder; 