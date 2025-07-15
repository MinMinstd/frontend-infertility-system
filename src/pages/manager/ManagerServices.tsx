import React, { useState, useEffect } from 'react';
import { Table, message, Spin, Empty, Card, Typography, Radio } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import ManagerApi from '../../servers/manager.api';
import type { TreatmentRoadmap } from '../../types/manager.d';

const { Title, Text } = Typography;

type RoadmapWithId = TreatmentRoadmap & { id: number };

const tableVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 120 } },
};

// SVG dịch vụ minh họa
const ServiceSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="18" width="44" height="32" rx="8" fill="#a78bfa"/>
    <rect x="10" y="18" width="44" height="32" rx="8" stroke="#7c3aed" strokeWidth="2"/>
    <rect x="22" y="10" width="20" height="12" rx="4" fill="#7c3aed"/>
    <rect x="28" y="26" width="8" height="8" rx="2" fill="#fff"/>
    <rect x="20" y="38" width="24" height="4" rx="2" fill="#fff"/>
  </svg>
);

const ManagerServices: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<RoadmapWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'IVF' | 'IUI'>('ALL');

  useEffect(() => {
    const fetchRoadmaps = async () => {
      setLoading(true);
      try {
        const response = await ManagerApi.GetAllTreatmentRoadMap();
        const data: RoadmapWithId[] = response.data.map((s) => ({ ...s, id: s.treatmentRoadmapId }));
        setRoadmaps(data);
      } catch {
        message.error('Lấy danh sách lộ trình điều trị thất bại');
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmaps();
  }, []);

  const filteredRoadmaps = filter === 'ALL'
    ? roadmaps
    : roadmaps.filter(r => r.serviceName.toLowerCase().includes(filter.toLowerCase()));

  const columns: ColumnsType<RoadmapWithId> = [
    {
      title: <span className="text-pink-600 font-semibold">ID</span>,
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: <span className="text-pink-600 font-semibold">Tên dịch vụ</span>,
      dataIndex: 'serviceName',
      key: 'serviceName',
      width: 180,
      render: (service: string) => (
        <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-purple-500" />{service}</span>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Giai đoạn</span>,
      dataIndex: 'stage',
      key: 'stage',
      width: 200,
    },
    {
      title: <span className="text-pink-600 font-semibold">Mô tả</span>,
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },
    {
      title: <span className="text-pink-600 font-semibold">Số ngày</span>,
      dataIndex: 'durationDay',
      key: 'durationDay',
      width: 100,
    },
    {
      title: <span className="text-pink-600 font-semibold">Giá (VNĐ)</span>,
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (price: number) => price.toLocaleString('vi-VN'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Banner đầu trang */}
        <div className="w-full flex items-center gap-6 bg-white rounded-2xl shadow mb-8 overflow-hidden">
          <div className="ml-4"><ServiceSVG /></div>
          <div className="flex-1">
            <Title level={2} className="text-pink-600 !mb-1">Quản lý dịch vụ</Title>
            <Text type="secondary">Theo dõi và quản lý các dịch vụ, lộ trình điều trị</Text>
          </div>
          <div className="mr-6"><ServiceSVG /></div>
        </div>
        {/* End Banner */}
        <Card className="bg-white rounded-2xl shadow-lg p-6 mt-6 relative">
          {/* Bộ lọc dịch vụ */}
          <div className="mb-4 flex justify-end">
            <Radio.Group
              value={filter}
              onChange={e => setFilter(e.target.value)}
              optionType="button"
              buttonStyle="solid"
            >
              <Radio.Button value="ALL">Tất cả</Radio.Button>
              <Radio.Button value="IVF">IVF</Radio.Button>
              <Radio.Button value="IUI">IUI</Radio.Button>
            </Radio.Group>
          </div>
          {/* SVG dịch vụ nhỏ góc phải card */}
          <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none select-none"><ServiceSVG /></div>
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
                dataSource={filteredRoadmaps}
                rowKey="id"
                className="rounded-xl overflow-hidden shadow"
                pagination={{ pageSize: 10 }}
                locale={{ emptyText: <Empty image={<ServiceSVG />} description={<span>Chưa có dịch vụ nào</span>} /> }}
              />
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ManagerServices;
