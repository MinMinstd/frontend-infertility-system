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
} from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  EyeOutlined,
  DollarOutlined,
  UserOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
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

  const columns: ColumnsType<RevenueData> = [
    {
      title: 'Tháng',
      dataIndex: 'month',
      key: 'month',
      render: (text: string) => (
        <Text strong>{text}</Text>
      ),
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value: number) => (
        <Text strong style={{ color: '#1890ff' }}>
          {value.toLocaleString('vi-VN')} VNĐ
        </Text>
      ),
    },
    {
      title: 'Số bệnh nhân',
      dataIndex: 'patients',
      key: 'patients',
      render: (value: number) => (
        <Text>{value} bệnh nhân</Text>
      ),
    },
    {
      title: 'Số ca điều trị',
      dataIndex: 'treatments',
      key: 'treatments',
      render: (value: number) => (
        <Text>{value} ca</Text>
      ),
    },
    {
      title: 'Chi tiết',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
          style={{ 
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
          }}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const detailedColumns: ColumnsType<DetailedRevenueData> = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text: string) => (
        <Text strong>{text}</Text>
      ),
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (value: number) => (
        <Text strong style={{ color: '#1890ff' }}>
          {value.toLocaleString('vi-VN')} VNĐ
        </Text>
      ),
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          completed: { color: 'success', text: 'Hoàn thành' },
          pending: { color: 'warning', text: 'Đang xử lý' },
          cancelled: { color: 'error', text: 'Đã hủy' },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
  ];

  return (
    <div style={{ padding: '24px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <Card style={{ marginBottom: '24px', borderRadius: '8px' }}>
        <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
          Quản lý doanh thu
        </Title>
        <Divider style={{ margin: '16px 0' }} />
        
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <DatePicker
            picker="month"
            value={selectedMonth}
            onChange={(date) => date && setSelectedMonth(date)}
            style={{ 
              marginBottom: '16px',
              width: '200px',
            }}
          />

          <Row gutter={[24, 24]}>
            <Col xs={24} sm={8}>
              <Card 
                bordered={false}
                style={{ 
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <Statistic
                  title={
                    <Space>
                      <DollarOutlined style={{ color: '#1890ff' }} />
                      <Text strong>Doanh thu tháng này</Text>
                    </Space>
                  }
                  value={currentMonthStats.totalRevenue}
                  precision={0}
                  valueStyle={{ color: '#1890ff', fontSize: '24px' }}
                  prefix="VNĐ"
                  suffix={
                    <span style={{ fontSize: '14px', color: currentMonthStats.previousMonthComparison > 0 ? '#52c41a' : '#f5222d' }}>
                      {currentMonthStats.previousMonthComparison > 0 ? (
                        <ArrowUpOutlined />
                      ) : (
                        <ArrowDownOutlined />
                      )}
                      {Math.abs(currentMonthStats.previousMonthComparison)}%
                    </span>
                  }
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card 
                bordered={false}
                style={{ 
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <Statistic
                  title={
                    <Space>
                      <UserOutlined style={{ color: '#1890ff' }} />
                      <Text strong>Số bệnh nhân</Text>
                    </Space>
                  }
                  value={currentMonthStats.totalPatients}
                  valueStyle={{ color: '#1890ff', fontSize: '24px' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card 
                bordered={false}
                style={{ 
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <Statistic
                  title={
                    <Space>
                      <MedicineBoxOutlined style={{ color: '#1890ff' }} />
                      <Text strong>Số ca điều trị</Text>
                    </Space>
                  }
                  value={currentMonthStats.totalTreatments}
                  valueStyle={{ color: '#1890ff', fontSize: '24px' }}
                />
              </Card>
            </Col>
          </Row>
        </Space>
      </Card>

      <Card 
        title={
          <Space>
            <DollarOutlined style={{ color: '#1890ff' }} />
            <Text strong>Lịch sử doanh thu</Text>
          </Space>
        }
        style={{ 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Table
          columns={columns}
          dataSource={revenueData}
          pagination={{ 
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} tháng`,
          }}
        />
      </Card>

      <Modal
        title={
          <Space>
            <DollarOutlined style={{ color: '#1890ff' }} />
            <Text strong>Chi tiết doanh thu - {selectedMonthData?.month}</Text>
          </Space>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={1000}
        footer={null}
        style={{ top: 20 }}
      >
        <Table
          columns={detailedColumns}
          dataSource={detailedRevenueData}
          pagination={{ 
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} giao dịch`,
          }}
        />
      </Modal>
    </div>
  );
};

export default ManagerFinance;
