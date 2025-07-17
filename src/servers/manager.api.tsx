import type { Feedback, Account, Appointment, Doctor, DaySchedule, Order, TreatmentRoadmapWithPayment, CustomerWithPayment, ServiceForManagement, ServiceCreateRequest, ServiceUpdateRequest, TreatmentRoadmapStep, TreatmentRoadmapCreateRequest, TreatmentRoadmapUpdateRequest } from "../types/manager.d";
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
    
    GetAllOrder: () => axiosClient.get<Order[]>("/Order/GetAllOrder"),

    GetTreatmentRoadmapWithPayment: (month: number, year: number) => axiosClient.get<TreatmentRoadmapWithPayment[]>(`/TreatementRoadmap/GetTreatementRoadmapWithPayment?month=${month}&year=${year}`),

    GetCustomerWithPayment: () => axiosClient.get<CustomerWithPayment[]>("/Customer/GetCustomerWithPayment"),

    GetAllServicesForManagement: () => axiosClient.get<ServiceForManagement[]>("/Service/for-management"),
    CreateService: (data: ServiceCreateRequest) => axiosClient.post("/Service", data),
    UpdateService: (serviceDBId: number, data: ServiceUpdateRequest) => axiosClient.put(`/Service/${serviceDBId}`, data),
    GetTreatmentRoadmapByServiceId: (serviceId: number) => axiosClient.get<TreatmentRoadmapStep[]>(`/TreatementRoadmap/${serviceId}`),
    CreateTreatmentRoadmap: (data: TreatmentRoadmapCreateRequest) => axiosClient.post('/TreatementRoadmap', data),
    UpdateTreatmentRoadmap: (treatmentRoadmapId: number, data: TreatmentRoadmapUpdateRequest) => axiosClient.put(`/TreatementRoadmap/${treatmentRoadmapId}`, data),
    
  };
  
  export default ManagerApi;