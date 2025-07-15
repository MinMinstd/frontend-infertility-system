import React, { useState, useEffect } from 'react';
import { Table, message, Spin, Empty, Card, Typography, Radio, Modal, Form, Input, InputNumber, Button } from 'antd';
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
  // const [filter, setFilter] = useState<'ALL' | 'IVF' | 'IUI'>('ALL');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingRoadmap, setEditingRoadmap] = useState<RoadmapWithId | null>(null);
  const [form] = Form.useForm();

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

  const iuiRoadmaps = roadmaps.filter(r => r.serviceName.toLowerCase().includes('iui'));
  const ivfRoadmaps = roadmaps.filter(r => r.serviceName.toLowerCase().includes('ivf'));

  const handleAdd = () => {
    setModalMode('add');
    setEditingRoadmap(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record: RoadmapWithId) => {
    setModalMode('edit');
    setEditingRoadmap(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (modalMode === 'add') {
        const newId = roadmaps.length > 0 ? Math.max(...roadmaps.map(r => r.id)) + 1 : 1;
        setRoadmaps([...roadmaps, { ...values, id: newId }]);
        message.success('Thêm dịch vụ thành công!');
      } else if (modalMode === 'edit' && editingRoadmap) {
        setRoadmaps(roadmaps.map(r => r.id === editingRoadmap.id ? { ...editingRoadmap, ...values } : r));
        message.success('Cập nhật dịch vụ thành công!');
      }
      setModalOpen(false);
    });
  };

  const handleModalCancel = () => {
    setModalOpen(false);
  };

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
    {
      title: <span className="text-pink-600 font-semibold">Thao tác</span>,
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Cập nhật
        </Button>
      ),
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
          {/* Nút thêm mới */}
          <div className="mb-4 flex justify-end">
            <Button type="primary" onClick={handleAdd} className="bg-purple-500 hover:bg-purple-600">
              Thêm dịch vụ mới
            </Button>
          </div>
          {/* SVG dịch vụ nhỏ góc phải card */}
          <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none select-none"><ServiceSVG /></div>
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <motion.div
                variants={tableVariants}
                initial="hidden"
                animate="visible"
              >
                <Title level={4} className="text-purple-600 mt-4 mb-2">Dịch vụ IUI</Title>
                <Table
                  columns={columns}
                  dataSource={iuiRoadmaps}
                  rowKey="id"
                  className="rounded-xl overflow-hidden shadow mb-8"
                  pagination={{ pageSize: 10 }}
                  locale={{ emptyText: <Empty image={<ServiceSVG />} description={<span>Chưa có dịch vụ IUI</span>} /> }}
                />
              </motion.div>
              <motion.div
                variants={tableVariants}
                initial="hidden"
                animate="visible"
              >
                <Title level={4} className="text-pink-600 mt-8 mb-2">Dịch vụ IVF</Title>
                <Table
                  columns={columns}
                  dataSource={ivfRoadmaps}
                  rowKey="id"
                  className="rounded-xl overflow-hidden shadow"
                  pagination={{ pageSize: 10 }}
                  locale={{ emptyText: <Empty image={<ServiceSVG />} description={<span>Chưa có dịch vụ IVF</span>} /> }}
                />
              </motion.div>
            </>
          )}
          <Modal
            title={modalMode === 'add' ? 'Thêm dịch vụ mới' : 'Cập nhật dịch vụ'}
            open={modalOpen}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
            okText={modalMode === 'add' ? 'Thêm mới' : 'Cập nhật'}
            cancelText="Hủy"
            destroyOnClose
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={editingRoadmap || {}}
            >
              <Form.Item name="serviceNameType" label="Loại dịch vụ" rules={[{ required: true, message: 'Chọn loại dịch vụ' }]}> 
                <Radio.Group>
                  <Radio value="IUI">IUI</Radio>
                  <Radio value="IVF">IVF</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="serviceName" label="Tên dịch vụ" rules={[{ required: true, message: 'Nhập tên dịch vụ' }]}> 
                <Input />
              </Form.Item>
              <Form.Item name="stage" label="Giai đoạn" rules={[{ required: true, message: 'Nhập giai đoạn' }]}> 
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Nhập mô tả' }]}> 
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item name="durationDay" label="Số ngày" rules={[{ required: true, message: 'Nhập số ngày' }]}> 
                <InputNumber min={1} className="w-full" />
              </Form.Item>
              <Form.Item name="price" label="Giá (VNĐ)" rules={[{ required: true, message: 'Nhập giá' }]}> 
                <InputNumber min={0} className="w-full" step={1000} />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </div>
    </div>
  );
};

export default ManagerServices;
