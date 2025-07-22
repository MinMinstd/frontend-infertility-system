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
  orderId: number;
}

export interface PaymentInfo {
  status: string;
  treatmentRoadmapId: number;
  stage: string;
  price: number;
  paymentId: number;
}

export interface Embryo {
  embryoId: number;
  createAt: string;
  transferredAt: string;
  quality: string;
  type: string;
  status: string;
  note: string;
}

export interface FeedbackCreateRequest {
  comments: string;
  rating: number;
}

export interface BlogPost {
  blogPostId: number;
  title: string;
  story: string;
  treatmentType: string;
  date: string;
  status: string;
  customerName: string;
  image?: File | null; // Đường dẫn hình ảnh từ API
}

export type BlogPostImageResponse = File | null;

export interface BlogPostCreateRequest {
  Title: string;
  Story: string;
  TreatmentType: string;
  ImageFile?: File | null;
}

export interface UserApiType {
  cancelBooking: (bookingId: number) => Promise<{ message: string }>;
}
