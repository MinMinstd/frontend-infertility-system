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

  //danh sách bệnh nhân tại Patient.tsx
  GetAllPatients: () => {
    return axiosClient.get("/Doctor/GetListCustomer");
  },

  //Thông tin chi tiết bệnh nhân tại PatientDetail.tsx tại overview
  GetInforPatientDetail: (customerId: number) => {
    return axiosClient.get(`/Doctor/getPatientInformation/${customerId}`);
  },

  //Thanh thông báo tiến độ của treatment process tại overview
  GetTreatmentProgressOverview: (customerId: number) => {
    return axiosClient.get(
      `/Doctor/GetListTreatmentRoadmapForCustomer/${customerId}`
    );
  },

  //Tiến độ các bước điều trị tại medical manager
  GetTreatmentRoadmap: (customerId: number) => {
    return axiosClient.get(`Doctor/getDetailTreatmentRoadmap/${customerId}`);
  },

  //Hồ sơ điều trị chi tiết tại medical manager
  GetMedicalRecordDetails: (customerid: number) => {
    return axiosClient.get(`Doctor/GetMedicalRecordDetail/${customerid}`);
  },

  //Tạo mới medical record detail
  CreateMedicalRecordDetail: (data: {
    medicalRecordId: number;
    treatmentRoadmapId: number;
    stepNumber: number;
    date: string;
    typeName: "Consultation" | "Treatment" | "Test" | "Result";
    status: "Pending" | "Completed" | "Cancelled";
    testResult?: string;
    note?: string;
    stage: string;
  }) => {
    return axiosClient.post("/Doctor/CreateMedicalRecordDetail", data);
  },
};

export default DoctorApi;
