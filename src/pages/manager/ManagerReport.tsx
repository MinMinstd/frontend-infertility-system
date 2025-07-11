import React, { useEffect, useState } from 'react';
import {
  Table,
  Card,
  Row,
  Col,
  Typography,
  Statistic,
  DatePicker,
  Space,
  Spin,
  message,
} from 'antd';
import { DollarOutlined, UserOutlined, MedicineBoxOutlined, MessageOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import ManagerApi from '../../servers/manager.api';
import type { Order } from '../../types/manager.d';

const { Title, Text } = Typography;

interface ServiceStats {
  key: string;
  serviceName: string;
  usageCount: number;
  revenue: number;
}

const ManagerReport: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [loading, setLoading] = useState(true);
  // Tổng hợp số liệu
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [newAccounts, setNewAccounts] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [serviceStats, setServiceStats] = useState<ServiceStats[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      ManagerApi.GetCountTotalAccounts(),
      ManagerApi.GetCountNewAccount(),
      ManagerApi.GetAllDoctors(),
      ManagerApi.GetAllAppointments(),
      ManagerApi.GetAllTreatmentRoadMap(),
      ManagerApi.GetFeedback(),
      ManagerApi.GetAllOrder(),
    ])
      .then(([
        totalAccRes,
        newAccRes,
        doctorsRes,
        appointmentsRes,
        servicesRes,
        feedbacksRes,
        ordersRes,
      ]) => {
        // Tổng tài khoản
        setTotalAccounts(Array.isArray(totalAccRes.data) ? totalAccRes.data.length : (typeof totalAccRes.data === 'number' ? totalAccRes.data : 0));
        // Tài khoản mới
        setNewAccounts(Array.isArray(newAccRes.data) ? newAccRes.data.length : (typeof newAccRes.data === 'number' ? newAccRes.data : 0));
        // Tổng bác sĩ
        setTotalDoctors(Array.isArray(doctorsRes.data) ? doctorsRes.data.length : 0);
        // Tổng lịch hẹn
        setTotalAppointments(Array.isArray(appointmentsRes.data) ? appointmentsRes.data.length : 0);
        // Tổng dịch vụ
        setTotalServices(Array.isArray(servicesRes.data) ? servicesRes.data.length : 0);
        // Tổng phản hồi
        setTotalFeedbacks(Array.isArray(feedbacksRes.data) ? feedbacksRes.data.length : 0);
        // Tổng doanh thu từ đơn hàng
        let revenue = 0;
        const serviceMap: Record<string, { usageCount: number; revenue: number }> = {};
        if (Array.isArray(ordersRes.data)) {
          ordersRes.data.forEach((order: Order) => {
            if (order.orderDetailList && Array.isArray(order.orderDetailList)) {
              order.orderDetailList.forEach((detail: { serviceName?: string; price?: number }) => {
                const name = detail.serviceName || 'Khác';
                const price = detail.price || 0;
                revenue += price;
                if (!serviceMap[name]) serviceMap[name] = { usageCount: 0, revenue: 0 };
                serviceMap[name].usageCount += 1;
                serviceMap[name].revenue += price;
              });
            }
          });
        }
        setTotalRevenue(revenue);
        // Chuyển sang mảng cho Table
        setServiceStats(
          Object.entries(serviceMap).map(([serviceName, stat], idx) => ({
            key: String(idx + 1),
            serviceName,
            usageCount: stat.usageCount,
            revenue: stat.revenue,
          }))
        );
      })
      .catch(() => {
        message.error('Lỗi khi tải dữ liệu tổng hợp!');
      })
      .finally(() => setLoading(false));
  }, []);

  const columns: ColumnsType<ServiceStats> = [
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
    <div className="p-6">
      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Title level={2} className="text-pink-600 !mb-0">
            Báo cáo thống kê
          </Title>
          <Text type="secondary">
            Theo dõi và phân tích dữ liệu hệ thống
          </Text>
        </div>
        <Row justify="space-between" align="middle">
          <Col>
            <DatePicker
              picker="month"
              value={currentMonth}
              onChange={(date) => date && setCurrentMonth(date)}
              className="rounded-lg"
            />
          </Col>
        </Row>
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <Statistic
                  title={<span className="text-gray-600">Tổng tài khoản</span>}
                  value={totalAccounts}
                  prefix={<TeamOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#3b82f6' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <Statistic
                  title={<span className="text-gray-600">Tài khoản mới</span>}
                  value={newAccounts}
                  prefix={<UserOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#3b82f6' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <Statistic
                  title={<span className="text-gray-600">Tổng bác sĩ</span>}
                  value={totalDoctors}
                  prefix={<MedicineBoxOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#a855f7' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <Statistic
                  title={<span className="text-gray-600">Tổng lịch hẹn</span>}
                  value={totalAppointments}
                  prefix={<CalendarOutlined className="text-pink-500" />}
                  valueStyle={{ color: '#ec4899' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <Statistic
                  title={<span className="text-gray-600">Tổng dịch vụ</span>}
                  value={totalServices}
                  prefix={<MedicineBoxOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#a855f7' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <Statistic
                  title={<span className="text-gray-600">Tổng phản hồi</span>}
                  value={totalFeedbacks}
                  prefix={<MessageOutlined className="text-pink-500" />}
                  valueStyle={{ color: '#ec4899' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <Statistic
                  title={<span className="text-gray-600">Tổng doanh thu</span>}
                  value={totalRevenue}
                  prefix={<DollarOutlined className="text-emerald-500" />}
                  suffix="VNĐ"
                  valueStyle={{ color: '#10b981' }}
                />
              </Card>
            </Col>
          </Row>
        )}
        <Card className="shadow-lg">
          <Title level={4} className="text-pink-600 !mb-4">
            Thống kê dịch vụ
          </Title>
          <Table
            columns={columns}
            dataSource={serviceStats}
            pagination={false}
            className="rounded-lg overflow-hidden"
          />
        </Card>
      </Space>
    </div>
  );
};

export default ManagerReport;
