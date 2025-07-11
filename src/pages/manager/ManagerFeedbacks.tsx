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
import { CheckOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import ManagerApi from '../../servers/manager.api';
import type { Feedback } from '../../types/manager.d';
const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

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
          // Map status từ backend sang FE
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
      title: 'Người dùng',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Nội dung',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => `${rating}/5`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: Feedback) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
          {record.isApproved && ' ✓'}
        </Tag>
      ),
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm'),
    },
    {
      title: 'Thao tác',
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
                icon={<CheckOutlined />}
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
                <Button danger>Từ chối</Button>
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
      <Title level={2} className="text-pink-600 !mb-0">Quản lý phản hồi</Title>
      <Card className="mb-6 rounded-xl shadow-md">
        <Space style={{ marginBottom: '16px' }}>
          <Search
            placeholder="Tìm kiếm phản hồi..."
            allowClear
            style={{ width: 200 }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            style={{ width: 120 }}
            value={statusFilter}
            onChange={setStatusFilter}
          >
            <Option value="all">Tất cả</Option>
            <Option value="pending">Chờ xử lý</Option>
            <Option value="resolved">Đã duyệt</Option>
            <Option value="rejected">Từ chối</Option>
          </Select>
        </Space>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredFeedbacks}
            rowKey="feedbackId"
            className="rounded-lg overflow-hidden"
            pagination={{ pageSize: 8 }}
            locale={{ emptyText: <Empty description="Không có dữ liệu phản hồi" /> }}
          />
        )}
      </Card>
    </div>
  );
};

export default ManagerFeedbacks;
