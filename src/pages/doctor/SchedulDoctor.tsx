// File: src/pages/doctor/ScheduleDoctor.tsx

import { useEffect, useState } from "react";
import { Card, Tag, Typography, Row, Col, Space, Divider, Empty, Badge } from "antd";
import { ClockCircleOutlined, CalendarOutlined, ScheduleOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import DoctorApi from "../../servers/doctor.api";
import { DoctorSidebar } from "./DoctorSidebar";
import dayjs from "dayjs";

const { Title, Text } = Typography;

interface TimeSlot {
  time: string;
  isAvailable: boolean;
}

interface DaySchedule {
  day: string;
  date: string;
  morning: TimeSlot[];
  afternoon: TimeSlot[];
}

interface DoctorSchedule {
  workDate: string;
  startTime: string;
  endTime: string;
  status: string;
}

export default function ScheduleDoctor() {
  const [schedule, setSchedule] = useState<DaySchedule[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await DoctorApi.GetListSchedule();
        const rawSchedules: DoctorSchedule[] = res.data;

        const grouped: Record<string, DaySchedule> = {};

        rawSchedules.forEach((slot) => {
          const date = dayjs(slot.workDate).format("DD/MM/YYYY");
          const day = dayjs(slot.workDate).format("dddd");
          const start = dayjs(`${slot.workDate} ${slot.startTime}`);
          const end = dayjs(`${slot.workDate} ${slot.endTime}`);

          const period = start.hour() < 12 ? "morning" : "afternoon";
          const timeSlots: TimeSlot[] = [];

          let current = start;
          while (current.isBefore(end)) {
            const next = current.add(30, "minute");
            timeSlots.push({
              time: `${current.format("HH:mm")} - ${next.format("HH:mm")}`,
              isAvailable: slot.status === "Available",
            });
            current = next;
          }

          if (!grouped[date]) {
            grouped[date] = {
              day,
              date,
              morning: [],
              afternoon: [],
            };
          }

          grouped[date][period].push(...timeSlots);
        });

        const newSchedule = Object.values(grouped);
        setSchedule(newSchedule);
      } catch (error) {
        console.error("Lỗi khi tải lịch làm việc:", error);
      }
    };

    fetchSchedule();
  }, []);

  const TimeSlotDisplay = ({ slot, index }: { slot: TimeSlot; index: number }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={`w-full h-16 flex flex-col justify-center items-center rounded-xl border-2 text-sm font-medium text-center transition-all duration-300 cursor-pointer ${slot.isAvailable
          ? "bg-gradient-to-br from-pink-50 to-white border-pink-300 text-pink-700 hover:border-pink-400 hover:shadow-lg"
          : "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 text-gray-400 opacity-60"
        }`}
    >
      <div className="flex items-center mb-1">
        {slot.isAvailable ? (
          <CheckCircleOutlined className="text-pink-500 mr-1" />
        ) : (
          <CloseCircleOutlined className="text-gray-400 mr-1" />
        )}
        <span className={slot.isAvailable ? "" : "line-through"}>
          {slot.time}
        </span>
      </div>
      <Tag
        color={slot.isAvailable ? "#E91E63" : "default"}
        className="text-xs border-0"
        style={{
          background: slot.isAvailable ? "linear-gradient(135deg, #E91E63, #D81B60)" : undefined,
          color: slot.isAvailable ? "white" : undefined,
        }}
      >
        {slot.isAvailable ? "Có sẵn" : "Không có"}
      </Tag>
    </motion.div>
  );

  const ScheduleContent = () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-8 rounded-b-3xl shadow-2xl mb-8"
      >
        <Row justify="space-between" align="middle">
          <Col>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Title
                level={1}
                className="text-white mb-2 font-bold"
                style={{ margin: 0, fontSize: '2.5rem' }}
              >
                <ScheduleOutlined className="mr-3" />
                Lịch Làm Việc Bác Sĩ
              </Title>
              <Text className="text-pink-100 text-lg">
                Xem và quản lý lịch trình làm việc hàng ngày
              </Text>
            </motion.div>
          </Col>
          <Col>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <Text className="text-white text-sm opacity-90 block mb-2">
                  Tổng số ngày làm việc
                </Text>
                <Text className="text-white text-3xl font-bold">
                  {schedule.length}
                </Text>
              </div>
            </motion.div>
          </Col>
        </Row>
      </motion.div>

      <div className="px-6">

        {schedule.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center py-20"
          >
            <div className="text-center">
              <ScheduleOutlined className="text-8xl text-pink-300 mb-6" />
              <Empty
                description={
                  <Text className="text-pink-400 text-xl">
                    Không có lịch làm việc nào
                  </Text>
                }
              />
            </div>
          </motion.div>
        ) : (
          <Row gutter={[24, 24]}>
            {schedule.map((day, dayIndex) => (
              <Col key={dayIndex} xs={24} lg={12} xl={8}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: dayIndex * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <Card
                    bordered={false}
                    className="shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #fce4ec 100%)',
                      border: '2px solid #F8BBD9',
                    }}
                    title={
                      <div className="flex items-center justify-between p-2">
                        <div className="flex items-center">
                          <CalendarOutlined className="text-pink-500 text-xl mr-3" />
                          <span className="font-bold text-xl text-pink-600">
                            {day.day}
                          </span>
                        </div>
                        <Badge.Ribbon text={day.date} color="#E91E63">
                          <div className="w-4 h-4"></div>
                        </Badge.Ribbon>
                      </div>
                    }
                  >
                    <Space direction="vertical" className="w-full" size="large">
                      {day.morning.length > 0 && (
                        <>
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200"
                          >
                            <Space align="center" className="mb-3">
                              <div className="bg-orange-500 p-2 rounded-full">
                                <ClockCircleOutlined className="text-white text-lg" />
                              </div>
                              <Text strong className="text-orange-600 text-lg">
                                🌅 Buổi sáng
                              </Text>
                              <Badge
                                count={day.morning.filter(slot => slot.isAvailable).length}
                                style={{ backgroundColor: '#ff7875' }}
                              />
                            </Space>
                            <Row gutter={[12, 12]}>
                              {day.morning.map((slot, idx) => (
                                <Col span={12} key={idx}>
                                  <TimeSlotDisplay slot={slot} index={idx} />
                                </Col>
                              ))}
                            </Row>
                          </motion.div>
                          <Divider className="border-pink-200" />
                        </>
                      )}

                      {day.afternoon.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200"
                        >
                          <Space align="center" className="mb-3">
                            <div className="bg-blue-500 p-2 rounded-full">
                              <ClockCircleOutlined className="text-white text-lg" />
                            </div>
                            <Text strong className="text-blue-600 text-lg">
                              🌆 Buổi chiều
                            </Text>
                            <Badge
                              count={day.afternoon.filter(slot => slot.isAvailable).length}
                              style={{ backgroundColor: '#40a9ff' }}
                            />
                          </Space>
                          <Row gutter={[12, 12]}>
                            {day.afternoon.map((slot, idx) => (
                              <Col span={12} key={idx}>
                                <TimeSlotDisplay slot={slot} index={idx + day.morning.length} />
                              </Col>
                            ))}
                          </Row>
                        </motion.div>
                      )}
                    </Space>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8"
        >
          <Card
            className="border-2 border-pink-200 shadow-xl rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f3e5f5 100%)',
            }}
          >
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 -m-6 mb-4 rounded-t-2xl">
              <Title level={4} className="text-white mb-0 flex items-center">
                <ScheduleOutlined className="mr-2" />
                📋 Chú thích lịch làm việc
              </Title>
            </div>
            <Space wrap size="large" className="mt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center bg-pink-50 p-3 rounded-xl border border-pink-200"
              >
                <CheckCircleOutlined className="text-pink-500 text-xl mr-3" />
                <div>
                  <Text strong className="text-pink-600 block">Ca làm việc có sẵn</Text>
                  <Text className="text-gray-500 text-sm">Có thể đặt lịch hẹn</Text>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center bg-gray-50 p-3 rounded-xl border border-gray-200"
              >
                <CloseCircleOutlined className="text-gray-400 text-xl mr-3" />
                <div>
                  <Text strong className="text-gray-600 block">Ca không có sẵn</Text>
                  <Text className="text-gray-500 text-sm">Đã được đặt hoặc không làm việc</Text>
                </div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center bg-blue-50 p-3 rounded-xl border border-blue-200"
              >
                <ClockCircleOutlined className="text-blue-500 text-xl mr-3" />
                <div>
                  <Text strong className="text-blue-600 block">Thời gian mỗi slot</Text>
                  <Text className="text-gray-500 text-sm">30 phút / ca khám</Text>
                </div>
              </motion.div>
            </Space>
          </Card>
        </motion.div>
      </div>
    </div>
  );

  return <DoctorSidebar>{<ScheduleContent />}</DoctorSidebar>;
}
