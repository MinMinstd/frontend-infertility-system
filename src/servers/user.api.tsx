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
};

export default UserApi;
