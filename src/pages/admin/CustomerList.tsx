import React from 'react';
import { Table, Button } from 'antd';

const CustomerList: React.FC = () => {
  const dataSource = [
    { key: '1', name: '123213123213', id: '12345678', email: '123123123123@gmail.com', action: 'Xem chi tiết' },
  ];

  const columns = [
    { title: 'Tên khách hàng', dataIndex: 'name', key: 'name' },
    { title: 'Mã khách hàng', dataIndex: 'id', key: 'id' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button type="link">Xem chi tiết</Button>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 24, color: '#1890ff' }}>Danh sách khách hàng</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default CustomerList;