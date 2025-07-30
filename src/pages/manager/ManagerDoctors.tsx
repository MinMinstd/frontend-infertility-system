import React, { useState, useEffect } from "react";
import { Table, Button, Space, message, Spin, Empty, Card, Typography, Modal, Tag, Tooltip } from "antd";
import { Calendar as CalendarIcon, User, ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react";
import type { ColumnsType } from "antd/es/table";
import { motion } from "framer-motion";
import ManagerApi from "../../servers/manager.api";
import type { Doctor, DaySchedule } from "../../types/manager.d";
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
  { start: "08:00", end: "10:30" },
  { start: "11:00", end: "13:30" },
  { start: "14:00", end: "16:30" },
];

function toTimeOnlyFull(str: string) {
  return str.length === 5 ? str + ':00' : str;
}

function formatDateLocal(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
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
        // Chỉ lấy bác sĩ đang hoạt động
        setDoctors((response.data || []).filter((d: Doctor) => d.isActive === true));
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
          const date = formatDateLocal(addDays(weekStart, i));
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
    const data = {
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
        const date = formatDateLocal(addDays(weekStart, i));
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

  // Hàm xoá lịch làm việc
  const handleDeleteSchedule = async () => {
    if (!showSchedule || !selectedDate || !selectedBlock) return;
    const date = selectedDate;
    const blockKey = `${toTimeOnlyFull(selectedBlock.start)}-${toTimeOnlyFull(selectedBlock.end)}`;
    const slot = schedule[date]?.[blockKey];
    if (!slot || !slot.doctorScheduleId) {
      message.warning('Vui lòng chọn một ca đã có lịch để xoá!');
      return;
    }
    Modal.confirm({
      title: 'Xác nhận xoá lịch',
      content: `Bạn có chắc muốn xoá ca làm việc ngày ${date}, khung giờ ${selectedBlock.start} - ${selectedBlock.end}?`,
      okText: 'Xoá',
      okType: 'danger',
      cancelText: 'Huỷ',
      onOk: async () => {
        setLoadingSchedule(true);
        try {
          await ManagerApi.DeleteDoctorSchedule(Number(showSchedule.doctorId), slot.doctorScheduleId);
          message.success('Xoá lịch thành công!');
          setSelectedDate(null);
          setSelectedBlock(null);
          // Reload lịch
          const res = await ManagerApi.GetDoctorScheduleById(showSchedule.doctorId);
          const weekMap: Record<string, Record<string, DaySchedule | null>> = {};
          for (let i = 0; i < 7; ++i) {
            const d = formatDateLocal(addDays(weekStart, i));
            weekMap[d] = {};
            TIME_BLOCKS.forEach(b => {
              weekMap[d][`${toTimeOnlyFull(b.start)}-${toTimeOnlyFull(b.end)}`] = null;
            });
          }
          if (Array.isArray(res.data)) {
            res.data.forEach((item: DaySchedule) => {
              const d = item.workDate;
              const key = `${toTimeOnlyFull(item.startTime)}-${toTimeOnlyFull(item.endTime)}`;
              if (weekMap[d] && weekMap[d][key] !== undefined) {
                weekMap[d][key] = item;
              }
            });
          }
          setSchedule(weekMap);
        } catch (err) {
          let msg = 'Xoá lịch thất bại!';
          if (axios.isAxiosError(err)) {
            if (err.response?.data?.message) {
              msg += ': ' + err.response.data.message;
            } else if (err.response?.data) {
              msg += ': ' + JSON.stringify(err.response.data);
            }
          }
          message.error(msg);
        } finally {
          setLoadingSchedule(false);
        }
      }
    });
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
      render: (id: number) => id,
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
      title: <span className="text-pink-600 font-semibold">Chuyên Môn</span>,
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
            onClick={() => setShowSchedule({doctorId: String(record.doctorId), fullName: record.fullName})}
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
        <Modal open={true} footer={null} onCancel={() => setShowSchedule(null)} width={900} style={{top: 40}}
          styles={{ body: { padding: 0, borderRadius: 16, boxShadow: '0 8px 32px 0 rgba(24, 144, 255, 0.15)' } }}>
          <div className="p-0">
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <Title level={4} className="!mb-0">Quản lý lịch làm việc - {showSchedule.fullName}</Title>
              <div>
                <Button onClick={handlePrevWeek} icon={<ArrowLeft />} className="mr-2">Tuần trước</Button>
                <span className="font-semibold text-base mx-2">{weekRange}</span>
                <Button onClick={handleNextWeek} icon={<ArrowRight />}>Tuần sau</Button>
              </div>
            </div>
            <div className="px-6 pb-2 flex gap-2">
              {(() => {
                if (!selectedDate || !selectedBlock) return null;
                const date = selectedDate;
                const blockKey = `${toTimeOnlyFull(selectedBlock.start)}-${toTimeOnlyFull(selectedBlock.end)}`;
                const slot = schedule[date]?.[blockKey];
                const isHasSchedule = !!(slot && typeof slot.doctorScheduleId === 'number' && slot.doctorScheduleId > 0);
                const isBooked = isHasSchedule && slot.status === 'Unavailable';

                return (
                  <>
                    <Button
                      type="primary"
                      icon={<Plus />}
                      onClick={handleCreateSchedule}
                      loading={loadingSchedule}
                      disabled={isHasSchedule}
                    >
                      Tạo lịch
                    </Button>
                    <Button
                      danger
                      icon={<Trash2 />}
                      onClick={handleDeleteSchedule}
                      loading={loadingSchedule}
                      disabled={!isHasSchedule || isBooked}
                    >
                      Xóa
                    </Button>
                  </>
                );
              })()}
            </div>
            <div className="px-6 pb-2">
              <div className="bg-blue-50 rounded p-2 text-blue-700 text-sm">
                <b>Hướng dẫn:</b> Nhấp vào <span style={{color:'#1677ff', fontWeight:600}}>Trống</span> để tạo lịch. Nhấp vào <span style={{color:'#1d39c4', fontWeight:600}}>Có lịch làm</span> để xoá. Ca <span style={{color:'#52c41a', fontWeight:600}}>Có lịch hẹn</span> đã được đặt và không thể thay đổi.
              </div>
            </div>
            <div className="px-6 pb-6">
              <div>
                <Table
                  bordered
                  pagination={false}
                  className="rounded-xl shadow-sm"
                  style={{ width: '100%' }}
                  columns={[
                    {
                      title: '',
                      dataIndex: 'time',
                      key: 'time',
                      width: 120,
                      align: 'center' as const,
                      render: (text: string) => <span className="font-medium text-gray-600">{text}</span>
                    },
                    ...WEEKDAYS.map((d, i) => ({
                      title: <div className="text-center font-semibold text-gray-700">{d}<br/><span className="text-xs text-gray-400">{addDays(weekStart, i).toLocaleDateString('vi-VN')}</span></div>,
                      dataIndex: d,
                      key: d,
                      align: 'center' as const,
                      width: 110,
                      render: (_: unknown, row: { key: string; time: string; start: string; end: string }) => {
                        const date = formatDateLocal(addDays(weekStart, i));
                        const blockKey = `${toTimeOnlyFull(row.start)}-${toTimeOnlyFull(row.end)}`;
                        const slot = schedule[date]?.[blockKey];
                        const isSelected = selectedDate === date && selectedBlock && selectedBlock.start === row.start && selectedBlock.end === row.end;
                        const isPast = new Date(date) < today;
                        if (isPast) {
                          return (
                            <Tooltip title="Không thể tạo lịch cho ngày quá khứ">
                              <span>
                                <Tag
                                  color="default"
                                  style={{
                                    opacity: 0.5,           // Làm mờ
                                    filter: 'grayscale(1)', // Chuyển xám
                                    cursor: 'not-allowed',  // Đổi con trỏ
                                    borderRadius: 8,
                                    fontWeight: 600,
                                  }}
                                >
                                  Quá khứ
                                </Tag>
                              </span>
                            </Tooltip>
                          );
                        }
                        if (slot && slot.doctorScheduleId) {
                          // Có lịch hẹn (đã được đặt)
                          if(slot.status === 'Unavailable'){
                            return (
                              <Tooltip title={`Ngày: ${date}\nKhung giờ: ${row.start} - ${row.end}\nĐã có lịch hẹn`}>
                                <Tag
                                  color={isSelected ? "processing" : "success"}
                                  style={{
                                    cursor: 'pointer',
                                    borderRadius: 8,
                                    fontWeight: 600,
                                    border: isSelected ? '2px solid #1677ff' : undefined
                                  }}
                                  onClick={() => handleSelectBlock(date, row)}
                                >
                                  {isSelected ? 'Đang chọn' : 'Có lịch hẹn'}
                                </Tag>
                              </Tooltip>
                            );
                          }
                          // Có lịch làm (chưa ai đặt)
                          if(slot.status === 'Available'){
                             return (
                              <Tooltip title={`Ngày: ${date}\nKhung giờ: ${row.start} - ${row.end}\nCó lịch làm`}>
                                <Tag
                                  color={isSelected ? "processing" : "blue"}
                                  style={{
                                    cursor: 'pointer',
                                    borderRadius: 8,
                                    fontWeight: 600,
                                    border: isSelected ? '2px solid #1677ff' : undefined
                                  }}
                                  onClick={() => handleSelectBlock(date, row)}
                                >
                                  {isSelected ? 'Đang chọn' : 'Có lịch làm'}
                                </Tag>
                              </Tooltip>
                            );
                          }
                        }
                        // Trống
                        return (
                          <Tooltip title={`Ngày: ${date}\nKhung giờ: ${row.start} - ${row.end}`}> 
                            <Tag
                              color={isSelected ? "processing" : "default"}
                              style={{cursor:'pointer', borderRadius:8, fontWeight:600, border: isSelected ? '2px solid #1677ff' : undefined}}
                              onClick={() => handleSelectBlock(date, row)}
                            >
                              {isSelected ? 'Đang chọn' : 'Trống'}
                            </Tag>
                          </Tooltip>
                        );
                      }
                    }))
                  ]}
                  dataSource={TIME_BLOCKS.map(block => ({
                    key: block.start + block.end,
                    time: `${block.start} - ${block.end}`,
                    start: block.start,
                    end: block.end
                  }))}
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ManagerDoctors; 