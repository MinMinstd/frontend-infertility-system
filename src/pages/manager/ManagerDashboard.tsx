import { Typography, Space } from "antd";
import {
  Calendar,
  Users,
  User,
  FileText,
  NotebookPen,
  BarChart,
  DollarSign,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const { Title, Text } = Typography;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, type: 'spring' as const, stiffness: 120 } }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: 'spring' as const, stiffness: 100 } },
};

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const managementSections = [
    {
      title: "Quản lý lịch hẹn",
      icon: <Calendar className="w-7 h-7 text-white" />,
      description: "Xem và quản lý tất cả lịch hẹn",
      link: "/manager/appointments",
      bgColor: "bg-blue-500",
    },
    {
      title: "Quản lý bác sĩ",
      icon: <User className="w-7 h-7 text-white" />,
      description: "Quản lý thông tin và lịch làm việc của bác sĩ",
      link: "/manager/doctors",
      bgColor: "bg-green-500",
    },
    {
      title: "Quản lý lịch sử điều trị",
      icon: <NotebookPen className="w-7 h-7 text-white" />,
      description: "Xem và quản lý lịch sử điều trị",
      link: "/manager/orders",
      bgColor: "bg-red-500",
    },
    {
      title: "Quản lý người dùng",
      icon: <Users className="w-7 h-7 text-white" />,
      description: "Xem và quản lý hồ sơ bệnh nhân",
      link: "/manager/customers",
      bgColor: "bg-purple-500",
    },
    {
      title: "Báo cáo thống kê",
      icon: <BarChart className="w-7 h-7 text-white" />,
      description: "Xem báo cáo và thống kê",
      link: "/manager/reports",
      bgColor: "bg-orange-500",
    },
    {
      title: "Quản lý dịch vụ",
      icon: <FileText className="w-7 h-7 text-white" />,
      description: "Quản lý các dịch vụ khám chữa bệnh",
      link: "/manager/services",
      bgColor: "bg-pink-500",
    },
    {
      title: "Quản lý tài chính",
      icon: <DollarSign className="w-7 h-7 text-white" />,
      description: "Theo dõi doanh thu và chi phí",
      link: "/manager/finance",
      bgColor: "bg-emerald-500",
    },
    {
      title: "Quản lý phản hồi",
      icon: <MessageCircle className="w-7 h-7 text-white" />,
      description: "Xem và phản hồi ý kiến khách hàng",
      link: "/manager/feedbacks",
      bgColor: "bg-indigo-500",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Banner đầu trang */}
      <div className="w-full flex items-center gap-6 bg-white rounded-2xl shadow mb-8 overflow-hidden">
        <img src="/Images/Banner.jpg" alt="Banner" className="h-32 w-56 object-cover" />
        <div className="flex-1">
          <Title level={2} className="text-pink-600 !mb-1">Chào mừng đến với hệ thống quản lý phòng khám</Title>
          <Text type="secondary">Quản lý hiệu quả - Chăm sóc tận tâm</Text>
        </div>
        <img src="/Images/logo.png" alt="Logo" className="h-16 w-16 object-contain mr-6" />
      </div>
      {/* End Banner */}
      <Space direction="vertical" size="large" className="w-full">
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <Title level={2} className="text-pink-600 !mb-0">
            Bảng điều khiển
          </Title>
          <Text type="secondary">Tổng quan về hoạt động của hệ thống</Text>
        </motion.div>

        {/* ĐÃ XÓA PHẦN 4 CARD THỐNG KÊ */}

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {managementSections.map((section, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(236,72,153,0.15)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition group bg-white border border-gray-100 hover:border-pink-300 p-5 flex items-center gap-4 min-h-[110px]`}
              onClick={() => navigate(section.link)}
            >
              {/* Hình minh họa nhỏ cho từng section */}
              <div className={`p-4 rounded-xl ${section.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform relative`}>
                {section.icon}
                <img src="/Images/logo.png" alt="section" className="absolute -right-3 -bottom-3 w-8 h-8 opacity-10 pointer-events-none select-none" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg text-gray-800 group-hover:text-pink-600 mb-1">
                  {section.title}
                </div>
                <div className="text-gray-500 text-sm group-hover:text-gray-700">
                  {section.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Space>
    </div>
  );
};

export default ManagerDashboard;
