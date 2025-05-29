interface SuccessStory {
  id: string;
  userName: string;
  title: string;
  story: string;
  treatmentType: string;
  date: string;
  avatarUrl?: string;
  duration: string;
  rating: number;
}

export const sampleStories: SuccessStory[] = [
  {
    id: "1",
    userName: "Nguyễn Thu Hà",
    title: "Hành trình 2 năm chiến đấu",
    story:
      "Sau 2 năm điều trị tại bệnh viện, cuối cùng chúng tôi đã đón được thiên thần nhỏ về với gia đình. Cảm ơn đội ngũ y bác sĩ đã luôn đồng hành và hỗ trợ chúng tôi trong suốt quá trình điều trị.",
    treatmentType: "IVF",
    date: "2025-05-15",
    duration: "2 năm",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=Ha",
  },
  {
    id: "2",
    userName: "Trần Văn Minh",
    title: "Phép màu đến sau 3 lần thử IUI",
    story:
      "Vợ chồng tôi đã trải qua 3 lần thực hiện IUI và cuối cùng đã thành công. Đội ngũ y tế tại đây thực sự chuyên nghiệp và tận tâm. Họ không chỉ điều trị mà còn là chỗ dựa tinh thần cho chúng tôi.",
    treatmentType: "IUI",
    date: "2025-05-10",
    duration: "1.5 năm",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=Minh",
  },
  {
    id: "3",
    userName: "Lê Thị Hương",
    title: "Niềm vui nhân đôi với song thai",
    story:
      "Sau nhiều năm chờ đợi, chúng tôi đã may mắn có được hai thiên thần nhỏ. Cảm ơn đội ngũ bác sĩ đã giúp chúng tôi thực hiện ước mơ làm cha mẹ.",
    treatmentType: "IVF",
    date: "2025-05-08",
    duration: "3 năm",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=Huong",
  },
  {
    id: "4",
    userName: "Phạm Thanh Tùng",
    title: "Hạnh phúc đến từ sự kiên trì",
    story:
      "Chúng tôi đã trải qua nhiều thất bại nhưng không bỏ cuộc. Giờ đây niềm hạnh phúc đã mỉm cười với gia đình nhỏ của chúng tôi.",
    treatmentType: "ICSI",
    date: "2025-05-05",
    duration: "2.5 năm",
    rating: 5,
    avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=Tung",
  },
];

export default sampleStories;
