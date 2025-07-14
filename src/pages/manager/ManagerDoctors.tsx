import React, { useState, useEffect } from "react";
import { Table, Button, Space, message, Spin, Empty, Card, Typography } from "antd";
import { Calendar as CalendarIcon, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { motion } from "framer-motion";
import ManagerApi from "../../servers/manager.api";
import type { Doctor } from "../../types/manager.d";

const { Title, Text } = Typography;

const tableVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 120 } },
};

const ManagerDoctors: React.FC = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await ManagerApi.GetAllDoctors();
        setDoctors(response.data);
      } catch {
        message.error("Lấy danh sách bác sĩ thất bại");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const columns: ColumnsType<Doctor> = [
    {
      title: <span className="text-pink-600 font-semibold">Mã bác sĩ</span>,
      dataIndex: "doctorId",
      key: "doctorId",
      width: 120,
    },
    {
      title: <span className="text-pink-600 font-semibold">Họ và tên</span>,
      dataIndex: "fullName",
      key: "fullName",
      width: 200,
      render: (name: string) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-500" />
          {name}
        </div>
      ),
    },
    {
      title: <span className="text-pink-600 font-semibold">Học vị</span>,
      dataIndex: "degreeName",
      key: "degreeName",
      width: 150,
    },
    {
      title: <span className="text-pink-600 font-semibold">Số điện thoại</span>,
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: <span className="text-pink-600 font-semibold">Email</span>,
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: <span className="text-pink-600 font-semibold">Thao tác</span>,
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<CalendarIcon className="w-4 h-4" />}
            onClick={() => navigate(`/manager/doctors/${record.doctorId}/schedule`)}
            className="bg-pink-500 border-pink-500 hover:bg-pink-600 hover:border-pink-600"
          >
            Xem lịch
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Banner đầu trang */}
        <div className="w-full flex items-center gap-6 bg-white rounded-2xl shadow mb-8 overflow-hidden">
          <img src="/Images/doctor-avatar.png" alt="Doctor Banner" className="h-28 w-28 object-cover rounded-full ml-4" />
          <div className="flex-1">
            <Title level={2} className="text-pink-600 !mb-1">Quản lý bác sĩ</Title>
            <Text type="secondary">Theo dõi và quản lý thông tin, lịch làm việc của bác sĩ</Text>
          </div>
          <img src="/Images/PhongKhamThanThien.jpg" alt="Clinic" className="h-20 w-32 object-cover rounded-xl mr-6" />
        </div>
        {/* End Banner */}
        <Card className="bg-white rounded-2xl shadow-lg p-6 mt-6 relative">
          {/* Hình minh họa nhỏ góc phải card */}
          <img src="/Images/logo.png" alt="Logo" className="absolute right-6 bottom-6 w-16 h-16 opacity-10 pointer-events-none select-none" />
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
                dataSource={doctors}
                rowKey="doctorId"
                pagination={{ pageSize: 10 }}
                className="rounded-xl overflow-hidden shadow"
                locale={{ emptyText: <Empty image="/Images/doctor-avatar.png" description={<span>Bạn chưa có dữ liệu bác sĩ nào</span>} /> }}
              />
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ManagerDoctors; 