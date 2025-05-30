import "../components/Style/Banner.css";
import { Heart, Award, Users, Clock } from "lucide-react";
//Giới thiệu cơ sở y tế
export default function Banner() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-blue-50 to-pink-50" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-pink-300 rounded-full opacity-30 animate-bounce" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
            Bệnh viện Chuyên Điều Trị
            <br />
            <span className="text-pink-500">Hiếm Muộn</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Nơi gửi trọn niềm tin cho các cặp vợ chồng mong con. Đội ngũ chuyên
            gia hàng đầu, trang thiết bị hiện đại, đồng hành cùng bạn trên hành
            trình hạnh phúc.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
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
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-pink-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Đặt lịch khám ngay
          </button>
          <button className="bg-white/90 text-gray-800 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200">
            Tư vấn miễn phí
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
