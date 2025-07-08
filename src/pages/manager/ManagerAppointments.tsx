import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import { Calendar, Clock, User, FileText } from "lucide-react";
import ManagerApi from "../../servers/manager.api";
import type { Appointment } from "../../types/manager.d";


const ManagerAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ManagerApi.GetAllAppointments()
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch appointments", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns: ColumnsType<Appointment> = [
    {
      title: "Bệnh nhân",
      dataIndex: "customerName",
      key: "customerName",
      render: (name) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" />
          {name}
        </div>
      ),
    },
    {
      title: "Bác sĩ",
      dataIndex: "doctorName",
      key: "doctorName",
      render: (name) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-green-500" />
          {name}
        </div>
      ),
    },
    {
      title: "Dịch vụ",
      dataIndex: "note",
      key: "note",
      render: (note) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-500" />
          {note}
        </div>
      ),
    },
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (date) => (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-pink-500" />
          {new Date(date).toLocaleDateString("vi-VN")}
        </div>
      ),
    },
    {
      title: "Giờ",
      dataIndex: "time",
      key: "time",
      render: (time) => (
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-500" />
          {time}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusConfig = {
          scheduled: { color: "blue", text: "Đã lên lịch" },
          completed: { color: "green", text: "Hoàn thành" },
          cancelled: { color: "red", text: "Đã hủy" },
          pending: { color: "orange", text: "Chờ xác nhận" },
        };
        const config = statusConfig[status as keyof typeof statusConfig] || { color: "gray", text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý lịch hẹn</h1>
          </div>

          <Table
            columns={columns}
            dataSource={appointments}
            rowKey={(record) => `${record.customerName}-${record.doctorName}-${record.date}-${record.time}`}
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
};

export default ManagerAppointments; 