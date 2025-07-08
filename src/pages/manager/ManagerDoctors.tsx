import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space, message } from "antd";
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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await ManagerApi.GetAllDoctors();
        setDoctors(response.data);
      } catch {
        message.error("Lấy danh sách bác sĩ thất bại");
      }
    };
    fetchDoctors();
  }, []);

  // Dữ liệu mẫu cho lịch làm việc - sẽ được thay thế bằng API call
  

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Quản lý bác sĩ</h1>
          </div>

          <Table
            columns={columns}
            dataSource={doctors}
            rowKey="doctorId"
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>

      <Modal
        title={`Lịch làm việc - ${selectedDoctor?.fullName}`}
        open={isScheduleModalVisible}
        onCancel={() => {
          setIsScheduleModalVisible(false);
          setSelectedDoctor(null);
        }}
        footer={null}
        width={800}
      >
        <div className="mt-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Lịch làm việc trong tuần</h3>
            {/* Đã xóa phần mockSchedule, modal này hiện không hiển thị lịch làm việc */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManagerDoctors; 