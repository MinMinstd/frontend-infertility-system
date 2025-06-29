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
  GetMedicalRecorDetail: () =>
    axiosClient.get("/customer/medicalRecordWithDetail"),

  //medical treatment with typetest
  GetMedicalRecordWithTypeTest: () =>
    axiosClient.get("/customer/medicalRecordDetailWithTypeTest"),

  //Danh sách booking từ khách hàng
  GetBookingList: () => axiosClient.get("customer/GetListBookingInCustomer"),
};

export default UserApi;
