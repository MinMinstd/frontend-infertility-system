import React, { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ManagerApi from '../../servers/manager.api';
import type { Service } from '../../types/manager.d';


// Không dùng mockServices nữa

type ServiceWithId = Service & { id: number };

const ManagerServices: React.FC = () => {
  const [services, setServices] = useState<ServiceWithId[]>([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await ManagerApi.GetServices();
        const data: ServiceWithId[] = response.data.map((s) => ({ ...s, id: s.serviceDBId }));
        setServices(data);
      } catch {
        message.error('Lấy danh sách dịch vụ thất bại');
      }
    };
    fetchServices();
  }, []);

  const columns: ColumnsType<ServiceWithId> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      key: 'name',
      width: 250,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 300,
    },
    {
      title: 'Giá (VNĐ)',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (price: number) => price.toLocaleString('vi-VN'),
    },
    // Đã xóa cột Thời gian điều trị
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý dịch vụ</h1>
          </div>
          <Table
            columns={columns}
            dataSource={services}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerServices;
