import axiosClient from "./axiosClient";

export const bookingApi = {
  getAllServices: () => {
    return axiosClient.get("/Service/GetAllServicesToBooking");
  },
  getDoctorsByServiceId: (serviceId: string) => {
    return axiosClient.get(`/Doctor/GetDoctorsByServiceId/${serviceId}`);
  },
  getDoctorSchedule: (doctorId: string, date: string) => {
    return axiosClient.get(
      `/DoctorSchedule/GetListDoctorSchedule/${doctorId}?date=${date}`
    );
  },
  bookingService: (data: any) => {
    return axiosClient.post("/Booking/booking_service", data);
  },
}; 