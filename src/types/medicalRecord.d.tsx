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
