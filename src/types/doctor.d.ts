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
