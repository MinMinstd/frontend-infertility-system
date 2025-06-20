import type {
  ChangePassword,
  ChangePasswordRespone,
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
    axiosClient.put<ChangePasswordRespone>("/customer", data),
};

export default UserApi;
