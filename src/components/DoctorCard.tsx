interface DoctorCardProps {
  name: string;
  specialty: string;
  experience: string;
  avatar: string;
  onClick?: () => void;
}

const DoctorCard = (props: DoctorCardProps) => {
  return (
    <div
      onClick={props.onClick}
      className="cursor-pointer hover:shadow-lg transition"
    >
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-200">
        <img
          src={props.avatar}
          alt={props.name}
          className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-pink-200"
        />
        <h3 className="text-lg font-bold text-blue-700">{props.name}</h3>
        <p className="text-pink-500">{props.specialty}</p>
        <p className="text-gray-500 text-sm mt-1">{props.experience}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
