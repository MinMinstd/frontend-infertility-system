import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Typography, Space, Spin, message, Empty } from 'antd';
import { UserOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons';
import ManagerApi from '../../servers/manager.api';
import type { Account } from '../../types/manager.d';

const CARD_TYPES = [
  {
    key: 'all',
    label: 'Tổng tài khoản',
    color: 'pink',
    icon: <TeamOutlined className="text-pink-500" />,
  },
  {
    key: 'doctor',
    label: 'Tài khoản bác sĩ',
    color: 'blue',
    icon: <UserOutlined className="text-blue-500" />,
  },
  {
    key: 'customer',
    label: 'Tài khoản khách hàng',
    color: 'green',
    icon: <UserOutlined className="text-green-500" />,
  },
  {
    key: 'new',
    label: 'Tài khoản mới',
    color: 'yellow',
    icon: <UserAddOutlined className="text-yellow-500" />,
  },
];

type CardKey = 'all' | 'doctor' | 'customer' | 'new';

const ManagerAccount: React.FC = () => {
  const [allAccounts, setAllAccounts] = useState<Account[]>([]);
  const [displayAccounts, setDisplayAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    all: 0,
    doctor: 0,
    customer: 0,
    new: 0,
  });
  const [selectedType, setSelectedType] = useState<CardKey>('all');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [allRes, doctorRes, customerRes, newRes, accountsRes] = await Promise.all([
        ManagerApi.GetCountTotalAccounts(),
        ManagerApi.GetCountDoctorsAccount(),
        ManagerApi.GetCountCustomerAccount(),
        ManagerApi.GetCountNewAccount(),
        ManagerApi.GetAllUsersForManagement(),
      ]);
      setCounts({
        all: typeof allRes.data === 'number' ? allRes.data : (Array.isArray(allRes.data) ? allRes.data.length : 0),
        doctor: typeof doctorRes.data === 'number' ? doctorRes.data : (Array.isArray(doctorRes.data) ? doctorRes.data.length : 0),
        customer: typeof customerRes.data === 'number' ? customerRes.data : (Array.isArray(customerRes.data) ? customerRes.data.length : 0),
        new: typeof newRes.data === 'number' ? newRes.data : (Array.isArray(newRes.data) ? newRes.data.length : 0),
      });
      const accounts = Array.isArray(accountsRes.data) ? accountsRes.data : [];
      setAllAccounts(accounts);
      setDisplayAccounts(accounts);
    } catch (err) {
      message.error('Lỗi khi tải dữ liệu tài khoản!');
      setAllAccounts([]);
      setDisplayAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  // Lọc danh sách tài khoản theo loại khi click card
  const handleCardClick = (type: CardKey) => {
    setSelectedType(type);
    let filtered: Account[] = allAccounts;
    if (type === 'doctor') {
      filtered = allAccounts.filter(acc => acc.role?.toLowerCase() === 'doctor');
    } else if (type === 'customer') {
      filtered = allAccounts.filter(acc => acc.role?.toLowerCase() === 'customer');
    } else if (type === 'new') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      filtered = allAccounts.filter(acc => acc.createdAt && new Date(acc.createdAt) > thirtyDaysAgo);
    }
    setDisplayAccounts(filtered);
  };

  // Cột hiển thị cho bảng tài khoản
  const columns = [
    {
      title: <span className="text-pink-600 font-semibold">Tên</span>,
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: <span className="text-pink-600 font-semibold">Email</span>,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: <span className="text-pink-600 font-semibold">Loại tài khoản</span>,
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <span className={`px-2 py-1 rounded-full text-sm ${
          role?.toLowerCase() === 'doctor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
        }`}>
          {role?.toLowerCase() === 'doctor' ? 'Bác sĩ' : 'Khách hàng'}
        </span>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Ngày tạo</span>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => date ? new Date(date).toLocaleDateString('vi-VN') : '',
    },
    {
      title: <span className="text-pink-600 font-semibold">Hoạt động cuối</span>,
      dataIndex: 'lastActiveAt',
      key: 'lastActiveAt',
      render: (date: string) => date ? new Date(date).toLocaleDateString('vi-VN') : '',
    },
    {
      title: <span className="text-pink-600 font-semibold">Số ngày hoạt động</span>,
      dataIndex: 'totalActiveDays',
      key: 'totalActiveDays',
      render: (count: number) => (
        <span className="text-blue-600 font-medium">{count ?? ''}</span>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white to-gray-50">
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
          {CARD_TYPES.map(card => (
            <Col xs={24} sm={12} md={6} key={card.key}>
              <Card
                className={`shadow-md hover:shadow-lg transition-shadow cursor-pointer rounded-xl border-2 ${selectedType === card.key ? `border-${card.color}-400 ring-2 ring-${card.color}-200` : 'border-transparent'}`}
                onClick={() => handleCardClick(card.key as CardKey)}
                style={{ borderColor: selectedType === card.key ? `var(--${card.color}-500)` : undefined }}
              >
                <Statistic
                  title={<span className="text-gray-600">{card.label}{card.key === 'new' ? ' (30 ngày)' : ''}</span>}
                  value={counts[card.key]}
                  prefix={card.icon}
                  valueStyle={{ color: `var(--${card.color}-600)` }}
                />
                <div className={`text-base font-semibold text-${card.color}-600 mt-2 text-center`}>
                  {card.label}
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Card className="shadow-lg mt-6 rounded-xl">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={displayAccounts}
              rowKey="id"
              className="rounded-lg overflow-hidden"
              pagination={{ pageSize: 5 }}
              locale={{ emptyText: <Empty description="Không có dữ liệu tài khoản" /> }}
            />
          )}
        </Card>
      </Space>
    </div>
  );
};

export default ManagerAccount;
