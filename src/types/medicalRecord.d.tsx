//Định nghĩa Medical record

export interface MedicalRecordDetail {
  date: string;
  note: string;
  testResult: string;
  type: string | null;
  medicalRecordId: number;
  consulationResultId: number | null;
  treatmentResultId: number | null;
  treatmentRoadmapId: number;
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
