// This is a pure content component for the admin nested layout. Do not add layout/sidebar/header/footer here.
import React from "react";
import { Table, Button } from "antd";

const DoctorWorkList: React.FC = () => {
  const dataSource = [
    {
      key: "1",
      doctor: "123213123123213123",
      email: "dongquang@gmail.com",
      time: "8:00 - 12:00, T2 - T7",
      status: "Hoạt động",
      action: "Chỉnh sửa lịch",
    },
    {
      key: "2",
      doctor: "Đỗ 123123123123Quang Động",
      email: "dongquang@gmail.com",
      time: "13:00 - 17:00, T2 - T7",
      status: "Hoạt động",
      action: "Chỉnh sửa lịch",
    },
    {
      key: "3",
      doctor: "Đỗ Quang Độ123123ng",
      email: "dongquang@gmail.com",
      time: "18:00 - 20:00, T2 - T7",
      status: "Hoạt động",
      action: "Chỉnh sửa lịch",
    },
  ];

  const columns = [
    { title: <span className="text-pink-600 font-semibold">Họ và tên</span>, dataIndex: "doctor", key: "doctor" },
    { title: <span className="text-pink-600 font-semibold">Email</span>, dataIndex: "email", key: "email" },
    { title: <span className="text-pink-600 font-semibold">Thời gian làm việc</span>, dataIndex: "time", key: "time" },
    { title: <span className="text-pink-600 font-semibold">Trạng thái</span>, dataIndex: "status", key: "status" },
    {
      title: <span className="text-pink-600 font-semibold">Hành động</span>,
      key: "action",
      render: (_, record) => <Button type="primary" className="bg-pink-500 hover:bg-pink-600 border-none rounded-lg text-white">{record.action}</Button>,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Danh sách lịch làm việc</h2>
      <Table dataSource={dataSource} columns={columns} pagination={false} className="rounded-lg overflow-hidden" />
    </div>
  );
};

export default DoctorWorkList;
