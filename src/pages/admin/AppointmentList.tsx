// This is a pure content component for the admin nested layout. Do not add layout/sidebar/header/footer here.
import React from "react";
import { Table, Button } from "antd";

const AppointmentList: React.FC = () => {
  const dataSource = [
    {
      key: "1",
      patient: "Trần Văn AA",
      patientId: "SVT2024",
      doctor: "Bác sĩ Nguyễn Văn A",
      time: "08:00 - 09:00",
      status: "Chưa xác nhận",
      note: "Cần kiểm tra lại",
      action: "Xác nhận",
    },
    {
      key: "2",
      patient: "Nguyễn Thị B",
      patientId: "SVT2024",
      doctor: "Bác sĩ Trần Văn B",
      time: "09:00 - 10:00",
      status: "Đã xác nhận",
      note: "Đã hoàn tất",
      action: "Xem chi tiết",
    },
  ];

  const columns = [
    { title: <span className="text-pink-600 font-semibold">Tên bệnh nhân</span>, dataIndex: "patient", key: "patient" },
    { title: <span className="text-pink-600 font-semibold">Mã bệnh nhân</span>, dataIndex: "patientId", key: "patientId" },
    { title: <span className="text-pink-600 font-semibold">Bác sĩ</span>, dataIndex: "doctor", key: "doctor" },
    { title: <span className="text-pink-600 font-semibold">Thời gian</span>, dataIndex: "time", key: "time" },
    { title: <span className="text-pink-600 font-semibold">Trạng thái</span>, dataIndex: "status", key: "status" },
    { title: <span className="text-pink-600 font-semibold">Ghi chú</span>, dataIndex: "note", key: "note" },
    {
      title: <span className="text-pink-600 font-semibold">Hành động</span>,
      key: "action",
      render: (_, record) => <Button type="primary" className="bg-pink-500 hover:bg-pink-600 border-none rounded-lg text-white">{record.action}</Button>,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Danh sách lịch hẹn</h2>
      <Table dataSource={dataSource} columns={columns} pagination={false} className="rounded-lg overflow-hidden" />
    </div>
  );
};

export default AppointmentList;
