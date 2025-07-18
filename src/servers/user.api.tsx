import type {
  ChangePassword,
  ProfileChangeForm,
  ProfileFormInputs,
} from "../types/user.d";
import axiosClient from "./axiosClient";

const UserApi = {
  //Lấy thông tin customer
  GetProfile: () => axiosClient.get<ProfileFormInputs>("/customer"),

  //Cập nhật thông tin customer chưa bao gồm mật khẩu
  UpdateProfile: (data: ProfileChangeForm) =>
    axiosClient.put<ProfileChangeForm>("/customer/updateCustomerProfile", data),

  //Cập nhật mật khẩu customer
  ChangePassword: (data: ChangePassword) =>
    axiosClient.put<ChangePassword>("/customer/ChangePassword", data),

  //medical treatment record detail
  GetMedicalRecord: () => axiosClient.get("/customer/medicalRecord"),

  //medical treatment with typetest
  GetMedicalRecordDetail: (id: string) =>
    axiosClient.get(
      `/customer/medicalRecordDetail-treatmentResult-typeTest/${id}`
    ),

  //Dịch vụ hiện tại của customer
  GetCurrentService: () => axiosClient.get("/customer/getInformationService"),

  //Danh sách booking từ khách hàng
  GetBookingList: () => axiosClient.get("customer/GetListBookingInCustomer"),

  //Danh sach lich hen chi tiet
  GetAppointmentInBooking: (bookingId: number) =>
    axiosClient.get(`Customer/getListAppointment/${bookingId}`),

  //Thông tin payment page
  //Thông tin người dùng
  GetInfoCustomerPay: () => axiosClient.get("/Order/GetOrderCurrent"),

  //Thông tin giai đoạn điều trị
  GetPaymentByOrderId: (order: number) =>
    axiosClient.get(`Payment/GetPaymentByOrderId/${order}`),

  //Cập nhật trạng thái của payment
  UpdateSatatusPayment: (paymentId: number) =>
    axiosClient.put(`Payment/UpdateStatusPayment/${paymentId}`),

  //Thực hiện thanh toán ở bên thứ 3
  ReturnVnPayPayment: () => axiosClient.get("/vnpay/return"),
  CreateVnPayPayment: (data: {
    orderId: number;
    amount: number;
    orderInfo: string;
    returnUrl: string;
  }) => axiosClient.post("vnpay/create", data),

  //Lịch sử thanh toán
  GetHistoryPayment: () => axiosClient.get("Payment/GetHistoryPaymentByUserId"),

  //Lịch sử thanh toán detail
  GetPaymentHistoryDetail: (paymentId: number) =>
    axiosClient.get(`Payment/GetPaymentDetail/${paymentId}`),

  //Phôi ở đây nè
  GetListEmbroys: () => axiosClient.get(`Customer/embryos`),

  // Gửi feedback từ khách hàng
  PostFeedback: (data: { comments: string; rating: number }) =>
    axiosClient.post("/Feedback", data),
};

export default UserApi;
