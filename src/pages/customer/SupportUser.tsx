export const SupportUser = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-12">
          HỖ TRỢ KHÁCH HÀNG
        </h1>

        <div className="">
          <img
            src="../public/Images/Schudules_active.jpg"
            alt="Hỗ trợ khách hàng"
            className="mx-auto mb-6 rounded-lg shadow-lg"
          />
        </div>

        {/* 1. Quy trình khám */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-pink-600 mb-3">
            1. Quy trình khám
          </h2>
          <p className="text-gray-700">
            Mời quý khách hàng truy cập đường link:{" "}
            <a href="#" className="text-pink-600 hover:text-pink-700 underline">
              Link
            </a>
          </p>
        </div>

        {/* 2. Bảng giá dịch vụ */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-pink-600 mb-3">
            2. Bảng giá dịch vụ
          </h2>
          <p className="text-gray-700">
            Mời quý khách hàng truy cập bảng giá dịch vụ của bệnh viện tại đường
            link:{" "}
            <a href="#" className="text-pink-600 hover:text-pink-700 underline">
              Bảng giá dịch vụ
            </a>
          </p>
        </div>

        {/* 3. Tra cứu kết quả */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-pink-600 mb-3">
            3. Tra cứu kết quả
          </h2>
          <p className="text-gray-700 mb-2">
            Mời quý khách hàng đã thăm khám tại bệnh viện tra cứu các kết quả
            xét nghiệm cận lâm sàng tại đường link:{" "}
            <a href="#" className="text-pink-600 hover:text-pink-700 underline">
              Tra cứu kết quả xét nghiệm
            </a>
          </p>
          <p className="text-gray-600 italic">
            Lưu ý: các kết quả xét nghiệm chuyên sâu cần trực tiếp tới bệnh viện
            để bác sĩ chuyên môn trả kết quả và tư vấn.
          </p>
        </div>

        {/* 4. Hướng dẫn gia hạn trữ phôi */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-pink-600 mb-3">
            4. Hướng dẫn gia hạn trữ phôi
          </h2>
          <p className="text-gray-700">
            <a href="#" className="text-pink-600 hover:text-pink-700 underline">
              Link
            </a>
          </p>
        </div>

        {/* 5. Liên hệ */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-pink-600 mb-3">
            5. Liên hệ
          </h2>
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-medium">Tổng đài:</span>{" "}
              <a
                href="tel:02436343636"
                className="text-pink-600 hover:text-pink-700"
              >
                024 3634 3636
              </a>
            </p>
            <p>
              <span className="font-medium">Hotline 24/7:</span>{" "}
              <a
                href="tel:0902221268"
                className="text-pink-600 hover:text-pink-700"
              >
                090 222 1268
              </a>
            </p>
            <p>
              <span className="font-medium">Fanpage Bệnh viện:</span>{" "}
              <a
                href="https://facebook.com/afhanoi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-700"
              >
                facebook.com/afhanoi
              </a>
            </p>
            <p>
              <span className="font-medium">Địa chỉ:</span> 431 Tam Trinh, Hoàng
              Văn Thụ, Hoàng Mai, Hà Nội.
            </p>
          </div>
        </div>

        <p className="text-center text-gray-700 font-medium mt-8">
          Trân trọng cảm ơn!
        </p>
      </div>
    </div>
  );
};

export default SupportUser;
