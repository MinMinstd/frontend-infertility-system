// src/components/Doctors.tsx
import { useState } from "react";
import DoctorCard from "../../components/DoctorCard";

interface Doctor {
  name: string;
  specialty: string;
  experience: string;
  avatar: string;
}

const doctors = [
  {
    name: "BS. Nguyễn Văn A",
    specialty: "Chuyên gia IVF",
    experience: "15 năm kinh nghiệm",
    avatar: "../public/Images/doctor-avatar.png",
  },
  {
    name: "BS. Trần Thị B",
    specialty: "Nội tiết sinh sản",
    experience: "12 năm kinh nghiệm",
    avatar: "../public/Images/doctor-avatar.png",
  },
  {
    name: "BS. Lê Văn C",
    specialty: "Nam học",
    experience: "10 năm kinh nghiệm",
    avatar: "../public/Images/doctor-avatar.png",
  },
  {
    name: "BS. Lê Văn C",
    specialty: "Nam học",
    experience: "10 năm kinh nghiệm",
    avatar: "../public/Images/doctor-avatar.png",
  },
  {
    name: "BS. Lê Văn C",
    specialty: "Nam học",
    experience: "10 năm kinh nghiệm",
    avatar: "../public/Images/doctor-avatar.png",
  },
  {
    name: "BS. Lê Văn C",
    specialty: "Nam học",
    experience: "10 năm kinh nghiệm",
    avatar: "../public/Images/doctor-avatar.png",
  },
  {
    name: "BS. Lê Văn C",
    specialty: "Nam học",
    experience: "10 năm kinh nghiệm",
    avatar: "../public/Images/doctor-avatar.png",
  },
  {
    name: "BS. Lê Văn C",
    specialty: "Nam học",
    experience: "10 năm kinh nghiệm",
    avatar: "../public/Images/doctor-avatar.png",
  },
];

// Tạo component DoctorDetail (tạm thời inline, sẽ tách riêng sau)
const DoctorDetail = ({
  doctor,
  onClose,
}: {
  doctor: Doctor;
  onClose: () => void;
}) => {
  if (!doctor) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-pink-600 text-2xl"
        >
          &times;
        </button>
        <img
          src={doctor.avatar}
          alt={doctor.name}
          className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-pink-200"
        />
        <h3 className="text-xl font-bold text-pink-600 text-center mb-2">
          {doctor.name}
        </h3>
        <p className="text-center text-gray-700 mb-1">{doctor.specialty}</p>
        <p className="text-center text-gray-500 mb-2">{doctor.experience}</p>
        {/* Thêm các thông tin chi tiết khác nếu có */}
      </div>
    </div>
  );
};

export default function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  return (
    <section className="py-12 px-4 bg-pink-50" id="doctors">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-600 mb-8">
          ĐỘi NGŨ CHUYÊN MÔN
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, idx) => (
            <DoctorCard
              key={idx}
              {...doctor}
              onClick={() => setSelectedDoctor(doctor)}
            />
          ))}
        </div>
      </div>
      {/* Hiển thị modal chi tiết bác sĩ */}
      {selectedDoctor && (
        <DoctorDetail
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </section>
  );
}
