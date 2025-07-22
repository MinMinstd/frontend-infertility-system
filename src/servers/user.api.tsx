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
  GetPaymentByOrderId: (orderId: number) =>
    axiosClient.get(`Payment/GetPaymentByOrderId/${orderId}`),

  //Cập nhật trạng thái của payment
  UpdateSatatusPayment: (paymentId: number) =>
    axiosClient.put(`Payment/UpdateStatusPayment/${paymentId}`),

  //Thực hiện thanh toán ở bên thứ 3
  ReturnVnPayPayment: () => axiosClient.get("/vnpay/return"),
  CreateVnPayPayment: (data: {
    orderType: string; // hoặc "bill", "treatment", tuỳ hệ thống bạn định nghĩa
    amount: number;
    orderDescription: string;
    name: string;
    returnUrl: string;
    cancelUrl: string;
  }) => axiosClient.post("vnpay/create", data),

  //Lịch sử thanh toán
  GetHistoryPayment: () => axiosClient.get("Payment/GetHistoryPaymentByUserId"),

  //Lịch sử thanh toán detail
  GetPaymentHistoryDetail: (paymentId: number) =>
    axiosClient.get(`Payment/GetPaymentDetail/${paymentId}`),

  //Danh sách phôi
  GetListEmbroys: () => axiosClient.get(`Customer/embryos`),

  // Gửi feedback từ khách hàng
  PostFeedback: (data: { comments: string; rating: number }) =>
    axiosClient.post("/Feedback", data),

  // Lấy danh sách blog
  GetBlogPosts: () => axiosClient.get('/BlogPost'),
  // Lấy danh sách ảnh của blog post
  GetBlogPostImages: (blogPostId: number) => axiosClient.get<File>(`/BlogPost/Image/${blogPostId}`),
  // Đăng bài viết mới (có hình ảnh)
  PostBlog: (data: FormData) => axiosClient.post('/BlogPost', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),

  // Hủy lịch đặt khám
  cancelBooking: (bookingId: number) =>
    axiosClient.put(`/Booking/Delete/${bookingId}`),
};

export default UserApi;
