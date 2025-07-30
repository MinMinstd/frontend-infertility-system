import { Link } from "react-router-dom";
import "../components/Style/Banner.css";
import { Heart, Award, Users, Clock } from "lucide-react";
import { motion } from "framer-motion";
//Giới thiệu cơ sở y tế

// Component tạo hiệu ứng trái tim rơi
function FallingHearts() {
  // Danh sách các trái tim với vị trí và tốc độ khác nhau
  const hearts = [
    { left: '10%', size: 28, delay: '0s', duration: '6s', opacity: 0.7 },
    { left: '25%', size: 36, delay: '1.2s', duration: '7s', opacity: 0.5 },
    { left: '40%', size: 24, delay: '0.7s', duration: '5.5s', opacity: 0.6 },
    { left: '60%', size: 32, delay: '2s', duration: '8s', opacity: 0.8 },
    { left: '75%', size: 40, delay: '0.5s', duration: '7.5s', opacity: 0.5 },
    { left: '85%', size: 30, delay: '1.7s', duration: '6.5s', opacity: 0.6 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {hearts.map((h, i) => (
        <svg
          key={i}
          className="falling-heart absolute"
          style={{
            left: h.left,
            width: h.size,
            height: h.size,
            opacity: h.opacity,
            animationDelay: h.delay,
            animationDuration: h.duration,
          } as React.CSSProperties}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            className="text-pink-500"
          />
        </svg>
      ))}
    </div>
  );
}

export default function Banner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background với gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-blue-50 to-[#fafaff] z-0" />
      {/* Hiệu ứng trái tim rơi */}
      <FallingHearts />
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-pink-300 rounded-full opacity-30 animate-bounce" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-pulse" />
          </motion.div>
          <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            Bệnh viện Chuyên Điều Trị
            <br />
            <span className="text-pink-500">Hiếm Muộn</span>
          </motion.h1>
          <motion.p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
            Nơi gửi trọn niềm tin cho các cặp vợ chồng mong con. Đội ngũ chuyên
            gia hàng đầu, trang thiết bị hiện đại, đồng hành cùng bạn trên hành
            trình hạnh phúc.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Award className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">15+</div>
            <div className="text-sm text-gray-600">Năm kinh nghiệm</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">5000+</div>
            <div className="text-sm text-gray-600">Gia đình hạnh phúc</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Heart className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">95%</div>
            <div className="text-sm text-gray-600">Tỷ lệ thành công</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-800">24/7</div>
            <div className="text-sm text-gray-600">Hỗ trợ tư vấn</div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
          <Link to="/user/register_service" className="w-full sm:w-auto">
            <motion.button whileHover={{ scale: 1.08 }} className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Đặt lịch khám ngay
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
