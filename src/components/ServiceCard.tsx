import { Link } from "react-router-dom";

interface ServiceCardProps {
  name: string;
  description: string;
  detailLink?: string;
}
export function ServiceCard({
  name,
  description,
  detailLink,
}: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-200">
      <div>
        <h3 className="text-xl font-bold text-blue-700 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
      <Link
        to={detailLink || "#"}
        className="text-pink-500 hover:underline font-semibold mt-auto"
      >
        Xem chi tiết
      </Link>
    </div>
  );
}
