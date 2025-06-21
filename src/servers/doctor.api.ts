import axiosClient from "./axiosClient";

const DoctorApi = {
  getDoctorsByServiceIdForBookingConsulation: (serviceId: string) => {
    return axiosClient.get(
      `/Doctor/GetDoctorsByServiceIdForBookingConsulation/${serviceId}`
    );
  },
  getDoctorSchedule: (doctorId: number, date: string) => {
    return axiosClient.get(
      `/DoctorSchedule/GetListDoctorSchedule/${doctorId}?date=${date}`
    );
  },
};

export default DoctorApi; 