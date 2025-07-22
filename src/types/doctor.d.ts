export type Doctor = {
  doctorId: number;
  fullName: string;
  experience: number;
};

//Định nghĩa thông tin bệnh nhân ở Patient (danh sach bệnh nhân)
export type InformationPatient = {
  customerId: number;
  fullName: name;
  birthday: string;
  age: int;
  status: string;
  startDate: string;
  serviceName: string;
  descriptionService: string;
};

//Định nghĩa thông tin bệnh nhân ở PatientDetail
export type InformationPatientDetails = {
  wife: string;
  husband: string;
  email: string;
  phone: string;
  birthday: string;
  age: number;
  address: string;
  medicalRecordId: number; //thêm thuộc tính này ở backend nè!!!!!!!!!!  2/7
};

//Định nghĩa treatment overview
export type TreatmentOverview = {
  date: string;
  stage: string;
  description: string;
  durationDay: number;
};

export interface DoctorSchedule {
  workDate: string;
  startTime: string;
  endTime: string;
  status: string;
}

export interface MedicalRecordComplete {
  medicalRecordId: number;
  startDate: string;
  endDate: string;
  stage: string;
  diagnosis: string;
  status: string;
  attempt: number;
  fullName: string;
  serviceName: string;
}

export interface MedicalRecordOngoing {
  medicalRecordId: number;
  startDate: string;
  endDate: string;
  stage: string;
  diagnosis: string;
  status: string;
  attempt: number;
  fullName: string;
  serviceName: string;
}
