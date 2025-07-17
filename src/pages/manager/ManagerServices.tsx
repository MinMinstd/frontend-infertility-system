import React, { useState, useEffect } from 'react';
import { Table, message, Spin, Empty, Card, Modal, Form, Input, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ManagerApi from '../../servers/manager.api';
import type { ServiceForManagement, ServiceCreateRequest, ServiceUpdateRequest, TreatmentRoadmapStep, TreatmentRoadmapCreateRequest, TreatmentRoadmapUpdateRequest } from '../../types/manager.d';
import { SearchOutlined, PlusOutlined, EditOutlined, UnorderedListOutlined, FileAddOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';

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
  const [services, setServices] = useState<ServiceForManagement[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingService, setEditingService] = useState<ServiceForManagement | null>(null);
  const [form] = Form.useForm();

  // State cho roadmap
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [roadmapLoading, setRoadmapLoading] = useState<{[key:number]: boolean}>({});
  const [roadmaps, setRoadmaps] = useState<{[key:number]: TreatmentRoadmapStep[]}>({});
  const [createRoadmapModal, setCreateRoadmapModal] = useState<{open: boolean, service: ServiceForManagement | null}>({open: false, service: null});
  const [roadmapForm] = Form.useForm();
  const [editRoadmapModal, setEditRoadmapModal] = useState<{open: boolean, step: TreatmentRoadmapStep | null, serviceId: number | null}>({open: false, step: null, serviceId: null});
  const [editRoadmapForm] = Form.useForm();

  const [searchText, setSearchText] = useState('');
  const [filteredServices, setFilteredServices] = useState<ServiceForManagement[]>([]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await ManagerApi.GetAllServicesForManagement();
      setServices(response.data);
    } catch {
      message.error('Lấy danh sách dịch vụ thất bại');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoadmap = async (serviceId: number) => {
    setRoadmapLoading(prev => ({...prev, [serviceId]: true}));
    try {
      const res = await ManagerApi.GetTreatmentRoadmapByServiceId(serviceId);
      setRoadmaps(prev => ({...prev, [serviceId]: res.data}));
    } catch {
      message.error('Dịch vụ này chưa có quy trình điều trị');
    } finally {
      setRoadmapLoading(prev => ({...prev, [serviceId]: false}));
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    setFilteredServices(
      services.filter(s => s.name.toLowerCase().includes(searchText.toLowerCase()))
    );
  }, [services, searchText]);

  const handleAdd = () => {
    setModalMode('add');
    setEditingService(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record: ServiceForManagement) => {
    setModalMode('edit');
    setEditingService(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (modalMode === 'add') {
        await ManagerApi.CreateService(values as ServiceCreateRequest);
        message.success('Thêm dịch vụ thành công!');
      } else if (modalMode === 'edit' && editingService) {
        await ManagerApi.UpdateService(editingService.serviceDBId, values as ServiceUpdateRequest);
        message.success('Cập nhật dịch vụ thành công!');
      }
      setModalOpen(false);
      fetchServices();
    } catch {
      message.error(modalMode === 'add' ? 'Thêm dịch vụ thất bại!' : 'Cập nhật dịch vụ thất bại!');
    }
  };

  const handleModalCancel = () => {
    setModalOpen(false);
  };

  // Modal tạo mới roadmap
  const handleCreateRoadmap = (service: ServiceForManagement) => {
    setCreateRoadmapModal({open: true, service});
    roadmapForm.resetFields();
    roadmapForm.setFieldsValue({serviceId: service.serviceDBId, serviceName: service.name});
  };
  const handleCreateRoadmapOk = async () => {
    try {
      const values = await roadmapForm.validateFields();
      await ManagerApi.CreateTreatmentRoadmap(values as TreatmentRoadmapCreateRequest);
      message.success('Tạo quá trình điều trị thành công!');
      setCreateRoadmapModal({open: false, service: null});
      if (createRoadmapModal.service) fetchRoadmap(createRoadmapModal.service.serviceDBId);
    } catch {
      message.error('Tạo quá trình điều trị thất bại!');
    }
  };
  const handleCreateRoadmapCancel = () => setCreateRoadmapModal({open: false, service: null});

  // Modal cập nhật roadmap step
  const handleEditRoadmapStep = (step: TreatmentRoadmapStep, serviceId: number) => {
    setEditRoadmapModal({open: true, step, serviceId});
    editRoadmapForm.setFieldsValue(step);
  };
  const handleEditRoadmapOk = async () => {
    if (!editRoadmapModal.step) return;
    try {
      const values = await editRoadmapForm.validateFields();
      await ManagerApi.UpdateTreatmentRoadmap(editRoadmapModal.step.treatmentRoadmapId, values as TreatmentRoadmapUpdateRequest);
      message.success('Cập nhật bước điều trị thành công!');
      setEditRoadmapModal({open: false, step: null, serviceId: null});
      if (editRoadmapModal.serviceId) fetchRoadmap(editRoadmapModal.serviceId);
    } catch {
      message.error('Cập nhật bước điều trị thất bại!');
    }
  };
  const handleEditRoadmapCancel = () => setEditRoadmapModal({open: false, step: null, serviceId: null});

  const columns: ColumnsType<ServiceForManagement> = [
    {
      title: <span className="text-pink-600 font-semibold">ID</span>,
      dataIndex: 'serviceDBId',
      key: 'serviceDBId',
      width: 80,
      sorter: (a, b) => a.serviceDBId - b.serviceDBId,
    },
    {
      title: <span className="text-pink-600 font-semibold">Tên dịch vụ</span>,
      dataIndex: 'name',
      key: 'name',
      width: 200,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Tìm tên dịch vụ"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Tìm kiếm
            </Button>
            <Button onClick={() => clearFilters && clearFilters()} size="small" style={{ width: 90 }}>
              Xóa
            </Button>
          </Space>
        </div>
      ),
      onFilter: (value, record) => record.name.toLowerCase().includes((value as string).toLowerCase()),
    },
    {
      title: <span className="text-pink-600 font-semibold">Mô tả</span>,
      dataIndex: 'description',
      key: 'description',
      width: 400,
      ellipsis: true,
    },
    {
      title: <span className="text-pink-600 font-semibold">Thao tác</span>,
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space>
          <Tooltip title="Cập nhật dịch vụ">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Xem quy trình điều trị">
            <Button icon={<UnorderedListOutlined />} onClick={() => {
              if (!expandedRowKeys.includes(record.serviceDBId)) {
                fetchRoadmap(record.serviceDBId);
                setExpandedRowKeys([...expandedRowKeys, record.serviceDBId]);
              } else {
                setExpandedRowKeys(expandedRowKeys.filter(k => k !== record.serviceDBId));
              }
            }} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Table các bước điều trị
  const roadmapColumns = (serviceId: number): ColumnsType<TreatmentRoadmapStep> => [
    { title: 'ID', dataIndex: 'treatmentRoadmapId', key: 'treatmentRoadmapId', width: 60 },
    { title: 'Giai đoạn', dataIndex: 'stage', key: 'stage', width: 180 },
    { title: 'Mô tả', dataIndex: 'description', key: 'description', width: 250 },
    { title: 'Số ngày', dataIndex: 'durationDay', key: 'durationDay', width: 80 },
    { title: 'Giá (VNĐ)', dataIndex: 'price', key: 'price', width: 120, render: (v:number) => v.toLocaleString('vi-VN') },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button type="link" onClick={() => handleEditRoadmapStep(record, serviceId)}>
          Cập nhật
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileAddOutlined className="text-3xl text-purple-500" />
            <div>
              <h2 className="text-2xl font-bold text-pink-600 mb-0">Quản lý dịch vụ</h2>
              <p className="text-gray-500 text-sm">Tạo, cập nhật và quản lý các dịch vụ điều trị</p>
            </div>
          </div>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} className="bg-purple-500 hover:bg-purple-600">
            Thêm dịch vụ mới
          </Button>
        </div>
        <div className="mb-4 flex justify-end">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm tên dịch vụ..."
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 260 }}
            allowClear
          />
        </div>
        <Card className="bg-white rounded-2xl shadow-lg p-6 relative">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={filteredServices}
              rowKey="serviceDBId"
              className="rounded-xl overflow-hidden shadow"
              pagination={{ pageSize: 10 }}
              locale={{ emptyText: <Empty image={<ServiceSVG />} description={<span>Chưa có dịch vụ nào. Hãy nhấn <b>Thêm dịch vụ mới</b> để bắt đầu!</span>} /> }}
              expandable={{
                expandedRowKeys,
                onExpand: (expanded, record) => {
                  if (expanded) fetchRoadmap(record.serviceDBId);
                  setExpandedRowKeys(expanded ? [...expandedRowKeys, record.serviceDBId] : expandedRowKeys.filter(k => k !== record.serviceDBId));
                },
                expandedRowRender: (record) => (
                  roadmapLoading[record.serviceDBId] ? <Spin /> : (
                    (roadmaps[record.serviceDBId] && roadmaps[record.serviceDBId].length > 0) ? (
                      <Table
                        columns={roadmapColumns(record.serviceDBId)}
                        dataSource={roadmaps[record.serviceDBId]}
                        rowKey="treatmentRoadmapId"
                        pagination={false}
                        size="small"
                        bordered
                        style={{margin: 0, background: '#fafafa'}}
                      />
                    ) : (
                      <div className="flex flex-col items-center py-4">
                        <Empty image={<FileAddOutlined style={{fontSize: 40, color: '#a78bfa'}} />} description={<span>Dịch vụ này chưa có quá trình điều trị</span>} />
                        <Button type="primary" className="mt-2" icon={<PlusOutlined />} onClick={() => handleCreateRoadmap(record)}>
                          Tạo quá trình và các bước
                        </Button>
                      </div>
                    )
                  )
                )
              }}
            />
          )}
          <Modal
            title={<span><FileAddOutlined className="mr-2 text-purple-500" />{modalMode === 'add' ? 'Thêm dịch vụ mới' : 'Cập nhật dịch vụ'}</span>}
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
              initialValues={editingService || {}}
            >
              <Form.Item name="name" label="Tên dịch vụ" rules={[{ required: true, message: 'Nhập tên dịch vụ' }]}> 
                <Input prefix={<AppstoreOutlined />} placeholder="Nhập tên dịch vụ" />
              </Form.Item>
              <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Nhập mô tả' }]}> 
                <Input.TextArea rows={3} placeholder="Nhập mô tả" />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title={<span><FileAddOutlined className="mr-2 text-purple-500" />Tạo quá trình và bước điều trị</span>}
            open={createRoadmapModal.open}
            onOk={handleCreateRoadmapOk}
            onCancel={handleCreateRoadmapCancel}
            okText="Tạo mới"
            cancelText="Hủy"
            destroyOnClose
          >
            <Form
              form={roadmapForm}
              layout="vertical"
            >
              <Form.Item name="serviceId" label="ID dịch vụ" hidden>
                <Input type="hidden" />
              </Form.Item>
              <Form.Item name="serviceName" label="Tên dịch vụ" rules={[{ required: true }]}> 
                <Input disabled />
              </Form.Item>
              <Form.Item name="stage" label="Giai đoạn" rules={[{ required: true, message: 'Nhập giai đoạn' }]}> 
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Nhập mô tả' }]}> 
                <Input.TextArea rows={2} />
              </Form.Item>
              <Form.Item name="durationDay" label="Số ngày" rules={[{ required: true, message: 'Nhập số ngày' }]}> 
                <Input type="number" min={1} />
              </Form.Item>
              <Form.Item name="price" label="Giá (VNĐ)" rules={[{ required: true, message: 'Nhập giá' }]}> 
                <Input type="number" min={0} step={1000} />
              </Form.Item>
            </Form>
          </Modal>
          <Modal
            title={<span><EditOutlined className="mr-2 text-purple-500" />Cập nhật bước điều trị</span>}
            open={editRoadmapModal.open}
            onOk={handleEditRoadmapOk}
            onCancel={handleEditRoadmapCancel}
            okText="Cập nhật"
            cancelText="Hủy"
            destroyOnClose
          >
            <Form
              form={editRoadmapForm}
              layout="vertical"
            >
              <Form.Item name="stage" label="Giai đoạn" rules={[{ required: true, message: 'Nhập giai đoạn' }]}> 
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Nhập mô tả' }]}> 
                <Input.TextArea rows={2} />
              </Form.Item>
              <Form.Item name="durationDay" label="Số ngày" rules={[{ required: true, message: 'Nhập số ngày' }]}> 
                <Input type="number" min={1} />
              </Form.Item>
              <Form.Item name="price" label="Giá (VNĐ)" rules={[{ required: true, message: 'Nhập giá' }]}> 
                <Input type="number" min={0} step={1000} />
              </Form.Item>
            </Form>
          </Modal>
        </Card>
      </div>
    </div>
  );
};

export default ManagerServices;
