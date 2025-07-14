import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Typography, Spin, message } from "antd";
import { ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
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

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 100 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, type: 'spring' as const, stiffness: 120 } }),
};

const slotVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, type: 'spring' as const, stiffness: 180 } },
};

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
        const grouped: { [date: string]: DaySchedule[] } = {};
        res.data.forEach((item) => {
          if (!grouped[item.workDate]) grouped[item.workDate] = [];
          grouped[item.workDate].push(item);
        });
        const result: UIDaySchedule[] = Object.entries(grouped).map(
          ([date, slots]) => {
            const morning = slots.some(
              (s) => parseInt(s.startTime) < 12
            );
            const afternoon = slots.some(
              (s) => parseInt(s.startTime) >= 12
            );
            const timeSlots: TimeSlot[] = slots.map((s) => ({
              startTime: s.startTime,
              endTime: s.endTime,
              status: s.status,
            }));
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
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center mb-6">
            <Button
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              Quay lại
            </Button>
            <Title level={2} className="mb-0 text-pink-600">
              Lịch làm việc của bác sĩ
            </Title>
          </div>
        </motion.div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spin size="large" />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-6"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            {doctorSchedule.map((day, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.10)" }}
              >
                <Card className="shadow-md rounded-xl border-0">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Title level={4} className="mb-0 text-blue-600">
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
                  </div>
                  {day.timeSlots.length > 0 && (
                    <div className="mt-4">
                      <Title level={5} className="mb-3 text-pink-600">
                        Chi tiết khung giờ:
                      </Title>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {day.timeSlots.map((slot, slotIndex) => (
                          <motion.div
                            key={slotIndex}
                            variants={slotVariants}
                            initial="hidden"
                            animate="visible"
                            className={`p-3 rounded-lg flex flex-col items-center border transition-all duration-200 ${
                              slot.status && slot.status.toLowerCase() === "unavailable"
                                ? "bg-green-100 border-green-300 text-green-800"
                                : "bg-gray-100 border-gray-300 text-gray-500"
                            }`}
                          >
                            <Clock className="w-5 h-5 mb-1" />
                            <div className="font-medium text-sm">
                              {slot.startTime} - {slot.endTime}
                            </div>
                            <div className="text-xs mt-1">
                              {slot.status && slot.status.toLowerCase() === "unavailable" ? "Có lịch" : "Chưa có lịch"}
                            </div>
                          </motion.div>
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DoctorSchedule;
