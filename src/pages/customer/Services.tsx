//Thông tin dịch vú
import { ServiceCard } from "../../components/ServiceCard";

const services = [
  //hiện tại đang fix cứng
  {
    name: "IVF (Thụ tinh trong ống nghiệm)",
    description: "Phương pháp hỗ trợ sinh sản hiện đại, tỷ lệ thành công cao.",
  },
  {
    name: "IUI (Bơm tinh trùng vào buồng tử cung)",
    description: "Giải pháp tối ưu cho các trường hợp vô sinh nhẹ.",
  },
  {
    name: "Khám lâm sàng",
    description: "Tư vấn, khám tổng quát và đánh giá sức khỏe sinh sản.",
  },
  {
    name: "Xét nghiệm nội tiết",
    description: "Kiểm tra hormone, đánh giá chức năng sinh sản.",
  },
  {
    name: "Lưu trữ tinh trùng/trứng",
    description: "Bảo quản tinh trùng, trứng cho các trường hợp đặc biệt.",
  },
];

export default function Services() {
  return (
    <section className="py-12 px-4 bg-blue-50" id="services">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-8">
          Dịch vụ của chúng tôi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={idx} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
