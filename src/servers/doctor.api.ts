import type {
  MedicalRecordComplete,
  MedicalRecordOngoing,
} from "../types/doctor";
import type {
  CreateEmbryo,
  CreateTreatmentResultWithTypeTest,
  UpdateConsulation,
  UpdateEmbryo,
} from "../types/medicalRecord.d";
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
  GetTreatmentRoadmap1: (customerId: number) => {
    return axiosClient.get(`Doctor/getDetailTreatmentRoadmap/${customerId}`);
  },

  GetTreatmentRoadmap: (customerId: number, bookingId: number) => {
    return axiosClient.get(
      `Doctor/getDetailTreatmentRoadmap/${customerId}/${bookingId}`
    );
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
  GetMedicalRecordDetailByDetailId: (medicalRecordId: number) => {
    return axiosClient.get(`Doctor/GetMedicalRecordDetail/${medicalRecordId}`);
  },

  //Tạo mới medical record detail (Chưa thực hiện)
  CreateMedicalRecordDetail: (
    medicalRecordId: number,
    data: {
      treatmentRoadmapId: number;
      consulationResultId: number;
      treatmentResultId: number;
      date: string;
      typeName: string;
      testResult?: string;
      note?: string;
      status: string;
    }
  ) => {
    return axiosClient.post(
      `/Doctor/CreateMedicalRecordDetail/${medicalRecordId}`,
      data
    );
  },

  //Cập nhập medical record detail (chưa thực hiện)
  UpdateMedicalRecordDetail: (
    customerId: number,
    medicalRecordDetailId: number,
    data: {
      date: string;
      testResult?: string;
      note?: string;
      status: string;
    }
  ) => {
    return axiosClient.put(
      `Doctor/UpdateMedicalRecordDetail/${customerId}/${medicalRecordDetailId}`,
      data
    );
  },

  //Lấy thông tin treatment result - type test
  GetTreatmentResult_TypeTest: (customerid: number, bookingId: number) => {
    return axiosClient.get(
      `Doctor/treatmentResult-typeTest/${customerid}/${bookingId}`
    );
  },

  //Cập nhật thông tin treatment result - type test
  UpdateTreatmentResult_TypeTest: (
    treatmentResultId: number,
    data: {
      dateTreatmentResult: string;
      description: string;
      result: string;
      typeTest: {
        typeTestId: number;
        name: string;
        description: string;
      }[];
    }
  ) => {
    return axiosClient.put(
      `Doctor/treatmentResult-typeTest/${treatmentResultId}`,
      data
    );
  },

  //tạo mới thông tin treatment result - type test
  CreateTreatResult_TypeTest: (
    customerid: number,
    data: CreateTreatmentResultWithTypeTest
  ) => {
    return axiosClient.post(
      `/Doctor/CreateTreatmentResultAndTypeTest/${customerid}`,
      data
    );
  },

  //Thông tin consulation result - type test
  GetConsultaionResult_TypeTests: (customerid: number, bookingId: number) => {
    return axiosClient.get(
      `Doctor/consultationResult-typeTests/${customerid}/${bookingId}`
    );
  },

  //Tạo kết quả tư vấn
  CreateConsulationResult_typeTest: (
    customerId: number,
    bookingId: number,
    data: {
      date: string;
      resultValue: string;
      note: string;
      name: string;
      descriptionTypeTest: string;
    }
  ) => {
    return axiosClient.post(
      `Doctor/consultationResult-typeTest/${customerId}/${bookingId}`,
      data
    );
  },

  //Cập nhật consulation result - type test
  UpdateConsulationResult_TypeTest: (
    consulationResultId: number,
    data: UpdateConsulation
  ) => {
    return axiosClient.put(
      `Doctor/consultationResult-typeTest/${consulationResultId}`,
      data
    );
  },

  //Tạo typetest dành cho consulation
  CreateTypeTest: (
    customerId: number,
    consulationResultId: number,
    data: {
      name: string;
      description: string;
    }
  ) => {
    return axiosClient.post(
      `/Doctor/typeTest-consultationResult/${customerId}/${consulationResultId}`,
      data
    );
  },

  //danh sách medical record của một bệnh nhân
  GetMedicalRecord(customerid: number) {
    return axiosClient.get(`Doctor/medicalRecord/${customerid}`);
  },

  //Taọ mới một medical record dành cho bệnh nhân
  CreateMedicalRecord: (
    customerId: number,
    data: {
      startDate: string;
      endDate: string;
      stage: string;
      diagnosis: string;
      status: string;
      attempt: number;
    }
  ) => {
    return axiosClient.post(`Doctor/CreateMedicalRecord/${customerId}`, data);
  },

  UpdateMedicalRecord(
    medicalRecordId: number,
    data: {
      endDate: string;
      stage: string;
      diagnosis: string;
      status: string;
      attempt: number;
    }
  ) {
    return axiosClient.put(
      `Doctor/UpdateMedicalRecord/${medicalRecordId}`,
      data
    );
  },

  ////////////////////////////////////////////////////////
  //Appointment

  //Danh sách khách hàng đặt lịch khám
  GetListPatientAppointment: () => {
    return axiosClient.get(`/Doctor/GetListCustomer`);
  },

  //Danh sách bookinig của một khách hàng
  GetListBookingCustomer: (customerId: number) => {
    return axiosClient.get(`Doctor/GetBookingCustomer/${customerId}`);
  },

  //Danh sách khàm trong booking của khách hàng đó
  GetListAppointmentInBooking: (bookingId: number) => {
    return axiosClient.get(`/Doctor/appointmentCustomer/${bookingId}`);
  },

  //Lịch khám của bác sĩ dành cho đặt lịch khám
  GetDoctorScheduleByDate: (date: string) => {
    return axiosClient.get(`/DoctorSchedule/GetListScheduleForDoctor`, {
      params: { date },
    });
  },

  //Tạo booking từ bác sĩ tới bệnh nhân
  CreateBookingAppointment: (
    bookingId: number,
    data: {
      treatmentRoadmapId: number;
      doctorScheduleId: number;
      dateTreatment: string;
      timeTreatment: string;
    }
  ) => {
    return axiosClient.post(`Doctor/booking/${bookingId}`, data);
  },

  //Cập nhạt trạng thái booking
  UpdateStatusBooking: (bookingId: number, status: string) => {
    return axiosClient.put(
      `/Doctor/updateStatusBooking/${bookingId}?status=${encodeURIComponent(
        status
      )}`
    );
  },

  //Phôi trứng
  GetListEmbryos: (customerId: number, bookingId: number) => {
    return axiosClient.get(`/Embryos/embryos/${customerId}/${bookingId}`);
  },

  CreateEmbryo: (bookingId: number, data: CreateEmbryo) => {
    return axiosClient.post(`Embryos/embryo/${bookingId}`, data);
  },

  UpdateEmbryo: (embryoId: number, data: UpdateEmbryo) => {
    return axiosClient.put(`Embryos/embryo/${embryoId}`, data);
  },

  // schedule for job
  GetListSchedule: () => {
    return axiosClient.get(`/DoctorSchedule/GetFullScheduleForDoctor`);
  },

  //Thông kê
  GetAmountPatient: () => {
    return axiosClient.get(`Doctor/amountCustomer`);
  },
  GetAmountMedicalRecord: () => {
    return axiosClient.get(`Doctor/amountMedicalRecord`);
  },
  GetAmountMdStatisSuccess: () => {
    return axiosClient.get(`Doctor/amountMedicalRecordWithStatusComplete`);
  },
  GetAmountBooking: () => {
    return axiosClient.get(`Doctor/amountBookingCustomer`);
  },
  GetStatisForChartDashboard: () => {
    return axiosClient.get(`Doctor/medicalRecordWithStartDate`);
  },

  //Trang lịch sử điều trị
  GetMedicalRecordComplete: async (): Promise<{
    data: MedicalRecordComplete[];
  }> => {
    return axiosClient.get("Doctor/medicalRecordComplete");
  },

  GetMedicalRecordOngoing: async (): Promise<{
    data: MedicalRecordOngoing[];
  }> => {
    return axiosClient.get("Doctor/medicalRecordInProcess");
    ///api/Doctor/medicalRecordInProcess
  },
};

export default DoctorApi;
