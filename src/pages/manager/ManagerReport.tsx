import React, { useState } from 'react';
import {
  Table,
  Card,
  Row,
  Col,
  Typography,
  Statistic,
  DatePicker,
  Space,
} from 'antd';
import { DollarOutlined, UserOutlined, MedicineBoxOutlined, MessageOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface ServiceStats {
  key: string;
  serviceName: string;
  usageCount: number;
  revenue: number;
}

const ManagerReport: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [monthlyRevenue] = useState(25000000);
  const [newAccounts] = useState(45);
  const [totalServices] = useState(156);
  const [totalFeedbacks] = useState(89);

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

  const data: ServiceStats[] = [
    {
      key: '1',
      serviceName: 'Khám tổng quát',
      usageCount: 45,
      revenue: 4500000,
    },
    {
      key: '2',
      serviceName: 'Siêu âm',
      usageCount: 32,
      revenue: 6400000,
    },
    {
      key: '3',
      serviceName: 'Xét nghiệm máu',
      usageCount: 28,
      revenue: 4200000,
    },
    {
      key: '4',
      serviceName: 'Tư vấn dinh dưỡng',
      usageCount: 15,
      revenue: 1500000,
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

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600">Doanh thu tháng</span>}
                value={monthlyRevenue}
                prefix={<DollarOutlined className="text-emerald-500" />}
                suffix="VNĐ"
                valueStyle={{ color: '#10b981' }}
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
                title={<span className="text-gray-600">Dịch vụ đã sử dụng</span>}
                value={totalServices}
                prefix={<MedicineBoxOutlined className="text-purple-500" />}
                valueStyle={{ color: '#a855f7' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600">Phản hồi mới</span>}
                value={totalFeedbacks}
                prefix={<MessageOutlined className="text-pink-500" />}
                valueStyle={{ color: '#ec4899' }}
              />
            </Card>
          </Col>
        </Row>

        <Card className="shadow-lg">
          <Title level={4} className="text-pink-600 !mb-4">
            Thống kê dịch vụ
          </Title>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="rounded-lg overflow-hidden"
          />
        </Card>
      </Space>
    </div>
  );
};

export default ManagerReport;
