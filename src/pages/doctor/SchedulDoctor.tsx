// File: src/pages/doctor/ScheduleDoctor.tsx

"use client";

import { useEffect, useState } from "react";
import { Card, Tag, Typography, Row, Col, Space, Divider, Empty } from "antd";
import { ClockCircleOutlined, CalendarOutlined } from "@ant-design/icons";
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

  const TimeSlotDisplay = ({ slot }: { slot: TimeSlot }) => (
    <div
      className={`w-full h-14 flex flex-col justify-center items-center rounded border text-sm font-medium text-center ${
        slot.isAvailable
          ? "bg-white border-green-400 text-green-700"
          : "bg-gray-100 border-gray-300 text-gray-400 line-through opacity-70"
      }`}
    >
      {slot.time}
      <Tag
        color={slot.isAvailable ? "green" : "default"}
        className="mt-1 text-xs"
      >
        {slot.isAvailable ? "Available" : "Unavailable"}
      </Tag>
    </div>
  );

  const ScheduleContent = () => (
    <div className="w-full px-2 py-3">
      <div className="flex items-center gap-2 mb-6">
        <CalendarOutlined className="text-2xl text-blue-500" />
        <Title level={3} style={{ margin: 0 }}>
          Lịch làm việc của bác sĩ
        </Title>
      </div>

      {schedule.length === 0 ? (
        <Empty description="Không có lịch làm việc" />
      ) : (
        <Row gutter={[24, 24]}>
          {schedule.map((day, dayIndex) => (
            <Col key={dayIndex} xs={24} lg={12} xl={8}>
              <Card
                bordered={false}
                className="shadow-md hover:shadow-lg transition"
                title={
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg text-gray-800">
                      {day.day}
                    </span>
                    <Tag color="blue">{day.date}</Tag>
                  </div>
                }
              >
                <Space direction="vertical" className="w-full" size="large">
                  {day.morning.length > 0 && (
                    <>
                      <Space align="center" className="mb-2">
                        <ClockCircleOutlined className="text-orange-500" />
                        <Text strong className="text-gray-700">
                          Buổi sáng
                        </Text>
                      </Space>
                      <Row gutter={[8, 8]}>
                        {day.morning.map((slot, idx) => (
                          <Col span={12} key={idx}>
                            <TimeSlotDisplay slot={slot} />
                          </Col>
                        ))}
                      </Row>
                      <Divider />
                    </>
                  )}

                  {day.afternoon.length > 0 && (
                    <>
                      <Space align="center" className="mb-2">
                        <ClockCircleOutlined className="text-blue-500" />
                        <Text strong className="text-gray-700">
                          Buổi chiều
                        </Text>
                      </Space>
                      <Row gutter={[8, 8]}>
                        {day.afternoon.map((slot, idx) => (
                          <Col span={12} key={idx}>
                            <TimeSlotDisplay slot={slot} />
                          </Col>
                        ))}
                      </Row>
                    </>
                  )}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Card className="mt-6 border-0 shadow-md">
        <Title level={5}>Chú thích:</Title>
        <Space wrap size="large">
          <Space align="center">
            <div className="w-4 h-4 bg-white border border-green-400 rounded" />
            <Text>Ca làm việc trống</Text>
          </Space>
          <Space align="center">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded line-through" />
            <Text>Ca không sẵn sàng</Text>
          </Space>
          <Space align="center">
            <ClockCircleOutlined className="text-gray-500" />
            <Text>Mỗi slot: 30 phút</Text>
          </Space>
        </Space>
      </Card>
    </div>
  );

  return <DoctorSidebar>{<ScheduleContent />}</DoctorSidebar>;
}
