export type BookingConsulant = {
  date: string; // YYYY-MM-DD
  time?: string; // This seems to be part of DoctorSchedule, but let's see. The DTO has it.
  note?: string;
  doctorId: number;
  doctorScheduleId: number;
  serviceId: number;
}; 