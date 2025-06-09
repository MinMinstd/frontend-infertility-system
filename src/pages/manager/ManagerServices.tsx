import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, InputNumber, message } from 'antd';
import { Plus, Edit, Delete } from 'lucide-react';
import type { ColumnsType } from 'antd/es/table';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  averageTreatmentTime: number;
}

const mockServices: Service[] = [
  {
    id: 1,
    name: 'Thụ tinh trong ống nghiệm',
    description: 'Phương pháp hỗ trợ sinh sản hiện đại',
    price: 50000000,
    averageTreatmentTime: 30
  },
  {
    id: 2,
    name: 'Bơm tinh trùng vào buồng tử cung',
    description: 'Phương pháp hỗ trợ sinh sản đơn giản',
    price: 15000000,
    averageTreatmentTime: 15
  }
];

const ManagerServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: Service) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa dịch vụ này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setServices(services.filter(service => service.id !== id));
        message.success('Xóa dịch vụ thành công');
      },
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        setServices(services.map(service => 
          service.id === editingId ? { ...values, id: editingId } : service
        ));
        message.success('Cập nhật dịch vụ thành công');
      } else {
        const newId = Math.max(...services.map(s => s.id)) + 1;
        setServices([...services, { ...values, id: newId }]);
        message.success('Thêm dịch vụ thành công');
      }
      setModalVisible(false);
    } catch {
      message.error('Vui lòng kiểm tra lại thông tin');
    }
  };

  const columns: ColumnsType<Service> = [
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
    {
      title: 'Thời gian điều trị (ngày)',
      dataIndex: 'averageTreatmentTime',
      key: 'averageTreatmentTime',
      width: 180,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_: unknown, record: Service) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<Edit className="w-4 h-4" />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            danger
            icon={<Delete className="w-4 h-4" />}
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý dịch vụ</h1>
            <Button
              type="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={handleAdd}
            >
              Thêm dịch vụ mới
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={services}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      <Modal
        title={editingId ? 'Sửa dịch vụ' : 'Thêm dịch vụ mới'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setEditingId(null);
        }}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Tên dịch vụ"
            rules={[{ required: true, message: 'Vui lòng nhập tên dịch vụ' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá (VNĐ)"
            rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item
            name="averageTreatmentTime"
            label="Thời gian điều trị trung bình (ngày)"
            rules={[{ required: true, message: 'Vui lòng nhập thời gian điều trị' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManagerServices;
