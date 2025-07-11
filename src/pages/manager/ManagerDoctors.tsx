import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space, message, Spin, Empty } from "antd";
import { Calendar as CalendarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import ManagerApi from "../../servers/manager.api";
import type { Doctor } from "../../types/manager.d";

const ManagerDoctors: React.FC = () => {
  const navigate = useNavigate();
  const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
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
      title: "Mã bác sĩ",
      dataIndex: "doctorId",
      key: "doctorId",
      width: 120,
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      width: 200,
    },
    {
      title: "Học vị",
      dataIndex: "degreeName",
      key: "degreeName",
      width: 150,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<CalendarIcon className="w-4 h-4" />}
            onClick={() => handleViewSchedule(record)}
            className="bg-pink-500 border-pink-500 hover:bg-pink-600 hover:border-pink-600"
          >
            Xem lịch
          </Button>
        </Space>
      ),
    },
  ];

  const handleViewSchedule = (doctor: Doctor) => {
    navigate(`/manager/doctors/${doctor.doctorId}/schedule`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý bác sĩ</h1>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Spin size="large" />
            </div>
          ) : (
            <Table
              columns={columns}
              dataSource={doctors}
              rowKey="doctorId"
              pagination={{ pageSize: 10 }}
              className="rounded-xl overflow-hidden shadow"
              locale={{ emptyText: <Empty description="Không có dữ liệu bác sĩ" /> }}
            />
          )}
        </div>
      </div>
      {/* Modal lịch làm việc có thể bổ sung sau nếu cần */}
    </div>
  );
};

export default ManagerDoctors; 