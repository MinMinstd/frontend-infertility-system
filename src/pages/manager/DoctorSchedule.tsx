import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Typography, Spin, message } from "antd";
import { ArrowLeft } from "lucide-react";
import ManagerApi from "../../servers/manager.api";
import type { DaySchedule } from "../../types/manager.d";

const { Title, Text } = Typography;

interface TimeSlot {
  startTime: string;
  endTime: string;
  status: string;
}

interface UIDaySchedule {
  date: string;
  dayOfWeek: string;
  morning: boolean;
  afternoon: boolean;
  timeSlots: TimeSlot[];
}

const DoctorSchedule: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [doctorSchedule, setDoctorSchedule] = useState<UIDaySchedule[]>([]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    ManagerApi.GetDoctorScheduleById(id)
      .then((res) => {
        // Map DaySchedule[] to UIDaySchedule[]
        const grouped: { [date: string]: DaySchedule[] } = {};
        res.data.forEach((item) => {
          if (!grouped[item.workDate]) grouped[item.workDate] = [];
          grouped[item.workDate].push(item);
        });
        const result: UIDaySchedule[] = Object.entries(grouped).map(
          ([date, slots]) => {
            // Xác định buổi sáng/chiều dựa vào giờ
            const morning = slots.some(
              (s) => parseInt(s.startTime) < 12
            );
            const afternoon = slots.some(
              (s) => parseInt(s.startTime) >= 12
            );
            // Map timeSlots
            const timeSlots: TimeSlot[] = slots.map((s) => ({
              startTime: s.startTime,
              endTime: s.endTime,
              status: s.status,
            }));
            // Lấy thứ trong tuần
            const dayOfWeek = new Date(date).toLocaleDateString("vi-VN", {
              weekday: "long",
            });
            return {
              date,
              dayOfWeek,
              morning,
              afternoon,
              timeSlots,
            };
          }
        );
        setDoctorSchedule(result);
      })
      .catch(() => {
        message.error("Không thể lấy lịch làm việc của bác sĩ");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            Quay lại
          </Button>
          <Title level={2} className="mb-0">
            Lịch làm việc của bác sĩ
          </Title>
        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spin size="large" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {doctorSchedule.map((day, index) => (
              <Card key={index} className="shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <Title level={4} className="mb-0">
                      {day.dayOfWeek}
                    </Title>
                    <Text type="secondary">
                      {new Date(day.date).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Text>
                  </div>
                  {/* Đã xóa phần Buổi sáng/Buổi chiều */}
                </div>
                {/* Time Slots */}
                {day.timeSlots.length > 0 && (
                  <div className="mt-4">
                    <Title level={5} className="mb-3">
                      Chi tiết khung giờ:
                    </Title>
                    <div className="grid grid-cols-4 gap-3">
                      {day.timeSlots.map((slot, slotIndex) => (
                        <div
                          key={slotIndex}
                          className={`p-3 rounded-lg ${
                            slot.status && slot.status.toLowerCase() === "available"
                              ? "bg-green-100 border border-green-300 text-green-800"
                              : "bg-gray-100 border border-gray-300 text-gray-500"
                          }`}
                        >
                          <div className="font-medium text-sm">
                            {slot.startTime} - {slot.endTime}
                          </div>
                          <div className="text-xs mt-1">
                            {slot.status && slot.status.toLowerCase() === "available" ? "Có lịch" : "Chưa có lịch"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {day.timeSlots.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    Nghỉ cả ngày
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorSchedule;
