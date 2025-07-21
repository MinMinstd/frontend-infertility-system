import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Typography, Space, Spin, message, Empty } from 'antd';
import { User, Users, UserPlus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ManagerApi from '../../servers/manager.api';
import type { Account } from '../../types/manager.d';

const CARD_TYPES = [
  {
    key: 'all',
    label: 'Tổng tài khoản',
    color: 'pink',
    icon: <Users className="text-pink-500 w-6 h-6" />,
  },
  {
    key: 'doctor',
    label: 'Tài khoản bác sĩ',
    color: 'blue',
    icon: <User className="text-blue-500 w-6 h-6" />,
  },
  {
    key: 'customer',
    label: 'Tài khoản khách hàng',
    color: 'green',
    icon: <User className="text-green-500 w-6 h-6" />,
  },
  {
    key: 'new',
    label: 'Tài khoản mới',
    color: 'yellow',
    icon: <UserPlus className="text-yellow-500 w-6 h-6" />,
  },
];

type CardKey = 'all' | 'doctor' | 'customer' | 'new';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, type: 'spring' as const, stiffness: 120 } }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 100 } },
};

// SVG user/account minh họa
const UserSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="24" r="12" fill="#38bdf8"/>
    <circle cx="32" cy="24" r="12" stroke="#0ea5e9" strokeWidth="2"/>
    <ellipse cx="32" cy="48" rx="18" ry="10" fill="#bae6fd"/>
    <ellipse cx="32" cy="48" rx="18" ry="10" stroke="#38bdf8" strokeWidth="2"/>
  </svg>
);

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
      // Lọc chỉ lấy tài khoản active
      const accounts = Array.isArray(accountsRes.data) ? accountsRes.data.filter((acc: Account) => acc.isActive) : [];
      setAllAccounts(accounts);
      setDisplayAccounts(accounts);
    } catch {
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
    // Luôn chỉ hiển thị tài khoản active
    filtered = filtered.filter(acc => acc.isActive);
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
    {
      title: <span className="text-pink-600 font-semibold">Thao tác</span>,
      key: 'action',
      render: (_: unknown, record: Account) => (
        <button
          className="text-red-500 hover:text-red-700 p-1 rounded-full border border-transparent hover:border-red-200 transition"
          title="Xóa tài khoản"
          onClick={async () => {
            if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản: ${record.fullName}?`)) {
              try {
                await ManagerApi.DeleteAccount(record.userId);
                message.success('Xóa tài khoản thành công!');
                fetchAllData();
              } catch {
                message.error('Xóa tài khoản thất bại!');
              }
            }
          }}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Banner đầu trang */}
      <div className="w-full flex items-center gap-6 bg-white rounded-2xl shadow mb-8 overflow-hidden">
        <div className="ml-4"><UserSVG /></div>
        <div className="flex-1">
          <Typography.Title level={2} className="text-pink-600 !mb-1">Quản lý tài khoản</Typography.Title>
          <Typography.Text type="secondary">Theo dõi và quản lý tất cả tài khoản trong hệ thống</Typography.Text>
        </div>
        <div className="mr-6"><UserSVG /></div>
      </div>
      {/* End Banner */}
      <Space direction="vertical" size="large" className="w-full">
        <Row gutter={[16, 16]}>
          {CARD_TYPES.map((card, i) => (
            <Col xs={24} sm={12} md={6} key={card.key}>
              <motion.div
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}
              >
                <Card
                  className={`shadow-md hover:shadow-lg transition-shadow cursor-pointer rounded-xl border-2 ${selectedType === card.key ? `border-${card.color}-400 ring-2 ring-${card.color}-200` : 'border-transparent'} relative`}
                  onClick={() => handleCardClick(card.key as CardKey)}
                  style={{ borderColor: selectedType === card.key ? `var(--${card.color}-500)` : undefined, minHeight: 120 }}
                >
                  {/* SVG user nhỏ góc phải card */}
                  <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none select-none"><UserSVG /></div>
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
              </motion.div>
            </Col>
          ))}
        </Row>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="bg-white rounded-2xl shadow-lg p-6 mt-6 relative">
            {/* SVG user nhỏ góc phải card/table */}
            <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none select-none"><UserSVG /></div>
            {loading ? (
              <div className="flex justify-center items-center py-16">
                <Spin size="large" />
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={displayAccounts}
                rowKey="accountId"
                className="rounded-xl overflow-hidden shadow"
                pagination={{ pageSize: 10 }}
                locale={{ emptyText: <Empty image={<UserSVG />} description={<span>Chưa có tài khoản nào</span>} /> }}
              />
            )}
          </Card>
        </motion.div>
      </Space>
    </div>
  );
};

export default ManagerAccount;
