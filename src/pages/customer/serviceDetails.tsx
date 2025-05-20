import { useParams } from "react-router-dom";

const serviceDetailsData = {
  ivf: {
    name: "IVF (Thụ tinh trong ống nghiệm)",
    description: "Phương pháp hỗ trợ sinh sản hiện đại, tỷ lệ thành công cao.",
    detail: "Thông tin chi tiết về IVF...",
  },
  iui: {
    name: "IUI (Bơm tinh trùng vào buồng tử cung)",
    description: "Giải pháp tối ưu cho các trường hợp vô sinh nhẹ.",
    detail: "Thông tin chi tiết về IUI...",
  },
  exam: {
    name: "Khám lâm sàng",
    description: "Tư vấn, khám tổng quát và đánh giá sức khỏe sinh sản.",
    detail: "Thông tin chi tiết về khám lâm sàng...",
  },
};

export default function ServiceDetails() {
  const { id } = useParams();
  const service = serviceDetailsData[id as keyof typeof serviceDetailsData];
  // để TypeScript hiểu rằng id là một trong các key hợp lệ ("ivf" | "iui" | "exam")

  if (!service) return <div>Không tìm thấy dịch vụ!</div>;

  return (
    <section className="bg-white-50 min-h-[60vh]">
      <div className="mx-auto  rounded-xl  p-8">
        <h2 className="text-2xl font-bold text-pink-700 mb-4">
          {service.name}
        </h2>
        <p className="text-gray-700 mb-4">{service.description}</p>
        <div className="text-gray-600">{service.detail}</div>
      </div>
    </section>
  );
}
