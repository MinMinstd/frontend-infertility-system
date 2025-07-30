export type BookingConsulant = {
  husband: string;
  wife: string;
  date: string; // YYYY-MM-DD
  time?: string; // This seems to be part of DoctorSchedule, but let's see. The DTO has it.
  note?: string;
  doctorId: number;
  doctorScheduleId: number;
  serviceId: number;
};

export type AppointmentHistory = {
  bookingId: number;
  date: string;
  time: string;
  fullName: string;
  name: string;
  status: "completed" | "upcoming" | "cancelled";
  type: string;
  note?: string;
};

export type AppointmentInfoPatient = {
  customerId: number;
  fullName: string;
  birthday: string;
  age: number;
  status: string;
  startDate: string;
  serviceName: string;
};
