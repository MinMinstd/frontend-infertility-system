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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Đăng Ký Dịch Vụ
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vui lòng điền đầy đủ thông tin để đăng ký dịch vụ khám và điều trị tại phòng khám của chúng tôi
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-blue-500 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white">
              Thông Tin Đăng Ký
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Thông Tin Cá Nhân</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Họ và Tên Chồng <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                    placeholder="Nhập họ và tên chồng"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                    placeholder="Nhập họ và tên vợ"
                    value={wifeName}
                    onChange={(e) => setWifeName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Số Điện Thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Địa Chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                    placeholder="Nhập địa chỉ"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Service Selection Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Chọn Dịch Vụ & Bác Sĩ</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Dịch Vụ <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={selectedService}
                    onChange={(e) => {
                      setSelectedService(e.target.value);
                      setSelectedDoctor("");
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  >
                    <option value="">
                      {loadingServices ? "Đang tải..." : "Chọn dịch vụ"}
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
                  <div className="text-xs text-gray-500">
                    Tổng số dịch vụ: {services.length}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Bác Sĩ <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    disabled={!selectedService || loadingDoctors}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!selectedService
                        ? "Vui lòng chọn dịch vụ trước"
                        : loadingDoctors
                        ? "Đang tải..."
                        : "Chọn bác sĩ"}
                    </option>
                    {selectedService &&
                      doctors.map((doctor) => (
                        <option
                          key={doctor.doctorId}
                          value={doctor.doctorId.toString()}
                        >
                          {doctor.fullName}
                          {doctor.specialty ? ` - ${doctor.specialty}` : ""}
                        </option>
                      ))}
                  </select>
                  <div className="text-xs text-gray-500">
                    Tổng số bác sĩ: {doctors.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Selection Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Chọn Lịch Hẹn</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày Hẹn <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Khung Giờ <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={selectedTime}
                    onChange={(e) => {
                      setSelectedTime(e.target.value);
                      const slot = doctorSchedules.find(
                        (s) => s.doctorScheduleId.toString() === e.target.value
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
                    disabled={!selectedDoctor || !selectedDate || loadingSchedule}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                  >
                    <option value="">
                      {loadingSchedule
                        ? "Đang tải lịch..."
                        : doctorSchedules.length > 0
                        ? "Chọn khung giờ"
                        : "Vui lòng chọn bác sĩ và ngày"}
                    </option>
                    {doctorSchedules.map((schedule) => (
                      <option
                        key={schedule.doctorScheduleId}
                        value={schedule.doctorScheduleId}
                      >
                        {schedule.startTime.substring(0, 5)} -{" "}
                        {schedule.endTime.substring(0, 5)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-red-600">{error}</span>
                </div>
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                />
                <label
                  htmlFor="terms-checkbox"
                  className="text-sm text-gray-700 leading-relaxed"
                >
                  Tôi đồng ý với{" "}
                  <a
                    href="#"
                    className="text-pink-600 hover:text-pink-700 underline font-medium"
                  >
                    Điều khoản dịch vụ và chính sách
                  </a>{" "}
                  của phòng khám.
                </label>
              </div>
            </div>

            {/* Submit Section */}
            <div className="space-y-4">
              {submitMessage && (
                <div
                  className={`text-center p-4 rounded-lg ${
                    submitMessage.includes("thành công")
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {submitMessage}
                </div>
              )}
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={submitting || submitted}
              >
                {submitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang gửi...</span>
                  </div>
                ) : submitted ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Đã đăng ký thành công</span>
                  </div>
                ) : (
                  "Đăng Ký Ngay"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterService;
