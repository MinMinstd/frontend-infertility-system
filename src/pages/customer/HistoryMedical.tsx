import { useState } from "react";
import { Table, Tag, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Calendar, Clock, User, FileText } from "lucide-react";

interface AppointmentHistory {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  service: string;
  status: "completed" | "upcoming" | "cancelled";
  notes?: string;
}

const HistoryMedical = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentHistory | null>(null);

  // Mock data - replace with actual API call
  const appointmentHistory: AppointmentHistory[] = [
    {
      id: "1",
      date: "2024-03-20",
      time: "09:00",
      doctorName: "BS. Nguyễn Văn A",
      service: "Tư vấn sức khỏe sinh sản",
      status: "completed",
      notes: "Bệnh nhân được tư vấn về các phương pháp điều trị hiếm muộn",
    },
    {
      id: "2",
      date: "2024-03-25",
      time: "14:30",
      doctorName: "BS. Trần Thị B",
      service: "Khám và điều trị hiếm muộn",
      status: "upcoming",
    },
    {
      id: "3",
      date: "2024-03-15",
      time: "10:00",
      doctorName: "BS. Lê Văn C",
      service: "Thụ tinh trong ống nghiệm",
      status: "cancelled",
      notes: "Bệnh nhân hủy lịch do lý do cá nhân",
    },
  ];

  const columns: ColumnsType<AppointmentHistory> = [
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
          <Clock className="w-4 h-4 text-blue-500" />
          {time}
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
      dataIndex: "service",
      key: "service",
      render: (service) => (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-500" />
          {service}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusConfig = {
          completed: { color: "green", text: "Hoàn thành" },
          upcoming: { color: "blue", text: "Sắp tới" },
          cancelled: { color: "red", text: "Đã hủy" },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setSelectedAppointment(record);
            setIsModalVisible(true);
          }}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Lịch sử khám bệnh
          </h1>
          <Table
            columns={columns}
            dataSource={appointmentHistory}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            className="custom-table"
          />
        </div>
      </div>

      <Modal
        title="Chi tiết lịch hẹn"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Ngày:</p>
                <p className="font-medium">
                  {new Date(selectedAppointment.date).toLocaleDateString(
                    "vi-VN"
                  )}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Giờ:</p>
                <p className="font-medium">{selectedAppointment.time}</p>
              </div>
              <div>
                <p className="text-gray-600">Bác sĩ:</p>
                <p className="font-medium">{selectedAppointment.doctorName}</p>
              </div>
              <div>
                <p className="text-gray-600">Dịch vụ:</p>
                <p className="font-medium">{selectedAppointment.service}</p>
              </div>
            </div>
            {selectedAppointment.notes && (
              <div>
                <p className="text-gray-600">Ghi chú:</p>
                <p className="font-medium">{selectedAppointment.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HistoryMedical;
