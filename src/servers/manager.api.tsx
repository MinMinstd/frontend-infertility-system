import type { Feedback, Account } from "../types/manager.d";
import axiosClient from "./axiosClient";
const ManagerApi = {
    
    GetFeedback: () => axiosClient.get<Feedback[]>("/feedback"),
    GetUserAfterLogin: () => axiosClient.get<Account[]>("/User/GetUserAfterLogin"),
    GetCountTotalAccounts: () => axiosClient.get<Account[]>("/User/CountTotalAccounts"),
    GetCountDoctorsAccount: () => axiosClient.get<Account[]>("/User/CountDoctorsAccount"),
    GetCountCustomerAccount: () => axiosClient.get<Account[]>("/User/CountCustomerAccount"),
    GetCountNewAccount: () => axiosClient.get<Account[]>("/User/CountNewAccount"),
    GetAllUsersForManagement: () => axiosClient.get<Account[]>("/User/GetAllUsersForManagement"),

  };
  
  export default ManagerApi;