export type DoctorSchedule = {
  doctorScheduleId: number;
  startTime: string; // TimeOnly is mapped to string in C# web API (e.g., "10:30:00")
  endTime: string;
}; 