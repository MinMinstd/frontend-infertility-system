import React from 'react';
import { Table, Button } from 'antd';

const AppointmentList: React.FC = () => {
  const dataSource = [
    { key: '1', patient: 'Trần Văn AA', patientId: 'SVT2024', doctor: 'Bác sĩ Nguyễn Văn A', time: '08:00 - 09:00', status: 'Chưa xác nhận', note: 'Cần kiểm tra lại', action: 'Xác nhận' },
    { key: '2', patient: 'Nguyễn Thị B', patientId: 'SVT2024', doctor: 'Bác sĩ Trần Văn B', time: '09:00 - 10:00', status: 'Đã xác nhận', note: 'Đã hoàn tất', action: 'Xem chi tiết' },
  ];

  const columns = [
    { title: 'Tên bệnh nhân', dataIndex: 'patient', key: 'patient' },
    { title: 'Mã bệnh nhân', dataIndex: 'patientId', key: 'patientId' },
    { title: 'Bác sĩ', dataIndex: 'doctor', key: 'doctor' },
    { title: 'Thời gian', dataIndex: 'time', key: 'time' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    { title: 'Ghi chú', dataIndex: 'note', key: 'note' },
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
      <h2 style={{ fontSize: 24, color: '#1890ff' }}>Danh sách lịch hẹn</h2>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default AppointmentList;