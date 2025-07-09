export interface ProfileFormInputs {
  fullName: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  address: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ProfileChangeForm {
  fullName: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  address: string;
}

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

//thông tin khách hàng trong payment
export interface PatientInfor {
  wife: string;
  husband: string;
  birthday: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  status: string;
  serviceName: string;
  serviceId: number;
}
