import type { Feedback, Account, Appointment, Doctor, DaySchedule, Order, TreatmentRoadmapWithPayment, CustomerWithPayment, ServiceForManagement, ServiceCreateRequest, ServiceUpdateRequest, TreatmentRoadmapStep, TreatmentRoadmapCreateRequest, TreatmentRoadmapUpdateRequest, TotalRevenueResponse, TotalTransactionsResponse, TotalCustomersResponse, DoctorScheduleCreateRequest } from "../types/manager.d";
import axiosClient from "./axiosClient";
const ManagerApi = {
    
    GetFeedback: () => axiosClient.get<Feedback[]>("/feedback"),
    UpdateFeedbackStatus: (feedbackId: string, status: string) => axiosClient.put(`/Feedback/${feedbackId}/status?status=${status}`),

    GetUserAfterLogin: () => axiosClient.get<Account[]>("/User/GetUserAfterLogin"),

    GetCountTotalAccounts: () => axiosClient.get<Account[]>("/User/statistics/total"),

    GetCountDoctorsAccount: () => axiosClient.get<Account[]>("/User/statistics/doctors"),

    GetCountCustomerAccount: () => axiosClient.get<Account[]>("/User/statistics/customers"),

    GetCountNewAccount: () => axiosClient.get<Account[]>("/User/statistics/new"),

    GetAllUsersForManagement: () => axiosClient.get<Account[]>("/User"),
    
    GetAllAppointments: () => axiosClient.get<Appointment[]>("/Booking/GetListBooking"),

    GetAllDoctors: () => axiosClient.get<Doctor[]>("/Doctor/GetDoctorsForManagement"),

    GetDoctorScheduleById: (doctorId: string | number) =>
      axiosClient.get<DaySchedule[]>(`/DoctorSchedule/GetScheduleByDoctorId/${doctorId}`),
    
    GetAllOrder: () => axiosClient.get<Order[]>("/Order/GetAllOrder"),

    GetTreatmentRoadmapWithPayment: (month: number, year: number) => axiosClient.get<TreatmentRoadmapWithPayment[]>(`/TreatementRoadmap/GetTreatementRoadmapWithPayment?month=${month}&year=${year}`),

    GetCustomerWithPayment: () => axiosClient.get<CustomerWithPayment[]>("/Customer/GetCustomerWithPayment"),

    GetAllServicesForManagement: () => axiosClient.get<ServiceForManagement[]>("/Service/for-management"),

    CreateService: (data: ServiceCreateRequest) => axiosClient.post("/Service", data),

    UpdateService: (serviceDBId: number, data: ServiceUpdateRequest) => axiosClient.put(`/Service/${serviceDBId}`, data),

    GetTreatmentRoadmapByServiceId: (serviceId: number) => axiosClient.get<TreatmentRoadmapStep[]>(`/TreatementRoadmap/${serviceId}`),

    CreateTreatmentRoadmap: (data: TreatmentRoadmapCreateRequest) => axiosClient.post('/TreatementRoadmap', data),

    UpdateTreatmentRoadmap: (treatmentRoadmapId: number, data: TreatmentRoadmapUpdateRequest) => axiosClient.put(`/TreatementRoadmap/${treatmentRoadmapId}`, data),
    
    GetTotalRevenue: (month: number, year: number) =>
      axiosClient.get<TotalRevenueResponse>(`/Payment/report/total-revenue/${month}/${year}`),
    
    GetTotalTransactions: (month: number, year: number) =>
      axiosClient.get<TotalTransactionsResponse>(`/Payment/report/total-transaction/${month}/${year}`),

    GetTotalCustomers: (month: number, year: number) =>
      axiosClient.get<TotalCustomersResponse>(`/Payment/report/total-customer/${month}/${year}`),

    CreateDoctorSchedule: (doctorId: string | number, data: DoctorScheduleCreateRequest) => axiosClient.post(`/DoctorSchedule/${doctorId}`, data),

    GetAllDoctorSchedules: () => axiosClient.get<DaySchedule[]>("/DoctorSchedule/GetAll"),

    DeleteAccount: (userId: number) => axiosClient.put(`/User/${userId}`, {}),
    DeleteDoctorSchedule: (doctorId: number, scheduleId: number) => axiosClient.delete(`/DoctorSchedule/${doctorId}/${scheduleId}`),
  };
  
  export default ManagerApi;