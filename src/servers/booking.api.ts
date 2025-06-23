import type { BookingConsulant } from "../types/booking.d";
import axiosClient from "./axiosClient";

export const bookingApi = {
  getAllServices: () => {
    return axiosClient.get("/Service/GetAllServicesToBooking");
  },

  //Đang lỗi: kiểm tra lại hàm xem đây có phải API thực hiện lấy danh sách bác sĩ theo id của các dịch vụ ko??
  getDoctorsByServiceId: (serviceId: string) => {
    return axiosClient.get(
      `/Doctor/GetDoctorsByServiceIdForBookingService/${serviceId}`
    );
  },
  getDoctorSchedule: (doctorId: string, date: string) => {
    return axiosClient.get(
      `/DoctorSchedule/GetListDoctorSchedule/${doctorId}?date=${date}`
    );
  },
  bookingService: (data: any) => {
    return axiosClient.post("/Booking/booking_service", data);
  },
  bookingConsulant: (data: BookingConsulant) => {
    return axiosClient.post("/Booking/booking_consulant", data);
  },
};
