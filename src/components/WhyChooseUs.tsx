import { Award, Globe, Zap, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Award,
      title: "Chuyên gia hàng đầu",
      description:
        "Quy tụ đội ngũ chuyên gia, bác sĩ, dược sĩ và điều dưỡng có trình độ chuyên môn cao, tay nghề giỏi, tận tâm và chuyên nghiệp.",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Globe,
      title: "Chất lượng quốc tế",
      description:
        "Hệ thống Y tế được quản lý và vận hành dưới sự giám sát của những nhà quản lý y tế giàu kinh nghiệm.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Zap,
      title: "Công nghệ tiên tiến",
      description:
        "Tại đây cung cấp cơ sở vật chất hạng nhất và dịch vụ 5 sao bằng cách sử dụng các công nghệ tiên tiến.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Search,
      title: "Nghiên cứu & Đổi mới",
      description:
        "Viện nghiên cứu liên tục thúc đẩy y học hàn lâm dựa trên nghiên cứu có phương pháp và sự phát triển y tế.",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <motion.div className="bg-transparent rounded-3xl shadow-2xl p-8 lg:p-12 h-fit sticky top-8" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
      <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
          TẠI SAO CHỌN CHÚNG TÔI
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-blue-500 mx-auto rounded-full" />
      </motion.div>

      <motion.div className="space-y-12" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
        {reasons.map((reason, index) => {
          const IconComponent = reason.icon;
          return (
            <motion.div
              key={index}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
              whileHover={{ scale: 1.04 }}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${reason.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative element */}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA */}
      {/* <div className="mt-12 text-center">
        <button className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
          Tìm hiểu thêm
        </button>
      </div> */}
    </motion.div>
  );
}
