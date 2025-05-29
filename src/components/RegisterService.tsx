import { useState } from "react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

interface Service {
  id: string;
  name: string;
}

const timeSlots = [
  "8:30-9:00",
  "9:00-9:30",
  "9:30-10:00",
  "10:00-10:30",
  "10:30-11:00",
  "14:00-14:30",
  "14:30-15:00",
  "15:00-15:30",
  "15:30-16:00",
  "16:00-16:30",
];

const doctors: Doctor[] = [
  { id: "1", name: "BS. Nguyễn Văn A", specialty: "Chuyên gia IVF" },
  { id: "2", name: "BS. Trần Thị B", specialty: "Nội tiết sinh sản" },
  { id: "3", name: "BS. Lê Văn C", specialty: "Nam học" },
];

const services: Service[] = [
  { id: "1", name: "Tư vấn sức khỏe sinh sản" },
  { id: "2", name: "Khám và điều trị hiếm muộn" },
  { id: "3", name: "Thụ tinh trong ống nghiệm" },
];

export const RegisterService = () => {
  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý logic đăng ký ở đây
    console.log("Form submitted");
  };

  // Tính toán ngày tối thiểu (ngày hiện tại)
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-pink-100 rounded-xl shadow-md min-h-[630px] p-8">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-6">
          Đăng ký dịch vụ
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Thông tin cá nhân */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Họ và Tên Chồng
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nghề nghiệp chồng
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số diện thoại
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Họ và Tên Vợ
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nghề nghiệp vợ:
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>
          </div>

          {/* Khối chọn dịch vụ và bác sĩ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chọn dịch vụ
              </label>
              <select
                required
                value={selectedService}
                onChange={(e) => {
                  setSelectedService(e.target.value);
                  setSelectedDoctor(""); // Reset doctor when service changes
                }}
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              >
                <option value="">Chọn dịch vụ</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chọn bác sĩ
              </label>
              <select
                required
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                disabled={!selectedService} // Disable if no service selected
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {selectedService
                    ? "Chọn bác sĩ"
                    : "Vui lòng chọn dịch vụ trước"}
                </option>
                {selectedService &&
                  doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Khối chọn ngày và giờ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chọn ngày
              </label>
              <input
                type="date"
                required
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chọn giờ
              </label>
              <select
                required
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
              >
                <option value="">Chọn khung giờ</option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="link-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="link-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 text-dark-300"
            >
              Tôi đống ý với{" "}
              <a
                href="#"
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                Điều khoản dịch vụ và chính sách
              </a>
              .
            </label>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-1/3 mx-auto flex justify-center py-2.5 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 ease-in-out"
            >
              Đăng ký ngay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterService;
