import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Tabs, Typography, Space } from 'antd';
import { UserOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons';

interface Account {
  id: string;
  name: string;
  email: string;
  type: 'doctor' | 'customer';
  createdAt: string;
  lastActive: string;
  totalPayments: number;
  activityCount: number;
}

// Mock data
const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Dr. Nguyen Van A',
    email: 'dr.nguyen@example.com',
    type: 'doctor',
    createdAt: '2024-01-15',
    lastActive: '2024-03-20',
    totalPayments: 0,
    activityCount: 156,
  },
  {
    id: '2',
    name: 'Dr. Tran Thi B',
    email: 'dr.tran@example.com',
    type: 'doctor',
    createdAt: '2024-02-01',
    lastActive: '2024-03-19',
    totalPayments: 0,
    activityCount: 142,
  },
  {
    id: '3',
    name: 'Le Van C',
    email: 'le.van@example.com',
    type: 'customer',
    createdAt: '2024-03-01',
    lastActive: '2024-03-20',
    totalPayments: 2500000,
    activityCount: 45,
  },
  {
    id: '4',
    name: 'Pham Thi D',
    email: 'pham.thi@example.com',
    type: 'customer',
    createdAt: '2024-03-15',
    lastActive: '2024-03-20',
    totalPayments: 1500000,
    activityCount: 12,
  },
  {
    id: '5',
    name: 'Hoang Van E',
    email: 'hoang.van@example.com',
    type: 'customer',
    createdAt: '2024-03-18',
    lastActive: '2024-03-20',
    totalPayments: 500000,
    activityCount: 5,
  },
  {
    id: '6',
    name: 'Dr. Vu Van F',
    email: 'dr.vu@example.com',
    type: 'doctor',
    createdAt: '2024-03-19',
    lastActive: '2024-03-20',
    totalPayments: 0,
    activityCount: 8,
  },
  {
    id: '7',
    name: 'Nguyen Thi G',
    email: 'nguyen.thi@example.com',
    type: 'customer',
    createdAt: '2024-03-20',
    lastActive: '2024-03-20',
    totalPayments: 1000000,
    activityCount: 3,
  },
];

const ManagerAccount: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      // Simulate API call with mock data
      setAccounts(mockAccounts);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  const getNewAccounts = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return accounts.filter(account => new Date(account.createdAt) > thirtyDaysAgo);
  };

  const getMostActiveAccounts = () => {
    return [...accounts]
      .sort((a, b) => b.activityCount - a.activityCount)
      .slice(0, 5);
  };

  const getHighestPaymentAccounts = () => {
    return [...accounts]
      .sort((a, b) => b.totalPayments - a.totalPayments)
      .slice(0, 5);
  };

  const getAccountTypeCount = (type: 'doctor' | 'customer') => {
    return accounts.filter(account => account.type === type).length;
  };

  const columns = [
    {
      title: <span className="text-pink-600 font-semibold">Tên</span>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <span className="text-pink-600 font-semibold">Email</span>,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: <span className="text-pink-600 font-semibold">Loại tài khoản</span>,
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          type === 'doctor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {type === 'doctor' ? 'Bác sĩ' : 'Khách hàng'}
        </span>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Ngày tạo</span>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: <span className="text-pink-600 font-semibold">Hoạt động cuối</span>,
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
    },
  ];

  const items = [
    {
      key: '1',
      label: 'Tài khoản hoạt động nhiều nhất',
      children: (
        <Table
          columns={[
            ...columns,
            {
              title: <span className="text-pink-600 font-semibold">Số lần hoạt động</span>,
              dataIndex: 'activityCount',
              key: 'activityCount',
              render: (count: number) => (
                <span className="text-blue-600 font-medium">{count}</span>
              ),
            },
          ]}
          dataSource={getMostActiveAccounts()}
          rowKey="id"
          className="rounded-lg overflow-hidden"
        />
      ),
    },
    {
      key: '2',
      label: 'Tài khoản thanh toán cao nhất',
      children: (
        <Table
          columns={[
            ...columns,
            {
              title: <span className="text-pink-600 font-semibold">Tổng thanh toán</span>,
              dataIndex: 'totalPayments',
              key: 'totalPayments',
              render: (amount: number) => (
                <span className="text-green-600 font-medium">
                  {amount.toLocaleString('vi-VN')} VNĐ
                </span>
              ),
            },
          ]}
          dataSource={getHighestPaymentAccounts()}
          rowKey="id"
          className="rounded-lg overflow-hidden"
        />
      ),
    },
    {
      key: '3',
      label: 'Tài khoản mới',
      children: (
        <Table
          columns={[
            ...columns,
            {
              title: <span className="text-pink-600 font-semibold">Trạng thái</span>,
              key: 'status',
              render: () => (
                <span className="px-2 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                  Mới
                </span>
              ),
            },
          ]}
          dataSource={getNewAccounts()}
          rowKey="id"
          className="rounded-lg overflow-hidden"
        />
      ),
    },
  ];

  return (
    <div className="p-6">
      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Typography.Title level={2} className="text-pink-600 !mb-0">
            Quản lý tài khoản
          </Typography.Title>
          <Typography.Text type="secondary">
            Theo dõi và quản lý tất cả tài khoản trong hệ thống
          </Typography.Text>
        </div>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600">Tổng số tài khoản</span>}
                value={accounts.length}
                prefix={<TeamOutlined className="text-pink-500" />}
                valueStyle={{ color: '#ec4899' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600">Tài khoản bác sĩ</span>}
                value={getAccountTypeCount('doctor')}
                prefix={<UserOutlined className="text-blue-500" />}
                valueStyle={{ color: '#3b82f6' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600">Tài khoản khách hàng</span>}
                value={getAccountTypeCount('customer')}
                prefix={<UserOutlined className="text-green-500" />}
                valueStyle={{ color: '#22c55e' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <Statistic
                title={<span className="text-gray-600">Tài khoản mới (30 ngày)</span>}
                value={getNewAccounts().length}
                prefix={<UserAddOutlined className="text-yellow-500" />}
                valueStyle={{ color: '#eab308' }}
              />
            </Card>
          </Col>
        </Row>

        <Card className="shadow-lg">
          <Tabs
            items={items}
            className="account-tabs"
            tabBarStyle={{ marginBottom: 16 }}
          />
        </Card>
      </Space>
    </div>
  );
};

export default ManagerAccount;
