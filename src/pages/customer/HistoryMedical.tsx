// File: src/pages/Patient/components/HistoryMedical.tsx

import { useState, useEffect } from "react";
import { Table, Tag, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Calendar, Clock, User, FileText } from "lucide-react";
import UserApi from "../../servers/user.api";
import type { AppointmentHistory } from "../../types/booking";

interface AppointmentDetail {
  doctorName: string;
  serviceName: string;
  stageName: string | null;
  dateTreatment: string | null;
  timeTreatment: string | null;
}

const HistoryMedical = () => {
  const [appointments, setAppointments] = useState<AppointmentHistory[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentHistory | null>(null);
  const [appointmentDetails, setAppointmentDetails] = useState<
    AppointmentDetail[]
  >([]);

  const fetchAppointments = async () => {
    try {
      const res = await UserApi.GetBookingList();
      setAppointments(res.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu lịch sử khám bệnh:", error);
    }
  };

  const handleViewDetail = async (record: AppointmentHistory) => {
    setSelectedAppointment(record);
    setIsModalVisible(true);
    try {
      const res = await UserApi.GetAppointmentInBooking(record.bookingId);
      setAppointmentDetails(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết lịch khám:", err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

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
      dataIndex: "fullName",
      key: "fullName",
      render: (name) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-green-500" />
          {name}
        </div>
      ),
    },
    {
      title: "Dịch vụ",
      dataIndex: "name",
      key: "name",
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
        const statusMap: Record<string, { color: string; label: string }> = {
          Completed: { color: "green", label: "Hoàn thành" },
          Pending: { color: "blue", label: "Đang chờ" },
          Cancelled: { color: "red", label: "Đã hủy" },
        };
        const s = statusMap[status] || { color: "gray", label: status };
        return <Tag color={s.color}>{s.label}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleViewDetail(record)}>
            Xem chi tiết
          </Button>
          <Button
            type="link"
            danger
            onClick={async () => {
              try {
                await UserApi.cancelBooking(record.bookingId);
                fetchAppointments();
              } catch (err) {
                // Có thể thêm thông báo lỗi ở đây nếu muốn
                console.error("Hủy lịch thất bại", err);
              }
            }}
            disabled={record.status?.toLowerCase() === "cancelled"}
          >
            Hủy Lịch
          </Button>
        </>
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
            dataSource={appointments}
            rowKey={(record) => `${record.date}-${record.time}`}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>

      <Modal
        title="Chi tiết lịch hẹn"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setAppointmentDetails([]);
        }}
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
                <p className="font-medium">{selectedAppointment.fullName}</p>
              </div>
              <div>
                <p className="text-gray-600">Dịch vụ:</p>
                <p className="font-medium">{selectedAppointment.name}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600">Ghi chú:</p>
              <p className="font-medium">{selectedAppointment.note || "—"}</p>
            </div>

            {appointmentDetails.length > 0 && (
              <div className="space-y-3 mt-6">
                <p className="text-base font-semibold text-gray-700">
                  Danh sách các lần khám trong booking:
                </p>
                {appointmentDetails.map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-md p-3 bg-pink-50 text-sm"
                  >
                    <p>
                      <strong>Bác sĩ:</strong> {item.doctorName}
                    </p>
                    <p>
                      <strong>Dịch vụ:</strong> {item.serviceName}
                    </p>
                    <p>
                      <strong>Giai đoạn:</strong>{" "}
                      {item.stageName || (
                        <span className="italic text-gray-400">—</span>
                      )}
                    </p>
                    <p>
                      <strong>Ngày khám:</strong>{" "}
                      {item.dateTreatment ? (
                        new Date(item.dateTreatment).toLocaleDateString("vi-VN")
                      ) : (
                        <span className="italic text-gray-400">—</span>
                      )}
                    </p>
                    <p>
                      <strong>Thời gian:</strong>{" "}
                      {item.timeTreatment || (
                        <span className="italic text-gray-400">—</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default HistoryMedical;
