import dayjs from "dayjs";

//Định nghĩa Medical record
// export interface MedicalRecordDetail {
//   date: string;
//   note: string;
//   testResult: string;
//   typeName: string | null;
//   stage: string;
//   status: string;
// }

export interface TreatmentHistory {
  medicalRecordId: string;
  startDate: string;
  endDate: string;
  stage: string;
  diagnosis: string;
  status: string;
  attempt: number;
}

//Định nghĩa treatment
export interface Treatment {
  date: string;
  testResult: string;
  note: string;
  typeName: "Consultation" | "Treatment" | "Result"; // nên giới hạn bằng union type
  status: "Complete" | "In Progress" | "Pending"; // tùy vào giá trị backend
  treatmentResultId: number;
  stageName: string;
  stage: string;
  description: string;
  durationDay: number;
  typeTest: {
    name: string;
    description: string;
  }[];
}

export interface TreatmentStep {
  date: string;
  note: string;
  testResult: string;
  typeName: "Consultation" | "Treatment" | "Result";
  status: "Complete" | "In Progress" | "Pending";
  stage: string;
}

export interface TreatmentAttempt {
  startDate: string;
  endDate: string;
  stage: string;
  diagnosis: string;
  status: string;
  attempt: number;
  medicalRecordDetails: TreatmentStep[];
}

//định nghĩa Type test
export interface TypeTest {
  typeTestId: number;
  name: string;
  description: string;
}

//dịch vụ đang sử dụng tại customer
export interface CurrentService {
  fullName: string;
  startDate: string;
  endDate: string;
  status: string;
  nameService: string;
  description: string;
}

//sử dụng tại file PatientDetails.tsx
export interface treatmentRoadmap {
  treatmentRoadmapId: number;
  stepNumber: number;
  date: string;
  stage: string;
  description: string;
  durationDay: number;
  status: string;
}

//Form kết quả
export interface TreatmentResultFormValues {
  treatmentRoadmapId: number;
  date: string;
  stage: string;
  durationDay: number;
  status: string;
}

//medical record detail
export interface MedicalRecordDetail {
  medicalRecordDetailId: number;
  treatmentRoadmapId: number;
  stepNumber?: number;
  date: string;
  note?: string;
  testResult?: string;
  typeName: string | null;
  status: string;
  stage?: string;
}

//create medical record detail
export interface CreateMedicalRecordDetail {
  medicalRecordId: number;
  treatmentRoadmapId: number;
  treatmentResultId: number;
  consulationResultId: number; // Thêm trường này
  stage?: string; // Đánh dấu là optional
  stepNumber?: number; // Đánh dấu là optional
  date: string;
  typeName: string;
  status: string;
  testResult?: string;
  note?: string;
}

//Lấy thông tin treatment result
export interface TreatmentResult_typeTest {
  treatmentResultId: number;
  treatmentRoadmapId: number;
  stepNumber: number;
  dateTreatmentResult: string;
  description: string;
  result: string;
  typeTest: TypeTest[];
}

//update treatment result _ type test
export interface UpdateTreatmentResultFormValues {
  dateTreatmentResult: dayjs.Dayjs; // từ DatePicker
  description: string;
  result: string;
  typeTest: TypeTest[]; // giữ nguyên vì đã chuẩn rồi
}

//Create treatment result - type test
export interface CreateTreatmentResultWithTypeTest {
  dateTreatmentResult: string;
  stage: string;
  description: string;
  durationDay: number;
  result: string;
  treatmentRoadmapId: number;
  name: string; // type test name
  descriptionTypeTest: string;
}

//Định nghĩa Consulation result - typetest
export interface ConsulationResult_typeTest {
  consulationResultId: number;
  date: string;
  resultValue: string;
  note: string;
  typeTests: TypeTest[];
}

export interface UpdateConsulation {
  date: string;
  resultValue: string;
  note: string;
  typeTest: TypeTest[];
}

//Medical record
export interface MedicalRecord {
  bookingId: number;
  medicalRecordId: number;
  startDate: string;
  endDate: string;
  stage: string;
  diagnosis: string;
  status: string;
  attempt: number;
} //Lấy danh sách mediccal record

export interface Embryo {
  embryoId: number;
  createAt: string;
  transferredAt?: string | null;
  quality: string;
  type: string;
  status: string;
  note?: string;
  customerId: number;
}

export interface CreateEmbryo {
  createAt: string;
  quality: string;
  status: string;
  note?: string;
}

export interface UpdateEmbryo {
  transferredAt: string;
  type: string;
  status: string;
  note: string;
}
