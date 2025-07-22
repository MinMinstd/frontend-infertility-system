import React, { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Select,
  Space,
  Button,
  Tag,
  Typography,
  Card,
  Popconfirm,
  message,
  Spin,
  Empty,
} from 'antd';
import { CheckCircle, XCircle, User, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import ManagerApi from '../../servers/manager.api';
import type { Feedback } from '../../types/manager.d';
const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;


const tableVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 120 } },
};

// SVG feedback minh họa
const FeedbackSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="16" width="48" height="32" rx="8" fill="#fbbf24"/>
    <rect x="8" y="16" width="48" height="32" rx="8" stroke="#f59e42" strokeWidth="2"/>
    <ellipse cx="32" cy="32" rx="16" ry="10" fill="#fff"/>
    <ellipse cx="32" cy="32" rx="16" ry="10" stroke="#fbbf24" strokeWidth="2"/>
    <circle cx="26" cy="30" r="2" fill="#fbbf24"/>
    <circle cx="38" cy="30" r="2" fill="#fbbf24"/>
    <path d="M28 36c1.5 2 6.5 2 8 0" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ManagerFeedbacks: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await ManagerApi.GetFeedback();
        let feedbackArr: Feedback[] = Array.isArray(res.data) ? res.data : [];
        feedbackArr = feedbackArr.map((item: Feedback) => ({
          ...item,
          feedbackId: String(item.feedbackId),
          status: item.status === "Ok" ? "resolved" : (item.status === "No" ? "rejected" : "pending"),
          isApproved: item.status === "Ok"
        }));
        setFeedbacks(feedbackArr);
      } catch {
        message.error('Không thể lấy danh sách phản hồi');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleApproveFeedback = async (feedbackId: string) => {
    try {
      await ManagerApi.UpdateFeedbackStatus(feedbackId, "Ok");
      setFeedbacks(feedbacks.map(feedback =>
        feedback.feedbackId === feedbackId
          ? { ...feedback, isApproved: true, status: 'resolved' }
          : feedback
      ));
      message.success('Đã duyệt phản hồi thành công');
    } catch {
      message.error('Lỗi khi duyệt phản hồi');
    }
  };

  const handleRejectFeedback = async (feedbackId: string) => {
    try {
      await ManagerApi.UpdateFeedbackStatus(feedbackId, "No");
      setFeedbacks(feedbacks.map(feedback =>
        feedback.feedbackId === feedbackId
          ? { ...feedback, status: 'rejected', isApproved: false }
          : feedback
      ));
      message.success('Đã từ chối phản hồi');
    } catch {
      message.error('Lỗi khi từ chối phản hồi');
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = (feedback.comments || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (feedback.fullName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'resolved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string | undefined) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'resolved':
        return 'Đã duyệt';
      case 'rejected':
        return 'Từ chối';
      default:
        return status;
    }
  };

  const columns = [
    {
      title: <span className="text-pink-600 font-semibold">Người dùng</span>,
      dataIndex: 'fullName',
      key: 'fullName',
      render: (name: string) => (
        <span className="flex items-center gap-2"><User className="w-4 h-4 text-blue-500" />{name}</span>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Nội dung</span>,
      dataIndex: 'comments',
      key: 'comments',
      render: (c: string) => (
        <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-pink-500" />{c}</span>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Đánh giá</span>,
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => `${rating}/5`,
    },
    {
      title: <span className="text-pink-600 font-semibold">Trạng thái</span>,
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Feedback) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
          {record.isApproved && <CheckCircle className="inline ml-1 text-green-500 w-4 h-4" />}
        </Tag>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Ngày gửi</span>,
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
    },
    {
      title: <span className="text-pink-600 font-semibold">Thao tác</span>,
      key: 'actions',
      render: (_: unknown, record: Feedback) => {
        if (record.status === 'resolved') {
          return <Tag color="success">Đã duyệt</Tag>;
        }
        if (record.status === 'rejected') {
          return <Tag color="error">Đã bị từ chối</Tag>;
        }
        if (record.status === 'pending') {
          return (
            <Space>
              <Button
                type="primary"
                icon={<CheckCircle className="w-4 h-4" />}
                onClick={() => handleApproveFeedback(record.feedbackId)}
                style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
              >
                Duyệt
              </Button>
              <Popconfirm
                title="Bạn có chắc chắn muốn từ chối phản hồi này?"
                onConfirm={() => handleRejectFeedback(record.feedbackId)}
                okText="Có"
                cancelText="Không"
              >
                <Button danger icon={<XCircle className="w-4 h-4" />}>Từ chối</Button>
              </Popconfirm>
            </Space>
          );
        }
        return null;
      },
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Banner đầu trang */}
      <div className="w-full flex items-center gap-6 bg-white rounded-2xl shadow mb-8 overflow-hidden">
        <div className="ml-4"><FeedbackSVG /></div>
        <div className="flex-1">
          <Title level={2} className="text-pink-600 !mb-1">Quản lý phản hồi</Title>
          <Text type="secondary">Theo dõi, duyệt và phản hồi ý kiến khách hàng</Text>
        </div>
        <div className="mr-6"><FeedbackSVG /></div>
      </div>
      {/* End Banner */}
      <Card className="mb-6 rounded-xl shadow-md mt-6 relative">
        {/* SVG feedback nhỏ góc phải card */}
        <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none select-none"><FeedbackSVG /></div>
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Search
            placeholder="Tìm kiếm phản hồi..."
            allowClear
            style={{ width: 200 }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            style={{ width: 160 }}
            value={statusFilter}
            onChange={setStatusFilter}
          >
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="pending">Chờ xử lý</Option>
            <Option value="resolved">Đã duyệt</Option>
            <Option value="rejected">Từ chối</Option>
          </Select>
        </motion.div>
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
              dataSource={filteredFeedbacks}
              rowKey="feedbackId"
              className="rounded-xl overflow-hidden shadow"
              pagination={{ pageSize: 10 }}
              locale={{ emptyText: <Empty image={<FeedbackSVG />} description={<span>Chưa có phản hồi nào</span>} /> }}
            />
          </motion.div>
        )}
      </Card>
    </div>
  );
};

export default ManagerFeedbacks;
