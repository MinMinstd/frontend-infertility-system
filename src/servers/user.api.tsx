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
  UpdateProfile: () =>
    axiosClient.put<ProfileChangeForm>("/customer/updateCustomerProfile"),

  //Cập nhật mật khẩu customer
  ChangePassword: () => axiosClient.post<ChangePassword>("/customer"),

  //medical treatment record detail
  GetMedicalRecorDetail: () =>
    axiosClient.get("/customer/medicalRecordWithDetail"),
};

export default UserApi;
