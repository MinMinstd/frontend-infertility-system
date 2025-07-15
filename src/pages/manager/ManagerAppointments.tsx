import { Table, Tag, Spin, Empty, Card, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState, useEffect } from "react";
import { Calendar, Clock, User, FileText } from "lucide-react";
import { motion } from "framer-motion";
import ManagerApi from "../../servers/manager.api";
import type { Appointment } from "../../types/manager.d";

const { Title, Text } = Typography;

const tableVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 120 } },
};

// SVG lịch hẹn minh họa
const CalendarSVG = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="16" width="48" height="36" rx="6" fill="#f472b6"/>
    <rect x="8" y="16" width="48" height="36" rx="6" stroke="#ec4899" strokeWidth="2"/>
    <rect x="16" y="8" width="8" height="12" rx="3" fill="#ec4899"/>
    <rect x="40" y="8" width="8" height="12" rx="3" fill="#ec4899"/>
    <rect x="20" y="28" width="4" height="4" rx="2" fill="#fff"/>
    <rect x="30" y="28" width="4" height="4" rx="2" fill="#fff"/>
    <rect x="40" y="28" width="4" height="4" rx="2" fill="#fff"/>
    <rect x="20" y="38" width="4" height="4" rx="2" fill="#fff"/>
    <rect x="30" y="38" width="4" height="4" rx="2" fill="#fff"/>
    <rect x="40" y="38" width="4" height="4" rx="2" fill="#fff"/>
  </svg>
);

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
      title: <span className="text-pink-600 font-semibold">Bệnh nhân</span>,
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
      title: <span className="text-pink-600 font-semibold">Bác sĩ</span>,
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
      title: <span className="text-pink-600 font-semibold">Loại dịch vụ</span>,
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-500" />
          {type}
        </div>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Ngày</span>,
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
      title: <span className="text-pink-600 font-semibold">Giờ</span>,
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
      title: <span className="text-pink-600 font-semibold">Trạng thái</span>,
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusConfig = {
          scheduled: { color: "blue", text: "Đã lên lịch" },
          completed: { color: "green", text: "Hoàn thành" },
          cancelled: { color: "red", text: "Đã huỷ" },
          pending: { color: "orange", text: "Chờ xác nhận" },
        };
        const config = statusConfig[status as keyof typeof statusConfig] || { color: "gray", text: status };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Banner đầu trang */}
        <div className="w-full flex items-center gap-6 bg-white rounded-2xl shadow mb-8 overflow-hidden">
          <div className="ml-4"><CalendarSVG /></div>
          <div className="flex-1">
            <Title level={2} className="text-pink-600 !mb-1">Quản lý lịch hẹn</Title>
            <Text type="secondary">Theo dõi và quản lý tất cả lịch hẹn trong hệ thống</Text>
          </div>
          <div className="mr-6"><CalendarSVG /></div>
        </div>
        {/* End Banner */}
        <Card className="bg-white rounded-2xl shadow-lg p-6 mt-6 relative">
          {/* SVG lịch hẹn nhỏ góc phải card */}
          <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none select-none"><CalendarSVG /></div>
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Spin size="large" />
            </div>
          ) : (
            <motion.div
              variants={tableVariants}
              initial="hidden"
              animate="visible"
            >
              <Table
                columns={columns}
                dataSource={appointments}
                rowKey={(record) => `${record.customerName}-${record.doctorName}-${record.date}-${record.time}`}
                className="rounded-xl overflow-hidden shadow"
                pagination={{ pageSize: 10 }}
                locale={{ emptyText: <Empty image={<CalendarSVG />} description={<span>Chưa có lịch hẹn nào</span>} /> }}
              />
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ManagerAppointments; 