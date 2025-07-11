import React, { useState, useEffect } from 'react';
import { Table, message, Spin, Empty } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ManagerApi from '../../servers/manager.api';
import type { TreatmentRoadmap } from '../../types/manager.d';

type RoadmapWithId = TreatmentRoadmap & { id: number };

const ManagerServices: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<RoadmapWithId[]>([]);
  const [loading, setLoading] = useState(true);
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

  const columns: ColumnsType<RoadmapWithId> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
      key: 'serviceName',
      width: 180,
    },
    {
      title: 'Giai đoạn',
      dataIndex: 'stage',
      key: 'stage',
      width: 200,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },
    {
      title: 'Số ngày',
      dataIndex: 'durationDay',
      key: 'durationDay',
      width: 100,
    },
    {
      title: 'Giá (VNĐ)',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (price: number) => price.toLocaleString('vi-VN'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý dịch vụ</h1>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={roadmaps}
              rowKey="id"
              className="rounded-xl overflow-hidden shadow"
              pagination={{ pageSize: 10 }}
              locale={{ emptyText: <Empty description="Không có dữ liệu dịch vụ" /> }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerServices;
