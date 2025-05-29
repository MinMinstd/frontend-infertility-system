export interface Feedback {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatarUrl?: string;
  reply?: string;
}

export const sampleFeedbacks: Feedback[] = [
  {
    id: "1",
    userName: "Nguyễn Thị An",
    rating: 5,
    comment:
      "Bác sĩ tư vấn rất tận tình, giải thích rõ ràng về tình trạng của tôi. Cảm ơn đội ngũ y tế!",
    date: "2025-05-20",
    avatarUrl: "https://example.com/avatar1.jpg",
  },
  {
    id: "2",
    userName: "Trần Văn Bình",
    rating: 4,
    comment:
      "Dịch vụ tốt, thời gian chờ đợi hơi lâu một chút nhưng nhìn chung rất hài lòng.",
    date: "2025-05-19",
  },
  {
    id: "3",
    userName: "Lê Thị Cúc",
    rating: 5,
    comment:
      "Phòng khám sạch sẽ, nhân viên thân thiện. Tôi sẽ giới thiệu cho bạn bè.",
    date: "2025-05-18",
    avatarUrl: "https://example.com/avatar3.jpg",
  },
  {
    id: "4",
    userName: "Phạm Đức Duy",
    rating: 4,
    comment:
      "Bác sĩ chuyên môn cao, tư vấn rất chi tiết về phương pháp điều trị.",
    date: "2025-05-17",
  },
  {
    id: "5",
    userName: "Hoàng Thị Em",
    rating: 5,
    comment: "Rất hài lòng với kết quả điều trị. Cảm ơn đội ngũ bác sĩ nhiều!",
    date: "2025-05-16",
    avatarUrl: "https://example.com/avatar5.jpg",
  },
];
