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

  //Cập nhật treatment road map tại medical manager
  UpdateTreatmentRoadmap: (
    customerId: number,
    treatmentRoadmapId: number,
    data: {
      date: string;
      stage: string;
      description: string;
      durationDay: number;
      status: string;
    }
  ) => {
    return axiosClient.put(
      `/Doctor/updateDetailTreatmentRoadmap/${customerId}/${treatmentRoadmapId}`,
      data
    );
  },

  //Hồ sơ điều trị chi tiết tại medical manager
  GetMedicalRecordDetails: (customerid: number) => {
    return axiosClient.get(`Doctor/GetMedicalRecordDetail/${customerid}`);
  },

  //Tạo mới medical record detail (Chưa thực hiện)
  CreateMedicalRecordDetail: (
    customerId: number,
    data: {
      treatmentRoadmapId: number;
      date: string;
      typeName: string;
      testResult?: string;
      note?: string;
      status: string;
    }
  ) => {
    return axiosClient.post(
      `/Doctor/CreateMedicalRecordDetail/${customerId}`,
      data
    );
  },

  //Cập nhập medical record detail (chưa thực hiện)
  UpdateMedicalRecordDetail: (
    customerId: number,
    medicalRecordDetailId: number,
    data: {
      date: string;
      testResult: string;
      note: string;
      status: string;
    }
  ) => {
    return axiosClient.put(
      `Doctor/UpdateMedicalRecordDetail/${customerId}/${medicalRecordDetailId}`,
      data
    );
  },

  //Lấy thông tin treatment result - type test
  GetTreatmentResult_TypeTest: (customerid: number) => {
    return axiosClient.get(`Doctor/treatmentResult-typeTest/${customerid}`);
  },
};

export default DoctorApi;
