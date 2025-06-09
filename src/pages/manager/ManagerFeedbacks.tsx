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
} from 'antd';
import { DeleteOutlined, EyeOutlined, CheckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { sampleFeedbacks } from '../../data/feedbackData';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

interface Feedback {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  reply?: string;
  status?: 'pending' | 'resolved' | 'rejected';
  category?: 'Dịch vụ' | 'Điều trị' | 'Tư vấn' | 'Khác';
  isApproved?: boolean;
}

const ManagerFeedbacks: React.FC = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    // Sử dụng dữ liệu mẫu từ feedbackData
    const initialFeedbacks: Feedback[] = sampleFeedbacks.map(feedback => ({
      ...feedback,
      status: 'pending' as const,
      category: 'Dịch vụ' as const,
      isApproved: false,
    }));
    setFeedbacks(initialFeedbacks);
  }, []);

  const handleDeleteFeedback = (id: string) => {
    setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
    message.success('Đã xóa phản hồi thành công');
  };

  const handleViewFeedback = (id: string) => {
    navigate(`/manager/feedbacks/${id}`);
  };

  const handleApproveFeedback = (id: string) => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === id 
        ? { ...feedback, isApproved: true, status: 'resolved' as const }
        : feedback
    ));
    message.success('Đã duyệt phản hồi thành công');
  };

  const handleRejectFeedback = (id: string) => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === id 
        ? { ...feedback, status: 'rejected' as const }
        : feedback
    ));
    message.success('Đã từ chối phản hồi');
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || feedback.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || feedback.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: string) => {
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

  const getStatusText = (status: string) => {
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
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Nội dung',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => `${rating}/5`,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
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
      render: (_: unknown, record: Feedback) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewFeedback(record.id)}
          />
          {record.status === 'pending' && (
            <>
              <Button
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleApproveFeedback(record.id)}
                style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
              >
                Duyệt
              </Button>
              <Popconfirm
                title="Bạn có chắc chắn muốn từ chối phản hồi này?"
                onConfirm={() => handleRejectFeedback(record.id)}
                okText="Có"
                cancelText="Không"
              >
                <Button danger>Từ chối</Button>
              </Popconfirm>
            </>
          )}
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa phản hồi này?"
            onConfirm={() => handleDeleteFeedback(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Quản lý phản hồi</Title>

      <Card style={{ marginBottom: '24px' }}>
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
            <Option value="all">Tất cả trạng thái</Option>
            <Option value="pending">Chờ xử lý</Option>
            <Option value="resolved">Đã duyệt</Option>
            <Option value="rejected">Từ chối</Option>
          </Select>
          <Select
            style={{ width: 120 }}
            value={categoryFilter}
            onChange={setCategoryFilter}
          >
            <Option value="all">Tất cả danh mục</Option>
            <Option value="Dịch vụ">Dịch vụ</Option>
            <Option value="Điều trị">Điều trị</Option>
            <Option value="Tư vấn">Tư vấn</Option>
            <Option value="Khác">Khác</Option>
          </Select>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredFeedbacks}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số ${total} phản hồi`,
          }}
        />
      </Card>
    </div>
  );
};

export default ManagerFeedbacks;
