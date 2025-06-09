import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Space, Typography } from "antd";
import { ArrowLeft } from "lucide-react";

const { Title, Text } = Typography;

// Interface định nghĩa cấu trúc dữ liệu lịch làm việc
interface TimeSlot {
  start: string;
  end: string;
  isAvailable: boolean;
}

interface DaySchedule {
  date: string;
  dayOfWeek: string;
  morning: boolean;
  afternoon: boolean;
  timeSlots: TimeSlot[];
}

const DoctorSchedule: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - sẽ được thay thế bằng API call
  const doctorSchedule: DaySchedule[] = [
    {
      date: "2024-03-18",
      dayOfWeek: "Thứ Hai",
      morning: false,
      afternoon: false,
      timeSlots: []
    },
    {
      date: "2024-03-19",
      dayOfWeek: "Thứ Ba",
      morning: true,
      afternoon: false,
      timeSlots: [
        { start: "07:00", end: "07:30", isAvailable: true },
        { start: "07:30", end: "08:00", isAvailable: true },
        { start: "08:00", end: "08:30", isAvailable: false },
        { start: "08:30", end: "09:00", isAvailable: true },
        { start: "09:00", end: "09:30", isAvailable: false },
        { start: "09:30", end: "10:00", isAvailable: true },
        { start: "10:00", end: "10:30", isAvailable: true },
        { start: "10:30", end: "11:00", isAvailable: false },
        { start: "11:00", end: "11:30", isAvailable: true },
      ]
    },
    {
      date: "2024-03-20",
      dayOfWeek: "Thứ Tư",
      morning: true,
      afternoon: false,
      timeSlots: [
        { start: "07:00", end: "07:30", isAvailable: true },
        { start: "07:30", end: "08:00", isAvailable: false },
        { start: "08:00", end: "08:30", isAvailable: true },
        { start: "08:30", end: "09:00", isAvailable: true },
        { start: "09:00", end: "09:30", isAvailable: false },
        { start: "09:30", end: "10:00", isAvailable: true },
        { start: "10:00", end: "10:30", isAvailable: true },
        { start: "10:30", end: "11:00", isAvailable: false },
        { start: "11:00", end: "11:30", isAvailable: true },
      ]
    },
    {
      date: "2024-03-21",
      dayOfWeek: "Thứ Năm",
      morning: false,
      afternoon: true,
      timeSlots: [
        { start: "13:00", end: "13:30", isAvailable: true },
        { start: "13:30", end: "14:00", isAvailable: false },
        { start: "14:00", end: "14:30", isAvailable: true },
        { start: "14:30", end: "15:00", isAvailable: true },
        { start: "15:00", end: "15:30", isAvailable: false },
        { start: "15:30", end: "16:00", isAvailable: true },
        { start: "16:00", end: "16:30", isAvailable: true },
        { start: "16:30", end: "17:00", isAvailable: false },
      ]
    },
    {
      date: "2024-03-22",
      dayOfWeek: "Thứ Sáu",
      morning: true,
      afternoon: true,
      timeSlots: [
        { start: "07:00", end: "07:30", isAvailable: true },
        { start: "07:30", end: "08:00", isAvailable: true },
        { start: "08:00", end: "08:30", isAvailable: false },
        { start: "08:30", end: "09:00", isAvailable: true },
        { start: "09:00", end: "09:30", isAvailable: false },
        { start: "09:30", end: "10:00", isAvailable: true },
        { start: "10:00", end: "10:30", isAvailable: true },
        { start: "10:30", end: "11:00", isAvailable: false },
        { start: "11:00", end: "11:30", isAvailable: true },
        { start: "13:00", end: "13:30", isAvailable: true },
        { start: "13:30", end: "14:00", isAvailable: false },
        { start: "14:00", end: "14:30", isAvailable: true },
        { start: "14:30", end: "15:00", isAvailable: true },
        { start: "15:00", end: "15:30", isAvailable: false },
        { start: "15:30", end: "16:00", isAvailable: true },
        { start: "16:00", end: "16:30", isAvailable: true },
        { start: "16:30", end: "17:00", isAvailable: false },
      ]
    },
  ];

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
          <Title level={2} className="mb-0">Lịch làm việc của bác sĩ</Title>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 gap-6">
          {doctorSchedule.map((day, index) => (
            <Card key={index} className="shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Title level={4} className="mb-0">{day.dayOfWeek}</Title>
                  <Text type="secondary">
                    {new Date(day.date).toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Text>
                </div>
                <div className="flex gap-4">
                  <div className={`px-3 py-1 rounded-full ${
                    day.morning ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                  }`}>
                    Buổi sáng: {day.morning ? 'Có lịch' : 'Nghỉ'}
                  </div>
                  <div className={`px-3 py-1 rounded-full ${
                    day.afternoon ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                  }`}>
                    Buổi chiều: {day.afternoon ? 'Có lịch' : 'Nghỉ'}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              {day.timeSlots.length > 0 && (
                <div className="mt-4">
                  <Title level={5} className="mb-3">Chi tiết khung giờ:</Title>
                  <div className="grid grid-cols-4 gap-3">
                    {day.timeSlots.map((slot, slotIndex) => (
                      <div
                        key={slotIndex}
                        className={`p-3 rounded-lg ${
                          slot.isAvailable
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="font-medium text-sm">
                          {slot.start} - {slot.end}
                        </div>
                        <div className={`text-xs mt-1 ${
                          slot.isAvailable ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {slot.isAvailable ? 'Có lịch' : 'Chưa có lịch'}
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
      </div>
    </div>
  );
};

export default DoctorSchedule; 