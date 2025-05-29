import "../components/Style/Banner.css";

//Giới thiệu cơ sở y tế
export default function Banner() {
  return (
    <section className="relative py-12 md:py-20 flex flex-col items-center text-center">
      {/* Background image container */}
      <div className="absolute inset-0 z-0 back-ground" />

      {/* Overlay gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-100/80 via-pink-100/80 to-white/80" />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4">
          Bệnh viện Chuyên Điều Trị Hiếm Muộn
        </h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-6 max-w-2xl mx-auto">
          Nơi gửi trọn niềm tin cho các cặp vợ chồng mong con. Đội ngũ chuyên
          gia hàng đầu, trang thiết bị hiện đại, đồng hành cùng bạn trên hành
          trình hạnh phúc.
        </p>
      </div>
    </section>
  );
}
