import React, { useState, useEffect } from "react";
import { Table, Button, Space, message, Spin, Empty, Card, Typography, Modal } from "antd";
import { Calendar as CalendarIcon, User, ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { motion } from "framer-motion";
import ManagerApi from "../../servers/manager.api";
import type { Doctor } from "../../types/manager.d";
import type { DaySchedule, DoctorScheduleCreateRequest } from "../../types/manager.d";
import axios from "axios";

const { Title, Text } = Typography;

const tableVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 120 } },
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function getMonday(d: Date) {
  d = new Date(d);
  const day = d.getDay(), diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}
function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// Định nghĩa các block giờ 2 tiếng rưỡi
const TIME_BLOCKS = [
  { start: "07:00", end: "09:30" },
  { start: "09:30", end: "12:00" },
  { start: "13:00", end: "15:30" },
  { start: "15:30", end: "18:00" },
];

function toTimeOnlyFull(str: string) {
  return str.length === 5 ? str + ':00' : str;
}

const ManagerDoctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSchedule, setShowSchedule] = useState<null | {doctorId: string, fullName: string}>(null);
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  // Xóa allSchedules, chỉ dùng lại schedule như ban đầu
  const [schedule, setSchedule] = useState<Record<string, Record<string, DaySchedule | null>>>({});
  // State: ngày đang chọn và block giờ đang chọn
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<{ start: string; end: string } | null>(null);

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

  // Khôi phục lại useEffect lấy lịch của đúng bác sĩ đang xem
  useEffect(() => {
    if (!showSchedule) return;
    setLoadingSchedule(true);
    const fetch = async () => {
      try {
        const res = await ManagerApi.GetDoctorScheduleById(showSchedule.doctorId);
        const weekMap: Record<string, Record<string, DaySchedule | null>> = {};
        for (let i = 0; i < 7; ++i) {
          const date = addDays(weekStart, i).toISOString().slice(0, 10);
          weekMap[date] = {};
          TIME_BLOCKS.forEach(b => {
            weekMap[date][`${toTimeOnlyFull(b.start)}-${toTimeOnlyFull(b.end)}`] = null;
          });
        }
        if (Array.isArray(res.data)) {
          res.data.forEach((item: DaySchedule) => {
            const date = item.workDate;
            const key = `${toTimeOnlyFull(item.startTime)}-${toTimeOnlyFull(item.endTime)}`;
            if (weekMap[date] && weekMap[date][key] !== undefined) {
              weekMap[date][key] = item;
            }
          });
        }
        setSchedule(weekMap);
      } catch {
        message.error("Không thể lấy lịch làm việc của bác sĩ");
      } finally {
        setLoadingSchedule(false);
      }
    };
    fetch();
  }, [showSchedule, weekStart]);

  // Hàm chọn block giờ trên 1 ngày
  const handleSelectBlock = (date: string, block: { start: string; end: string }) => {
    if (selectedDate === date && selectedBlock && selectedBlock.start === block.start && selectedBlock.end === block.end) {
      // Bỏ chọn nếu đã chọn
      setSelectedDate(null);
      setSelectedBlock(null);
    } else {
      setSelectedDate(date);
      setSelectedBlock(block);
    }
  };

  // Hàm tạo lịch làm việc
  const handleCreateSchedule = async () => {
    if (!showSchedule || !selectedDate || !selectedBlock) return;
    // Gửi startTime, endTime đúng định dạng HH:mm:ss
    const data: DoctorScheduleCreateRequest & { status: string } = {
      workDate: selectedDate,
      startTime: toTimeOnlyFull(selectedBlock.start),
      endTime: toTimeOnlyFull(selectedBlock.end),
      status: 'Available',
    };
    const doctorIdNum = Number(showSchedule.doctorId);
    console.log("Tạo lịch gửi đi:", { doctorId: doctorIdNum, ...data });
    setLoadingSchedule(true);
    try {
      await ManagerApi.CreateDoctorSchedule(doctorIdNum, data);
      message.success("Tạo lịch thành công!");
      setSelectedDate(null);
      setSelectedBlock(null);
      // Reload lịch
      const res = await ManagerApi.GetDoctorScheduleById(showSchedule.doctorId);
      const weekMap: Record<string, Record<string, DaySchedule | null>> = {};
      for (let i = 0; i < 7; ++i) {
        const date = addDays(weekStart, i).toISOString().slice(0, 10);
        weekMap[date] = {};
        TIME_BLOCKS.forEach(b => {
          weekMap[date][`${toTimeOnlyFull(b.start)}-${toTimeOnlyFull(b.end)}`] = null;
        });
      }
      if (Array.isArray(res.data)) {
        res.data.forEach((item: DaySchedule) => {
          const date = item.workDate;
          const key = `${toTimeOnlyFull(item.startTime)}-${toTimeOnlyFull(item.endTime)}`;
          if (weekMap[date] && weekMap[date][key] !== undefined) {
            weekMap[date][key] = item;
          }
        });
      }
      setSchedule(weekMap);
    } catch (err) {
      let msg = "Tạo lịch thất bại!";
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) {
          msg += ": " + err.response.data.message;
        } else if (err.response?.data) {
          msg += ": " + JSON.stringify(err.response.data);
        }
      }
      message.error(msg);
      console.error("Lỗi tạo lịch:", err);
    } finally {
      setLoadingSchedule(false);
    }
  };

  const handlePrevWeek = () => setWeekStart(addDays(weekStart, -7));
  const handleNextWeek = () => setWeekStart(addDays(weekStart, 7));
  const weekRange = `${weekStart.toLocaleDateString('vi-VN')} - ${addDays(weekStart,6).toLocaleDateString('vi-VN')}`;

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
            onClick={() => setShowSchedule({doctorId: record.doctorId, fullName: record.fullName})}
            className="bg-pink-500 border-pink-500 hover:bg-pink-600 hover:border-pink-600"
          >
            Xem lịch
          </Button>
        </Space>
      ),
    },
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
      {/* Modal xem/tạo lịch bác sĩ */}
      {showSchedule && (
        <Modal open={true} footer={null} onCancel={() => setShowSchedule(null)} width={700} style={{top: 40}} bodyStyle={{padding:0}}>
          <div className="p-0">
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <Title level={4} className="!mb-0">Quản lý lịch làm việc - {showSchedule.fullName}</Title>
              <div>
                <Button onClick={handlePrevWeek} icon={<ArrowLeft />} className="mr-2">Tuần trước</Button>
                <span className="font-semibold text-base mx-2">{weekRange}</span>
                <Button onClick={handleNextWeek} icon={<ArrowRight />}>Tuần sau</Button>
              </div>
            </div>
            <div className="px-6 pb-2">
              <Button type="primary" className="mr-2" onClick={handleCreateSchedule} loading={loadingSchedule} icon={<Plus />}>Tạo lịch</Button>
              <Button danger icon={<Trash2 />}>Xóa</Button>
            </div>
            <div className="px-6 pb-2">
              <div className="bg-blue-50 rounded p-2 text-blue-700 text-sm">
                <b>Hướng dẫn:</b> Nhấp vào ô trống để tạo ca làm việc mới, nhấp vào ca đã tạo để chỉnh sửa. Ca màu đã được đặt và không thể xóa.
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="w-20"></th>
                      {WEEKDAYS.map((d, i) => (
                        <th key={d} className="text-center font-semibold text-gray-700 py-2">
                          {d}
                          <br />
                          <span className="text-xs text-gray-400">
                            {addDays(weekStart, i).toLocaleDateString('vi-VN')}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TIME_BLOCKS.map(block => (
                      <tr key={block.start + block.end}>
                        <td className="text-center font-medium text-gray-600 py-1">{block.start} - {block.end}</td>
                        {Array(7).fill(0).map((_, i) => {
                          const date = addDays(weekStart, i).toISOString().slice(0, 10);
                          const blockKey = `${toTimeOnlyFull(block.start)}-${toTimeOnlyFull(block.end)}`;
                          const slot = schedule[date]?.[blockKey];
                          const isSelected = selectedDate === date && selectedBlock && selectedBlock.start === block.start && selectedBlock.end === block.end;
                          const isPast = new Date(date) < today;
                          if (isPast) {
                            return (
                              <td key={date + blockKey} className="text-center">
                                <div
                                  className="bg-gray-100 text-gray-400 rounded px-2 py-1 text-xs font-semibold cursor-not-allowed select-none"
                                  title="Không thể tạo lịch cho ngày quá khứ"
                                >
                                  Quá khứ
                                </div>
                              </td>
                            );
                          }
                          if (slot) {
                            return (
                              <td key={date + blockKey} className="text-center">
                                <div
                                  className="bg-green-100 text-green-700 rounded px-2 py-1 text-xs font-semibold cursor-not-allowed select-none"
                                  title={`Ngày: ${date}\nKhung giờ: ${block.start} - ${block.end}\nĐã có lịch`}
                                >
                                  Đã có lịch
                                </div>
                              </td>
                            );
                          }
                          return (
                            <td key={date + blockKey} className="text-center">
                              <div
                                className={`rounded px-2 py-1 text-xs font-semibold cursor-pointer select-none border ${
                                  isSelected
                                    ? 'bg-blue-100 border-blue-400 text-blue-700'
                                    : 'bg-gray-50 border-gray-200 text-gray-400'
                                }`}
                                onClick={() => handleSelectBlock(date, block)}
                                title={`Ngày: ${date}\nKhung giờ: ${block.start} - ${block.end}`}
                              >
                                {isSelected ? 'Đang chọn' : 'Trống'}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManagerDoctors; 