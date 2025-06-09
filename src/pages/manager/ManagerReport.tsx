import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Row,
  Col,
  Typography,
  Statistic,
  DatePicker,
  Space,
  theme,
} from 'antd';
import { DollarOutlined, UserOutlined, MedicineBoxOutlined, MessageOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;
const { useToken } = theme;

interface ServiceStats {
  key: string;
  serviceName: string;
  usageCount: number;
  revenue: number;
}

interface DoctorStats {
  key: string;
  doctorName: string;
  appointmentCount: number;
  rating: number;
}

const ManagerReport: React.FC = () => {
  const { token } = useToken();
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [newAccounts, setNewAccounts] = useState(0);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [serviceStats, setServiceStats] = useState<ServiceStats[]>([]);
  const [doctorStats, setDoctorStats] = useState<DoctorStats[]>([]);

  const serviceColumns: ColumnsType<ServiceStats> = [
    {
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Số lần sử dụng',
      dataIndex: 'usageCount',
      key: 'usageCount',
      sorter: (a, b) => a.usageCount - b.usageCount,
    },
    {
      title: 'Doanh thu (VNĐ)',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value) => value.toLocaleString('vi-VN'),
      sorter: (a, b) => a.revenue - b.revenue,
    },
  ];

  const doctorColumns: ColumnsType<DoctorStats> = [
    {
      title: 'Tên bác sĩ',
      dataIndex: 'doctorName',
      key: 'doctorName',
    },
    {
      title: 'Số ca khám',
      dataIndex: 'appointmentCount',
      key: 'appointmentCount',
      sorter: (a, b) => a.appointmentCount - b.appointmentCount,
    },
    {
      title: 'Đánh giá trung bình',
      dataIndex: 'rating',
      key: 'rating',
      render: (value) => value.toFixed(1) + '/5',
      sorter: (a, b) => a.rating - b.rating,
    },
  ];

  useEffect(() => {
    // TODO: Replace with actual API calls
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulated data - replace with actual API calls
        setMonthlyRevenue(150000000);
        setNewAccounts(45);
        setTotalFeedbacks(120);
        setServiceStats([
          { key: '1', serviceName: 'Khám tổng quát', usageCount: 150, revenue: 45000000 },
          { key: '2', serviceName: 'Siêu âm', usageCount: 120, revenue: 36000000 },
          { key: '3', serviceName: 'Xét nghiệm', usageCount: 200, revenue: 60000000 },
        ]);
        setDoctorStats([
          { key: '1', doctorName: 'Dr. Nguyễn Văn A', appointmentCount: 80, rating: 4.8 },
          { key: '2', doctorName: 'Dr. Trần Thị B', appointmentCount: 65, rating: 4.7 },
          { key: '3', doctorName: 'Dr. Lê Văn C', appointmentCount: 55, rating: 4.9 },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [currentMonth]);

  const cardStyle = {
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowTertiary,
    height: '100%',
  };

  const statisticCardStyle = {
    ...cardStyle,
    background: `linear-gradient(135deg, ${token.colorPrimary} 0%, ${token.colorPrimaryBg} 100%)`,
    color: token.colorWhite,
  };

  const tableCardStyle = {
    ...cardStyle,
    background: token.colorBgContainer,
  };

  return (
    <div style={{ padding: '24px', background: token.colorBgLayout }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2} style={{ color: token.colorTextHeading, margin: 0 }}>
              Báo cáo thống kê
            </Title>
          </Col>
          <Col>
            <DatePicker
              picker="month"
              value={currentMonth}
              onChange={(date) => date && setCurrentMonth(date)}
              style={{
                borderRadius: token.borderRadiusLG,
                borderColor: token.colorBorder,
              }}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card style={statisticCardStyle}>
              <Statistic
                title={<span style={{ color: token.colorWhite }}>Doanh thu tháng</span>}
                value={monthlyRevenue}
                prefix={<DollarOutlined style={{ color: token.colorWhite }} />}
                suffix="VNĐ"
                valueStyle={{ color: token.colorWhite }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card style={statisticCardStyle}>
              <Statistic
                title={<span style={{ color: token.colorWhite }}>Tài khoản mới</span>}
                value={newAccounts}
                prefix={<UserOutlined style={{ color: token.colorWhite }} />}
                valueStyle={{ color: token.colorWhite }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card style={statisticCardStyle}>
              <Statistic
                title={<span style={{ color: token.colorWhite }}>Dịch vụ đã sử dụng</span>}
                value={serviceStats.reduce((acc, curr) => acc + curr.usageCount, 0)}
                prefix={<MedicineBoxOutlined style={{ color: token.colorWhite }} />}
                valueStyle={{ color: token.colorWhite }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card style={statisticCardStyle}>
              <Statistic
                title={<span style={{ color: token.colorWhite }}>Phản hồi</span>}
                value={totalFeedbacks}
                prefix={<MessageOutlined style={{ color: token.colorWhite }} />}
                valueStyle={{ color: token.colorWhite }}
              />
            </Card>
          </Col>
        </Row>

        <Card 
          title="Thống kê dịch vụ" 
          style={tableCardStyle}
          headStyle={{
            background: token.colorPrimary,
            color: token.colorWhite,
            borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,
          }}
        >
          <Table
            columns={serviceColumns}
            dataSource={serviceStats}
            loading={loading}
            pagination={false}
            rowClassName={() => 'hover-row'}
          />
        </Card>

        <Card 
          title="Thống kê bác sĩ" 
          style={tableCardStyle}
          headStyle={{
            background: token.colorPrimary,
            color: token.colorWhite,
            borderRadius: `${token.borderRadiusLG}px ${token.borderRadiusLG}px 0 0`,
          }}
        >
          <Table
            columns={doctorColumns}
            dataSource={doctorStats}
            loading={loading}
            pagination={false}
            rowClassName={() => 'hover-row'}
          />
        </Card>
      </Space>
    </div>
  );
};

export default ManagerReport;
