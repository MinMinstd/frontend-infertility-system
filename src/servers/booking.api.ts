import type { BookingConsulant } from "../types/booking.d";
import axiosClient from "./axiosClient";

export const bookingApi = {
  getAllServices: () => {
    return axiosClient.get("/Service/GetAllServicesToBooking");
  },
  getDoctorsByServiceId: (serviceId: string) => {
    return axiosClient.get(`/Doctor/GetDoctorsByServiceIdForBookingService/${serviceId}`);
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