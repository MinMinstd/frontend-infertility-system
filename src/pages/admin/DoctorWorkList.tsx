import React from 'react';
import { Table, Button } from 'antd';

const DoctorWorkList: React.FC = () => {
  const dataSource = [
    { key: '1', doctor: '123213123123213123', email: 'dongquang@gmail.com', time: '8:00 - 12:00, T2 - T7', status: 'Hoạt động', action: 'Chỉnh sửa lịch' },
    { key: '2', doctor: 'Đỗ 123123123123Quang Động', email: 'dongquang@gmail.com', time: '13:00 - 17:00, T2 - T7', status: 'Hoạt động', action: 'Chỉnh sửa lịch' },
    { key: '3', doctor: 'Đỗ Quang Độ123123ng', email: 'dongquang@gmail.com', time: '18:00 - 20:00, T2 - T7', status: 'Hoạt động', action: 'Chỉnh sửa lịch' },
  ];

  const columns = [
    { title: 'Họ và tên', dataIndex: 'doctor', key: 'doctor' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Thời gian làm việc', dataIndex: 'time', key: 'time' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Button type="link">{record.action}</Button>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ fontSize: 24, color: '#1890ff' }}>Danh sách lịch làm việc</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default DoctorWorkList;