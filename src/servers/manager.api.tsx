import type { Feedback, Account, Appointment, Doctor, DaySchedule, Service } from "../types/manager.d";
import axiosClient from "./axiosClient";
const ManagerApi = {
    
    GetFeedback: () => axiosClient.get<Feedback[]>("/feedback"),
    UpdateFeedbackStatus: (feedbackId: string, status: string) => axiosClient.put(`/Feedback/${feedbackId}/status?status=${status}`),
    GetUserAfterLogin: () => axiosClient.get<Account[]>("/User/GetUserAfterLogin"),
    GetCountTotalAccounts: () => axiosClient.get<Account[]>("/User/CountTotalAccounts"),
    GetCountDoctorsAccount: () => axiosClient.get<Account[]>("/User/CountDoctorsAccount"),
    GetCountCustomerAccount: () => axiosClient.get<Account[]>("/User/CountCustomerAccount"),
    GetCountNewAccount: () => axiosClient.get<Account[]>("/User/CountNewAccount"),
    GetAllUsersForManagement: () => axiosClient.get<Account[]>("/User/GetAllUsersForManagement"),
    GetAllAppointments: () => axiosClient.get<Appointment[]>("/Booking/GetListBooking"),
    GetAllDoctors: () => axiosClient.get<Doctor[]>("/Doctor/GetDoctorsForManagement"),
    GetDoctorScheduleById: (doctorId: string) => axiosClient.get<DaySchedule[]>(`/DoctorSchedule/GetScheduleByDoctorId/${doctorId}`),
    GetServices: () => axiosClient.get<Service[]>("/Service/GetServicesForManagement"),
    
  };
  
  export default ManagerApi;