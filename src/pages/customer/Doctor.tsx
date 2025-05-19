// src/components/Doctors.tsx
import { DoctorCard } from "../../components/DoctorCard";

const doctors = [
  {
    name: "BS. Nguyễn Văn A",
    specialty: "Chuyên gia IVF",
    experience: "15 năm kinh nghiệm",
    avatar: "/doctor1.jpg",
  },
  {
    name: "BS. Trần Thị B",
    specialty: "Nội tiết sinh sản",
    experience: "12 năm kinh nghiệm",
    avatar: "/doctor2.jpg",
  },
  {
    name: "BS. Lê Văn C",
    specialty: "Nam học",
    experience: "10 năm kinh nghiệm",
    avatar: "/doctor3.jpg",
  },
];

export default function Doctors() {
  return (
    <section className="py-12 px-4 bg-pink-50" id="doctors">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-600 mb-8">
          Đội ngũ bác sĩ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, idx) => (
            <DoctorCard key={idx} {...doctor} />
          ))}
        </div>
      </div>
    </section>
  );
}
