//Giới thiệu cơ sở y tế
export default function Banner() {
  return (
    <section className="relative bg-gradient-to-r from-blue-100 via-pink-100 to-white py-12 md:py-20 flex flex-col items-center text-center">
      <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-4">
        Bệnh viện Chuyên Điều Trị Hiếm Muộn
      </h1>
      <p className="text-lg md:text-2xl text-gray-700 mb-6 max-w-2xl mx-auto">
        Nơi gửi trọn niềm tin cho các cặp vợ chồng mong con. Đội ngũ chuyên gia
        hàng đầu, trang thiết bị hiện đại, đồng hành cùng bạn trên hành trình
        hạnh phúc.
      </p>
      <img
        src="/banner-infertility.jpg"
        alt="Infertility Hospital"
        className="rounded-xl shadow-lg w-full max-w-3xl mx-auto"
      />
    </section>
  );
}
