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

export interface ChangePasswordRespone {
  message: string;
}
