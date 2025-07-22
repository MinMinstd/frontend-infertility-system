import { useState, useEffect } from "react";
import { bookingApi } from "../servers/booking.api";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

interface Doctor {
  doctorId: number;
  fullName: string;
  specialty?: string;
}

interface Service {
  serviceDBId: number;
  name: string;
}

interface DoctorSchedule {
  doctorScheduleId: number;
  startTime: string;
  endTime: string;
}

export const RegisterService = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();

  const [services, setServices] = useState<Service[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [doctorSchedules, setDoctorSchedules] = useState<DoctorSchedule[]>([]);

  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const [error, setError] = useState<string>("");

  const [selectedService, setSelectedService] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedTimeString, setSelectedTimeString] = useState("");

  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [husbandName, setHusbandName] = useState("");
  const [phone, setPhone] = useState("");
  const [wifeName, setWifeName] = useState("");
  const [address, setAddress] = useState("");

  // Hàm reset toàn bộ form về trạng thái ban đầu
  const resetForm = () => {
    setSelectedService("");
    setSelectedDoctor("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedTimeString("");
    setHusbandName("");
    setPhone("");
    setWifeName("");
    setAddress("");
    setDoctorSchedules([]);
    setDoctors([]);
    setError("");
    setSubmitted(false);
  };

  //Lấy danh sách dịch vụ
  useEffect(() => {
    const fetchServices = async () => {
      setLoadingServices(true);
      setError("");
      try {
        console.log("Fetching services...");
        const response = await bookingApi.getAllServices();
        console.log("Services response:", response);
        console.log("Services data:", response.data);
        setServices(response.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
        setError("Không thể tải danh sách dịch vụ");
      } finally {
        setLoadingServices(false);
      }
    };
    fetchServices();
  }, []);

  //Lấy danh sách bác sĩ theo mã dịch vụ
  useEffect(() => {
    if (selectedService) {
      const fetchDoctors = async () => {
        setLoadingDoctors(true);
        try {
          console.log("Fetching doctors for service:", selectedService);
          setDoctors([]);
          setSelectedDoctor("");
          const response = await bookingApi.getDoctorsByServiceId(
            selectedService
          );
          console.log("Doctors response:", response);
          console.log("Doctors data:", response.data);
          setDoctors(response.data);
        } catch (error) {
          console.error("Failed to fetch doctors:", error);
          setError("Không thể tải danh sách bác sĩ");
        } finally {
          setLoadingDoctors(false);
        }
      };
      fetchDoctors();
    } else {
      setDoctors([]);
      setSelectedDoctor("");
    }
  }, [selectedService]);

  //Lấy lịch làm việc bác sĩ
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const fetchSchedule = async () => {
        setLoadingSchedule(true);
        setDoctorSchedules([]);
        setSelectedTime("");
        setError("");
        try {
          console.log(
            `Fetching schedule for doctor ${selectedDoctor} on ${selectedDate}`
          );
          const response = await bookingApi.getDoctorSchedule(
            selectedDoctor,
            selectedDate
          );
          console.log("Schedule response:", response.data);

          setDoctorSchedules(response.data);
          if (response.data.length === 0) {
            setError("Bác sĩ không có lịch làm việc vào ngày này.");
          } else {
            setError("");
          }
        } catch (error) {
          console.error("Failed to fetch schedule:", error);
          setError("Không thể tải lịch làm việc của bác sĩ.");
        } finally {
          setLoadingSchedule(false);
        }
      };
      fetchSchedule();
    } else {
      setDoctorSchedules([]);
      setSelectedTime("");
      setError("");
    }
  }, [selectedDoctor, selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || submitted) return;
    setSubmitMessage("");
    setSubmitting(true);
    setHusbandName(husbandName);
    setWifeName(wifeName);
    try {
      // Log all form data before submission
      console.log("Form Data:", {
        husbandName,
        wifeName,
        phone,
        address,
        selectedService,
        selectedDoctor,
        selectedDate,
        selectedTimeString,
        selectedTime,
        userId: user?.userId,
      });

      const data = {
        husband: husbandName,
        wife: wifeName,
        serviceId: selectedService,
        doctorId: selectedDoctor,
        date: selectedDate,
        time: selectedTimeString,
        doctorScheduleId: selectedTime,
        userId: user?.userId,
      };

      // Log the final data object being sent
      console.log("Data being sent to API:", data);

      const response = await bookingApi.bookingService(data);
      console.log("Booking response:", response);
      addNotification({
        avatar: "/Images/logo.png",
        name: "Phòng khám",
        message: "Bạn đã đăng ký dịch vụ thành công!",
        time: new Date().toLocaleTimeString(),
      });

      // Log successful submission details
      console.log("Submission successful with details:", {
        bookingId: response.data?.id,
        timestamp: new Date().toISOString(),
        status: response.status,
      });

      setSubmitMessage("Đăng ký thành công!");
      setSubmitted(true);
      resetForm();
    } catch (err) {
      // Log detailed error information
      console.error("Submission Error Details:", {
        error: err,
        formState: {
          service: selectedService,
          doctor: selectedDoctor,
          date: selectedDate,
          time: selectedTimeString,
        },
      });
      setSubmitMessage("Đăng ký thất bại. Vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  };

  // Nếu chưa có user (đang fetch hoặc chưa đăng nhập), hiển thị loading
  if (!user) {
    return (
      <div className="text-center py-10">Đang tải thông tin người dùng...</div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 to-blue-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-6">
            <h2 className="text-center text-3xl font-bold text-white">
              🏥 Đăng ký dịch vụ y tế
            </h2>
            <p className="text-center text-pink-100 mt-2">
              Vui lòng điền đầy đủ thông tin để đăng ký dịch vụ
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Thông tin cá nhân */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  👥 Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Họ và Tên Chồng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nhập họ tên chồng"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 hover:border-pink-300"
                      value={husbandName}
                      onChange={(e) => setHusbandName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Họ và Tên Vợ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nhập họ tên vợ"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 hover:border-pink-300"
                      value={wifeName}
                      onChange={(e) => setWifeName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Nhập số điện thoại"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 hover:border-pink-300"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nhập địa chỉ"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 hover:border-pink-300"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Khối chọn dịch vụ và bác sĩ */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  🏥 Thông tin dịch vụ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Chọn dịch vụ <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={selectedService}
                      onChange={(e) => {
                        setSelectedService(e.target.value);
                        setSelectedDoctor(""); // Reset doctor when service changes
                      }}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 bg-white"
                    >
                      <option value="">
                        {loadingServices ? "🔄 Đang tải..." : "📋 Chọn dịch vụ"}
                      </option>
                      {services.map((service) => (
                        <option
                          key={service.serviceDBId}
                          value={service.serviceDBId.toString()}
                        >
                          {service.name}
                        </option>
                      ))}
                    </select>
                    <div className="text-xs text-blue-600 mt-1 flex items-center">
                      📊 Tổng số dịch vụ: {services.length}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Chọn bác sĩ <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      disabled={!selectedService || loadingDoctors} // Disable if no service selected
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-blue-300 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
                    >
                      <option value="">
                        {!selectedService
                          ? "⚠️ Vui lòng chọn dịch vụ trước"
                          : loadingDoctors
                          ? "🔄 Đang tải..."
                          : "👨‍⚕️ Chọn bác sĩ"}
                      </option>
                      {selectedService &&
                        doctors.map((doctor) => (
                          <option
                            key={doctor.doctorId}
                            value={doctor.doctorId.toString()}
                          >
                            👨‍⚕️ {doctor.fullName}
                            {doctor.specialty ? ` - ${doctor.specialty}` : ""}
                          </option>
                        ))}
                    </select>
                    <div className="text-xs text-blue-600 mt-1 flex items-center">
                      👥 Tổng số bác sĩ: {doctors.length}
                    </div>
                  </div>
                </div>
              </div>

              {/* Khối chọn ngày và giờ */}
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  📅 Thời gian hẹn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Chọn ngày <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      // min={today}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Chọn giờ <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={selectedTime}
                      onChange={(e) => {
                        setSelectedTime(e.target.value);
                        const slot = doctorSchedules.find(
                          (s) =>
                            s.doctorScheduleId.toString() === e.target.value
                        );
                        if (slot) {
                          setSelectedTimeString(
                            `${slot.startTime.substring(
                              0,
                              5
                            )} - ${slot.endTime.substring(0, 5)}`
                          );
                        } else {
                          setSelectedTimeString("");
                        }
                      }}
                      disabled={
                        !selectedDoctor || !selectedDate || loadingSchedule
                      }
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-300 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
                    >
                      <option value="">
                        {loadingSchedule
                          ? "🔄 Đang tải lịch..."
                          : doctorSchedules.length > 0
                          ? "⏰ Chọn khung giờ"
                          : "⚠️ Vui lòng chọn bác sĩ và ngày"}
                      </option>
                      {doctorSchedules.map((schedule) => (
                        <option
                          key={schedule.doctorScheduleId}
                          value={schedule.doctorScheduleId}
                        >
                          ⏰ {schedule.startTime.substring(0, 5)} -{" "}
                          {schedule.endTime.substring(0, 5)}
                        </option>
                      ))}
                    </select>
                    {doctorSchedules.length > 0 && (
                      <div className="text-xs text-green-600 mt-1 flex items-center">
                        ⏰ Có {doctorSchedules.length} khung giờ khả dụng
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <div className="text-red-400 mr-3">⚠️</div>
                    <div className="text-sm text-red-700 font-medium">
                      {error}
                    </div>
                  </div>
                </div>
              )}

              {/* Điều khoản */}
              <div className="bg-yellow-50 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    required
                    className="w-5 h-5 text-pink-600 bg-white border-2 border-gray-300 rounded focus:ring-pink-500 focus:ring-2 mt-0.5"
                  />
                  <label
                    htmlFor="link-checkbox"
                    className="text-sm font-medium text-gray-700 leading-relaxed"
                  >
                    📋 Tôi đồng ý với{" "}
                    <a
                      href="#"
                      className="text-pink-600 hover:text-pink-700 underline font-semibold"
                    >
                      Điều khoản dịch vụ và chính sách bảo mật
                    </a>{" "}
                    của phòng khám.
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4">
                {submitMessage && (
                  <div
                    className={`text-center p-4 rounded-xl mb-4 ${
                      submitMessage.includes("thành công")
                        ? "bg-green-50 border border-green-200 text-green-700"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <span className="mr-2">
                        {submitMessage.includes("thành công") ? "✅" : "❌"}
                      </span>
                      <span className="font-medium">{submitMessage}</span>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
                  disabled={submitting || submitted}
                >
                  <span className="flex items-center justify-center">
                    {submitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Đang gửi yêu cầu...
                      </>
                    ) : submitted ? (
                      <>✅ Đã đăng ký thành công</>
                    ) : (
                      <>🚀 Đăng ký dịch vụ ngay</>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterService;
