import axiosClient from "./axiosClient";

const ServiceApi = {
  getAllServicesToBooking: () => {
    return axiosClient.get("/Service/GetAllServicesToBooking");
  },
};

export default ServiceApi; 