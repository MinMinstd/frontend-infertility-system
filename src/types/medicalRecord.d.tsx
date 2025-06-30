//Định nghĩa Medical record

export interface MedicalRecordDetail {
  date: string;
  note: string;
  testResult: string;
  typeName: string | null;
  stage: string;
  status: string;
}

export interface TreatmentHistory {
  startDate: string;
  endDate: string;
  stage: string;
  diagnosis: string;
  status: string;
  attempt: number;
  medicalRecordDetails: MedicalRecordDetail[];
}

export interface CurrentService {
  id: string;
  name: string;
  startDate: string;
  status: string;
  doctor: string;
  nextAppointment: string;
}

//Định nghĩa treatment

// Định nghĩa interface cho bước điều trị
export interface Treatment {
  date: string;
  testResult: string;
  note: string;
  typeName: "Consultation" | "Treatment" | "Result";
  status: "Complete" | "In Progress" | "Pending";
  treatmentResultId: number;
  typeTest: TypeTest[];
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
  name: string;
  description: string;
}
