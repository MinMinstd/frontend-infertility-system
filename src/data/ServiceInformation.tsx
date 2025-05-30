interface Step {
  stepNumber?: number;
  title?: string;
  description?: string;
  duration?: string; // optional property for time duration
  medication?: string[]; // optional property for medications used in the step
  notes?: string; // optional property for additional notes
}

interface ServiceInformation {
  id: string;
  name?: string;
  title: string;
  description: string;
  backgroundImage?: string; // optional property for background image URL
  steps?: Step[]; // Array of steps that describe the process
}

// Dữ liệu mẫu cho IVF (Thụ tinh trong ống nghiệm)
export const ServiceInfo: ServiceInformation[] = [
  {
    id: "ivf",
    name: "Quy trình thực hiện IVF",
    title: "Quy trình thực hiện IVF",
    description:
      "Thụ tinh trong ống nghiệm, tên tiếng Anh là In vitro fertilization (IVF), là phương pháp hỗ trợ sinh sản hiện đại. Kỹ thuật này giúp kết hợp trứng và tinh trùng trong môi trường ống nghiệm để tạo phôi, thường áp dụng cho các trường hợp vô sinh – hiếm muộn.",
    steps: [
      {
        stepNumber: 1,
        title: "Kích thích buồng trứng",
        description:
          "Người vợ được tiêm thuốc kích thích buồng trứng, thường kéo dài từ 10 – 12 ngày. Trong suốt thời gian tiêm thuốc, người vợ sẽ được hẹn để siêu âm và làm xét nghiệm máu.",
        duration: "10 – 12 ngày",
        notes:
          "Tiêm mũi thuốc cuối cùng để kích thích trứng trưởng thành, cần tiêm đúng giờ.",
      },
      {
        stepNumber: 2,
        title: "Chọc hút trứng",
        description:
          "Thủ thuật chọc hút trứng được tiến hành qua ngã âm đạo vào khoảng 36 giờ đồng hồ sau mũi tiêm thuốc cuối cùng.",
        duration: "10 – 15 phút mỗi ca",
        notes: "Chọc hút trứng thực hiện khi người vợ đã được gây mê.",
      },
      {
        stepNumber: 3,
        title: "Tạo phôi",
        description:
          "Trứng và tinh trùng sẽ được chuyển đến phòng Labo để thụ tinh và tạo phôi. Phôi sẽ được nuôi cấy trong môi trường chuyên dụng khoảng từ 2 – 5 ngày trước khi chuyển vào buồng tử cung.",
        duration: "2 – 5 ngày",
      },
      {
        stepNumber: 4,
        title: "Chuyển phôi",
        description:
          "Có hai kỹ thuật chuyển phôi: chuyển phôi tươi và chuyển phôi đông lạnh. Phôi sẽ được chuyển vào buồng tử cung khi niêm mạc tử cung đủ độ dày và chất lượng tốt.",
        duration: "5 – 10 phút",
      },
      {
        stepNumber: 5,
        title: "Thử thai",
        description:
          "Người vợ đến tái khám để kiểm tra và thực hiện xét nghiệm máu (xét nghiệm Beta HCG) theo lịch hẹn.",
        duration: "2 tuần sau chuyển phôi",
        notes: "Nếu Beta HCG >25 IU/L, phôi đã làm tổ và mang thai.",
      },
    ],
  },
  {
    id: "iui",
    name: "Bơm tinh trùng vào buồng tử cung (IUI)",
    title: "Quy trình thực hiện IUI",
    description:
      "Bơm tinh trùng vào buồng tử cung hay thụ tinh nhân tạo tên tiếng Anh là Intrauterine Insemination – IUI. Đây là phương pháp hỗ trợ sinh sản hiện đại giúp chuyển một số lượng lớn tinh trùng đã được lọc rửa vào buồng tử cung của người nữ.",
    steps: [
      {
        stepNumber: 1,
        title: "Kích thích buồng trứng",
        description:
          "Kích thích buồng trứng là một phương pháp sử dụng thuốc uống hoặc tiêm để kích thích sự rụng trứng theo chu kỳ. Thuốc thường được sử dụng vào ngày đầu chu kỳ kinh nguyệt.",
        duration: "10 – 12 ngày",
        medication: [
          "Gonadotropins (FSH, hMG)",
          "Clomiphene Citrate",
          "Letrozole",
          "hCG",
        ],
      },
      {
        stepNumber: 2,
        title: "Chuẩn bị tinh dịch",
        description:
          "Tinh dịch tươi sẽ được chuẩn bị tại phòng thí nghiệm, phân tách và tập trung tinh trùng di động, loại bỏ huyết tương, tế bào bạch cầu và các mảnh vụn khác.",
        duration: "Vào ngày làm IUI",
      },
      {
        stepNumber: 3,
        title: "Bơm tinh trùng vào buồng tử cung",
        description:
          "Bác sĩ đặt ống thông chứa tinh trùng vào trong buồng tử cung qua cổ tử cung. Sau khi bơm, bệnh nhân nghỉ ngơi khoảng 5-10 phút.",
        duration: "5 – 10 phút",
      },
      {
        stepNumber: 4,
        title: "Thử thai",
        description:
          "Mười bốn ngày sau rụng trứng, bệnh nhân sẽ xét nghiệm máu để kiểm tra hCG (xét nghiệm thử thai). Nếu kết quả dương tính, siêu âm sẽ được thực hiện để xác định tình trạng thai.",
        duration: "14 ngày sau rụng trứng",
      },
    ],
  },

  // {
  //   id: "4",
  //   title: "Khám và điều trị vô sinh",
  //   description: "Chẩn đoán chính xác nguyên nhân và đưa ra phương án điều trị",
  // },
  // {
  //   id: "5",
  //   title: "Tư vấn di truyền",
  //   description: "Tư vấn chuyên sâu về các vấn đề di truyền và sàng lọc",
  // },
  // {
  //   id: "6",
  //   title: "Chăm sóc thai kỳ",
  //   description: "Theo dõi và chăm sóc toàn diện trong suốt thai kỳ",
  // },
];

export default ServiceInfo;
