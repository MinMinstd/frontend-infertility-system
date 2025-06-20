import { useState, useEffect } from "react";
import { bookingApi } from "../servers/booking.api";
import { useAuth } from "../context/AuthContext";

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
  const [husbandJob, setHusbandJob] = useState("");
  const [phone, setPhone] = useState("");
  const [wifeName, setWifeName] = useState("");
  const [wifeJob, setWifeJob] = useState("");
  const [address, setAddress] = useState("");

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
      const data = {
        husband: husbandName,
        wife: wifeName,
        serviceId: selectedService,
        doctorId: selectedDoctor,
        date: selectedDate,
        time: selectedTimeString,
        doctorScheduleId: selectedTime,
        userId: user.id,
      };
      await bookingApi.bookingService(data);
      setSubmitMessage("Đăng ký thành công!");
      setSubmitted(true);
    } catch (err) {
      console.log("Error : ", err);
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
                value={husbandName}
                onChange={(e) => setHusbandName(e.target.value)}
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
                value={husbandJob}
                onChange={(e) => setHusbandJob(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                value={wifeName}
                onChange={(e) => setWifeName(e.target.value)}
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
                value={wifeJob}
                onChange={(e) => setWifeJob(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
              <div className="text-xs text-gray-500 mt-1">
                Tổng số dịch vụ: {services.length}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Chọn bác sĩ
              </label>
              <select
                required
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                disabled={!selectedService || loadingDoctors} // Disable if no service selected
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
              <div className="text-xs text-gray-500 mt-1">
                Tổng số bác sĩ: {doctors.length}
              </div>
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
                className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
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

          {error && (
            <div className="text-center text-sm text-red-500 my-4">{error}</div>
          )}

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
            {submitMessage && (
              <div
                className={`text-center text-sm mb-2 ${
                  submitMessage.includes("thành công")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submitMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-1/3 mx-auto flex justify-center py-2.5 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition duration-150 ease-in-out"
              disabled={submitting || submitted}
            >
              {submitting
                ? "Đang gửi..."
                : submitted
                ? "Đã đăng ký"
                : "Đăng ký ngay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterService;
